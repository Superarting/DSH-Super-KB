# kb-server v3 — DSH-Super-KB 的 NAS 服务端

纯 Node.js 标准库实现（零运行时依赖），为 DSH-Super-KB 插件提供「自建知识库」来源：
多站点浏览/检索、每站点独立写入开关、agent 按开关写入部署、静态托管。

## 特性

- **动态发现**：挂载一个父目录，其下所有一级文件夹自动成为来源（支持中文/空格名）
- **多根分组**：`/data/roots/personal/*` → `@p/xxx`，`/data/roots/team/*` → `@t/xxx`，固定目录 → `xxx`
- **写入开关**：每个站点默认只读，人在插件面板可视化切换，状态持久化到 `config/sites.json`
- **token 鉴权**：固定 token（可选），不带 token 返回 401，防止公网裸奔
- **路径围栏**：拒绝 `..` 越狱和符号链接逃逸
- **审计日志**：所有写操作记入 `config/audit.jsonl`

## 快速部署（Docker）

### 1. 准备目录

```bash
mkdir -p kb-server && cd kb-server
# 把本目录的 server-v3.js、Dockerfile、docker-compose.yml 放进来
mkdir -p config
cat > config/sites.json <<'EOF'
{
  "version": 3,
  "token": "在这里填一个长随机字符串，例如 openssl rand -hex 24 的输出",
  "overrides": {}
}
EOF
```

### 2. 修改挂载路径

编辑 `docker-compose.yml`，把 volumes 里的占位路径改成你的真实目录：

```yaml
volumes:
  # 挂一个父目录，其下每个文件夹自动成为一个来源
  - /你的/团队文件夹:/data/roots/team
  # 可选：个人文件夹根
  # - /你的/个人文件夹:/data/roots/personal
  # 可选：单个网站目录（固定站点）
  # - /你的/网站目录:/data/mysite
  - ./config:/data/config
```

改 `ports` 左边的对外端口（示例 `8010:8787`）。

### 3. 启动

```bash
docker compose up -d --build
docker logs kb-server   # 应看到 "discovered N sites"
```

### 4. 验证

```bash
curl http://你的NAS:8010/kb-api/health
# {"ok":true,"service":"kb-server","version":3}

curl -H "Authorization: Bearer 你的token" http://你的NAS:8010/kb-api/sites
# 列出所有发现的站点及写入开关状态
```

## 在插件里连接

1. DSH 知识库 → 新增来源 → **自建知识库**
2. **URL**：`http://你的NAS:8010`（公网需可达，内外网通用需自己配 DDNS/反代）
3. **token**：填 `sites.json` 里的 token
4. **文件夹/站点**：从下拉列表选（填好 URL+token 后自动加载）
5. 保存后，来源卡片上有写入开关，点了才允许 agent 写入

## API

| 端点 | 方法 | 鉴权 | 用途 |
|---|---|---|---|
| `/kb-api/health` | GET | 否 | 健康检查 |
| `/kb-api/sites` | GET | token | 列出所有站点及开关 |
| `/kb-api/sites/toggle` | POST | token | 切换写入开关 `{id, writeEnabled}` |
| `/kb-api/tree?site=X&path=` | GET | token | 列目录 |
| `/kb-api/read?site=X&path=` | GET | token | 读文件（≤2MB） |
| `/kb-api/write` | POST | token | 写文件 `{site, path, content, op}` |
| `/s/<site>/<path>` | GET | 否 | 静态托管 |

站点 id 规则：固定目录 = 目录名；个人根 = `@p/目录名`；团队根 = `@t/目录名`。URL 里注意编码（空格 `%20`、中文需 percent-encode）。

## 安全建议

- token 用长随机串（`openssl rand -hex 24`），不要复用
- 公网暴露务必带 token，或直接限制来源 IP
- 写入开关默认全关，按需逐个打开
- 不要挂载包含敏感凭据的目录

## License

MIT
