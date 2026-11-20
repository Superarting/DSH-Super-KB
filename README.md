# DSH-Super-KB

A knowledge-base panel for [DeepSeek Harness](https://github.com/deepseek-ai/DeepSeek-Harness): browse, search, and (optionally) write into your own document stores without leaving the app — and let the agent query them during conversations.

> 中文说明见 [docs/DETAIL.zh.md](docs/DETAIL.zh.md)。服务端部署见 [kb-server/README.md](kb-server/README.md)。

---

## Three kinds of sources

| Source | Setup | Agent write | Notes |
|---|---|---|---|
| **Local folder** | zero — native directory picker | read-only | works out of the box |
| **WebDAV cloud** | URL + user + password | read-only | any WebDAV (NAS, 坚果云, AList…) |
| **Self-hosted KB** (this repo's `kb-server v3`) | deploy Docker + token + pick folder | ✅ per-folder switch | browser/search/write/publish, full control |

The first two need no server. The third needs the included `kb-server` running on your NAS/Linux host — it unlocks **agent writing with visual on/off switches**, dynamic folder discovery, and per-site permissions.

---

## Features

- **Sidebar panel** — a *Knowledge base* icon opens a full-screen panel: file tree left, preview right.
- **Sources manager** — add/edit/remove any number of sources; for self-hosted sources, pick a folder from a dropdown auto-loaded from the server.
- **Browse** — lazy tree with per-type icons (Word, Excel, PPT, PDF, Markdown, code, image, audio, video, archives…).
- **Preview** — Markdown (`[[wikilinks]]`), inline images & SVG, PDF, audio/video players, Office (DOCX/XLSX/PPTX in-process), CSV/TSV tables, Obsidian `.canvas`, Preview/Code toggle for HTML/SVG.
- **Search** — BM25-ranked full-text search (CJK bigrams + words) with path, line, snippet, score.
- **Visual write switches** — each self-hosted source card has a write on/off toggle (human-controlled). Agents can only write to folders you've enabled.
- **Agent tools** — `kb_search`, `kb_read`, `kb_list` (query); `kb_write` (write to enabled self-hosted sources); `kb_publish` (publish a page — requires human confirmation + admin token).
- **Session archive** — optionally store each completed turn as a Markdown card under a source.

---

## Install the plugin

### From a release (recommended)

1. Download the `DSH-Super-KB` bundle zip from [Releases](../../releases), unzip it (keep the whole folder including `package.json`).
2. In DeepSeek Harness → **Plugins → Install bundle**, pick that folder.

### From source

```bash
git clone https://github.com/Superarting/DSH-Super-KB.git
cd DSH-Super-KB
pnpm install
```

Then install the folder as a bundle from the Plugins view (Windows: `pnpm.cmd install`).

---

## Configure a source

### Local folder
Add source → **Local folder** → pick a directory. Nothing else needed.

### WebDAV
Add source → **WebDAV cloud** → URL, username, password, optional base path → **Test connection** → Save. Read-only.

### Self-hosted KB (agent can write)
1. Deploy `kb-server` first — see [kb-server/README.md](kb-server/README.md). In short:
   ```bash
   cd kb-server
   mkdir -p config
   # generate a token and write config/sites.json
   openssl rand -hex 24        # copy the output as "token"
   # edit docker-compose.yml volumes to point at your folders
   docker compose up -d --build
   ```
2. In the plugin: Add source → **Self-hosted KB** → fill:
   - **URL**: e.g. `http://192.168.1.10:8010` (must be reachable from the machine running DSH)
   - **Agent token**: the token from `config/sites.json`
   - **Folder / site**: pick from the dropdown (auto-loaded from the server; groups: 🌐 fixed, 👤 personal `@p/`, 👥 team `@t/`)
3. Save. A write switch appears on the source card — **default read-only**, click to enable agent writes.

Agent usage:
```js
kb_search({ query: "deployment guide", source: "kb-site-node" })
kb_write({ source: "kb-site-node", path: "notes.md", content: "# hi", op: "write" })  // only if switch is ON
```

---

## Publish (human-gated)

`kb_publish` turns a set of files into a static page served by kb-server. It **requires** `confirm: true` and an `adminToken` held only by the human — the agent cannot publish without explicit human authorization. See [kb-server/README.md](kb-server/README.md) for the publish API.

---

## Requirements

- DeepSeek Harness (Cordis plugin host) with this bundle installed.
- For self-hosted sources: a Docker-capable host for `kb-server` (Node 20 alpine image; ~zero dependencies).

## License

MIT
