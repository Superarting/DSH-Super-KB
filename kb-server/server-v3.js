/**
 * kb-server v3 — DSH-Super-KB 动态多根知识库服务
 *
 * 纯 Node.js 标准库，零运行时依赖。
 * 自动发现挂载根下所有一级文件夹作为可用站点（来源）：
 *   - /data/<id>              固定站点（如 4 个网站目录）
 *   - /data/roots/personal/*  个人文件夹 → site id "@p/<name>"
 *   - /data/roots/team/*      团队文件夹 → site id "@t/<name>"
 * 每个站点独立写入开关（人在插件 UI 可视化切换），agent 按开关写入。
 * token 可选/固定（存 config），公网务必设置。
 */
const http = require('node:http')
const fs = require('node:fs')
const path = require('node:path')

const ROOT = path.resolve(process.env.KB_ROOT || '/data')
const PERSONAL = path.join(ROOT, 'roots', 'personal')
const TEAM = path.join(ROOT, 'roots', 'team')
const CONFIG_FILE = path.join(ROOT, 'config', 'sites.json')
const AUDIT_FILE = path.join(ROOT, 'config', 'audit.jsonl')
const PORT = Number(process.env.KB_PORT || 8787)
const HOST = process.env.KB_HOST || '0.0.0.0'
const RESERVED = new Set(['config', 'roots'])

const MIME = {
  '.html':'text/html; charset=utf-8','.htm':'text/html; charset=utf-8','.css':'text/css; charset=utf-8',
  '.js':'application/javascript; charset=utf-8','.json':'application/json; charset=utf-8',
  '.csv':'text/csv; charset=utf-8','.md':'text/markdown; charset=utf-8','.txt':'text/plain; charset=utf-8',
  '.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.gif':'image/gif',
  '.webp':'image/webp','.ico':'image/x-icon','.pdf':'application/pdf','.py':'text/x-python; charset=utf-8',
  '.php':'application/x-httpd-php; charset=utf-8','.sh':'text/x-shellscript; charset=utf-8',
  '.yml':'text/yaml; charset=utf-8','.yaml':'text/yaml; charset=utf-8',
}

function loadConfig() {
  try {
    const c = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'))
    if (!c.overrides || typeof c.overrides !== 'object') c.overrides = {}
    return c
  } catch { return { version: 3, token: '', overrides: {} } }
}
function saveConfig(c) {
  fs.mkdirSync(path.dirname(CONFIG_FILE), { recursive: true })
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(c, null, 2))
}
function ensureConfig() {
  fs.mkdirSync(path.dirname(CONFIG_FILE), { recursive: true })
  if (!fs.existsSync(CONFIG_FILE)) saveConfig({ version: 3, token: '', overrides: {} })
}
function audit(e) { try { fs.appendFileSync(AUDIT_FILE, JSON.stringify({ ts: new Date().toISOString(), ...e }) + '\n') } catch {} }
function authOk(req, cfg) {
  if (!cfg.token) return true
  return String(req.headers.authorization || '') === `Bearer ${cfg.token}`
}

// 站点 id → 物理根路径
function siteRootPath(id) {
  if (typeof id !== 'string') return null
  if (id.startsWith('@p/')) return path.join(PERSONAL, id.slice(3))
  if (id.startsWith('@t/')) return path.join(TEAM, id.slice(3))
  if (id.includes('/') || id === '..' || id === '.') return null
  return path.join(ROOT, id)
}

// 自动发现所有可用站点（一级文件夹）
function discoverSites(cfg) {
  const out = []
  const add = (dir, prefix) => {
    let entries = []
    try { entries = fs.readdirSync(dir, { withFileTypes: true }) } catch { return }
    for (const e of entries) {
      if (!e.isDirectory() || e.name.startsWith('.')) continue
      const id = prefix ? `${prefix}/${e.name}` : e.name
      if (!prefix && RESERVED.has(e.name)) continue
      const ov = cfg.overrides[id] || {}
      out.push({ id, name: ov.name || e.name, writeEnabled: ov.writeEnabled === true, group: prefix === '@p' ? 'personal' : prefix === '@t' ? 'team' : 'site' })
    }
  }
  add(ROOT, '')          // 固定站点（网站目录）
  add(PERSONAL, '@p')    // 个人文件夹
  add(TEAM, '@t')        // 团队文件夹
  return out
}
function findSite(cfg, id) { return discoverSites(cfg).find(s => s.id === id) }

function safeResolve(base, relPath) {
  const raw = String(relPath || '').replace(/\\/g, '/')
  if (raw.split('/').includes('..')) return null
  const clean = raw.split('/').filter(s => s && s !== '.').join('/')
  const abs = path.resolve(base, clean)
  if (abs !== base && !abs.startsWith(base + path.sep)) return null
  let realBase = base
  try { realBase = fs.realpathSync(base) } catch {}
  try {
    const real = fs.realpathSync(abs)
    if (real !== realBase && !real.startsWith(realBase + path.sep)) return null
  } catch {}
  return abs
}
function send(res, status, body, type='application/json; charset=utf-8') {
  const data = typeof body === 'string' || Buffer.isBuffer(body) ? body : JSON.stringify(body)
  res.writeHead(status, { 'Content-Type': type, 'Content-Length': Buffer.byteLength(data) })
  res.end(data)
}
function readBody(req, max=32*1024*1024) {
  return new Promise((resolve, reject) => {
    const chunks=[]; let size=0
    req.on('data', c => { size+=c.length; if(size>max){reject(new Error('body too large'));req.destroy();return} chunks.push(c) })
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
    req.on('error', reject)
  })
}
function parseUrl(req) { const u=new URL(req.url,'http://localhost'); return { pathname:decodeURIComponent(u.pathname), query:u.searchParams } }

async function handleApi(req, res, cfg, pathname, query) {
  const method = req.method
  if (pathname === '/kb-api/health' && method === 'GET') return send(res,200,{ ok:true, service:'kb-server', version:3 })
  if (!authOk(req, cfg)) return send(res,401,{ ok:false, error:'unauthorized' })

  // 列出所有可发现站点（供 UI 选择新增来源 + 显示开关）
  if (pathname === '/kb-api/sites' && method === 'GET') {
    return send(res,200,{ ok:true, sites: discoverSites(cfg) })
  }
  // 切换某站点写入开关（自动写 override）
  if (pathname === '/kb-api/sites/toggle' && method === 'POST') {
    let body; try { body=JSON.parse(await readBody(req)) } catch { return send(res,400,{ ok:false,error:'invalid JSON' }) }
    const site = findSite(cfg, body.id)
    if (!site) return send(res,404,{ ok:false,error:'site not found' })
    cfg.overrides[body.id] ??= {}
    cfg.overrides[body.id].writeEnabled = body.writeEnabled === true
    saveConfig(cfg)
    audit({ action:'toggle', site:body.id, writeEnabled:body.writeEnabled===true })
    return send(res,200,{ ok:true, id:body.id, writeEnabled:body.writeEnabled===true })
  }

  let postBody=null
  if (method === 'POST' && pathname === '/kb-api/write') {
    try { postBody=JSON.parse(await readBody(req)) } catch { return send(res,400,{ ok:false,error:'invalid JSON' }) }
  }
  const siteId = query.get('site') || postBody?.site || null
  const site = findSite(cfg, siteId)
  if (!site) return send(res,404,{ ok:false,error:`site not configured: ${siteId ?? '(none)'}` })
  const siteRoot = siteRootPath(site.id)
  if (!siteRoot) return send(res,403,{ ok:false,error:'invalid site id' })

  if (pathname === '/kb-api/tree' && method === 'GET') {
    const abs = safeResolve(siteRoot, query.get('path')||'')
    if (!abs) return send(res,403,{ ok:false,error:'path escapes site root' })
    if (!fs.existsSync(abs)) return send(res,404,{ ok:false,error:'folder not found' })
    const items = fs.readdirSync(abs,{ withFileTypes:true }).filter(e=>!e.name.startsWith('.'))
      .map(e=>({ name:e.name, kind:e.isDirectory()?'folder':'file' }))
    return send(res,200,{ ok:true, site:site.id, path:query.get('path')||'', items })
  }
  if (pathname === '/kb-api/read' && method === 'GET') {
    const abs = safeResolve(siteRoot, query.get('path')||'')
    if (!abs) return send(res,403,{ ok:false,error:'path escapes site root' })
    if (!fs.existsSync(abs)||!fs.statSync(abs).isFile()) return send(res,404,{ ok:false,error:'file not found' })
    const stat=fs.statSync(abs)
    if (stat.size>2*1024*1024) return send(res,413,{ ok:false,error:'file too large' })
    return send(res,200,{ ok:true, site:site.id, path:query.get('path'), content:fs.readFileSync(abs,'utf8'), bytes:stat.size })
  }
  if (pathname === '/kb-api/write' && method === 'POST') {
    if (site.writeEnabled !== true) {
      audit({ action:'write-denied', site:site.id, reason:'write disabled' })
      return send(res,403,{ ok:false,error:'write-disabled', reason:`write is disabled for site "${site.id}" (turn it on in the panel)` })
    }
    const body=postBody??{}
    const op=['create','write','rename','move','delete'].includes(body.op)?body.op:'write'
    const abs=safeResolve(siteRoot, body.path||'')
    if (!abs) return send(res,403,{ ok:false,error:'path escapes site root' })
    if (op==='delete') {
      if(!fs.existsSync(abs)) return send(res,404,{ ok:false,error:'file not found' })
      fs.unlinkSync(abs); audit({action:'delete',site:site.id,path:body.path})
      return send(res,200,{ ok:true,op,path:body.path })
    }
    if (op==='rename'||op==='move') {
      const dest=safeResolve(siteRoot, body.to||'')
      if(!dest) return send(res,403,{ ok:false,error:'target escapes site root' })
      fs.mkdirSync(path.dirname(dest),{recursive:true}); fs.renameSync(abs,dest)
      audit({action:op,site:site.id,path:body.path,to:body.to})
      return send(res,200,{ok:true,op,path:body.path,to:body.to})
    }
    const content=typeof body.content==='string'?body.content:''
    const bytes=Buffer.byteLength(content)
    if(bytes>8*1024*1024) return send(res,413,{ok:false,error:'file too large'})
    if(op==='create'&&fs.existsSync(abs)) return send(res,409,{ok:false,error:'file exists'})
    fs.mkdirSync(path.dirname(abs),{recursive:true}); fs.writeFileSync(abs,content,'utf8')
    audit({action:op,site:site.id,path:body.path,bytes})
    return send(res,200,{ok:true,op,path:body.path,bytes})
  }
  return send(res,404,{ok:false,error:`unknown op ${method} ${pathname}`})
}

function handleSiteStatic(req,res,pathname) {
  if(!pathname.startsWith('/s/')) return false
  const rest=pathname.slice(3).split('/')
  const siteId=decodeURIComponent(rest[0])
  const sub=rest.slice(1).join('/')
  const cfg=loadConfig(); const site=findSite(cfg,siteId)
  if(!site){send(res,404,'site not found','text/plain; charset=utf-8');return true}
  const abs=safeResolve(siteRootPath(site.id),sub)
  if(!abs){send(res,403,'forbidden','text/plain; charset=utf-8');return true}
  let file=abs
  if(fs.existsSync(file)&&fs.statSync(file).isDirectory()) file=path.join(file,'index.html')
  if(!fs.existsSync(file)||!fs.statSync(file).isFile()){send(res,404,'not found','text/plain; charset=utf-8');return true}
  send(res,200,fs.readFileSync(file),MIME[path.extname(file).toLowerCase()]||'application/octet-stream')
  return true
}

ensureConfig()
http.createServer(async (req,res) => {
  const cfg=loadConfig(); const {pathname,query}=parseUrl(req)
  try {
    if(pathname.startsWith('/kb-api/')) return await handleApi(req,res,cfg,pathname,query)
    if(handleSiteStatic(req,res,pathname)) return
    send(res,404,{ok:false,error:'not found'})
  } catch(err) { send(res,500,{ok:false,error:err?.message||'internal error'}) }
}).listen(PORT,HOST,()=>{
  console.log(`[kb-server v3] listening on http://${HOST}:${PORT}`)
  console.log(`[kb-server v3] ROOT=${ROOT} PERSONAL=${PERSONAL} TEAM=${TEAM}`)
  console.log(`[kb-server v3] discovered ${discoverSites(cfg=loadConfig()).length} sites`)
})
