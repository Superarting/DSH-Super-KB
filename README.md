# DSH-Super-KB

A knowledge-base panel for [DeepSeek Harness](https://github.com/deepseek-ai/DeepSeek-Harness): browse and search your own document folders without leaving the app, and let the agent look them up during conversations.

> 中文说明见 [docs/DETAIL.zh.md](docs/DETAIL.zh.md)。

---

## Features

- **Sidebar panel** — a *Knowledge base* icon opens a full-screen panel: file tree on the left, preview on the right.
- **Sources** — configure any number of **local folders** (native directory picker) and **WebDAV clouds** (URL, username, password, connection test). Sources can be added, edited, or removed at any time.
- **Browse** — lazy-loading tree with per-type file icons (Word, Excel, PPT, PDF, Markdown, code, image, audio, video, archives…).
- **Preview** — Markdown rendering with `[[wikilinks]]`, images (JPEG/PNG/GIF/WebP/AVIF/BMP/ICO) and SVG inline, PDF reader, **audio / video players**, Office files (DOCX / XLSX / PPTX converted in-process, CSV & TSV as tables), Obsidian `.canvas` boards, and a **Preview / Code** toggle for HTML/SVG.
- **Search** — BM25-ranked full-text search (CJK bigrams + word terms) with path, line number, snippet, and a relevance score.
- **Attach to session** — hand a file to a running session in two ways:
  - **as a path** — the agent reads the original file in place and can follow it into neighbouring files in the same folder;
  - **as an attachment** — an uploaded copy becomes a real attachment chip in the composer.
- **Agent tools** — `kb_search`, `kb_read`, and `kb_list` let the model query your documents during any conversation.
- **Retrieval guidance** — an optional system-prompt section teaches the agent when to reach for those tools.
- **Session archive** — optionally store each completed turn as a Markdown card under `<source>/sessions/`.

---

## Install

### From a release (recommended)

1. Download the `DSH-Super-KB` bundle (the whole folder, including `package.json`).
2. In DeepSeek Harness, open **Plugins → Install bundle** and pick that folder.

### From source

```bash
git clone https://github.com/Superarting/DSH-Super-KB.git
cd DSH-Super-KB
pnpm install          # installs @deepseek-ai/schemastery
```

Then install the folder as a bundle from the Plugins view.

> **Note:** the bundle imports `@deepseek-ai/schemastery` at load time, so run
> `pnpm install` in the cloned folder **before** installing it as a bundle.
> The release archive ships the dependency pre-installed.

### CLI

```bash
dsh plugin --profile <profile> add /path/to/DSH-Super-KB
```

---

## Configure

Open the panel → **Sources** → **Add source**:

| Type | Fields | Notes |
|---|---|---|
| Local folder | absolute path | Read-only; every read is resolved and fenced inside the configured root. |
| WebDAV | URL, username, password, optional base path | Read-only (PROPFIND/GET). The password is stored as a credential record, never in configuration. |

Configuration lives in the plugin's own section and survives restarts and upgrades.

---

## Agent tools

| Tool | Purpose |
|---|---|
| `kb_search` | Search one source across text files; BM25-ranked hits with path, line, snippet, and score. |
| `kb_read` | Read one text file (up to 2 MiB) from a source. |
| `kb_list` | List a source's folder entries. |

---

## Requirements

- DeepSeek Harness **0.2.x** (uses the `dsh` bundle format with `cordis.patch.yml` and a `client` half).
- No native dependencies; the only runtime dependency is `@deepseek-ai/schemastery`.

---

## License

MIT
