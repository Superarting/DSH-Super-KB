# DSH-Super-KB

A knowledge-base panel for DeepSeek Harness: browse and search knowledge folders without leaving the app, and let the agent search them during conversations.

## What it does

- Adds a **Knowledge base** icon to the left sidebar. Click it to open the panel.
- **First use** shows a source wizard: pick a **local folder** (native directory picker) or a **WebDAV cloud** (URL, username, password, connection test). Sources can be added, edited, and removed at any time from the panel's Sources view.
- **Browse**: a lazy file tree on the left, a text/Markdown preview on the right.
- **Search**: case-insensitive full-text search across all sources, with file, line number, and context snippets.
- **Agent tools**: `kb_search` (query), `kb_read` (source, path), `kb_list` (source, path?) let the model look up your documents during any conversation.

## Sources

| Type | Fields | Notes |
|---|---|---|
| Local folder | absolute path | Read-only; every read is resolved and fenced inside the configured root. |
| WebDAV | URL, username, password, optional base path | Read-only (PROPFIND/GET). The password is stored as a credential record, never in configuration. |

Sources persist in the plugin's configuration and survive restarts and upgrades.

## Limits

- Text files up to 2 MiB are previewed and searched; larger files are listed but not read.
- Search walks text-like files (md/txt/csv/json/xml/yaml and source code) with per-run file-count and time budgets.
- WebDAV search streams each candidate file over the network, so large libraries are slower; progress is shown in the UI.
- The plugin is read-only everywhere: it never writes to your folders or the cloud.

## Security

- All HTTP routes live under `/api/` inside Connection's authentication fence: only the authenticated owner Peer reaches them.
- Local reads are path-fenced: a request path is resolved and must stay inside the source's root, otherwise it is refused.
- WebDAV passwords go into the credential store, not the profile configuration.
