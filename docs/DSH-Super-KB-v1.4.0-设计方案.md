# DSH-Super-KB v1.4.0 设计方案：会话绑定（Session Binding）

## 1. 概述

模仿 WorkBuddy 的 `sources.conversation_origin` 设计：把**知识库来源（Source）**与**会话（Session）**建立持久绑定关系。会话可指定一个默认来源；该会话内默认用该来源的 `kb_search/kb_read/kb_list` 工具，并可在会话内随时切换或取消绑定。

### 设计目标
1. 会话级知识库上下文：Agent 打开某会话时，不必每次都指定来源，默认就读该会话挂载的来源。
2. 支持一对多：一个来源可绑定多个会话；一个会话绑定一个默认来源，会话内可临时切换其他来源。
3. 元数据持久化：绑定关系随会话持久化，重启后保持。
4. 侧边栏/面板明确显示“当前会话来源”，支持“将本会话切换到当前来源”/“取消绑定”。

## 2. 核心数据模型

### 2.1 插件内存表（session_kb_binding）

| 字段 | 类型 | 说明 |
|---|---|---|
| session_id | string | 会话 ID，主键 |
| source_id | string | 绑定的来源 ID |
| created_at | int64 | 绑定创建时间戳 |
| updated_at | int64 | 最后修改时间戳 |

### 2.2 配置/持久化（cordis.patch.yml）

插件配置新增字段：

```yaml
- id: dsh-super-kb
  name: "dsh-super-kb"
  config:
    sources: [...]
    kb_session_bindings: {}  # { sessionId: sourceId }
```

> 也可单独放入 `cordis.patch.yml` 的插件级插入块中，避免每个会话配置都携带整个 binding 表。

### 2.3 面板 UI 变更

| 位置 | 内容 |
|---|---|
| 顶部导航栏 | 新增「本会话来源」徽章，显示当前会话绑定的来源名称；点击进入绑定管理 |
| 左侧树顶部 | 新增「设置为本会话默认来源」按钮（仅当选中某来源且当前会话未绑定或可变更时） |
| 预览面板头部 | 显示「本会话来源: <name>」，支持一键点击跳转该来源 |
| More 菜单 | 新增「设置为本会话默认来源」/「取消本会话绑定」 |

## 3. API 接口变更

### 3.1 新增代理工具（kb_tools）

不改变现有 `kb_search/kb_read/kb_list` 签名，而是在每个工具中增加可选字段：

```json
{
  "kb_search": {
    "parameters": {
      "source": {"type": "string", "optional": true, "description": "可选来源id；省略则使用当前会话绑定的来源"},
      "query": {"type": "string"},
      "top_k": {"type": "integer", "optional": true, "default": 5}
    }
  },
  "kb_read": {
    "parameters": {
      "source": {"type": "string", "optional": true},
      "path": {"type": "string"}
    }
  },
  "kb_list": {
    "parameters": {
      "source": {"type": "string", "optional": true},
      "path": {"type": "string", "default": ""}
    }
  }
}
```

### 3.2 新增宿主 API

| 接口 | 方法 | 路径 | 说明 |
|---|---|---|---|
| `kb_session_bindings` | GET | `/api/kb?op=binding_list` | 列出所有会话绑定 |
| `kb_session_binding` | GET | `/api/kb?op=binding_get&sessionId=...` | 获取会话绑定 |
| `kb_session_bind` | POST | `/api/kb?op=binding_bind` | 绑定会话来源 |
| `kb_session_unbind` | POST | `/api/kb?op=binding_unbind` | 解绑会话来源 |

### 3.3 系统提示段（systemPrompt）

新增 `kb-retrieval-binding` 章节，动态注入：

```
当前会话已绑定知识库来源：{sourceName}
可用工具：kb_search / kb_read / kb_list（未指定 source 时将自动使用本会话绑定的来源）
```

## 4. 交互流程

### 4.1 绑定来源

1. 用户在侧边栏选中某来源，点击「设置为本会话默认来源」；
2. 客户端调用 `kb_super-kb:binding_bind`（`POST /api/kb?op=binding_bind&sessionId={currentSessionId}&sourceId={selectedSourceId}`）；
3. Host 层写入 `cordis.patch.yml` 中 `dsh-super-kb` 配置的 `kb_session_bindings[sessionId] = sourceId`；
4. 面板顶部更新显示「本会话来源: <sourceName>」；预览面板同步显示。

### 4.2 取消绑定

1. 点击来源面板/预览面板上的「取消绑定」；
2. 调用 `binding_unbind`，移除 `kb_session_bindings[sessionId]`；
3. 面板顶部显示「未绑定来源」。

### 4.3 会话内切换来源

用户在侧边栏选择其他来源时，弹出确认提示：「将本会话切换到来源 X 并设为默认？」，确认后等同于重新绑定。

### 4.4 Agent 调用流程

1. Agent 调用 `kb_search({query: "..."})`（不传 source）；
2. Host 层读取当前会话绑定：`binding = bindings[sessionId]`；
3. 若绑定存在，使用 `binding.sourceId`；否则返回错误「未绑定来源，请先在知识库面板选择来源或在工具中指定 source」；
4. 执行搜索并返回结果。

## 5. 代码实现计划

### 5.1 文件清单

| 文件 | 变更内容 |
|---|---|
| `index.js` | 新增 `binding_bind`、`binding_unbind`、`binding_list`、`binding_get` 四条路由；`kb_search/kb_read/kb_list` 工具增加可选 `source` 字段；`systemPrompt.section` 新增 `kb-retrieval-binding` |
| `client.js` | KnowledgePanel 新增顶部来源徽章、MoreMenu 新增绑定菜单项、Preview 面板头部显示当前来源 |
| `package.json` | 版本 `1.3.0` → `1.4.0` |

### 5.2 关键代码片段（示例）

```js
// index.js - binding bind route
if (op === 'binding_bind') {
  const { source: sourceId } = url.searchParams.get('source') ?? ''
  const { sessionId } = JSON.parse(await request.text())
  if (!sessionId || !sourceId) return fail(400, 'bad-body', 'sessionId and sourceId required')
  const source = allSources.find(s => s.id === sourceId)
  if (!source) return fail(404, 'no-source', 'source not found')
  liveConfig.sources = liveConfig.sources || []
  liveConfig.sources[0].config = liveConfig.sources[0].config || {}
  liveConfig.sources[0].config.kb_session_bindings = liveConfig.sources[0].config.kb_session_bindings || {}
  liveConfig.sources[0].config.kb_session_bindings[sessionId] = sourceId
  await saveSources(liveConfig.sources)
  return okPayload({ ok: true, sessionId, sourceId })
}

// client.js - Preview header badge
h('div', { className: 'kb-current-source' },
  h('span', { className: 'kb-current-source-label' }, `本会话来源：${props.sourceName}`),
  h('button', { className: 'kb-btn kb-btn-sm', onClick: props.onUnbind }, '取消绑定')
)
```

## 6. 风险与边界

| 风险 | 缓解 |
|---|---|
| 绑定的来源被删除 | 删除来源时自动移除所有绑定该来源的会话绑定，并在面板提示 |
| 会话跨浏览器/设备 | 绑定存储在插件配置中（cordis.patch.yml），随配置同步 |
| 并发绑定冲突 | 最后写入胜出，写入前读取最新配置避免覆盖 |
| 旧版本插件不识别新字段 | `kb_session_bindings` 为新增字段，旧版本忽略，不影响现有功能 |

## 7. 验收计划（v1.4.0）

| 用例 | 预期结果 |
|---|---|
| 在知识库面板选择某来源并点击「设置为本会话默认来源」 | 顶部显示「本会话来源: <名称>」，预览面板同步显示 |
| 在新会话中调用 `kb_search({query: "..."})`（不传 source） | 返回该来源的搜索结果 |
| 点击「取消绑定」后再调用 `kb_search`（不传 source） | 返回错误「未绑定来源」 |
| 重启 DSH 后重新打开同一会话 | 来源绑定仍然保留 |
| 删除已绑定的来源 | 该来源的所有会话绑定自动移除，面板提示 |

## 8. 里程碑

- v1.4.0-alpha：核心 API + 绑定 UI
- v1.4.0-beta：系统提示注入 + 工具自动使用绑定来源
- v1.4.0：完整验收 + 发布