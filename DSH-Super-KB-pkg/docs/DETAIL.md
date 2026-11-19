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

## Tiered memory system

The panel header's **Memory** button opens the memory manager. Memories live as Markdown files with frontmatter inside the first local source's `DSH记忆/` folder, so `kb_search` covers them like any other document:

| Tier | Folder | Visibility |
|---|---|---|
| Global | `global/` | every session |
| Workspace | `workspaces/<cwd hash>/` | that workspace only (original path kept in frontmatter `cwd`) |
| Session | `sessions/<id>/` | that session only |
| WorkBuddy | `workbuddy/` | imported read-only copies |

**Agent tools**: `memory_save` (saves; similarity gate), `memory_search` (BM25 with triple keyword weighting; superseded notes hidden by default), `memory_read`, `memory_delete`, `memory_export`, `memory_restore`.

**Injection**: the system prompt carries a bounded index of titles + keywords + paths only (default ≤1500 characters, newest first); bodies load on demand through `memory_read`. No token bloat, no WorkBuddy-style silent truncation.

**Write gate**: saving compares the note against existing memories (Jaccard, threshold 0.7 by default); a similar note returns a prompt asking for explicit confirmation, preventing fragmentation.

**Conflict resolution**: contradicting updates replace old notes through `supersedes` / `superseded-by` chains without deleting them — recall shows the latest value, history stays traceable.

**Snapshots**: imports and exports write `.snapshots/<timestamp>.json` (file manifest + SHA256) first; the UI can verify at any time; the newest 20 are kept.

## WorkBuddy memory bridge

- **Import**: reads `~/.workbuddy/user-*-personal/*.md` and `memory/*.md` into read-only copies under `workbuddy/`. Identity files (SOUL/IDENTITY/USER) are never modified.
- **Export**: DSH memories are written to `~/.workbuddy/memory/dsh-export/`, **adding files only**, using the sharding convention (keywords on line 2) so community hook-recall setups pick them up. MEMORY.md is never rewritten.
- **Settings**: `memory.workbuddy.enabled` and `memory.workbuddy.direction` (import / export / both) disable or restrict the bridge.

## Export

Export copies selected tiers to any absolute path (timestamped subfolder, no overwrites), optionally in the **WorkBuddy shard format** so exported files plug directly into WorkBuddy memory governance.

## Limits

- Text files up to 2 MiB are previewed and searched; larger files are listed but not read.
- Search walks text-like files (md/txt/csv/json/xml/yaml and source code) with per-run file-count and time budgets.
- WebDAV search streams each candidate file over the network, so large libraries are slower; progress is shown in the UI.
- Memory writes happen only inside local sources; WebDAV sources stay read-only.
- WorkBuddy imports are snapshots, not live sync; re-import when the source files change.

## Security

- All HTTP routes live under `/api/` inside Connection's authentication fence: only the authenticated owner Peer reaches them.
- Local reads are path-fenced: a request path is resolved and must stay inside the source's root, otherwise it is refused.
- WebDAV passwords go into the credential store, not the profile configuration.
- Memory reads and writes are fenced inside the memory root; `.snapshots/` is plugin-managed and cannot be removed through the delete API.
