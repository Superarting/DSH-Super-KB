/**
 * Client half of the DSH-Super-KB bundle.
 *
 * Registers the sidebar panel icon (`sidebar.panellist`), the main panel
 * (`main` keyed `dsh-super-kb`), and the session-file context-menu upload
 * actions. Panel layout follows the host management page: clamp(24px,4vw,48px)
 * inline inset, 28px head top inset, 960px content column, hover fenced under
 * @media(hover:hover). Plain React.createElement; styles use only --dsw-* and
 * --dsw-alias-* tokens.
 */

window.__ModuleLoader__.load({
  id: 'dsh-super-kb',
  factory(require) {
    const React = require('react')
    const h = React.createElement

    // ---------- locale ----------
    const DICTS = {
      en: {
        panel: 'Knowledge base', iconLabel: 'Knowledge base',
        wizardTitle: 'Set up your knowledge base',
        wizardIntro: 'Choose where your documents live. You can add more sources or change them any time.',
        typeLocal: 'Local folder', typeLocalDesc: 'A folder on this machine',
        typeWebdav: 'WebDAV cloud', typeWebdavDesc: 'Jianguoyun, Synology, Alist and other WebDAV services',
        pickFolder: 'Choose folder…', pathLabel: 'Folder path', nameLabel: 'Display name',
        urlLabel: 'WebDAV URL', usernameLabel: 'Username', passwordLabel: 'Password',
        basePathLabel: 'Base path (optional)', testConn: 'Test connection', testing: 'Testing…',
        connOk: 'Connection ok ({n} entries)', connFailed: 'Connection failed',
        saveSource: 'Save source', saving: 'Saving…', cancel: 'Cancel',
        confirmDelete: 'Delete source "{name}"? Its files are not touched.',
        delete: 'Delete', edit: 'Edit', sources: 'Sources', sourcesTitle: 'Knowledge sources',
        addSource: 'Add source', noSources: 'No sources configured yet.',
        statusOk: 'Ready', statusMissing: 'Folder missing', statusNotFolder: 'Not a folder',
        statusNeedsPassword: 'Password required', removePassword: 'Remove saved password',
        httpWarning: 'Plain HTTP: the password would travel unencrypted.',
        readOnlyNotice: 'Sources are managed by this profile\'s configuration; editing is unavailable here.',
        browse: 'Browse', search: 'Search', searchPlaceholder: 'Search in this source…',
        searchHint: 'Type a query and press Enter to search this source.',
        searching: 'Searching…', noHits: 'No matches.',
        searchTruncated: 'Results truncated (time budget reached).', scanned: '{n} files scanned',
        emptyFolder: 'This folder is empty.', loading: 'Loading…', loadFailed: 'Load failed',
        notTextFile: 'Only text files can be previewed.', fileTooLarge: 'Over 10 MB; preview unavailable.',
        heicUnsupported: 'HEIC/HEIF cannot be previewed in the browser; convert to JPG/PNG or use Reveal in folder.',
        back: 'Back', savedToast: 'Saved', saveFailed: 'Save failed',
        uploadToKb: 'Upload to knowledge base', uploadedTo: 'Uploaded to {name} as {path}',
        uploadFailed: 'Upload failed', uploadReadFailed: 'Original file unavailable',
        namePlaceholder: 'e.g. Product docs', urlPlaceholder: 'https://dav.jianguoyun.com/dav/',
        // new menu
        newMenu: 'New', newDocMd: 'Document (.md)', newDocCsv: 'Spreadsheet (.csv)',
        uploadImport: 'Upload / Import', addLink: 'Add link', newFolder: 'New folder',
        newFolderName: 'Folder name', newDocName: 'Document name', linkUrl: 'URL',
        linkName: 'Link title', create: 'Create', invalidName: 'Invalid name',
        // more menu
        more: 'More actions', addToTask: 'Add to task', rename: 'Rename', copyLink: 'Copy link',
        openFolder: 'Reveal in folder', moveTo: 'Move to…', deleteFile: 'Delete',
        renamed: 'Renamed to {path}', moved: 'Moved to {path}', deleted: 'Deleted {path}',
        copied: 'Link copied', opFailed: 'Operation failed', deleteConfirm: 'Delete "{name}"?',
        moveToPrompt: 'Move to folder (path inside the source, empty = root):',
        renamePrompt: 'New name:', taskAdded: 'Draft prepared in composer', taskNoComposer: 'No composer available',
        // diagnostics
        diagnostics: 'Diagnostics', diagSources: 'Sources', diagFiles: 'Files', diagStatus: 'Status',
        diagGuidance: 'Retrieval guidance', diagArchive: 'Session archiving', diagIndex: 'Search index entries',
        diagGenerated: 'Generated at', on: 'On', off: 'Off',
        // workbuddy-style shell
        clear: 'Clear', itemsCount: '{n} items', hitsCount: '{n} matches',
        emptyTreeTitle: 'Nothing here yet', emptyTreeDesc: 'Use New to create a document, or upload files into this folder.',
        emptySourceTitle: 'This source is empty', emptySourceDesc: 'Add files to the folder or create a new document.',
        noHitsTitle: 'No matches', noHitsDesc: 'Try different keywords, or search another source.',
        confirmDeleteTitle: 'Delete confirmation', confirmDeleteFile: 'Delete “{name}”? (moves to Trash — undoable)',
        undo: 'Undo', trashDeleted: 'Moved to Trash', trashRestored: 'Restored',
        confirm: 'Confirm', retry: 'Retry',
        selectHint: 'Select a document on the left to preview it here.',
        previewUnsupported: 'Inline preview is not available for this type; use Reveal in folder to open it with the system app.',
        pickSession: 'Recent sessions', noSessions: 'No recent sessions',
        newTask: 'New task',
        addFile: 'Add file', localFile: 'Local file…',
        attached: 'Attached {name} to the session', attachFailed: 'Attach failed',
        rootFolder: 'Source root', moveHere: 'Move here', preview: 'Preview', code: 'Code', textView: 'Text',
        resizeSidebar: 'Resize sidebar', resizeSidebarHint: 'Drag to resize · double-click to reset',
        scriptsTitle: 'Toggle scripts in this preview',
        readKbFile: 'Please read the knowledge-base file',
        attachAsPath: 'Attach as path', attachAsFile: 'Attach as file',
        attachAsPathHint: 'Agent reads the original file in place',
        attachAsFileHint: 'Upload a copy as a session attachment',
        // memory view
        memory: 'Memory', memAll: 'All', memGlobal: 'Global', memWorkspace: 'Workspace', memSession: 'Session',
        memSearchPlaceholder: 'Search memories…', memNew: 'New', memExport: 'Export', memSnapshots: 'Snapshots',
        memExportTitle: 'Export memories to a local folder (empty exports into the knowledge base memory folder)',
        memExportDestPlaceholder: '/absolute/path/to/folder (optional)',
        memExportSharded: 'WorkBuddy shard format (keywords on line 2)',
        memExportGo: 'Export', memExporting: 'Exporting…',
        memExportDone: 'Export finished', memExportHint: 'Exports go to a timestamped subfolder; existing files are never overwritten. A snapshot is taken first.',
        memSnapshotsTitle: 'Snapshots (auto-created before bulk operations; newest 20 kept)',
        memNoSnapshots: 'No snapshots yet.', memRestore: 'Verify/rollback', memRestoreDone: 'Snapshot verified',
        memSavedToast: 'Memory saved', memDeletedToast: 'Memory deleted', memDeleteConfirm: 'Delete memory',
        memEmpty: 'No memories yet. Save the first one with the memory_save tool or "New".',
        memSuperseded: 'Superseded', memReadonly: 'WorkBuddy import · read-only',
        memTitlePlaceholder: 'Title', memKeywordsPlaceholder: 'Keywords (comma separated)',
        memSummaryPlaceholder: 'One-sentence summary', memCwdPlaceholder: 'Workspace absolute path (e.g. /Users/you/project)',
        memSaving: 'Saving…',
        wbMissing: 'WorkBuddy not detected (~/.workbuddy does not exist).',
        wbStatus: 'WorkBuddy memory folder', wbMemoryFiles: 'memory files', wbPersonal: 'identity files',
        wbImport: 'Import from WorkBuddy', wbImporting: 'Importing…', wbImportDone: 'Import finished',
        wbExport: 'Export to WorkBuddy', wbExporting: 'Exporting…', wbExportDone: 'Export finished',
        wbBridgeHint: 'Imports are read-only copies (identity files are never modified); exports only add files under ~/.workbuddy/memory/dsh-export/ following the sharding convention (keywords on line 2); MEMORY.md is never rewritten.',
      },
      zh: {
        panel: '知识库', iconLabel: '知识库',
        wizardTitle: '配置你的知识库',
        wizardIntro: '选择文档存放位置。之后可以随时新增或修改来源。',
        typeLocal: '本地文件夹', typeLocalDesc: '本机上的一个文件夹',
        typeWebdav: 'WebDAV 云盘', typeWebdavDesc: '坚果云、群晖、Alist 等支持 WebDAV 的网盘',
        pickFolder: '选择文件夹…', pathLabel: '文件夹路径', nameLabel: '显示名称',
        urlLabel: 'WebDAV 地址', usernameLabel: '用户名', passwordLabel: '密码',
        basePathLabel: '基础路径(可选)', testConn: '测试连接', testing: '测试中…',
        connOk: '连接成功({n} 个条目)', connFailed: '连接失败',
        saveSource: '保存来源', saving: '保存中…', cancel: '取消',
        confirmDelete: '删除来源“{name}”?不会改动其文件。',
        delete: '删除', edit: '编辑', sources: '来源', sourcesTitle: '知识来源',
        addSource: '新增来源', noSources: '还没有配置任何来源。',
        statusOk: '就绪', statusMissing: '文件夹不存在', statusNotFolder: '不是文件夹',
        statusNeedsPassword: '需要密码', removePassword: '清除已保存的密码',
        httpWarning: '使用明文 HTTP:密码将不加密传输。',
        readOnlyNotice: '来源由当前 profile 的配置管理,此处不可编辑。',
        browse: '浏览', search: '搜索', searchPlaceholder: '在此来源中搜索…',
        searchHint: '输入关键词并按回车,搜索当前来源。',
        searching: '搜索中…', noHits: '没有匹配结果。',
        searchTruncated: '结果已截断(达到时间预算)。', scanned: '已扫描 {n} 个文件',
        emptyFolder: '此文件夹为空。', loading: '加载中…', loadFailed: '加载失败',
        notTextFile: '仅文本文件可以预览。', fileTooLarge: '超过 10 MB，无法预览。',
        heicUnsupported: '浏览器无法内嵌预览 HEIC/HEIF，请转换为 JPG/PNG 或用"打开文件夹"查看。',
        back: '返回', savedToast: '已保存', saveFailed: '保存失败',
        uploadToKb: '上传到知识库', uploadedTo: '已上传到 {name},文件名 {path}',
        uploadFailed: '上传失败', uploadReadFailed: '原文件不可用',
        namePlaceholder: '例如:产品文档', urlPlaceholder: 'https://dav.jianguoyun.com/dav/',
        newMenu: '新建', newDocMd: '新建文档 (.md)', newDocCsv: '新建表格 (.csv)',
        uploadImport: '上传 / 导入', addLink: '添加链接', newFolder: '新建文件夹',
        newFolderName: '文件夹名称', newDocName: '文档名称', linkUrl: '链接地址',
        linkName: '链接标题', create: '创建', invalidName: '名称无效',
        more: '更多操作', addToTask: '添加到任务', rename: '重命名', copyLink: '复制链接',
        openFolder: '打开文件夹', moveTo: '移动到…', deleteFile: '删除',
        renamed: '已重命名为 {path}', moved: '已移动到 {path}', deleted: '已删除 {path}',
        copied: '链接已复制', opFailed: '操作失败', deleteConfirm: '删除“{name}”?',
        moveToPrompt: '移动到文件夹(来源内路径,留空为根目录):',
        renamePrompt: '新名称:', taskAdded: '已在输入框生成草稿', taskNoComposer: '无可用的输入框',
        diagnostics: '诊断', diagSources: '来源', diagFiles: '文件数', diagStatus: '状态',
        diagGuidance: '检索引导', diagArchive: '会话归档', diagIndex: '搜索索引条目',
        diagGenerated: '生成时间', on: '开', off: '关',
        clear: '清除', itemsCount: '{n} 个条目', hitsCount: '共 {n} 条结果',
        emptyTreeTitle: '这里还没有内容', emptyTreeDesc: '用“新建”创建文档，或把文件上传到这个文件夹。',
        emptySourceTitle: '此来源为空', emptySourceDesc: '向文件夹添加文件，或新建一个文档。',
        noHitsTitle: '没有匹配结果', noHitsDesc: '换个关键词试试，或切换到其它来源搜索。',
        confirmDeleteTitle: '删除确认', confirmDeleteFile: '删除“{name}”？（移入回收站，可撤销）',
        undo: '撤销', trashDeleted: '已移入回收站', trashRestored: '已恢复原位',
        confirm: '确认', retry: '重试',
        selectHint: '在左侧选择文档，这里将展示预览。',
        previewUnsupported: '此类型暂不支持内嵌预览，可点“打开文件夹”用系统应用查看。',
        pickSession: '最近会话', noSessions: '暂无最近会话',
        newTask: '新任务',
        addFile: '添加文件', localFile: '本地文件…',
        attached: '已将 {name} 附加到会话', attachFailed: '附加失败',
        rootFolder: '来源根目录', moveHere: '移动到此处', preview: '预览', code: '代码', textView: '文本',
        resizeSidebar: '调整侧栏宽度', resizeSidebarHint: '拖动调整宽度 · 双击恢复默认',
        scriptsTitle: '在此预览中启用/停用脚本',
        readKbFile: '请阅读知识库文件',
        attachAsPath: '以路径引用附加', attachAsFile: '以附件形式附加',
        attachAsPathHint: 'Agent 原地读取知识库原文件',
        attachAsFileHint: '上传副本作为会话附件',
        // memory view
        memory: '记忆', memAll: '全部', memGlobal: '全局', memWorkspace: '工作区', memSession: '会话',
        memSearchPlaceholder: '搜索记忆…', memNew: '新建', memExport: '导出', memSnapshots: '快照',
        memExportTitle: '导出记忆到本地路径（留空则导出到知识库记忆目录）',
        memExportDestPlaceholder: '/absolute/path/to/folder（可选）',
        memExportSharded: 'WorkBuddy 分片格式（第 2 行 keywords）',
        memExportGo: '导出', memExporting: '导出中…',
        memExportDone: '导出完成', memExportHint: '导出到时间戳子目录，不覆盖已有文件；导出前自动创建快照。',
        memSnapshotsTitle: '快照（批量操作前自动创建，保留最近 20 个）',
        memNoSnapshots: '暂无快照。', memRestore: '校验/回滚', memRestoreDone: '快照校验完成',
        memSavedToast: '记忆已保存', memDeletedToast: '记忆已删除', memDeleteConfirm: '删除记忆',
        memEmpty: '暂无记忆。用 memory_save 工具或点「新建」保存第一条记忆。',
        memSuperseded: '已被取代', memReadonly: 'WorkBuddy 导入 · 只读',
        memTitlePlaceholder: '标题', memKeywordsPlaceholder: '关键词（逗号分隔）',
        memSummaryPlaceholder: '一句话摘要', memCwdPlaceholder: '工作区绝对路径（如 /Users/you/project）',
        memSaving: '保存中…',
        wbMissing: '未检测到 WorkBuddy（~/.workbuddy 不存在）。',
        wbStatus: 'WorkBuddy 记忆目录', wbMemoryFiles: 'memory 文件', wbPersonal: '身份文件',
        wbImport: '从 WorkBuddy 导入', wbImporting: '导入中…', wbImportDone: '导入完成',
        wbExport: '导出到 WorkBuddy', wbExporting: '导出中…', wbExportDone: '导出完成',
        wbBridgeHint: '导入为只读副本（身份文件永不修改）；导出仅新增文件到 ~/.workbuddy/memory/dsh-export/，遵守 sharding 约定（第 2 行 keywords），绝不改写 MEMORY.md。',
      },
    }
    let currentLocale = 'zh'
    function t(key, vars) {
      let text = (DICTS[currentLocale] && DICTS[currentLocale][key]) ?? DICTS.en[key] ?? key
      if (vars) for (const [k, v] of Object.entries(vars)) text = text.replace(`{${k}}`, String(v))
      return text
    }

    // ---------- styles (host page patterns; tokens only) ----------
    const css = `
/* Page shell: the host mounts main panels inside .mainPanel (flex column,
   flex:1, min-height:0). An absolutely-filled inner layer is the only sizing
   that survives every host wrapper, and it keeps the sidebar background
   bleeding to the very top edge. */
.kb-page{position:relative;flex:1;min-width:0;min-height:0;box-sizing:border-box;color:var(--dsw-alias-label-primary);font-size:13px}
.kb-page-fill{position:absolute;inset:0;display:flex;box-sizing:border-box;overflow:hidden}
.kb-right{flex:1;display:flex;flex-direction:column;min-width:0;box-sizing:border-box;padding:0 24px;background:var(--dsw-alias-bg-base);overflow:hidden}
.kb-head{display:flex;align-items:center;gap:8px;width:100%;max-width:none;padding-top:80px;padding-bottom:12px;box-sizing:border-box;flex:none}
.kb-head-title{margin:0;font-size:20px;font-weight:500;line-height:28px}
.kb-head-space{flex:1}
.kb-body{flex:1;display:flex;min-height:0;width:100%}
.kb-btn{appearance:none;display:inline-flex;align-items:center;justify-content:center;gap:6px;height:32px;border:0;background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary);border-radius:var(--dsw-radius-md);padding:0 12px;font-size:13px;line-height:20px;cursor:pointer}
@media (hover: hover){ .kb-btn:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover)} }
.kb-btn:disabled{opacity:.5;cursor:default}
.kb-btn-primary{background:var(--dsw-alias-brand-primary);color:#fff}
@media (hover: hover){ .kb-btn-primary:hover:not(:disabled){background:var(--dsw-alias-button-primary-hover,var(--dsw-alias-brand-primary))} }
.kb-btn-danger{color:var(--dsw-alias-state-error-primary)}
.kb-btn-sm{height:26px;padding:0 10px;font-size:12px;border-radius:var(--dsw-radius-sm)}
.kb-icon-btn{display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;flex:none;border:0;border-radius:var(--dsw-radius-sm);background:transparent;color:var(--dsw-alias-label-caption);cursor:pointer}
@media (hover: hover){ .kb-icon-btn:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover)} }
/* Sidebar: #f5f5f5 full-bleed column (covers head top strip), default 240px, drag-resizable.
   The negative page margin lets the sidebar own the full column height. */
.kb-side{width:var(--kb-side-width,240px);min-width:180px;max-width:480px;display:flex;flex-direction:column;min-height:0;flex:none;background:var(--dsw-alias-sidebar-fill,#f5f5f5);border-right:1px solid var(--dsw-alias-border-l1)}
.kb-side-top{padding:80px 10px 4px;flex:none}
.kb-side-scroll{flex:1;overflow:auto;padding:0 10px 10px;min-height:0}
.kb-side-drag{flex:none;width:8px;margin-left:-8px;cursor:col-resize;position:relative;z-index:2}
.kb-side-drag::before{content:'';position:absolute;top:50%;left:1px;width:3px;height:26px;transform:translateY(-50%);border-radius:3px;background:var(--dsw-alias-border-l1);opacity:.7;transition:background .15s,opacity .15s}
.kb-side-drag:hover::before{background:var(--dsw-alias-brand-primary);opacity:1}
.kb-side-drag[data-dragging]{background:var(--dsw-alias-brand-primary);opacity:.35}
.kb-side-drag[data-dragging]::before{background:var(--dsw-alias-brand-primary);opacity:1}
.kb-inline-rename{font:inherit;font-size:13px;color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-layer1);border:0;border-bottom:1px solid var(--dsw-alias-brand-primary);outline:0;padding:0 2px;width:70%;min-width:90px;border-radius:2px}
.kb-main{flex:1;display:flex;flex-direction:column;min-width:0;min-height:0;box-sizing:border-box;background:var(--dsw-alias-bg-base);overflow:hidden}
.kb-toolbar{display:flex;gap:8px;align-items:center;padding:10px 14px;border-bottom:1px solid var(--dsw-alias-border-l1)}
.kb-input{appearance:none;height:32px;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-base);color:var(--dsw-alias-label-primary);border-radius:var(--dsw-radius-md);padding:0 10px;font-size:13px;min-width:0}
.kb-input:focus{outline:none;border-color:var(--dsw-alias-brand-primary)}
.kb-search-input{flex:1}
.kb-content{flex:1;min-height:0;overflow:auto;padding:14px 18px;white-space:pre-wrap;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:12px;line-height:1.55}
.kb-md{white-space:normal;font-family:inherit;font-size:13px;line-height:1.6}
.kb-wikilink{color:var(--dsw-alias-brand-primary);cursor:pointer;text-decoration:none;background:none;border:0;padding:0;font:inherit}
.kb-wikilink:hover{text-decoration:underline}
/* Tree rows: fixed 32px height so hover never shifts layout; the more button
   reserves its slot invisibly to keep every row the same width behavior. */
.kb-tree-row{display:flex;align-items:center;height:32px;padding:0 6px;border-radius:var(--dsw-radius-sm);cursor:pointer;user-select:none;white-space:nowrap}
.kb-tree-caret{flex:none;width:20px;text-align:center;font-size:14px;line-height:1;color:var(--dsw-alias-label-secondary);margin-right:2px}
@media (hover: hover){ .kb-tree-row:hover{background:var(--dsw-alias-interactive-bg-hover)} }
.kb-tree-row-active{background:var(--dsw-alias-interactive-bg-active,var(--dsw-alias-interactive-bg-hover))}
.kb-tree-row:focus-visible{outline:1px solid var(--dsw-alias-brand-primary);outline-offset:-1px}
.kb-tree-name{overflow:hidden;text-overflow:ellipsis;flex:1;min-width:0}
.kb-tree-more{display:none;flex:none;width:24px;height:24px;margin-left:2px}
.kb-tree-hit{width:24px;height:24px;flex:none}
@media (hover: hover){ .kb-tree-row:hover .kb-tree-more{display:inline-flex} }
.kb-tree-row[data-menu-open] .kb-tree-more{display:inline-flex}
.kb-badge{font-size:10px;color:var(--dsw-alias-label-secondary);border:1px solid var(--dsw-alias-border-l1);border-radius:var(--dsw-radius-sm);padding:0 4px;flex:none}
.kb-hint{color:var(--dsw-alias-label-secondary);font-size:12px;padding:10px 14px}
.kb-wizard{width:100%;max-width:460px;margin:0 auto;padding:32px 0 48px;display:flex;flex-direction:column;gap:12px}
.kb-wizard-title{margin:0;font-size:20px;font-weight:500;line-height:28px}
.kb-wizard-intro{color:var(--dsw-alias-label-secondary);font-size:13px;line-height:20px}
.kb-type-row{display:flex;flex-direction:column;gap:4px;border:1px solid var(--dsw-alias-border-l2);border-radius:var(--dsw-radius-md);padding:12px 14px;cursor:pointer;background:var(--dsw-alias-bg-layer-1)}
@media (hover: hover){ .kb-type-row:hover{background:var(--dsw-alias-interactive-bg-hover)} }
.kb-type-row-selected{border-color:var(--dsw-alias-brand-primary);outline:1px solid var(--dsw-alias-brand-primary)}
.kb-type-name{font-weight:500;font-size:14px;line-height:22px}
.kb-type-desc{color:var(--dsw-alias-label-secondary);font-size:12px}
.kb-form{display:flex;flex-direction:column;gap:8px}
.kb-form label{font-size:12px;color:var(--dsw-alias-label-secondary);display:flex;flex-direction:column;gap:4px}
.kb-form-row{display:flex;gap:8px;align-items:center}
.kb-status{font-size:12px}
.kb-status-ok{color:var(--dsw-alias-state-success-primary)}
.kb-status-warn{color:var(--dsw-alias-state-warn-primary)}
.kb-status-error{color:var(--dsw-alias-state-error-primary)}
/* Sources view: diagnostics-style left-aligned rows on one surface. */
.kb-sources{flex:1;overflow:auto;padding:8px 14px}
.kb-source-row{display:flex;align-items:center;gap:10px;width:100%;padding:10px 12px;border:0;border-bottom:1px solid var(--dsw-alias-border-l1);background:transparent;text-align:left}
.kb-source-row:last-child{border-bottom:0}
.kb-source-main{flex:1;min-width:0}
.kb-source-name{font-weight:500;font-size:14px;line-height:22px}
.kb-source-meta{color:var(--dsw-alias-label-secondary);font-size:12px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.kb-sources-foot{display:flex;gap:8px;align-items:center;padding:12px 14px;border-top:1px solid var(--dsw-alias-border-l1)}
.kb-hit{display:flex;flex-direction:column;gap:2px;padding:7px 10px;border:0;border-radius:var(--dsw-radius-sm);margin:0;cursor:pointer;background:transparent}
@media (hover: hover){ .kb-hit:hover{background:var(--dsw-alias-interactive-bg-hover)} }
.kb-hit:focus-visible{outline:1px solid var(--dsw-alias-brand-primary);outline-offset:-1px}
.kb-hit-path{font-size:13px;font-weight:500}
.kb-hit-line{color:var(--dsw-alias-brand-primary);font-size:11px;margin-left:6px}
.kb-hit-score{color:var(--dsw-alias-label-secondary);font-size:11px;margin-left:6px}
.kb-hit-snippet{color:var(--dsw-alias-label-secondary);font-size:12px;margin-top:3px}
.kb-toast{position:absolute;top:80px;right:24px;background:var(--dsw-alias-bg-overlay);border:1px solid var(--dsw-alias-border-l2);border-radius:var(--dsw-radius-md);padding:8px 14px;font-size:13px;box-shadow:0 4px 16px rgba(0,0,0,.2);z-index:20}
.kb-crumb{color:var(--dsw-alias-label-secondary);font-size:12px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.kb-crumb-path{display:flex;align-items:center;gap:2px;min-width:0;overflow:hidden;flex:1}
.kb-crumb-seg{border:0;background:transparent;padding:2px 4px;border-radius:4px;font-size:12px;color:var(--dsw-alias-label-secondary);cursor:pointer;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:180px}
.kb-crumb-seg:hover{color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-layer2)}
.kb-crumb-here{font-size:13px;color:var(--dsw-alias-label-primary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:260px}
/* Popups: white overlay panel, radius-md, soft elevation; fixed positioning
   computed against the anchor box. New-menu form mirrors host modal forms. */
.kb-pop{position:fixed;z-index:60;min-width:200px;background:#fff;border:1px solid var(--dsw-alias-border-l1);border-radius:var(--dsw-radius-md);box-shadow:0 4px 16px rgba(0,0,0,.08),0 1px 3px rgba(0,0,0,.05);padding:4px}
[data-theme='dark'] .kb-pop,.dark .kb-pop{background:var(--dsw-alias-bg-overlay)}
.kb-pop-item{display:flex;align-items:center;gap:8px;width:100%;border:0;background:transparent;color:var(--dsw-alias-label-primary);border-radius:var(--dsw-radius-sm);padding:7px 10px;font-size:13px;cursor:pointer;text-align:left}
@media (hover: hover){ .kb-pop-item:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover)} }
.kb-pop-item:disabled{opacity:.5;cursor:default}
.kb-pop-item-danger{color:var(--dsw-alias-state-error-primary)}
.kb-pop-sep{height:1px;background:var(--dsw-alias-border-l1);margin:4px 6px}
/* New-menu inline form: host modal styling — 13px labels, 32px fields,
   footer actions right-aligned inside the panel. */
.kb-pop-form{display:flex;flex-direction:column;gap:10px;padding:12px;min-width:260px}
.kb-pop-form .kb-pop-form-title{margin:0;font-size:14px;font-weight:500;line-height:22px}
.kb-modal-back{position:fixed;inset:0;background:rgba(0,0,0,.35);z-index:50;display:flex;align-items:center;justify-content:center}
.kb-modal{background:var(--dsw-alias-bg-overlay);border:1px solid var(--dsw-alias-border-l2);border-radius:var(--dsw-radius-md);box-shadow:0 12px 40px rgba(0,0,0,.3);padding:16px;min-width:320px;max-width:460px;display:flex;flex-direction:column;gap:12px}
.kb-modal-title{margin:0;font-size:15px;font-weight:500;line-height:22px}
.kb-modal-actions{display:flex;gap:8px;justify-content:flex-end}
.kb-diag-row{display:flex;align-items:center;gap:10px;padding:8px 10px;border-bottom:1px solid var(--dsw-alias-border-l1)}
.kb-diag-key{width:180px;color:var(--dsw-alias-label-secondary);flex:none}
/* WorkBuddy library-shell pieces: segmented tabs + right search group on a
   toolbar, one bordered rounded content surface below, footer count line. */
.kb-main-bar{display:flex;align-items:center;gap:16px;padding:4px 2px 12px;flex:none}
.kb-main-bar-space{flex:1;min-width:0}
.kb-seg{display:inline-flex;gap:2px;padding:2px;border-radius:var(--dsw-radius-md);background:var(--dsw-alias-bg-layer-2)}
.kb-seg-btn{height:26px;min-width:64px;border:0;background:transparent;color:var(--dsw-alias-label-secondary);border-radius:var(--dsw-radius-sm);padding:0 12px;font-size:13px;line-height:20px;cursor:pointer}
.kb-seg-btn[data-active]{background:var(--dsw-alias-bg-overlay);color:var(--dsw-alias-label-primary);font-weight:500;box-shadow:0 1px 3px rgba(0,0,0,.08)}
.kb-search-box{display:flex;align-items:center;gap:2px;flex:none;width:220px;height:32px;border:1px solid var(--dsw-alias-border-l1);border-radius:var(--dsw-radius-md);background:var(--dsw-alias-bg-layer-2);padding:0 4px 0 8px;transition:border-color .15s}
.kb-search-box:focus-within{border-color:var(--dsw-alias-brand-primary);background:var(--dsw-alias-bg-base)}
.kb-search-box input{flex:1;min-width:0;border:0;background:transparent;color:var(--dsw-alias-label-primary);font-size:13px;outline:none}
.kb-search-clear{display:inline-flex;align-items:center;justify-content:center;width:20px;height:20px;border:0;border-radius:var(--dsw-radius-sm);background:transparent;color:var(--dsw-alias-label-caption);cursor:pointer;font-size:13px;line-height:1}
@media (hover: hover){ .kb-search-clear:hover{background:var(--dsw-alias-interactive-bg-hover)} }
.kb-surface{flex:1;min-height:0;display:flex;flex-direction:column;border:1px solid var(--dsw-alias-border-l1);border-radius:var(--dsw-radius-md);background:var(--dsw-alias-bg-layer-1);overflow:hidden}
.kb-surface-foot{flex:none;display:flex;align-items:center;gap:8px;padding:8px 14px;border-top:1px solid var(--dsw-alias-border-l1);font-size:12px;color:var(--dsw-alias-label-secondary)}
.kb-empty{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;color:var(--dsw-alias-label-secondary);text-align:center;padding:24px}
.kb-empty-icon{opacity:.3}
.kb-empty-desc{font-size:12px;max-width:320px;line-height:18px}
.kb-hit-mark{color:var(--dsw-alias-brand-primary);background:transparent;font-weight:500}
.kb-hit-main{display:flex;align-items:center;gap:8px;min-width:0}
.kb-hit-name{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:13px;font-weight:500}
.kb-hit-dir{color:var(--dsw-alias-label-caption);font-size:11px;font-weight:400;margin-left:6px}
/* Sidebar source switcher chips (library-space tabs). */
.kb-src-chips{display:flex;gap:4px;flex-wrap:wrap;padding:0 0 8px}
.kb-src-chip{height:24px;border:1px solid var(--dsw-alias-border-l1);background:transparent;color:var(--dsw-alias-label-secondary);border-radius:var(--dsw-radius-sm);padding:0 8px;font-size:12px;cursor:pointer;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
@media (hover: hover){ .kb-src-chip:hover{background:var(--dsw-alias-interactive-bg-hover)} }
.kb-src-chip[data-active]{border-color:var(--dsw-alias-brand-primary);color:var(--dsw-alias-label-primary);font-weight:500}
.kb-pop-confirm{display:flex;flex-direction:column;gap:8px;padding:10px;min-width:220px}
.kb-pop-confirm-text{font-size:13px;line-height:20px}
.kb-attach-mode{display:flex;flex-direction:column;gap:2px}
.kb-pop-item-active{background:var(--dsw-alias-interactive-bg-active,var(--dsw-alias-interactive-bg-hover))}
.kb-pop-item-hint{display:block;font-size:11px;line-height:15px;color:var(--dsw-alias-label-caption);margin-top:1px;white-space:normal}
.kb-pop-item .kb-pop-item-hint{flex:none;max-width:170px;text-align:right}
.kb-move-tree{max-height:280px;overflow:auto;border:1px solid var(--dsw-alias-border-l1);border-radius:var(--dsw-radius-sm);padding:4px}
.kb-view-toggle{margin-left:auto;display:inline-flex;gap:2px;padding:2px;border-radius:var(--dsw-radius-sm);background:var(--dsw-alias-bg-layer-2)}
`
    let styleElement
    function ensureStyles() {
      if (styleElement !== undefined) return
      styleElement = document.createElement('style')
      styleElement.textContent = css
      document.head.appendChild(styleElement)
    }

    // ---------- data access ----------
    async function api(op, params = {}) {
      const query = new URLSearchParams({ op, ...Object.fromEntries(Object.entries(params).filter(([, v]) => v !== undefined && v !== '')) })
      const response = await fetch(`api/kb?${query}`, { headers: { accept: 'application/json' } })
      const payload = await response.json().catch(() => ({ ok: false, code: 'bad-response', message: `HTTP ${response.status}` }))
      if (!payload.ok) throw new Error(payload.message ?? payload.code ?? 'request failed')
      return payload
    }
    async function postKb(op, body) {
      const response = await fetch(`api/kb?op=${op}`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body),
      })
      const payload = await response.json().catch(() => ({ ok: false, message: `HTTP ${response.status}` }))
      if (!payload.ok) throw new Error(payload.message ?? 'request failed')
      return payload
    }
    async function saveSources(sources) {
      return postKb('save', { sources })
    }

    // ---------- icons: folders & actions are line glyphs; documents are colored ----------
    const line = (paths, size = 14) => h('svg', { width: size, height: size, viewBox: '0 0 16 16', fill: 'none', stroke: 'currentColor', strokeWidth: 1.4, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true, style: { flex: 'none' } },
      paths.map((d, i) => h('path', { key: i, d })))
    const filled = (paths, color, size = 14) => h('svg', { width: size, height: size, viewBox: '0 0 16 16', fill: color, 'aria-hidden': true, style: { flex: 'none' } },
      paths.map((d, i) => h('path', { key: i, d })))
    const Icon = {
      folder: () => line(['M1.5 4a1 1 0 0 1 1-1h3.2l1.6 1.8H14a1 1 0 0 1 1 1V12a1 1 0 0 1-1 1H2.5a1 1 0 0 1-1-1V4Z']),
      folderOpen: () => line(['M1.5 4a1 1 0 0 1 1-1h3.2l1.6 1.8H14v2', 'M1.5 4v8a1 1 0 0 0 1 1h11.2l1.8-6.2H3.2L1.5 12.9']),
      docMd: () => filled(['M3 1.5h6.2L13.5 5.8V14a.7.7 0 0 1-.7.7H3a.7.7 0 0 1-.7-.7V2.2a.7.7 0 0 1 .7-.7Z'], '#2f7ed8'),
      docCsv: () => filled(['M3 1.5h6.2L13.5 5.8V14a.7.7 0 0 1-.7.7H3a.7.7 0 0 1-.7-.7V2.2a.7.7 0 0 1 .7-.7Z'], '#2e9e5b'),
      docTxt: () => filled(['M3 1.5h6.2L13.5 5.8V14a.7.7 0 0 1-.7.7H3a.7.7 0 0 1-.7-.7V2.2a.7.7 0 0 1 .7-.7Z'], '#8a8f98'),
      docCode: () => filled(['M3 1.5h6.2L13.5 5.8V14a.7.7 0 0 1-.7.7H3a.7.7 0 0 1-.7-.7V2.2a.7.7 0 0 1 .7-.7Z'], '#b06ad6'),
      docJson: () => filled(['M3 1.5h6.2L13.5 5.8V14a.7.7 0 0 1-.7.7H3a.7.7 0 0 1-.7-.7V2.2a.7.7 0 0 1 .7-.7Z'], '#e0a03a'),
      docHtml: () => filled(['M3 1.5h6.2L13.5 5.8V14a.7.7 0 0 1-.7.7H3a.7.7 0 0 1-.7-.7V2.2a.7.7 0 0 1 .7-.7Z'], '#d8564f'),
      docImg: () => filled(['M3 1.5h6.2L13.5 5.8V14a.7.7 0 0 1-.7.7H3a.7.7 0 0 1-.7-.7V2.2a.7.7 0 0 1 .7-.7Z'], '#3aa6a0'),
      chevron: (open) => h('span', { className: 'kb-tree-caret' },
        h('svg', { width: 14, height: 14, viewBox: '0 0 16 16', 'aria-hidden': true, style: { flex: 'none' } },
          h('path', { d: open ? 'M4 6.5 8 10.5 12 6.5' : 'M6.5 4 10.5 8 6.5 12', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' }))),
      book: (size = 16) => h('svg', { width: size, height: size, viewBox: '0 0 16 16', fill: 'currentColor', 'aria-hidden': true },
        h('path', { d: 'M2 2.5A1.5 1.5 0 0 1 3.5 1h8A1.5 1.5 0 0 1 13 2.5v11a.5.5 0 0 1-.5.5H3.5A1.5 1.5 0 0 1 2 12.5v-10Zm1.5-.5a.5.5 0 0 0-.5.5v9.6c.2-.06.4-.1.6-.1H12V2.5a.5.5 0 0 0-.5-.5h-8ZM3.6 13a.6.6 0 0 0 0 1.2h8.4v-1H3.6Z' })),
      gear: (size = 14) => line(['M8 5.6A2.4 2.4 0 1 0 8 10.4 2.4 2.4 0 0 0 8 5.6Z', 'M8 1.5v2M8 12.5v2M1.5 8h2M12.5 8h2M3.4 3.4l1.4 1.4M11.2 11.2l1.4 1.4M12.6 3.4l-1.4 1.4M4.8 11.2l-1.4 1.4'], size),
      plus: (size = 14) => line(['M8 3v10M3 8h10'], size),
      moreH: (size = 14) => h('svg', { width: size, height: size, viewBox: '0 0 16 16', fill: 'currentColor', 'aria-hidden': true, style: { flex: 'none' } },
        h('circle', { cx: 3.5, cy: 8, r: 1.3 }), h('circle', { cx: 8, cy: 8, r: 1.3 }), h('circle', { cx: 12.5, cy: 8, r: 1.3 })),
      upload: (size = 14) => line(['M8 10.5V3.2M4.8 6.2 8 3l3.2 3.2', 'M2.5 12.5h11'], size),
      link: (size = 14) => line(['M6.5 9.5 9.5 6.5', 'M7 4.5 8.6 2.9a2.4 2.4 0 0 1 3.4 3.4L10.4 7.9', 'M9 11.5 7.4 13.1a2.4 2.4 0 0 1-3.4-3.4L5.6 8.1'], size),
      rename: (size = 14) => line(['M3 13h10', 'M11 2.5 13.5 5 6 12.5 3.2 13 3.5 10.2 11 2.5Z'], size),
      trash: (size = 14) => line(['M2.5 4.5h11', 'M5.5 4.5V3a.8.8 0 0 1 .8-.8h3.4a.8.8 0 0 1 .8.8v1.5', 'M4 4.5l.7 8.7a1 1 0 0 0 1 .8h4.6a1 1 0 0 0 1-.8l.7-8.7'], size),
      move: (size = 14) => line(['M2.5 4a1 1 0 0 1 1-1h3l1.6 1.8h4.4a1 1 0 0 1 1 1V12a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1V4Z', 'M8 6.5v4M6 8.5h4'], size),
      open: (size = 14) => line(['M6 3H3.5A1.5 1.5 0 0 0 2 4.5v8A1.5 1.5 0 0 0 3.5 14h8A1.5 1.5 0 0 0 13 12.5V10', 'M9.5 2.5h4v4', 'M13.5 2.5 7.5 8.5'], size),
      copy: (size = 14) => line(['M5.5 5.5V3a1 1 0 0 1 1-1H13a1 1 0 0 1 1 1v6.5a1 1 0 0 1-1 1h-2.5', 'M10.5 5.5H3a1 1 0 0 0-1 1V13a1 1 0 0 0 1 1h6.5a1 1 0 0 0 1-1V6.5a1 1 0 0 0-1-1Z'], size),
      task: (size = 14) => line(['M8 1.5v3M4.5 3.5h-1a1.5 1.5 0 0 0-1.5 1.5v7A1.5 1.5 0 0 0 3.5 13.5h9A1.5 1.5 0 0 0 14 12V5a1.5 1.5 0 0 0-1.5-1.5h-1', 'M5.5 8l2 2 3.5-3.5'], size),
      upload2: (size = 14) => line(['M8 10.5V3.2M4.8 6.2 8 3l3.2 3.2', 'M2.5 12.5h11'], size),
      searchGlyph: (size = 14) => line(['M7 2.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Z', 'M10.5 10.5 13.5 13.5'], size),
    }
    // File-type category per extension; icons come from the embedded
    // user-provided PNG set (FILE_TYPE_ICONS).
    const FILE_CATEGORY = (name) => {
      const ext = (name.toLowerCase().split('.').pop() ?? '')
      if (['md', 'markdown', 'mdx', 'rst', 'tex'].includes(ext)) return 'markdown'
      if (['csv', 'tsv', 'xlsx', 'xls', 'numbers'].includes(ext)) return 'excel'
      if (['doc', 'docx', 'rtf', 'pages'].includes(ext)) return 'word'
      if (['ppt', 'pptx', 'key'].includes(ext)) return 'ppt'
      if (['pdf'].includes(ext)) return 'pdf'
      if (['html', 'htm'].includes(ext)) return 'html'
      if (['css', 'scss', 'less'].includes(ext)) return 'css'
      if (['js', 'mjs', 'cjs', 'jsx', 'ts', 'tsx', 'vue', 'json', 'json5', 'jsonc', 'py', 'rb', 'go', 'rs', 'java', 'kt', 'swift', 'c', 'h', 'cpp', 'hpp', 'cs', 'php', 'sh', 'bash', 'zsh', 'fish', 'ps1', 'sql', 'yaml', 'yml', 'toml', 'ini', 'xml', 'svg'].includes(ext)) return 'js'
      if (['png', 'jpg', 'jpeg', 'gif', 'webp', 'avif', 'bmp', 'ico', 'heic'].includes(ext)) return 'image'
      if (['mp3', 'wav', 'flac', 'aac', 'ogg', 'm4a'].includes(ext)) return 'audio'
      if (['mp4', 'mov', 'mkv', 'webm', 'avi', 'm4v'].includes(ext)) return 'video'
      if (['zip', 'tar', 'gz', 'bz2', '7z', 'rar'].includes(ext)) return 'compress'
      if (['apk', 'dmg', 'exe', 'msi', 'pkg'].includes(ext)) return 'apk'
      return 'txt'
    }
    // Common MIME types for the attachment hand-off (the host sends bytes
    // without a MIME header).
    const FILE_MIME = {
      csv: 'text/csv', tsv: 'text/tab-separated-values', md: 'text/markdown', markdown: 'text/markdown',
      txt: 'text/plain', json: 'application/json', xml: 'application/xml', html: 'text/html', htm: 'text/html',
      css: 'text/css', js: 'text/javascript', mjs: 'text/javascript', ts: 'text/plain', py: 'text/x-python',
      java: 'text/x-java', c: 'text/x-c', h: 'text/x-c', cpp: 'text/x-c', cs: 'text/x-csharp', php: 'text/x-php',
      sh: 'text/x-sh', yml: 'text/yaml', yaml: 'text/yaml', toml: 'text/plain', ini: 'text/plain',
      pdf: 'application/pdf', zip: 'application/zip', gz: 'application/gzip',
      doc: 'application/msword', docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      xls: 'application/vnd.ms-excel', xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      ppt: 'application/vnd.ms-powerpoint', pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', gif: 'image/gif', webp: 'image/webp', avif: 'image/avif',
      bmp: 'image/bmp', svg: 'image/svg+xml',
      mp3: 'audio/mpeg', wav: 'audio/wav', m4a: 'audio/mp4', flac: 'audio/flac', ogg: 'audio/ogg',
      mp4: 'video/mp4', mov: 'video/quicktime', mkv: 'video/x-matroska', webm: 'video/webm',
    }
    const fileMime = (name) => {
      const ext = (name.toLowerCase().split('.').pop() ?? '')
      return FILE_MIME[ext] ?? 'application/octet-stream'
    }
    const fileTypeIcon = (name, size = 18) => {
      const key = FILE_CATEGORY(name)
      const src = FILE_TYPE_ICONS[key] ?? FILE_TYPE_ICONS.other
      return h('img', { src, width: size, height: size, alt: '', 'aria-hidden': true, style: { flex: 'none', borderRadius: 3, display: 'block' } })
    }
    const iconForFile = (name) => () => fileTypeIcon(name, 22)

    // ---------- embedded file-type icons (user-provided set) ----------
    const FILE_TYPE_ICONS = {
  "apk": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAAA21BMVEUAAABnuzx2xE1uv0R9yFeGzmJ0wkuIzWdovDyJz2ZovDyLz2ZouzxovT2KzmWBy1yL0GeHzWRnuzyK0GdqvD+EzF5ouz2M1Gr///9uv0RpvD9svkKBylt/yVmEzF9rvUCGzWJ6xlRwwEdnuzt1w02Dy16IzmWCyl1ouz19x1Z+yFh4xVGHzmN3xE90wktywUmKz2bY7syV0Xa64KW64KaPz27z+u/F5rSu3JbK6LqHy2T5/Pfe8dW+46u0356m2YyS0HL7/fmf1oOZ03vR68PO6r/L6bzA5K6c1X+4V0npAAAAGHRSTlMAYaenpmwfCufWtotYM/zz7dfLt5FfRzUegmQ9AAACEUlEQVRYw+3X2W6jMBSA4cyW6Tr74rCEOGEPhKQpKZCtnc72/k80xzjgUDopB1WVKvnTaW1s+Zd62Y4kSZL0vL09PZ7a9tSe3vXh8/dWvWMblEHYCO/etAieiveBHcDY+1oUPwYH4YvBoCYYBDC7D3RxcBi+2H8QsmjxV1bfgnmMotUAqugIlsPfw+aOr4ig5jiao8Hka86pnb3vIoKNIP5oXdB0DUase163CcY/N/uNLF23Cvq67us+85uQxN+B0xUhf8tPTJDzfC8hZHntbNfpr6v5rbeGr8yD4/wOE/RKM0IWN4RbwM9W3CGCHqUe5a/6rCKkNL/DBqlwcVMJrnxx1SroLEhV2io45uiY/oFGYs/yVpKxNS7u8EHgLQlZULolYEnpD1jS8vIlIhiG43AMwwokiVeE2cQzAv0QsHtMMCxsSJ1TXCKCZvEmmdVlJhOaqGAjiODENCfmBCa7qPPyO4AJFq5I3TWco4PRzr3B/GYSYYLRoWDMYjARIjiMomE0BPcH4Q4GFWT+GywuX7UI3s6Zy/klTLH6LYI9btjjL2EjiDtMsBFEUOUv1J4Kw1cAS+UME2wCEzRU1VCNnJrv6yvABDnFUGAMQZwhg0oVBGBq34jgUTXoKi5Mbf+lefDELYlQ9Qx+nTUPnivuyB3BuGwFYi/OPnUQvh2NHnLSxf1zdv7ioLNuR5IkSXpS/wBQf9tHGc2uyQAAAABJRU5ErkJggg==",
  "audio": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAAAyVBMVEUAAAD///+qqv+Ymv+Rkv+kp/+Ki/+qr/+dn/+cnv+cnP+DhP+Ehf+GiP+Dhv+Fhf+qr/+oqv+oqv+mqP+Dg/+DhP+oqv+mqf+fof+goP+oq/+Dhv////+DhP+Gh/+gov+Iif+Ki/+ipP+eoP+Vl/+Ymf+kpv+bnf+Tlf+Mjv+anP+Qkf+Sk/+dn/+mqP+mqf+OkP+Oj/+nqv/9/f/29v+9vv/y8v+srv/h4v/6+v/m5/+1t//c3P/X2P/Oz//DxP+xsv/t7f/s7P/dKt1+AAAAHHRSTlMAAjOYmJWYM5cpDPjYl492HO/n4trFv6SAcV5SbbV0pQAAAg5JREFUWMPtl9ly2jAUhmm6pLRpmu6bsPCKLdvYxjZmC9C+/0P1SGDZNGmio8kkN/rmzOj/peGbw3DFwGAwGAyPzJuzjvOzcxhxXmnqhl9n2awFYibgdx9/6viuPgjBNJsKIPR4qSH8Nv0vwTTQMH4K7gRvDIIHNjr3gTU6D22klDrUEUCQQJEdZ6QKoIwulbjUhbktf8cIVaBDlDB1U5ibGrgUQPihLpykJ0xS2uwzF84JjLx+jRCekO5WJSFkuVmf3usK93PSsnB0hayj5ttVi43Ycp6x7u25upB17EvQ1TylW4i/XaYj9Bnzmc9hc/ii9NibipAtk28YoWQH+7myrQkpHR7QQs/zPZ+zImTdZuCakJ2O0GthJam8Hg0hC1l0hIEQdPjws+gIwxbY6DoMvdCDERdLUsmuL+zwuLDlhbowaWkI8CeATydhktQVtCqBKLqOcE04i0OZlLyU8hEjjOMkTmBqIZxDB2bkKIwPHSGMW47CuC/kESvM/xHmgmlfmMc5QljkeZEXwG1C8QaDEh6IikY4VkUUQWGiLEWGiRDCSLIBRTU7li1fsJZvr/BCwEvTXJaQF9uObKzQVuIpheOb2GMbpt9RQiXwQmtsCSDwDNO/wwgtJd49ofDCskbWSAABEB3m5HyvLrwcKfB2iPhfdqEghAURxsvP96z35dcAy7O7GBgMBoPhkfkLQF7qplDamTgAAAAASUVORK5CYII=",
  "compress": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAAAxlBMVEUAAADzdHVWyPf9bWvStnFWyPiA0DxVx/d/0DuA0DxVyfh/0TxVyPpWyftezP+L0UZWyPhVyPh+0Dz6mFf2g2p+zzynvKFWx/d+0Dt4xNOUwEXffYVWyPlWyfiB0j2D0z5Vx/d+zzv9bWv9r0L///+VvUR7wc62uY/HvD+bxz3+5sT+2ab9nZz9yYH9vGL+/f3+7+v+0s/+zK7+4tL9lZT9hIL+9/b+8/H+4eD+1bz9tbT9p5b9t439dnT9fGL9k1StukTRtUOmhR3dAAAAIHRSTlMA4qaY35iY49eMinRaNg8L/fX08ujWx8TCsqKZfWhPKfw62PAAAADgSURBVFjD7dFFD8JAEIZh3N2dZYtTpLjL//9TcJlt99JMLYEw7/E7PJlkfBRFURTlcelWQFQJQXWxhdsZS14ix/RGCjQ0rNG0BS/FmAkIooUbqxiQpfBgHgUm8CBDgWECCfQU9EsVBViS9iYe5IZ26nUOXdQb1wvaAnfLvrGjY1DtSy3dADczaO8OuFag1b+ApwX0Ab/vy1sZPDgG+VnbTCFN2zoBoYcC3Tm3Bw6kXgJ8SnsDD/akxgKcSHuEQAI9BWMoMIkH4yiwiwezZQQIB+LEeMwcLNQ6PoqiKIr6rd5dir/KXjtaIAAAAABJRU5ErkJggg==",
  "css": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFIAAABSCAYAAADHLIObAAAAAXNSR0IArs4c6QAABnNJREFUeAHtm2tsFFUUgM/M7vaxu912S8EWWipSqFUT8AWJiZEEY2IiRGMkSAySkCgagiH+IvwhIn8UbaKihAT/4A8wJvDHmPiABIJUKQo2BQpV5GELUkq3ZR/z9pzbLu7ANtt159HUc5rtzpy598y93557z7l3dgFYmAATYAJMgAkwASbABJgAE2ACTIAJMAEmwASYABNgAkyACfwfCUhudHrNoXtrAkFpvRSw2izTjTvksSlbEJdnHl+0eOPHK6QVRp4SrqqCTlt/6UsIyCG5PVgprQHLctr8uPYMS4e6SMOqxLmjja91wqZdj4E2bmEXLjgOsnp6S4NlGUtN7IapewkSXb9Chkg09vYCc11044+nNrY/cSztArO8JuW82hKUpqGWWWDJ4B3D2621cATQh1cdqX29Jb5w55bOZeHbF10+cBykHJIsCSQfMI6SIpiGZiLM+OoZ0aa9WzqejbnMUJh3HKQXjS50D4KpqwbCrFk2o3rOF1t+fb6mUJ1Sr08xkPYkRFMQZjS+rD7StK/dZZhTBiROJ5DRk2OO9S9Q8syqcOyZSLRx/7aul+8p1fPGqz9lQMpSEPrTf0BfshdMy8BYR38mmKYBakaFcEXVktrgtG+2/7KqeTwYpegdT39KaUypdXVLgfPDx+HPW12ADmoXDH+hisDDSjr9Il740H6x9LMpBZKGN/mhYqbyktFUCQwTXEmJphTILD0Cmk9G9e4st6bMHJkPnJc6BukQbQbJIB0i4JAZz4MN5Xj0yhVJkiGAeWCxYlga7tTZl/WUT8poz2spvvUltJBSk9rymTCtfJbNyqDaD4NKH8ba/NHWVjjnZGZ4PkSD8RwNwLX0BRjRB4u2ZTPyH048BambKrwydyssrH3a1tT+dC9sO/UCpPURIO8sJLSJ21DZApsXHIBwoMpW/Nu+3bCndzOUB1xJF233yj0p3Orc0g4cV4VqhRWxgMPnEBa+UgjwziFa6FYmwkzrw6I+2QD0dhKyT0tDr8VTj6TOmWMPcTquH4B9F96FcjkMST0BGTM5IW8kGzSfDiiXYevJ5cLzVCsDb7TugPmxRQIslfFaPAeZ7WDauCXms0ocmjQ3TmRIZ+uOvkswrN0A0AbwQ0iBanr2VMHejLEzz4d2thUEjzxLlgK0RwOKkQKaQ3NFx6hMepoTc0UzFaEnHdUnO8UGqlx7Thz75pHZxlMqRIGjtXox/JXqgd7hE6NwUd9S9QjMjjwI54Z/hr7UeaGnegtql0K8rB5+u3kQEuiRk0F8BUnzJQWHN9s+hcbw/ThXDkF792roSfwEc2OPwoYHdkMsVIf7jL/D+10r4XrmMjxZvxLWztsuvPDk4Pew48w60HCO9Ft8G9rUcYqu4WC1gEjnkWANTK9oRjAa1JU3Coikb6icC9FQHHRLheboQwIi6cljg3IZHfouvoKk+Y0S8YP9ewSk7qHDcDbRAZWBCG7QdsKpwR+E/vDVvfB3+iJG6AgcvfYVXEqehoyRhK+vfDY6V0rFJfJuUPd1aFOAoACz98I7COUTkU8qCCgghWAEI/LOnvXosTG4pd0U5YKov5I8A+/hMC+TKzBqD2C0R4j2VaIbnAra9BUktY7SHorKN5WrAgp5KQm9q2YGFCUlymTTI9KnjWGEnsAysu/RWjQW//kGkuDR8KSHK+Rp+eY68lhpDGy2wfQuAQJERyTQFPUVzCHv3AjJLe/FsW8gmzGtWd60AQGW43A9K1KciXfYEsN/Ud1zYhOE8s26iqaJV3ehpOcgs9tl82KPA71IaIm46cRTkNSGxDAu1E8dvXlWuBXWt+26qyhto/khnt6VhmT30BERQHI7ezZxDKMvLvEmGH1ltJNQrwPlkfWV9+Wawhy0Q3irTenBiacgg3II9l/8AA5csj9Wpt2bYgIHBRzac/zo9Nq7PJh2kUI4XXgtnoKkzuXbvc4XUAqBGDcQTdCrC9kv9rqvCXmxjZ3M5RmkQ58Og2SQDhFwyAx7JIN0iIBDZtgjJytIU8MfNUxucaV9jnukHC1TcXtmEuwQ3v1p0ncP8FGbK48bHV/ZJBb39seOzjkYKJNexZ8HThqhDWAtY96QQvJ3bjTKFTdfdWR2PCzLb+FCuA2/C++41xcLQhYtsEZw2tnz+ZKLh4qtz+WZABNgAkyACTABJsAEmAATYAJMgAkwASbABJgAE2ACTIAJMIHxCPwD4zEXUrTIgz4AAAAASUVORK5CYII=",
  "excel": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAAA6lBMVEUAAABqvD9tv0OHzmJ7yFV1xEyAz2KJzmWAylpnuzxouz2Kz2VpvT1pvT97x1GKzmaCy1yLz2dqvD5nuzuJ0GaEy1+Kz2ppvD5ouzz///9tvkNrvUB1w0yEzF+GzWFuv0WBylt8x1aAyVp/yVl3xE+Dy15+yFdsvkJwwEaHzmN5xVJxwEiIzmSCy114xVB7xlR6xlNywUl2w05mujuKz2ZzwkpzwUqJzmX9/v36/fmOzm31+vKl2IuV0Xbv+Ovl897a78/L6LzA5K694qmh1oaa03zn9ODf8dbU7Meu25aKzGjq9uW236Cv3ZiEb9L8AAAAF3RSTlMANZhkmJgK15bzpo2AKBv68OviwrRZMKTQVqAAAAJrSURBVFjD7ZPpbtpAFIVJl9Cs3QsGgzHGYGzAQBi2QNgTSNL3f52emYFhq2JfflSq5E9HvsuITzaYWERERETE/835VbzV6bQ6rUO+/vh1ki9e6VSksAMxBg4K+s/vY3SuKopypYyokWtPMMbLb1GhG8vZI8rZMrLuycZsAGRjJogs0WhnBHbGRv6upBntYGjG6j521UYOlz8Jwly1mqvmAvhySxDm87l8DlEViB6oPeGh8xuUUGHlLUS0n8ILrVAQhEXLKlpFwetyKCrAarVcWGqkCCVm0ex3td4QFcE807SRKXtcPhCE5gYItfv+evitadqTOqMITd83fVOwguQlY2L0B0IuzqhCf0t9xm/LQrfoaXh82DYQhPVdJjAu/Xr1Hr7F7gFB6Erqbh3xxzBO631N6w6wVGcUYc11a24NcTnWCMbX2uRxIHbyDFCEkkKtIMg88LtTO4QqbEpRs9BE0DyL769wwEeCUIpwWTPs8TdmZ4dCEer7ZAfuHO/gg72/PlkI2VTn/5KRebKQMZ3peltvt1mbP+4TY1MYx82dPSMIWVvBxA8yZIxNYJywBmtwUChCr6HI8Vdm7nkNTx/DOGtsoQlh4OiPsKw8gcv7AfZrCELHcTzHQ5w+vytUQR53O96evSMJDcdAHG/UnfIqeX7pzuUeMQhCgyM/6LnGDo6/7SnClGGkjJQCAyIqUD1FGAqCsCRJlVLIcS9nijBdKqVLaQEa5LgCijAIqjCxTzqRRo5mgvBbIgzX4YWXSUUimRCgOeQsvPD2IhnMZYzAzffkXRK5O2Kzv7g+j5E4P3uTm1hERERExL/lD5xg6aaoE6udAAAAAElFTkSuQmCC",
  "html": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAABC1BMVEUAAAAwwp8947o417AzyaQ1z6g/4ro74LY947g306sxxKA63bU947kxwp841KwzxKE+5rw20ao80qU74LYxw6Axw5884bgxxZ862rI84boxw54/5bo94ro53LIzxaBJ7cg768QzyaM63bU31a420ao0y6X///8yxqExxaA4168xw5852bE527I74Lc63LQ737Y0zacyx6I627M1z6kzyqU84rg52LA206w1zqg42LAwwp4zy6X6/v31/fvp+vZP1bSF4sty38RI07Hc9/FC1bE81K7U9e3M9Oqx7d6f6daP485+4slt3MFh3b1U2rju+/jk+fSk7NrH8ee47uFEz62+8OTA7+OV5tJ34ceBpOypAAAAIXRSTlMAj6aYmJgk5KaY9uKdbFlOMywI9dnXxcCSiIN+fXQjDg1uz5PWAAACfklEQVRYw+2QZ3PaQBCGsZ1C3O30HhBaJIoQEgjJptr07pLy/39J9u7QaYQdR8uHZDyjZ97xvnc7euZwIiYmJibmkXP8KZlMbie319j/eLyZ7331j+x/TdA5rFaL1aIEDxg+kefP6MI3xYfYwPiydIdiqYgRnW5Ml0rpUhojBH6Xk2xM/wVhpAuNtIG517hHMxpChH8C1u5ob7QMwzIsDhYGDtHl3PtGEBYsq2AVMHIi632HIhTkC3lMISB8fxJdmJewDzH+DN1/ji708hIv73Ecz8F4eJSrd9GFuuPojq57uhRhLEfgn50dgjDAWcn1SX3ghO9oQkVXMHrAAmDud7EnCBWBEAr5DKDRU5BgRxciV42rVQG4UZRuv9mRu02EI3yXaEuAX4rSwfNsA2FNoLQBYMgr/8U1pdsEWMz5rkYUZmqZTKcOMOjxjk/9zua8AbDsiv2L6MIMZ4YfX3ZFvwSY8DKtA/R7rNGFS4BmS9Q5QH2lngDAaCNhjz3wQlh+AlyLZrP/w5AqtDkTYEY7g/QB2uJyWhfvtjP2U5oQaXMjlhYWnNLHK0nourZr2y4zXruuOwYYuIwL7sMlgyB0zRVoXOCnA4Axd0yZj29ckyJUTZ/Oj45p3rJfjHeq6Y6GLbmjCVVTleA7+2ya4XuKUHCunmNUdQwwDs5yRxNW1ApGzNuboRpC7J9EF1bukqqkMHIiFGEqEv9VWOakyikMnxJxpgpRli1nMeUAeSc7QZiNAkWoaVpWy2L4RPwemgThrnYPUuSzFV34VtNyWo6DhYMFE5qH0YVHuQi8Ok1E52A3d5bDnGH4lMj71ycJCl8Oth7kw9FpIiYmJibmX/Ib1EIVTmIX05AAAAAASUVORK5CYII=",
  "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAAA8FBMVEUAAAD/dkD/hjr/fT3/gTz/jjn/eT7/jzf/fz7/kDb/kDf/kTj/dz//gj//okb/gED/dj//iTn/kDj/eD7/dUD/dkD/dED/kTb/dj//iTn/eD//iTr/jDj/d0H/eUP/dz7/////ej3/jDf/ijj/iDn/dT//gTv/izj/jzb/hTr/hDr/hzn/gzr/jjf/fD3/ezz/hTn/gDv/fjz/gTr/fzz/rIT/fT3/ez7/fTz//v3/fjv/y67/om3/hEP/ikD/6t//w6T/upX/7+b/1sH/tor/rYX/k1j/5tj/3Mn/1Lj/wZn/nWr/mWT/iEj/wZ7/j0s3bar8AAAAH3RSTlMAYaenp2un1jT9i2pYHAsG+vPt6uTLuLezoJFzX0cmdmQ1zAAAAhRJREFUWMPt0eeSmmAYhmFTjO5mN5veE2kWBCkBEcTetifnfzZ59qMtRAOvzmQnM1zzjl8b7j9WSqVSqfR/e3FcO+ps8/pDfa9erbPT0fMK3XGn0+v0YjhgghX2KNZ6Owk9QaiSg/goCyVMsKcXhTzVw4KHF9tpQlvApM/VQ4JiW8Rk9qSimIIAC2V8pQXzvTotHpREURKlFFxA6v4LIVjIp+JBRYop0uryaqLEcBF5TAje43Mcdy4pWxCChmEohoIxjInHwciIJW+EoCzLhmxgZDkMykxyjyEF2UeBS/SmkySUvBGCXVnuyt3A5OrC/xWc8QPRnhTcTe2qGLYlBNUsFsGkzoSgpaqWamFUiPab+XyDNXyDp8WDrYDVsjDhYYW/21vdvzssOEIPRsGJHEwzW+Z4wTGLccvEkRo0E7c/L2a3ZmvGhfzkiRC0TdM2bYw5PkdkOr7xoqB3HbwBJTgc2kMbM1yyynLKRVC/u8dQgj8ic+5Ps+jxSfGgG37C/tos72aPoOO4juu6C26bJd4wDiGoaZqjOY523e+v++v13Pdn/cQGbxiNFtQ1HaPthEdCUGdYED9b4YEQ5AcDfsDHdF7H8Dwu72Bhd5RgIc8eMNjg+QbfwPAQ7dMrUIJ5Hjz4plDwc/Hgx2az0WQfYcnu4/WkeLD+spnv3VmluG9vc3vvTysUZ/VHf3XyvVIqlUqlf+o3Qu/+AwCJZOwAAAAASUVORK5CYII=",
  "js": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAAAzFBMVEUAAAA6kP8/lf9Tnf9Nm/9FmP9bov5Vp/9gpP85kf9go/5cov9dov9Lm/84kf9Sn/9ho/44kf85kv85kv9hpP03kP9Wn/89lP9Av/9PnP5Snf5Kmf85kf8/lP89k/9Blf9Nm/9Unv5Wn/5ImP9Zof47kv9eo/5cov5Dlv////9Gl/9ZoP1bof5Fl/9hpP48kv83kP9Wnv211f9go/7B3P+92f/K4f9ysP6cyP+Uw/97tf/3+v/T5v/z+P6lzP7j7/+nzv9Rnf+s0P5mqf7+oV7aAAAAGXRSTlMANZiYmJiQDZLx3ORjRy0i9cmvqqCPiH4EWfmskgAAAflJREFUWMPt1ulu2kAUhmG6sqRNurcYL9iGscc2EMJOlm73f089c+LimUCBj1aVIs2jI52ZQXnFn0jULMuyrMet3mgNJ5PhZPjQ2YeLk3otMRFVUAyFwm/izasariH2aeDBljAkImF04DNeFMl+L9FgkSRFUtAkpDpXGy0Wf5YXOU0BFvM87+U9Gt4KLfMNK/Z0O8Ng8f6bMDOk79dAMDrGWR0IjsfROKIxdmlzB/5lwkoURjRqV7FwzPdPWPCwZ8cHnTB0QoeFfFb75818waHyDgV3uZNy5uj+Nngl5fTUYPue03YYHYgK0qo+w4MmDur+efA5EOyydrdNU24OGu9AsLsLB3V4sNPtKLTK4IzfaNBgZxcVNB5OD8admIaD5RkNxvyHCq3w2+q7uutB3i+AoG4p5Z3aKhhroGCWxVlMo7YKZWQq5Q/9HQlmupWUN06Wia9SrjIdEEwHmsWtlPPFmr7g7WKgw4LpIC3Fc1maxtU7QYKGcHYtyfW8lxqeAsHAEK+Xs6vlOk6DlGbzDASD/fCgFwRe4G0EfOfNys+Q4CFw0Gee79HwZn71Dgb9o+DBkT9idKDRNxrsm0b9Ec3WHQg2zaDbd2m2zp+PD753dRTg0EPAD8SLpnvYuxrg/K176dJcbvn93vxYr0HqT/Y6/1KzLMuy/qtfbB/dWrF7nG0AAAAASUVORK5CYII=",
  "link": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAAA0lBMVEUAAAA5rf9Qs/9Jsf9Ar/9dt/9fwf85rf9Utf9guP45rP9Xtf9gt/43rf9et/88s/9mu/85rP87rP9iuf86rf86rv85rP88r/89rf8/rv9Ps/44rP86rf9Xtf5GsP9Ytf5Br/9Lsf9gt/5Rs/7///9VtP1Er/9dtv1atf5Isf9Nsv9btv5Ts/5UtP9dt/9Dr//Q6/9ywv/0+v7x+f+m2f+a0//d8P/X7v+Lzf/9/v+g1v9+yP9rvv9nvv9ju/9duf94xf+v3P7p9v/l8/+64f6/4/60xmY+AAAAGHRSTlMAguXl5cwRVuXc8sGTgXYeD/fY08GmbzNxeHyqAAACKUlEQVRYw+2RaXOiQBCG3dNNNsfeq1EuHdABiaAiaDyT7P//S/sywkyIqWjjp1Tx1Ft0T3fNU1RNraKioqLibfPt4qzzIj+vyvmkbp9Pn0sILzqdXqeXg/ZU49mtoHfbQ0QFsi9hhKBIUUw3ep7X9/oIGtmrSjd6UgSUTFWq0diJjL6BSJEEB6LROAzNqBkCzdAQ6SjOvpKEx3BFEdq2ZmtIoWbkZ8ov2sfwhSAc+JKBPxCgQUTNIAlfQJsE98HcVgOKsLtP+MBSpis5eX+SMByz2WP0OGNBKeHNju5NF0m7xZiNNqgJY3f5ji5UePCFopuyeTY7SRjufCBg2zJC9znh2o2CheuuRyzJZxSh5bqWayEuWE5W6CeMRZYfsLEndoAkTGXZRbzHVvimWjdgLLEEVKFiifdYKN9cbT4QhJxzi4tbK/hCnvpsfOHDIgWFJJTEqe8OPp/zZBxxBUmoc65zHUC1wXcW+zybZRWQhDkTFqfF0N1/8Y2uIAudjC0LHB24eI+V0Di7HQpF6IiLSMJGPm5b8EWOBEuEIhw6ztAZAm3E4qW+jJ/6xA4hCU1zaA4RM2GMzZDIlOS7jwShqQjvoXwIzX1IwmbTbOYX15s1zkDMmrKnCJtHcKqw0WwgTypJ2BBIQaGXO5rwMGWE7UYbUQo1owrP20fwgyD8VbzaareQ5/1vgrDeOkz7b43An++HfOf1Gonr+uW7V7isX9cqKioqKt42/wECbNFRqmDzywAAAABJRU5ErkJggg==",
  "markdown": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAUKADAAQAAAABAAAAUAAAAAAx4ExPAAAIHUlEQVR4Ae1b3YtVVRTf58wdxzuOjh/jYGqFlOAH5ExYgWhqRFFE0UNB9BCBRPTUS0HUQ1HRHxAYadBL0IMP9VLQgzlqGH6OFkZCSliJzowfOTrMeO89p/Vb+65z9jn33I+Ze/aFYK/rvmudvT72Xr+7v845o1KOHAIOAYeAQ8Ah4BBwCDgEHAIOAYeAQ8Ah4BBwCDgEHAIOAYeAQ8Ah0AkEPFuNvH/itd6iH35IDTytPG9dGIbclOd5CjJ4u+QpbyLwwqNeWHjv7eHdp9uNNxf/9rPIaBXg9frhyUCF6yhJFdIHHJQGUMAUgMUWPIvS8WDnK79U8UpvvDP85RdZPjbrfBvBMfIAHmILEOD4BCFpqhwyf4TTFQh19Qi+IB1Ny2Tf7YeFvZ+Mvrqrnp+teisAYtpKgs24gCEJpgFq5i96gO6FXR0H0QqAFRXQmkcjrcMlCCs0NP2OgmgFQAAnxNMUU7TtQmONfxBwLQfEzbg8mtF2B0G0AmA6KQGzPa4naxxbA2nGFF0lKCvCsSMj0QqAsqPqESEjJg9uwsXRq6MxG8xKJbAOohUATeCw53aq6Kmd/KFsg2gFQEoh+iTHDJ0HaW7FJXnWw4kx1pl2rclxq7GEaV0uV/Z+dPyVl5J9yefKDoBYyIUCkqOSBAynuViHxT+tlyCap0dYUgv37J0fu3OgKp+9e+SFVWmfdq+tAIhOBQF1mgqDBKCqpRaE+rpaW0SOKUuPOpDoDLm/r9j3FCtz/CrkGCsKJUmgotFdReSQlxDiRs/jo43cOkpfwGdKMw/m1ZTEsQMgjzZpwuS0NiVmKaWZuBtP603f5jLfZ1fbxiqYJgE1Xd/OtR0AsVF4enWQEZDVyc2Dj6ltK59X87p61Onxg+qHi19lmUV12M3x78l7XlbDy3eogt+tDvy9T/18+Xu2MQ/wkZMheF6XcZWPaG0NlAVd3y3gjqG27Fz9olrcM6B6CwvVlrueUfcu3JBpJ74Ab82ijWrrymfVgu5FqqerSPJzCR/AAnshkcHvBOXc8809oNlxdFqA5NFh7s5k2NfdL+bMh5dvT1xnXaRt0jFMwEw5K1YedVYANIEzO4lxkQDUVJK8cekjquB1J2xM+4JXUBuWPpzyqo3JP1aNlZ0KKwAmE8CZsF7RSY1N/cXCvK75BNDmuvbrSYdpCxIfvojiazBRZwIvsrbN99sOgLRYRR8adliSsoqkcnX6sro4eY4vNw08mmkLf+hAsL02c5llfEWx41YzpcghR8EOgJQRdt+sHRjnQvmYeZweP8SX9y8eUr20QYiN8GJ3n1pLOhBsAZqQ2EibJodNVj/Et11uB0CeUrprkpzw7A6H6szEYVWhWy6fjj+bBrbWmKHOp2MIbBhAGmNZhEcXIHmEgds4yPywNcuhzTorAJoJmKMhLUvfAcXt0k117vpJrsIZL207RHUg2MDWJLEVkISbNrZkKwAG9PBAkkrwOqMGycFudHyE81zVd58aLK5mGV8DxZXq7r61fD06NsK83hfigBLtVpeTUvl2Pbc511sBMJEAgRZ9KBF5agxuEmzOXj2mpitTXD1EZ0KxHapuHtCdvXaM45m+YpcFGuwEVNMnL9kKgLL+gM+GysEd9evEEXYZHtwevUseHtzBddDBph6Z7Yr8v10DJckQi3hUsgHVIwd2gTo1doBdl/QMqjX9G+j2bp1aNn8F15288mP0mMzmqJK+t8KtPExAw9EUTWyWONrgGWEt6aUrVH9cP6P+nZlQ/XSPjM0EL4hAqDt/45daR6rRzx2V8n2f5CDibIynPegDcT/56IfV7X5ZmcIMHjrN4ImQxaX7sQ5T71R1o3iAji5Dy7exEer0khDbirduKCSwcWSJOWSQ8Ng+P8kOgNiFq590V3GfLCWtQ7rQnbiyn1XFwgI+VOMCdeIHbpLUm3Uiy1QXLvV5cSsAmp2r0LoWFz0WZAyJHa5hAyAgX7r9p7p064KoWUad9qv9aSSeXktJjzgZJQqYo2AFQEw17H56B5QJRpySquBDOpRReog6VZpUv9HxBSBg6ovu2wt71c0713jt++b8HoqITQZWms5OHFVT5UmKcSjy0VMc7cWblcjg06Vpcc+NJx6o5xX1zZEnokwrRtJtxccmQO88sBkwUQv0t4H616lWQYWNAiNZNgyR9egOPv905/7Xq+a5MCu7MDqbTXpqxTq8ExFEUJvWx5YYorx/m6FNmUzxGkHaFo4IpmxEzEW0AiDOc/E7kXg61fa4AWC1xi3VSNvgIPRD6loKMEsjKwCiD5IA/f6z7FIjc3O0cisJYxn4cdtxP7gu7Z7wntuFFQBpXGX2hmslS7LgfIwprFXZvjpgIx0C1urxKhP9sfFKE32yA6AxhaM7EkZAp1OFjhNLgtZ+mjJdZRQKpOB4npg3WQEQnYwSMEYcbxKcgaTFllyjv+qNXcOkgShnMmm7gWluKmkzt4AIhFEnZbaB8UQaBG7KrcSR0S4cPiILbyXObGysAEhrm37NNpueVG0lUXBTbjWU6WPK8K8EpfhNVKsBm9hZAZDOXT9hGrVS0L9GU050rcRqZqNC77smeMxabQXAZQtWvEWr3K1WetMMIMQQm1bi1bfxvt79+MHj9fVz01gB8OMt+/4JC4WHaEs4jG6ZdwIig+dRmsXHD0nPCT9YsWT9rrlB1NjLwtEy2SD+29fYjXMbk7WduSp3eZN7do783pnWXCsOAYeAQ8Ah4BBwCDgEHAIOAYeAQ8Ah4BBwCDgEHAIOAYeAQ8Ah0BCB/wASLPzAwEYZogAAAABJRU5ErkJggg==",
  "other": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAAAk1BMVEUAAADKy9TP0tjR1NvNztXT2N3Y3eHh4eHX3ODX3ODV2t/LzNPW2+DLzNLX3OHT1dzMzNbV2t/LzNTJytLX3eHJy9PLzdPU2t/////LzNPU2d7T2N3V29/R1drMzdTNz9XMztXS1tvW3ODJytLO0NfT19zP0tjQ09nX3eHl5un9/f3r7e/d4OT6+vv09fbv8fPh4+dmnJV4AAAAGHRSTlMANZiYmJhjCteOZvPupmU2KBviwrSFe1lK3JX4AAAB4klEQVRYw+2XW27bMBBF3SZp4jzapE+Jkm1RoUiZluLsf3W9Hdsk1bKJhh8BAvBggLnkgAdj+EuLTCaTybxvLpdXfdv2bY+ifuL2+5ck31ULnAjBU39KEC6D922NagP6BCMtOJUCNMot3xgKIplvrF+h/ZwmFLUgEE4g0plpFCEkQE3P1zzhDFjGSohKVAQCgYAK+y++0BPI3Oz2gSE80FUdKrBO768Zwo6IyvxsOV8o3RbUZSelkNRR7v6CITw8BmjIw5Mt7L7uCCfmCKfsbPGHcZATeMKVXKHo4bY4Ymtvw/BsvnBFHIXCFif2uPSzC5bQ81w4bBcOzhKFu8IzpAqNWZnDevh/Q8Z9nSKEzJDUbeexA80AR3jkuYgwdsZwhdoQeixi7Ghm9EeGUGsDqSyiPGmaszY8IP4vBMwNCRv/yQlCpbTSWu2iwl7RnCNUR8wYW/A0ZQuB3P+ts1uVJtyoDUqpatiGDEalCDckQ7nu8TOOcBbnDGHTbBr/EgcCIcicDZs4XkicJwvXzZpAQLnOEK4ngmn2M44wTrkuUS6zhSQAaE4WShnCchYM4ddZwp/zhXdl+Vg+EggEAmrSGZ9ADzf00POPDNwtGNx/8744Nz8umV9nH17kfpHJZDKZt+U3q9y/54xHFn4AAAAASUVORK5CYII=",
  "pdf": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAAA5FBMVEUAAAD/ZHj/aHj/d37/bnr/gYL/cXz/fYL/gIb/goL/gIL/cHz/Y3b/cnv/e4D/hIT/ZHb/YXX/g4P/Ynb/ZHX/YnX/Znb/ZHX/aXj/Znf/ZHb/dH3/en//d37/YnX/cHv/cnz/foH/e4D/////bHn/gYL/gIL/dn7/bnr/fYD/bXr/fYH/goP/g4P+cXv+YXT+fYD+aXj/+fr/9vf/19r/sLf+en/+c3z+ZXb//f3/8fH/6uz/ub3/yc3/kJr/gYr/fIb/0NT/wcX/qq//i5X/3+L/pq7/n6f/mKD/h5H/5Ob/4eOcpKONAAAAGHRSTlMANZiYmGKYZgrXjyrzG/Ds4sK1pqWFez3pyuwPAAAChUlEQVRYw+2XaY+iQBCGZ4/Zufc+UMBuKVAOcRBBxfua+///ny27HRnUmViabLIJT95Y1V2ph/7qUU5OTk7O/83p+ZlvWb7l+zW/hvGf+fL9Yi/fmbWgZtUE2KT4x3sIz62toHmRPYxnlYpVsTCVbVh0Y60sqJQrGFER0QvobxSijFSQnqnG8us4ZQdTPqEJA0cQOEHgBZ5X9qTIczyMrDSjkS4bjiFwlnf4hcAIDINm1KREMzSMsSJz5x3ThalgW//5iiCUiy2j1dJaeKjNZp6GZO9PCMIsoy5ApG1wvrtQT7d0Tdf70A3hQRdo6ewDQZhlANMmDPV19hfG0AUYHySsZhglAF2selXHrK4JwqoqqKpyU40AIjVFzihCNaWtttvqHUBf3YAsTKmGBwp5u83bnKtcxXDO5wBdXfZLsCUJ1+gDQMx5ndcxXIBf/EQWMs4EvAc3EI6e7zCiJQiZpM7qGMbmkIyfIFrqpRB/qMKUKUzYQwLTFx9BKEKbMZvZAmyqTbhn9i1A/z4eRJMZZ3L+kSyUoKrL2DBuwpKBnJGErmu7NmZRWQ8eoxAk4SSChMk5Qei6rumaGGz0vjA1o3g47In2yURwRhCaK+F4GgIkN/HcNhfcT3q9wdiVc4rwmbvm4nEjcxskoaKYimkqtwBojPHwAjlrmI33uwsVyTiEwQ08usp26MIZJD0IRxlLQ2lg9hTOE4DmUAgOfGFBbhQe4ju1gFUpCBTRrypFuBOHCzuFDuYAYbFQFGCDyVSisCjpFDuY4msQhF+zm6ViCbPR/95d+FMsIuuiTP2zu/DqUgrf5McRgYtvpesS5hqTVok8X/46Jf47e/cmF0c5OTk5Of+Wv/Xx2EC52n+AAAAAAElFTkSuQmCC",
  "ppt": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAAA5FBMVEUAAAD/n03/n1L/pFr/qGL/rWn/sGf/r27/rm3/r2//m0v/sG7/nEz/ql//qmb/sXD/nU3/m0r/sG//m0v/nEz/m0v/nk//rGf/n0v/tXD/n1H/////pVz/qmb/rGj/qWT/rmz/rWr/oVX/o1n/nU7/nEz/pl7/m0r/olf/oFP/p2D/qGH/r27+q2f+m0r+nU7+oFP+n1H+o1n+nEz+olb/u4X/38b/qGP/3sT/17b/2Ln+pl//+/f/9/H/xJT/snT/7+P/5c//2bv/1bP/yp7/v4v/t3v+6Nf/3MH/17j+zKP/y6F9D0zZAAAAGnRSTlMANZiYl2UK12P8840oG/Dr4sK0pqWFe1k9ME+UGfAAAAJTSURBVFjD7ZfnjtpAFIVJW7ItvdrGbWzjsjQDYTe0Tbakvf/75Hgu65mVEeE6UqRI/nTELdZ8jMUvWg0NDQ0N/zcHx+3Ds208f/Wxlq/tnrnKgqEABf3h0xrCY7cKCYvUMLbdnfCNrlfB9Vxk0z/hCr3d8I2ebXu2h9hA9WrnMY020bN7iF2Bb7Q3VMWqZxk7vV6n15GgAXJGtGq/5wj34dkpQ+g4HaeD3K9EOTNe2impiDUe7y+cORrrKXHrzZwZUkeYOU7mZBJnZZZ8uXWcQprNsM9YQo1PpmKxKtdplvKEOEBAqBnX2CNcoTQp4VfZuNcLvPU8nSPFzBFGaRqlkWReCOc0X5vmEqK7ZxyhBoSfI8LFS6+p5QotSWRFkVUILSV0ac8UWgoSEj/xq1iKR38lnN6sLnDB83rCnE7kVp5b51J4ZUoW3p1NWIIhFBq44Q+Rf5O+5VTkIkcE4AjpAB0ubijE9HK5vLzqiJrCWJTEEF7Em17ESNlzhMQknkykEBUDIOFEFDNT6Mc+gkYKgfYl/qR4xhH6GoXQ15EyxGcIE98f+kNECbfwkCEkhgmk3yGEHANC1acv5AjV4eSXaa6SCnjEERpEYiTgZorGGBkjRFU8YwhHJMRJCZpt8G9YRd2QKRwMgkEQGIFhDNDjowRLhCsMAvhIWkB9ZccS6iKiumMIx6FkHI6RMAzCAAk30DwOxgzhC3VYiSv9u/2Fb7rdfrcvCfskQoPcqx/2F54edf/M6xaDk5fdPt1SrwTNR28PmP/OHuzkpNXQ0NDQ8G/5Dd6b5vh0QvNgAAAAAElFTkSuQmCC",
  "txt": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAAAwFBMVEUAAAA6kP9Jmv9Snf9Alf9epP9aof9kqv9Km/9fo/45kv9gpv5MnP84kf9Xn/85kv9hpP87k/9fo/43kf9hpf44kv88k/87kv83kf9Mmv87kv85kf9Kmf9HmP8/lP89k/9Wn/5Pm/9Fl/9Rnf7///9eo/5Elv9cov5Clf9Tnv5Blf9bof1ZoP1gpP5Xn/1aof9Vnv43kP9YoP+Mvv5Unf3w9//m8f55tP9+tv/t9f6eyP7G3v7i7v6rz/6Euf5yr/4pH1akAAAAGXRSTlMANZiYmGJmDCrXpo0b9fDw7OLWwrWFez0zlWW1/gAAAeJJREFUWMPt0AdP40AQhuFcI6Fcr+5l7bgkMSEEOMKV//+v+DyW1/aCEs8KISHto5FmvJFeCSaGYRjGyzY9PV496tO3mVbvS7pKuwo+CA7MO43gabqHTvF4mMjSrIZFd8ovIrAPv7jIskW2wGTQ3d3mFheHZEe84HK5PF+eY2iDvOU+0gx2lDdesdpsqk1FcBAcmP7m/B/DMT6cMYJVFVYhZrgb8pvxR6874TrENBuw5Pub8cFtMbAttphur4s1pmAEe5H/l2T397KRFhIjKKR/ieK6EKIQBUZoBXeJKhUtreDq7rp2ixIdf3ZCJxgJEYmohfN3klzVW4D8jRNUUVDBCloksiJMvZugJd+5QUtBQUv1+kmCruViuEF3AIE62P+msHYQbmSwwwl6ruu5Xg2rDdKNkZsTVFFQxQ/GXozBlsH+OycYd7pgrGIE57E0j+eA4C3dGM0ghUgbRGz4zgk28nmOqXdxldw134BF91tGMFdtbjwZajGCZSMvcwydKjxzgn5Z+qUv4QNDG+RvnOAh7GBA/MDH0CaBfOcGg1H4QTuwCQ5Mf3OD9iiM4Gd7wLEdzIP7x/jgidOHAIVUP8cHzz46h51MGGZfnQsHc/FA+/7++3TCMv31ap/ZxDAMw3he90UN4N+Cn+9vAAAAAElFTkSuQmCC",
  "video": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAAAtFBMVEUAAACDg/+prP+Ki/+Ulv+jpf+bnP+Qkf+nqv+Ehf+DhP+mqf+dn/+oqf+Hh/+Fh/+Ehf+fof+Gh/+nq/+fov+Fhf+Hh//MzP+qqv+Ji/+fof+Ehf+Gh/+bnf+Rkv+ho/+OkP+Ymv+Ljf+WmP////+kp/+Mjv+Tlf+Iif+mqP+dn/+DhP+anP+Ulv+jpf+eoP+oqv/8/P/LzP+srf/09f/q6v/o6f/b3P+7vf+ytP/a2/+9vv99op1zAAAAGXRSTlMAghDl5cvl5dpW9MvkkxrYwb2mfXBvMwUDBB3CeQAAAalJREFUWMPt0ulygjAUhmG6q933CggEZJVFajfb+7+vfmJjjHXhoH+cyTNnTHKceX84aoqiKMp+O7xsDeN4GA8Xte6fG/Va8UrnhxrdZTzjxz5m22LLX6dB0c9zP19dPCEXEUNxNXIxt+3czjE2iLvYUYv2evSibs/otj6BQ37TinoNJy/NgoVeYJYVHwjBIkmKpMBI5x/+viUEkzouCMFeHTsPnhKCqdBLe5h0CWKQpWzGZtN3Kp2UIJN899/H7D9K0GPMYx5X9vv9z5wJ+A5DClZEEMrX1JMdU4JZ5mVeBRcEJ96+mgczCYJTH6P5dYNgmIUYBLlyxHfEYChBkBuHwg6C5WsYWqGFoQYtCQ9+6tJ62+D7yJKdUYKOYzkWpjrL6j/jVHfge0rQkXzgx8ucRaRg4MxLf5IgcLDDB6ZRsA5S0HUDN8CIU+C7I0LQrYMS7E65XbeCyyKsSMEaSMGoK4m6UQUXDD9JwTooQTOKzMjcgBQUdhPsGBLTMDGL72tC8Mao4Y4QbA9mjIFRwQUzfz5pBI+dwQadtkZy1T5Yq32lKYqiKPvtF36F0nzWwbdXAAAAAElFTkSuQmCC",
  "word": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAAA21BMVEUAAAA6kP9Jmf9Alf9Snf9eo/5Vp/9eov85kf85kv9YoP9Lm/84kf9Sn/9ho/5hpf84kf9hpP03kP89lP9gpP9ZoP////87kv9QnP45kf9aof5Snf5Vnv5Blf9Dlv9Wn/5gpP49k/9ImP9Kmf8/lP9dov1Mmv9ZoP1Gl/9AlP5Om/9dov5XoP5El/89k/43kP9eo/9Yn/3F3v/Q5P/N4/9Unf06kf5hpf9nqv74+//p8v9Snf2s0P/w9v9jp/+jy/6HvP+Duf+Lvv6/2/9zsP9bov/c6/641/92sv5RczsrAAAAFnRSTlMANZiYmJIN3vGti0ctIvXiyaCPfm1ZOOrTPAAAAn5JREFUWMPtl4tu2kAQRemDR9qk766NbTDYxoAxBAjEPAuhadr//6LeXdvjWLQNQ6VKlXxy5Zmd1Z7EWSkKpYKCgoKC/5tKuRq1fkH09v3VWb5q67e8+XSGsNxqdVodAovHlPnC6ljRGXeQuALq+cZEMOgMkLgClGTONkJgDAxEaqinyjcaT8I0drtdo2sgqgLqqZbPFWbkZ8YrjnAShpNwokCjQIM8rq8ZQjsM7dDOgQFCFVQrDKFl2ZaN5GoCrT+fLrRSjoQoNGf8FudWjrk1R6imvDxdaFrW2lqvzbVpLva2mWKZi0No0ZIjJOyt2JkZK7FJOnw3nlA3dcRcCDGVNWYsxI2aq32GUFeQkBhASAuWkEiFu4f7vxEGuiLQgy8Qot4JsbIC/ZsUBhirPY7Q9wM/AEroB7gMITZBIIUBwRBCBqNECgN/I8By4RsQZnvPGUJC/YSLpVhO4YqFruu7XKFLRBC6N3hf+daHUIiZGwvxOFt4wI3oLu5lG0mh47iOCzhCHMApSQsvuRXiDuuZEF8zIR4cIQEhmMo2Wgowoy2WsNdzeg7SG6v7HfckOyWM5whH2COUcBf37koJCYawOUyRwgdn2GwOMfshhUOCJ4RBMoDjvpkwlJeCeQJHSDhL8T1b4a/jJlu9YAgbRLRvNvAlH8h472R7DGHjmH6jj1BlCuODhBR4DQ/J5F7fYwi9PDitQINQ5QhHo/ao3fbanjdCj4cCAwUaCUOIQzAiaKg/mrGECq2tKdAgsuakDKF2EgxhTctxq90iR/3H04UX9RxaXUPQ5GH8g3hVqz/NRYnB5bv6dR25PiKd1z5UmJ/Onv2Ry1JBQUFBwb/lJzFM1dMx+o9iAAAAAElFTkSuQmCC"
}

    // ---------- shared hooks ----------
    function useAsync(fn, deps, options = {}) {
      const soft = options.soft === true
      const [state, setState] = React.useState({ loading: true })
      const [tick, setTick] = React.useState(0)
      React.useEffect(() => {
        let live = true
        // Soft reloads keep the previous value mounted (no loading flip →
        // the tree below never unmounts → expansion state survives).
        setState((previous) => previous.value !== undefined && soft ? previous : { loading: true })
        Promise.resolve()
          .then(fn)
          .then((value) => { if (live) setState({ loading: false, value }) })
          .catch((error) => { if (live) setState({ loading: false, error: error instanceof Error ? error.message : String(error) }) })
        return () => { live = false }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [...deps, tick])
      return { ...state, reload: () => setTick(value => value + 1) }
    }



    // Wait until the destination composer is mounted (its editor carries
    // data-composer-input). Session switches mount it asynchronously.
    async function waitForComposer(timeoutMs = 4000) {
      const deadline = Date.now() + timeoutMs
      while (Date.now() < deadline) {
        const composer = document.querySelector('[data-composer-input], [data-composer-editor], [contenteditable="true"][data-placeholder], textarea[aria-label]')
        if (composer !== null) return composer
        await new Promise((resolve) => setTimeout(resolve, 120))
      }
      return null
    }

    // The composer owns a hidden file input next to its editor (not an
    // ancestor of it); its change handler is the official intake path. The
    // input is disabled while the composer refuses files, so the guard is
    // lifted for the hand-off.
    function findComposerFileInput(composer) {
      void composer
      const inputs = Array.from(document.querySelectorAll('input[type="file"]'))
      if (inputs.length === 0) return null
      const visible = inputs.find((input) => input.offsetParent !== null || input.parentElement !== null)
      return visible ?? inputs[0]
    }
    function deliverFileToComposer(input, file) {
      if (input === null || input === undefined) return false
      try {
        const wasDisabled = input.disabled
        if (wasDisabled) input.disabled = false
        const transfer = new DataTransfer()
        transfer.items.add(file)
        input.files = transfer.files
        input.dispatchEvent(new Event('change', { bubbles: true }))
        if (wasDisabled) setTimeout(() => { input.disabled = true }, 0)
        return true
      } catch {
        return false
      }
    }


    // Insert text into the composer editor. Lexical owns the contenteditable,
    // so a synthetic `beforeinput` with inputType 'insertText' is what the
    // editor actually accepts; execCommand alone is ignored.
    function insertIntoComposer(editor, text) {
      if (editor === null || editor === undefined) return false
      try {
        editor.focus()
        const selection = window.getSelection()
        if (selection !== null && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0)
          if (!editor.contains(range.startContainer)) {
            const range2 = document.createRange()
            range2.selectNodeContents(editor)
            range2.collapse(false)
            selection.removeAllRanges()
            selection.addRange(range2)
          }
        }
        const event = new InputEvent('beforeinput', { bubbles: true, cancelable: true, inputType: 'insertText', data: text })
        const accepted = editor.dispatchEvent(event)
        if (accepted === false) return false
        // Lexical handles the DOM mutation itself when the event is trusted;
        // for a synthetic event, apply the text directly as a fallback.
        if (!editor.textContent?.includes(text)) {
          document.execCommand('insertText', false, text)
        }
        editor.dispatchEvent(new Event('input', { bubbles: true }))
        return true
      } catch {
        try {
          document.execCommand('insertText', false, text)
          return true
        } catch { return false }
      }
    }

    // ---------- popup (menu + mini form) with Escape/outside handling ----------
    function Popup(props) {
      const anchorRef = React.useRef(null)
      React.useEffect(() => {
        const rect = props.anchor?.getBoundingClientRect()
        if (rect !== undefined && anchorRef.current !== null) {
          const el = anchorRef.current
          const width = el.offsetWidth, height = el.offsetHeight
          // Default: open BELOW the anchor, left-aligned to it; flip up when
          // there is no room below and pull inside the viewport edge.
          let x = rect.left
          let y = rect.bottom + 4
          if (x + width > window.innerWidth - 8) x = Math.max(8, window.innerWidth - width - 8)
          if (y + height > window.innerHeight - 8) y = Math.max(8, rect.top - height - 4)
          el.style.left = `${Math.max(8, x)}px`
          el.style.top = `${Math.max(8, y)}px`
        }
        const onKey = (event) => { if (event.key === 'Escape') { event.stopPropagation(); props.onClose() } }
        const onDown = (event) => {
          if (event.button === 2) return
          if (anchorRef.current !== null && event.target instanceof Node
            && (anchorRef.current.contains(event.target) || props.anchor?.contains(event.target))) return
          props.onClose()
        }
        window.addEventListener('keydown', onKey, true)
        document.addEventListener('pointerdown', onDown, true)
        return () => {
          window.removeEventListener('keydown', onKey, true)
          document.removeEventListener('pointerdown', onDown, true)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])
      return h('div', { ref: anchorRef, className: 'kb-pop', role: 'menu', style: { position: 'fixed', left: -9999, top: 0 } }, props.children)
    }

    function Modal(props) {
      React.useEffect(() => {
        const onKey = (event) => { if (event.key === 'Escape') props.onClose() }
        window.addEventListener('keydown', onKey, true)
        return () => window.removeEventListener('keydown', onKey, true)
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])
      return h('div', { className: 'kb-modal-back', onPointerDown: (event) => { if (event.target === event.currentTarget) props.onClose() } },
        h('div', { className: 'kb-modal', role: 'dialog', 'aria-label': props.title },
          h('h3', { className: 'kb-modal-title' }, props.title),
          props.children,
        ))
    }

    // ---------- tree root: direct children of a source, no synthetic layer ----------
    function TreeRoot(props) {
      const { sourceId } = props
      const state = useAsync(() => api('list', { source: sourceId, path: '' }), [sourceId], { soft: true })
      // Root refreshes on the bus too; soft reload keeps rows mounted so the
      // expansion state of the whole tree survives every file operation.
      React.useEffect(() => {
        const onRefresh = () => state.reload()
        treeBus.listeners.add(onRefresh)
        return () => { treeBus.listeners.delete(onRefresh) }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [sourceId])
      if (state.loading) return h('div', { className: 'kb-hint', style: { padding: '6px 8px' } }, t('loading'))
      if (state.error !== undefined) return h('div', { className: 'kb-hint', style: { padding: '6px 8px' } },
        h('span', { className: 'kb-status-error' }, `${t('loadFailed')}: ${state.error}`), ' ',
        h('button', { className: 'kb-btn kb-btn-sm', onClick: state.reload }, t('retry')))
      const items = state.value?.items ?? []
      if (items.length === 0) return h('div', { className: 'kb-empty', style: { padding: '28px 8px' } },
        h('div', { className: 'kb-empty-icon' }, Icon.book(28)),
        h('div', { style: { fontSize: '13px' } }, t('emptyTreeTitle')),
        h('div', { className: 'kb-empty-desc' }, t('emptyTreeDesc')))
      return h(React.Fragment, null, items.map((item) =>
        h(TreeRow, {
          key: `${sourceId}/${item.name}`,
          sourceId,
          path: item.name,
          name: item.name,
          kind: item.kind,
          text: item.text,
          depth: 0,
          activePath: props.activePath,
          reveal: props.reveal,
          onOpen: props.onOpen,
          onChanged: props.onChanged,
          onRenamed: props.onRenamed,
          onToast: props.onToast,
          onDeleteDone: props.onDeleteDone,
          renderMoreMenu: props.renderMoreMenu,
          openSession: props.openSession,
          startSession: props.startSession,
          readSourceRoot: props.readSourceRoot,
        })))
    }

    // ---------- tree ----------
    // Refresh bus: file ops publish; every mounted tree row re-reads its own
    // children WITHOUT losing its expanded state (no remount, no key bump).
    const treeBus = { listeners: new Set(), publish() { for (const fn of [...this.listeners]) { try { fn() } catch { /* one bad row never blocks the rest */ } } } }
    function TreeRow(props) {
      const { sourceId, path, name, kind, depth, onOpen } = props
      const [open, setOpen] = React.useState(false)
      const [children, setChildren] = React.useState(null)
      const [error, setError] = React.useState(undefined)
      const [menuOpen, setMenuOpen] = React.useState(false)
      const [editing, setEditing] = React.useState(false)
      const editingRef = React.useRef(false)
      const rowRef = React.useRef(null)
      const moreRef = React.useRef(null)
      const load = React.useCallback(() => {
        api('list', { source: sourceId, path })
          .then((payload) => { setChildren(payload.items ?? []); setError(undefined) })
          .catch((loadError) => setError(loadError.message))
      }, [sourceId, path])
      // Expansion-preserving refresh: reload only if this row is expanded.
      React.useEffect(() => {
        const onRefresh = () => { if (open) load() }
        treeBus.listeners.add(onRefresh)
        return () => { treeBus.listeners.delete(onRefresh) }
      }, [open, load])
      // Breadcrumb reveal: when a folder on the path to props.reveal.dirPath
      // is not open yet, open it (once per reveal tick).
      React.useEffect(() => {
        const rev = props.reveal
        if (rev === undefined || kind !== 'folder' || rev.sourceId !== sourceId) return
        if (rev.dirPath === path || rev.dirPath.startsWith(`${path}/`)) {
          if (!open) { if (children === null) load(); setOpen(true) }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [props.reveal?.tick])
      const toggle = () => {
        if (kind !== 'folder') return
        if (!open && children === null) load()
        setOpen(value => !value)
      }
      // Files mark selection (right pane previews); folders expand. The tree
      // itself never jumps or re-layouts on selection.
      const activate = () => {
        if (editingRef.current) return
        toggle()
        if (kind === 'file') onOpen({ sourceId, path, name, kind })
      }
      // F2 (or double-click on the name) starts inline rename.
      const startInlineRename = () => { editingRef.current = true; setEditing(true) }
      const onKey = (event) => {
        if (editingRef.current) return
        if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); activate() }
        else if (event.key === 'F2' && kind === 'file') { event.preventDefault(); startInlineRename() }
      }
      // Inline rename: Enter/blur commits, Esc cancels (blur-after-commit is
      // a no-op via editingRef).
      const submitRename = (inputEl) => {
        if (!editingRef.current) return
        editingRef.current = false
        const value = inputEl.value.trim()
        setEditing(false)
        if (value.length === 0 || value === name) return
        const parentDir = path.includes('/') ? `${path.slice(0, path.lastIndexOf('/'))}/` : ''
        void postKb('rename', { from: path, to: `${parentDir}${value}` })
          .then(() => { props.onChanged(); props.onRenamed?.(path, `${parentDir}${value}`) })
          .catch((error) => props.onToast?.(`${t('opFailed')}: ${error instanceof Error ? error.message : ''}`, true))
      }
      const isActive = props.activePath === path
      // Folders keep their breathing room to the name (line glyphs read
      // cramped without it); file type images sit flush per design.
      const fileIcon = kind === 'folder'
        ? h('span', { style: { marginRight: 6, display: 'inline-flex', alignItems: 'center' } }, open ? Icon.folderOpen() : Icon.folder())
        : fileTypeIcon(name, 22)
      return h(React.Fragment, null,
        h('div', {
          ref: rowRef,
          className: `kb-tree-row${isActive ? ' kb-tree-row-active' : ''}`,
          style: { paddingLeft: Math.max(6, 6 + depth * 14) },
          onClick: activate,
          onKeyDown: onKey,
          onDoubleClick: (event) => {
            if (event.target.closest('.kb-tree-more') || event.target.classList.contains('kb-inline-rename')) return
            if (kind === 'file') { event.stopPropagation(); startInlineRename() }
          },
          tabIndex: 0,
          role: kind === 'folder' ? 'treeitem' : 'button',
          'aria-expanded': kind === 'folder' ? open : undefined,
          'aria-selected': kind === 'file' ? isActive : undefined,
          'data-menu-open': menuOpen ? '' : undefined,
        },
          kind === 'folder' ? Icon.chevron(open) : h('span', { className: 'kb-tree-caret' }),
          fileIcon,
          editing
            ? h('input', {
              className: 'kb-inline-rename', defaultValue: name, autoFocus: true,
              onClick: (event) => event.stopPropagation(),
              onDoubleClick: (event) => event.stopPropagation(),
              onFocus: (event) => event.target.select(),
              onKeyDown: (event) => {
                event.stopPropagation()
                if (event.key === 'Enter') submitRename(event.target)
                else if (event.key === 'Escape') { editingRef.current = false; setEditing(false) }
              },
              onBlur: (event) => submitRename(event.target),
            })
            : h('span', { className: 'kb-tree-name', title: name }, name),
          h('span', { className: 'kb-tree-hit' },
            h('button', {
              ref: moreRef,
              className: 'kb-icon-btn kb-tree-more',
              'aria-label': t('more'),
              onClick: (event) => { event.stopPropagation(); setMenuOpen(value => !value) },
            }, Icon.moreH())),
        ),
        menuOpen && h(Popup, { anchor: moreRef.current, onClose: () => setMenuOpen(false) },
          h(props.renderMoreMenu, { sourceId, path, name, kind, onClose: () => setMenuOpen(false), onChanged: props.onChanged, anchor: moreRef.current, openSession: props.openSession, startSession: props.startSession, readSourceRoot: props.readSourceRoot, onInlineRename: startInlineRename, onToast: props.onToast, onDeleteDone: props.onDeleteDone }),
        ),
        open && error !== undefined && h('div', { className: 'kb-hint', style: { paddingLeft: 20 + depth * 14 } }, `${t('loadFailed')}: ${error}`),
        open && children !== null && children.length === 0 && h('div', { className: 'kb-hint', style: { paddingLeft: 20 + depth * 14 } }, t('emptyFolder')),
        open && children !== null && children.length > 0 && h('div', { role: 'group', 'aria-label': name },
          children.map((child) =>
            h(TreeRow, {
              key: `${sourceId}/${path ? path + '/' : ''}${child.name}`,
              sourceId,
              path: path ? `${path}/${child.name}` : child.name,
              name: child.name,
              kind: child.kind,
              text: child.text,
              depth: depth + 1,
              activePath: props.activePath,
              reveal: props.reveal,
              onOpen,
              onChanged: props.onChanged,
              onRenamed: props.onRenamed,
              onToast: props.onToast,
              onDeleteDone: props.onDeleteDone,
              renderMoreMenu: props.renderMoreMenu,
              openSession: props.openSession,
              startSession: props.startSession,
              readSourceRoot: props.readSourceRoot,
            })),
        ),
      )
    }

    // ---------- markdown-ish preview with wikilinks ----------
    function renderMarkdown(content, onWiki) {
      const lines = content.split('\n')
      const out = []
      for (const lineText of lines) {
        const parts = []
        let rest = lineText
        let key = 0
        const wiki = /\[\[([^\]]+)\]\]/g
        let match
        let last = 0
        while ((match = wiki.exec(rest)) !== null) {
          if (match.index > last) parts.push(rest.slice(last, match.index))
          const targetName = match[1].replace(/\.md$/, '').split('/').pop()
          parts.push(h('button', {
            key: `w${key++}`, className: 'kb-wikilink', type: 'button',
            onClick: () => onWiki(targetName),
          }, match[1]))
          last = match.index + match[0].length
        }
        parts.push(rest.slice(last))
        out.push(h('div', { key: out.length }, parts.length === 1 && typeof parts[0] === 'string' ? parts[0] : parts))
      }
      return out
    }

    // ---------- preview (type-aware: text/md inline, images & pdf via the
    // raw base64 route; html/svg/code gets a 预览/代码 toggle) ----------
    /** Decode base64 → Uint8Array (for Blob URLs; PDF needs one for PDFium). */
    const base64ToBytes = (b64) => {
      const bin = atob(b64)
      const bytes = new Uint8Array(bin.length)
      for (let i = 0; i < bin.length; i += 1) bytes[i] = bin.charCodeAt(i)
      return bytes
    }
    /** Decode base64 → UTF-8 text (server-encoded HTML for srcdoc). */
    const base64ToUtf8 = (b64) => {
      try { return decodeURIComponent(escape(atob(b64))) }
      catch { try { return atob(b64) } catch { return '' } }
    }
    const PREVIEW_KIND = (name) => {
      const ext = (name.toLowerCase().split('.').pop() ?? '')
      if (['png', 'jpg', 'jpeg', 'gif', 'webp', 'avif', 'bmp', 'ico'].includes(ext)) return 'image'
      if (ext === 'svg') return 'svg'
      if (ext === 'heic' || ext === 'heif') return 'heic'
      if (ext === 'pdf') return 'pdf'
      if (ext === 'html' || ext === 'htm') return 'html'
      if (['docx', 'xlsx', 'xls', 'pptx', 'ppt'].includes(ext)) return 'office'
      if (['csv', 'tsv'].includes(ext)) return 'csv'
      if (ext === 'canvas') return 'canvas'
      if (['css', 'scss', 'less', 'js', 'mjs', 'cjs', 'jsx', 'ts', 'tsx', 'vue', 'json', 'json5', 'py', 'rb', 'go', 'rs', 'java', 'kt', 'swift', 'c', 'h', 'cpp', 'hpp', 'cs', 'php', 'sh', 'bash', 'sql', 'yaml', 'yml', 'toml', 'xml', 'ini'].includes(ext)) return 'code'
      if (['mp3', 'wav', 'flac', 'aac', 'ogg', 'oga', 'm4a', '3gp', 'weba'].includes(ext)) return 'audio'
      if (['mp4', 'mov', 'mkv', 'webm', 'm4v', 'ogv'].includes(ext)) return 'video'
      return 'text'
    }

    function Preview(props) {
      const { sourceId, path } = props
      const kind = PREVIEW_KIND(path)
      const state = useAsync(() => {
        // Binary/converted types go through raw (base64); CSV/TSV are text —
        // the client builds the table itself from the read endpoint's content.
        // HTML goes through `page` (relative refs rewritten to asset URLs).
        if (kind === 'image' || kind === 'pdf' || kind === 'svg' || kind === 'office' || kind === 'audio' || kind === 'video' || kind === 'heic') return api('raw', { source: sourceId, path })
        if (kind === 'html') return api('page', { source: sourceId, path })
        return api('read', { source: sourceId, path })
      }, [sourceId, path, kind])
      // Scheme B: scripts stay off until explicitly enabled per session view.
      const [allowScripts, setAllowScripts] = React.useState(false)
      // PDF blob URL: built here (hoisted hook) — PDFium rejects data: URLs.
      const [pdfUrl, setPdfUrl] = React.useState(undefined)
      React.useEffect(() => {
        if (kind === 'pdf' && state.value?.data) {
          const blob = new Blob([base64ToBytes(state.value.data)], { type: 'application/pdf' })
          const objectUrl = URL.createObjectURL(blob)
          setPdfUrl(objectUrl)
          return () => URL.revokeObjectURL(objectUrl)
        }
        setPdfUrl(undefined)
        return undefined
      }, [kind, state.value])
      // Toolbar ⋯ menu (same actions as the tree-row menu, in preview context).
      const [menuOpen, setMenuOpen] = React.useState(false)
      const moreRef = React.useRef(null)
      // Esc returns to browse: window-level listener because focus may sit on
      // body after a popup closes. Guards: popups/modals/text fields handle
      // Esc themselves and win.
      React.useEffect(() => {
        const onKey = (event) => {
          if (event.key !== 'Escape') return
          if (menuOpen) return
          const active = document.activeElement
          // While a preview is open, Esc always returns to the results view —
          // even if the search box kept focus (clicking a hit doesn't move it).
          const previewOpen = !!document.querySelector('.kb-toolbar .kb-crumb-path')
          if (active && !previewOpen && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA' || active.isContentEditable)) return
          if (document.querySelector('.kb-pop, .kb-modal')) return
          event.preventDefault()
          props.onBack()
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
      }, [menuOpen, props.onBack])
      // Breadcrumb segments: every directory above the file, minus the root
      // (the root is the always-first source-name segment).
      const name = path.split('/').pop()
      const dirSegments = []
      {
        const parts = path.split('/')
        for (let i = 0; i < parts.length - 1; i += 1) {
          dirSegments.push({ name: parts[i], path: parts.slice(0, i + 1).join('/') })
        }
      }
      const [view, setView] = React.useState(kind === 'html' || kind === 'svg' || kind === 'csv' || kind === 'office' ? 'preview' : 'code')
      const isMd = /\.(md|markdown)$/i.test(path)
      // Original source for the html code view (page endpoint returns the
      // rewritten document); fetched lazily when the code tab opens.
      const [sourceCode, setSourceCode] = React.useState(undefined)
      React.useEffect(() => {
        if (kind === 'html' && view === 'code' && sourceCode === undefined) {
          void api('read', { source: sourceId, path })
            .then((r) => setSourceCode(r.content ?? ''))
            .catch(() => setSourceCode(''))
        }
      }, [kind, view, sourceCode, sourceId, path])

      // Toggle only where the two views genuinely differ. Second-tab label:
      // 代码 for source (html/svg), 文本 for extracted plain text (office/csv).
      const toggle = (kind === 'html' || kind === 'svg' || kind === 'office' || kind === 'csv') && h('div', { className: 'kb-view-toggle', role: 'tablist' },
        h('button', { className: 'kb-seg-btn', style: { height: 22, minWidth: 52 }, role: 'tab', 'data-active': view === 'preview' ? '' : undefined, onClick: () => setView('preview') }, t('preview')),
        h('button', { className: 'kb-seg-btn', style: { height: 22, minWidth: 52 }, role: 'tab', 'data-active': view === 'code' ? '' : undefined, onClick: () => setView('code') }, (kind === 'office' || kind === 'csv') ? t('textView') : t('code')),
        kind === 'html' && h('button', {
          className: 'kb-seg-btn', style: { height: 22, minWidth: 40 }, role: 'button', title: t('scriptsTitle'),
          'data-active': allowScripts ? '' : undefined,
          onClick: () => setAllowScripts(value => !value),
        }, 'JS'))
      let body = null
      if (state.loading) body = h('div', { className: 'kb-hint' }, t('loading'))
      else if (state.error !== undefined) {
        body = h('div', { className: 'kb-empty' },
          h('div', { className: 'kb-empty-icon' }, fileTypeIcon(name, 40)),
          h('div', { className: 'kb-status-error' }, state.error.includes('too large') || state.error.includes('exceeds') ? t('fileTooLarge') : `${t('loadFailed')}: ${state.error}`),
          h('div', { className: 'kb-empty-desc' }, t('previewUnsupported')),
          h('button', { className: 'kb-btn kb-btn-sm', onClick: state.reload }, t('retry')))
      } else if (state.value !== undefined) {
        if (kind === 'image') {
          body = h('div', { className: 'kb-content', style: { display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, whiteSpace: 'normal' } },
            h('img', { src: `data:${state.value.mime};base64,${state.value.data}`, alt: name, style: { maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', display: 'block' } }))
        } else if (kind === 'heic') {
          // Browsers cannot decode HEIC/HEIF natively — graceful fallback.
          body = h('div', { className: 'kb-empty' },
            h('div', { className: 'kb-empty-icon' }, fileTypeIcon(name, 40)),
            h('div', null, t('heicUnsupported')),
            h('div', { className: 'kb-empty-desc' }, t('previewUnsupported')))
        } else if (kind === 'audio') {
          body = h('div', { className: 'kb-content', style: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, padding: 24, whiteSpace: 'normal' } },
            h('audio', { controls: true, src: `data:${state.value.mime};base64,${state.value.data}`, style: { width: 'min(480px, 100%)' } }),
            h('div', { style: { fontSize: 12, color: 'var(--dsw-alias-label-secondary)' } }, name))
        } else if (kind === 'video') {
          body = h('div', { className: 'kb-content', style: { display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, whiteSpace: 'normal' } },
            h('video', { controls: true, src: `data:${state.value.mime};base64,${state.value.data}`, style: { maxWidth: '100%', maxHeight: '100%', display: 'block' } }))
        } else if (kind === 'canvas') {
          // Obsidian .canvas: JSON {nodes:[{id,type,text|file|url,...}], edges:[...]}
          let nodes = null
          let edgeCount = 0
          try {
            const parsed = JSON.parse(state.value.content ?? '{}')
            nodes = Array.isArray(parsed.nodes) ? parsed.nodes : []
            edgeCount = Array.isArray(parsed.edges) ? parsed.edges.length : 0
          } catch { nodes = null }
          body = nodes !== null
            ? h('div', { className: 'kb-content', style: { padding: 16, whiteSpace: 'normal', overflow: 'auto' } },
                h('div', { style: { fontSize: 12, color: 'var(--dsw-alias-label-secondary)', marginBottom: 4 } }, `${nodes.length} nodes · ${edgeCount} edges`),
                nodes.map((node, i) => h('div', { key: node?.id ?? i, style: { border: '1px solid var(--dsw-alias-border-l1)', borderRadius: 8, padding: '10px 14px', margin: '8px 0', background: 'var(--dsw-alias-bg-layer1)' } },
                  h('div', { style: { fontSize: 11, color: 'var(--dsw-alias-label-secondary)', marginBottom: 4 } }, String(node?.type ?? 'node')),
                  h('div', { style: { fontSize: 13, whiteSpace: 'pre-wrap' } }, String(node?.text ?? node?.file ?? node?.url ?? '')))))
            : h('div', { className: 'kb-content', style: { whiteSpace: 'pre-wrap' } }, state.value.content ?? '')
        } else if (kind === 'svg') {
          if (view === 'preview') {
            body = h('div', { className: 'kb-content', style: { display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, whiteSpace: 'normal' } },
              h('img', { src: `data:${state.value.mime};base64,${state.value.data}`, alt: name, style: { maxWidth: '100%', maxHeight: '100%', display: 'block' } }))
          } else {
            // Code view: decode the raw endpoint's base64 payload back to text.
            let svgText = ''
            try { svgText = decodeURIComponent(escape(atob(state.value.data))) }
            catch { try { svgText = atob(state.value.data) } catch { svgText = '' } }
            body = h('div', { className: 'kb-content' }, svgText)
          }
        } else if (kind === 'pdf') {
          // Chromium/Electron's PDFium viewer refuses data: URLs — hand it a
          // blob: URL instead (pdfUrl is built by the hoisted effect above).
          body = h('div', { className: 'kb-content', style: { padding: 0 } },
            pdfUrl
              ? h('iframe', { src: pdfUrl, title: name, style: { width: '100%', height: '100%', border: 0 } })
              : h('div', { className: 'kb-hint' }, t('loading')))
        } else if (kind === 'html' && view === 'preview') {
          // Web-like preview: the server rewrote relative refs to asset URLs
          // (images/stylesheets resolve against the KB folder). Scripts are
          // OFF until the user explicitly enables them (scheme B).
          body = h('div', { className: 'kb-content', style: { padding: 0 } },
            h('iframe', {
              // Keyed by allowScripts: toggling the sandbox flag must reload
              // the document (a live sandbox change does not apply).
              key: allowScripts ? 'js-on' : 'js-off',
              srcdoc: base64ToUtf8(state.value.data ?? ''), title: name,
              sandbox: allowScripts ? 'allow-same-origin allow-scripts' : 'allow-same-origin',
              style: { width: '100%', height: '100%', border: 0, background: '#fff' },
            }))
        } else if (kind === 'html' && view === 'code') {
          // Code view shows the ORIGINAL source (page endpoint returns the
          // rewritten document); fetched once on demand.
          body = h('div', { className: 'kb-content', style: { fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: 12.5, lineHeight: 1.6, whiteSpace: 'pre-wrap', padding: 16 } },
            sourceCode ?? t('loading'))
        } else if (kind === 'office') {
          // 预览 = server-converted HTML in a sandboxed srcdoc iframe;
          // 文本 = plain-text extraction served alongside the conversion.
          if (view === 'preview') {
            body = h('div', { className: 'kb-content', style: { padding: 0 } },
              h('iframe', {
                srcdoc: base64ToUtf8(state.value.data ?? ''), title: name,
                sandbox: 'allow-same-origin',
                style: { width: '100%', height: '100%', border: 0, background: '#fff' },
              }))
          } else {
            body = h('div', { className: 'kb-content', style: { fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: 12.5, lineHeight: 1.6, whiteSpace: 'pre-wrap', padding: 16 } },
              state.value.text ?? '')
          }
        } else if (kind === 'csv') {
          // 预览 = parsed table; 文本 = the raw file content.
          const content = state.value.content ?? ''
          if (view === 'code') {
            body = h('div', { className: 'kb-content', style: { fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: 12.5, lineHeight: 1.6, whiteSpace: 'pre-wrap', padding: 16 } }, content)
          } else {
          const lines = content.split('\n').filter(l => l.trim().length > 0)
          const delimiter = name.toLowerCase().endsWith('.tsv') ? '\t' : ','
          const rows = lines.map(line => line.split(delimiter).map(cell => cell.trim()))
          body = h('div', { className: 'kb-content', style: { padding: 16, overflow: 'auto' } },
            h('table', { style: { borderCollapse: 'collapse', width: '100%', fontSize: '13px' } },
              h('thead', { style: { background: 'var(--dsw-alias-bg-layer2)' } },
                h('tr', null,
                  rows[0]?.map((cell, i) => h('th', { key: i, style: { border: '1px solid var(--dsw-alias-border-l1)', padding: '8px', textAlign: 'left', fontWeight: 600 } }, cell))
                )),
              h('tbody', null,
                rows.slice(1).map((row, ri) => h('tr', { key: ri, style: { background: ri % 2 === 0 ? 'transparent' : 'var(--dsw-alias-bg-layer1)' } },
                  row.map((cell, ci) => h('td', { key: ci, style: { border: '1px solid var(--dsw-alias-border-l1)', padding: '8px' } }, cell))
                ))
              )
            ))
          }
        } else {
          const content = state.value.content ?? ''
          const renderAsMd = isMd && !(kind === 'html' || kind === 'svg' || kind === 'code')
          body = h('div', { className: `kb-content${renderAsMd ? ' kb-md' : ''}` },
            renderAsMd ? renderMarkdown(content, props.onWiki) : content)
        }
      }
      return h('div', { className: 'kb-surface' },
        h('div', { className: 'kb-toolbar', style: { borderBottom: '1px solid var(--dsw-alias-border-l1)' } },
          h('button', { className: 'kb-btn', style: { padding: '4px 8px' }, onClick: props.onBack, title: t('back'), 'aria-label': t('back') }, '‹'),
          fileTypeIcon(name, 22),
          h('div', { className: 'kb-crumb-path' },
            h('button', { className: 'kb-crumb-seg', onClick: () => props.onOpenDir?.('') }, props.sourceName ?? ''),
            ...dirSegments.map((seg, i) => h(React.Fragment, { key: i },
              h('span', { style: { color: 'var(--dsw-alias-label-caption)', flex: 'none' } }, '›'),
              h('button', { className: 'kb-crumb-seg', onClick: () => props.onOpenDir?.(seg.path) }, seg.name))),
            h('span', { style: { color: 'var(--dsw-alias-label-caption)', flex: 'none' } }, '›'),
            h('span', { className: 'kb-crumb-here' }, name)),
          toggle,
          h('button', {
            ref: moreRef, className: 'kb-icon-btn kb-tree-more', 'aria-label': t('more'),
            onClick: (event) => { event.stopPropagation(); setMenuOpen(value => !value) },
          }, Icon.moreH())),
        body,
        menuOpen && h(Popup, { anchor: moreRef.current, onClose: () => setMenuOpen(false) },
          h(MoreMenu, { sourceId, path, name, kind: 'file', onClose: (message) => { setMenuOpen(false); if (message) props.onToast?.(message) }, onChanged: props.onChanged, anchor: moreRef.current, openSession: props.openSession, startSession: props.startSession, readSourceRoot: props.readSourceRoot, onAfterOp: props.onAfterOp, onDeleteDone: props.onDeleteDone })),
      )
    }

    // ---------- search (workbuddy picker style: icon rows + highlighted
    // name/summary + footer count) ----------
    function highlightText(text, query) {
      const terms = query.trim().toLowerCase().split(/\s+/).filter(term => term.length > 0)
      if (terms.length === 0) return [text]
      const parts = []
      let rest = text
      let key = 0
      while (rest.length > 0) {
        const rl = rest.toLowerCase()
        let at = -1
        let hitTerm = ''
        for (const term of terms) {
          const i = rl.indexOf(term)
          if (i >= 0 && (at < 0 || i < at)) { at = i; hitTerm = term }
        }
        if (at < 0) { parts.push(rest); break }
        if (at > 0) parts.push(rest.slice(0, at))
        parts.push(h('span', { key: `m${key++}`, className: 'kb-hit-mark' }, rest.slice(at, at + hitTerm.length)))
        rest = rest.slice(at + hitTerm.length)
      }
      return parts
    }

    function SearchView(props) {
      const source = props.source
      // Result state lives in the panel (props.result/onResult) so switching
      // Browse↔Search keeps the last search's hits instead of resetting.
      const [state, setState] = React.useState(props.result ?? { idle: true })
      const emit = React.useCallback((next) => { setState(next); props.onResult?.(next) }, [props.onResult])
      const run = React.useCallback(() => {
        const trimmed = (props.query ?? '').trim()
        if (!trimmed) { emit({ idle: true }); return }
        emit({ loading: true })
        api('search', { source: source.id, q: trimmed })
          .then((payload) => emit({ loading: false, value: payload }))
          .catch((error) => emit({ loading: false, error: error instanceof Error ? error.message : String(error) }))
      }, [source.id, props.query, emit])
      // Mount = mode switch: keep a preserved result; run only when there is
      // nothing preserved (first-ever search). Later runTick bumps always run.
      const mounted = React.useRef(false)
      React.useEffect(() => {
        if (!mounted.current) {
          mounted.current = true
          if (props.result === undefined || props.result.idle === true) run()
          return
        }
        run()
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [props.runTick, source.id])
      const hits = state.value?.hits ?? []
      return h('div', { className: 'kb-surface' },
        h('div', { className: 'kb-content', style: { fontFamily: 'inherit', padding: 0 } },
          state.idle && h('div', { className: 'kb-empty' },
            h('div', { className: 'kb-empty-icon' }, Icon.book(28)),
            h('div', null, t('searchHint'))),
          state.loading && h('div', { className: 'kb-hint' }, t('searching')),
          state.error !== undefined && h('div', { className: 'kb-hint' },
            h('span', { className: 'kb-status-error' }, `${t('loadFailed')}: ${state.error}`), ' ',
            h('button', { className: 'kb-btn kb-btn-sm', onClick: run }, t('retry'))),
          state.value !== undefined && hits.length === 0 && h('div', { className: 'kb-empty' },
            h('div', { className: 'kb-empty-icon' }, Icon.book(28)),
            h('div', null, t('noHitsTitle')),
            h('div', { className: 'kb-empty-desc' }, t('noHitsDesc'))),
          state.value !== undefined && hits.length > 0 && h('div', { style: { padding: '6px 8px' } },
            hits.map((hit, index) =>
              h('div', {
                key: `${hit.path}:${hit.line}:${index}`,
                className: 'kb-hit', role: 'button', tabIndex: 0,
                onClick: (event) => { event.currentTarget.focus(); props.onOpenHit(hit.path) },
                onKeyDown: (event) => {
                  if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); props.onOpenHit(hit.path) }
                },
              },
                h('div', { className: 'kb-hit-main' },
                  iconForFile(hit.path.split('/').pop() ?? hit.path)(22),
                  h('span', { className: 'kb-hit-name' },
                    highlightText(hit.path.split('/').pop() ?? hit.path, props.query ?? ''),
                    h('span', { className: 'kb-hit-dir' }, hit.path.includes('/') ? hit.path.slice(0, hit.path.lastIndexOf('/')) : '/')),
                  h('span', { className: 'kb-hit-score' }, `:${hit.line}`)),
                h('div', { className: 'kb-hit-snippet' }, highlightText(hit.snippet, props.query ?? '')),
              ))),
        ),
        state.value !== undefined && hits.length > 0 && h('div', { className: 'kb-surface-foot' },
          t('hitsCount', { n: hits.length }),
          ` · ${t('scanned', { n: state.value.scanned ?? 0 })}`,
          state.value.truncated ? ` · ${t('searchTruncated')}` : ''),
      )
    }

    // ---------- diagnostics ----------
    function DiagnosticsView() {
      const state = useAsync(() => api('stats'), [])
      if (state.loading) return h('div', { className: 'kb-main' }, h('div', { className: 'kb-hint' }, t('loading')))
      if (state.error !== undefined) return h('div', { className: 'kb-main' }, h('div', { className: 'kb-hint' },
        h('span', { className: 'kb-status-error' }, `${t('loadFailed')}: ${state.error}`), ' ',
        h('button', { className: 'kb-btn kb-btn-sm', onClick: state.reload }, t('retry'))))
      const data = state.value
      return h('div', { className: 'kb-main', style: { padding: '10px 14px 14px' } },
        h('div', { className: 'kb-surface' },
          h('div', { className: 'kb-toolbar', style: { borderBottom: '1px solid var(--dsw-alias-border-l1)' } },
            h('span', { className: 'kb-crumb' }, `${t('diagGenerated')}: ${data.generatedAt}`)),
          h('div', { className: 'kb-content', style: { fontFamily: 'inherit', padding: '6px 8px' } },
            ...data.sources.map((source) =>
              h('div', { key: source.id, className: 'kb-diag-row' },
                h('span', { className: 'kb-diag-key' }, `${t('diagSources')}: ${source.name} (${source.type})`),
                h('span', { className: `kb-status ${source.status === 'ok' ? 'kb-status-ok' : 'kb-status-warn'}` }, source.status),
                h('span', null, `${t('diagFiles')}: ${source.files}`),
              )),
            h('div', { className: 'kb-diag-row' },
              h('span', { className: 'kb-diag-key' }, t('diagGuidance')),
              h('span', { className: data.settings.guidanceEnabled ? 'kb-status-ok' : 'kb-status-warn' }, data.settings.guidanceEnabled ? t('on') : t('off')),
              h('span', { className: 'kb-diag-key' }, t('diagArchive')),
              h('span', { className: data.settings.autoArchiveEnabled ? 'kb-status-ok' : 'kb-status-warn' }, data.settings.autoArchiveEnabled ? t('on') : t('off'))),
            h('div', { className: 'kb-diag-row' },
              h('span', { className: 'kb-diag-key' }, t('diagIndex')),
              h('span', null, String(data.index.entries))),
          ),
        ))
    }

    // ---------- tiered memory view ----------
    function MemoryView(props) {
      const showToast = props.showToast
      const [memState, setMemState] = React.useState({ loading: true })
      const [tierFilter, setTierFilter] = React.useState('all')
      const [query, setQuery] = React.useState('')
      const [editing, setEditing] = React.useState(undefined) // { path, meta, body } | { newTier }
      const [exportOpen, setExportOpen] = React.useState(false)
      const [exportDest, setExportDest] = React.useState('')
      const [exportTier, setExportTier] = React.useState('all')
      const [exportSharded, setExportSharded] = React.useState(false)
      const [exporting, setExporting] = React.useState(false)
      const [snapshots, setSnapshots] = React.useState([])
      const [snapOpen, setSnapOpen] = React.useState(false)
      const [wb, setWb] = React.useState(undefined)
      const [wbBusy, setWbBusy] = React.useState('')

      const reload = React.useCallback(async () => {
        setMemState({ loading: true })
        try {
          const data = await api('memory-list')
          setMemState({ memories: data.memories ?? [], root: data.root })
        } catch (error) {
          setMemState({ error: error instanceof Error ? error.message : String(error) })
        }
      }, [])
      React.useEffect(() => { void reload() }, [reload])
      const reloadSnapshots = React.useCallback(async () => {
        try {
          const data = await api('memory-snapshots')
          setSnapshots(data.snapshots ?? [])
        } catch { setSnapshots([]) }
      }, [])
      const reloadWb = React.useCallback(async () => {
        try {
          const data = await api('wb-status')
          setWb(data)
        } catch { setWb({ available: false }) }
      }, [])
      React.useEffect(() => { void reloadSnapshots(); void reloadWb() }, [reloadSnapshots, reloadWb])

      const memories = memState.memories ?? []
      const visible = query.trim().length > 0
        ? memories.filter((item) => `${item.title} ${item.keywords.join(' ')} ${item.summary}`.toLowerCase().includes(query.trim().toLowerCase()))
        : memories
      const filtered = tierFilter === 'all' ? visible : visible.filter((item) => item.tier === tierFilter)
      const countByTier = (tier) => memories.filter((item) => item.tier === tier).length

      const openNew = () => setEditing({ newTier: tierFilter === 'all' ? 'global' : tierFilter })
      const openEdit = async (item) => {
        try {
          const data = await api('memory-read', { path: item.path })
          setEditing({ path: item.path, meta: data.meta ?? {}, body: data.body ?? '', workbuddy: item.source === 'workbuddy' })
        } catch (error) {
          showToast(`${t('loadFailed')}: ${error instanceof Error ? error.message : ''}`, true)
        }
      }
      const saveEdit = async (title, keywords, summary, body, tier, cwd) => {
        try {
          if (editing?.path !== undefined) {
            // Rewrite in place through the write path: delete + create keeps meta consistent.
            await postKb('memory-delete', { path: editing.path })
          }
          await postKb('memory-save', { tier, title, keywords, summary, content: body, cwd })
          showToast(t('memSavedToast'))
          setEditing(undefined)
          await reload()
        } catch (error) {
          showToast(`${t('opFailed')}: ${error instanceof Error ? error.message : ''}`, true)
        }
      }
      const removeMemory = async (item) => {
        if (!window.confirm(`${t('memDeleteConfirm')}: ${item.title}?`)) return
        try {
          await postKb('memory-delete', { path: item.path })
          showToast(t('memDeletedToast'))
          await reload()
        } catch (error) {
          showToast(`${t('opFailed')}: ${error instanceof Error ? error.message : ''}`, true)
        }
      }
      const runExport = async () => {
        setExporting(true)
        try {
          const data = await postKb('memory-export', { destination: exportDest.trim() || undefined, tier: exportTier, format: exportSharded ? 'sharded' : 'flat' })
          showToast(`${t('memExportDone')}: ${data.exported} → ${data.destination}`)
          setExportOpen(false)
          await Promise.all([reloadSnapshots(), reload()])
        } catch (error) {
          showToast(`${t('opFailed')}: ${error instanceof Error ? error.message : ''}`, true)
        } finally {
          setExporting(false)
        }
      }
      const restoreSnapshot = async (name) => {
        try {
          const data = await postKb('memory-restore', { snapshot: name })
          showToast(`${t('memRestoreDone')}: ${data.verified}/${data.files}`)
          setSnapOpen(false)
          await reload()
        } catch (error) {
          showToast(`${t('opFailed')}: ${error instanceof Error ? error.message : ''}`, true)
        }
      }
      const runWbImport = async () => {
        setWbBusy('import')
        try {
          const data = await postKb('wb-import', {})
          showToast(`${t('wbImportDone')}: ${data.count}`)
          await Promise.all([reload(), reloadWb(), reloadSnapshots()])
        } catch (error) {
          showToast(`${t('opFailed')}: ${error instanceof Error ? error.message : ''}`, true)
        } finally { setWbBusy('') }
      }
      const runWbExport = async () => {
        setWbBusy('export')
        try {
          const data = await postKb('wb-export', {})
          showToast(`${t('wbExportDone')}: ${data.count} → ${data.destination}`)
          await Promise.all([reloadSnapshots(), reloadWb()])
        } catch (error) {
          showToast(`${t('opFailed')}: ${error instanceof Error ? error.message : ''}`, true)
        } finally { setWbBusy('') }
      }

      const tierChip = (tier, label) => h('button', {
        className: 'kb-src-chip', 'data-active': tierFilter === tier ? '' : undefined,
        onClick: () => setTierFilter(tier),
      }, `${label} (${tier === 'all' ? memories.length : countByTier(tier)})`)

      if (memState.loading) return h('div', { className: 'kb-hint' }, t('loading'))
      if (memState.error !== undefined) return h('div', { className: 'kb-hint kb-status-error' }, `${t('loadFailed')}: ${memState.error}`)

      return h('div', { className: 'kb-main', style: { padding: '10px 14px 14px' } },
        h('div', { className: 'kb-toolbar', style: { gap: 8, flexWrap: 'wrap' } },
          tierChip('all', t('memAll')),
          tierChip('global', t('memGlobal')),
          tierChip('workspace', t('memWorkspace')),
          tierChip('session', t('memSession')),
          memories.some((item) => item.tier === 'workbuddy') && tierChip('workbuddy', 'WorkBuddy'),
          h('div', { style: { flex: 1 } }),
          h('div', { className: 'kb-search-box' },
            Icon.searchGlyph(14),
            h('input', { value: query, placeholder: t('memSearchPlaceholder'), onChange: (event) => setQuery(event.target.value) }),
            query.length > 0 && h('button', { className: 'kb-search-clear', onClick: () => setQuery('') }, '×')),
          h('button', { className: 'kb-btn kb-btn-sm', onClick: openNew }, Icon.plus(), t('memNew')),
          h('button', { className: 'kb-btn kb-btn-sm', onClick: () => setExportOpen(value => !value) }, Icon.upload2(), t('memExport')),
          h('button', { className: 'kb-btn kb-btn-sm', onClick: () => { setSnapOpen(value => !value); void reloadSnapshots() } }, Icon.task(), t('memSnapshots'))),
        exportOpen && h('div', { className: 'kb-surface', style: { padding: 12, margin: '8px 0', display: 'grid', gap: 8 } },
          h('div', { className: 'kb-diag-key' }, t('memExportTitle')),
          h('input', { value: exportDest, placeholder: t('memExportDestPlaceholder'), onChange: (event) => setExportDest(event.target.value), style: { width: '100%' } }),
          h('div', { style: { display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' } },
            h('select', { value: exportTier, onChange: (event) => setExportTier(event.target.value), className: 'kb-btn kb-btn-sm' },
              h('option', { value: 'all' }, t('memAll')),
              h('option', { value: 'global' }, t('memGlobal')),
              h('option', { value: 'workspace' }, t('memWorkspace')),
              h('option', { value: 'session' }, t('memSession')),
              h('option', { value: 'workbuddy' }, 'WorkBuddy')),
            h('label', { style: { display: 'flex', gap: 4, alignItems: 'center', fontSize: 12 } },
              h('input', { type: 'checkbox', checked: exportSharded, onChange: (event) => setExportSharded(event.target.checked) }),
              t('memExportSharded')),
            h('button', { className: 'kb-btn kb-btn-sm', disabled: exporting, onClick: runExport }, exporting ? t('memExporting') : t('memExportGo'))),
          h('div', { className: 'kb-hint', style: { fontSize: 11 } }, t('memExportHint'))),
        snapOpen && h('div', { className: 'kb-surface', style: { padding: 12, margin: '8px 0', display: 'grid', gap: 6 } },
          h('div', { className: 'kb-diag-key' }, t('memSnapshotsTitle')),
          snapshots.length === 0 ? h('div', { className: 'kb-hint' }, t('memNoSnapshots')) :
            snapshots.map((snap) => h('div', { key: snap.name, style: { display: 'flex', gap: 8, alignItems: 'center' } },
              h('code', { style: { fontSize: 11 } }, snap.name),
              h('button', { className: 'kb-btn kb-btn-sm', onClick: () => restoreSnapshot(snap.name) }, t('memRestore'))))),
        editing !== undefined && h(MemoryEditor, {
          initial: editing, onCancel: () => setEditing(undefined), onSave: saveEdit,
        }),
        h('div', { className: 'kb-surface', style: { padding: 4 } },
          filtered.length === 0
            ? h('div', { className: 'kb-empty', style: { padding: 20 } }, h('div', { className: 'kb-empty-desc' }, t('memEmpty')))
            : filtered.map((item) => h('div', {
              key: item.path, className: 'kb-diag-row', style: { alignItems: 'flex-start', padding: '8px 6px', borderBottom: '1px solid var(--dsw-alias-border-l1)' },
            },
              h('div', { style: { flex: 1, minWidth: 0 } },
                h('div', { style: { display: 'flex', gap: 6, alignItems: 'center' } },
                  h('span', { className: `kb-status ${item.tier === 'global' ? 'kb-status-ok' : item.tier === 'workbuddy' ? 'kb-status-warn' : ''}` }, item.tier),
                  item.supersededBy !== undefined && h('span', { className: 'kb-status kb-status-warn' }, t('memSuperseded')),
                  h('strong', { style: { fontSize: 13 } }, item.title)),
                item.keywords.length > 0 && h('div', { style: { fontSize: 11, opacity: 0.7, marginTop: 2 } }, item.keywords.join(' · ')),
                h('div', { style: { fontSize: 12, opacity: 0.85, marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } }, item.summary),
                h('div', { style: { fontSize: 10, opacity: 0.5, marginTop: 2, fontFamily: 'monospace' } }, item.path)),
              h('div', { style: { display: 'flex', gap: 4, flex: 'none' } },
                h('button', { className: 'kb-btn kb-btn-sm', onClick: () => openEdit(item) }, t('edit')),
                item.source !== 'workbuddy' && h('button', { className: 'kb-btn kb-btn-sm', onClick: () => removeMemory(item) }, Icon.trash()))))),
        h('div', { className: 'kb-surface', style: { padding: 12, marginTop: 10, display: 'grid', gap: 8 } },
          h('div', { className: 'kb-diag-key' }, 'WorkBuddy'),
          wb === undefined ? h('div', { className: 'kb-hint' }, t('loading'))
            : wb.available === false ? h('div', { className: 'kb-hint' }, t('wbMissing'))
              : h('div', { style: { display: 'grid', gap: 6 } },
                h('div', { style: { fontSize: 12, opacity: 0.8 } },
                  `${t('wbStatus')}: ${wb.home} · ${t('wbMemoryFiles')}: ${wb.memoryFiles ?? 0} · ${t('wbPersonal')}: ${(wb.personal ?? []).length}`),
                h('div', { style: { display: 'flex', gap: 8 } },
                  h('button', { className: 'kb-btn kb-btn-sm', disabled: wbBusy !== '', onClick: runWbImport }, wbBusy === 'import' ? t('wbImporting') : t('wbImport')),
                  h('button', { className: 'kb-btn kb-btn-sm', disabled: wbBusy !== '', onClick: runWbExport }, wbBusy === 'export' ? t('wbExporting') : t('wbExport'))),
                h('div', { className: 'kb-hint', style: { fontSize: 11 } }, t('wbBridgeHint')))),
      )
    }

    function MemoryEditor(props) {
      const initial = props.initial
      const isNew = initial?.newTier !== undefined
      const [title, setTitle] = React.useState(isNew ? '' : initial.meta?.title ?? '')
      const [keywords, setKeywords] = React.useState(isNew ? '' : (Array.isArray(initial.meta?.keywords) ? initial.meta.keywords : []).join(', '))
      const [summary, setSummary] = React.useState(isNew ? '' : initial.meta?.summary ?? '')
      const [body, setBody] = React.useState(isNew ? '' : initial.body ?? '')
      const [tier, setTier] = React.useState(isNew ? initial.newTier : initial.meta?.tier === 'workbuddy' ? 'global' : initial.meta?.tier ?? 'global')
      const [cwd, setCwd] = React.useState('')
      const [saving, setSaving] = React.useState(false)
      const readonly = initial?.workbuddy === true
      return h('div', { className: 'kb-surface', style: { padding: 12, margin: '8px 0', display: 'grid', gap: 8 } },
        h('div', { style: { display: 'flex', gap: 8, flexWrap: 'wrap' } },
          isNew && h('select', { value: tier, onChange: (event) => setTier(event.target.value), className: 'kb-btn kb-btn-sm' },
            h('option', { value: 'global' }, t('memGlobal')),
            h('option', { value: 'workspace' }, t('memWorkspace')),
            h('option', { value: 'session' }, t('memSession'))),
          !isNew && readonly && h('span', { className: 'kb-status kb-status-warn' }, t('memReadonly'))),
        isNew && tier === 'workspace' && h('input', { value: cwd, placeholder: t('memCwdPlaceholder'), onChange: (event) => setCwd(event.target.value), style: { width: '100%' } }),
        h('input', { value: title, disabled: readonly, placeholder: t('memTitlePlaceholder'), onChange: (event) => setTitle(event.target.value), style: { width: '100%', fontWeight: 600 } }),
        h('input', { value: keywords, disabled: readonly, placeholder: t('memKeywordsPlaceholder'), onChange: (event) => setKeywords(event.target.value), style: { width: '100%' } }),
        h('input', { value: summary, disabled: readonly, placeholder: t('memSummaryPlaceholder'), onChange: (event) => setSummary(event.target.value), style: { width: '100%' } }),
        h('textarea', { value: body, disabled: readonly, onChange: (event) => setBody(event.target.value), rows: 8, style: { width: '100%', fontFamily: 'monospace', fontSize: 12, resize: 'vertical' } }),
        h('div', { style: { display: 'flex', gap: 8 } },
          h('button', { className: 'kb-btn kb-btn-sm', disabled: saving || readonly || title.trim().length === 0 || body.trim().length === 0, onClick: () => { setSaving(true); void props.onSave(title.trim(), keywords, summary, body, tier, cwd.trim()).finally(() => setSaving(false)) } }, saving ? t('memSaving') : t('save')),
          h('button', { className: 'kb-btn kb-btn-sm', onClick: props.onCancel }, t('cancel'))))
    }

    // ---------- source form ----------
    function SourceForm(props) {
      const initial = props.initial ?? { type: 'local', id: `kb-${Date.now().toString(36)}` }
      const [type, setType] = React.useState(initial.type)
      const [name, setName] = React.useState(initial.name ?? '')
      const [path, setPath] = React.useState(initial.path ?? '')
      const [url, setUrl] = React.useState(initial.url ?? '')
      const [username, setUsername] = React.useState(initial.username ?? '')
      const [password, setPassword] = React.useState('')
      const [clearPassword, setClearPassword] = React.useState(false)
      const [basePath, setBasePath] = React.useState(initial.basePath ?? '')
      const [testing, setTesting] = React.useState(false)
      const [testResult, setTestResult] = React.useState(undefined)
      const [saving, setSaving] = React.useState(false)
      const [error, setError] = React.useState(undefined)
      const pickFolder = async () => {
        try {
          const picked = typeof props.pickDirectory === 'function' ? await props.pickDirectory() : null
          if (picked) setPath(picked)
        } catch { /* picker unavailable */ }
      }
      const buildSource = () => {
        const source = { id: initial.id, name: name.trim() || (type === 'local' ? path.split('/').pop() || 'Folder' : new URL(url).hostname), type }
        if (type === 'local') source.path = path.trim()
        else {
          source.url = url.trim().replace(/\/+$/, '')
          if (username.trim()) source.username = username.trim()
          if (basePath.trim()) source.basePath = basePath.trim()
          if (password) source.password = password
          if (clearPassword) source.clearPassword = true
          source.hasPassword = password ? true : initial.hasPassword === true && !clearPassword
        }
        return source
      }
      const runTest = async () => {
        setTesting(true); setTestResult(undefined)
        try {
          const probe = await postKb('probe', { source: buildSource(), ...(password ? { password } : {}) })
          setTestResult({ ok: true, items: probe.items?.length ?? 0 })
        } catch (probeError) {
          setTestResult({ ok: false, message: probeError instanceof Error ? probeError.message : String(probeError) })
        } finally { setTesting(false) }
      }
      const submit = async () => {
        setSaving(true); setError(undefined)
        try { await props.onSave(buildSource()) }
        catch (saveError) { setError(saveError instanceof Error ? saveError.message : String(saveError)) }
        finally { setSaving(false) }
      }
      const valid = type === 'local' ? path.trim().length > 0 : url.trim().length > 0
      return h('div', { className: 'kb-form' },
        h('div', { style: { display: 'flex', gap: 8 } },
          h('div', { className: `kb-type-row${type === 'local' ? ' kb-type-row-selected' : ''}`, style: { flex: 1 }, onClick: () => setType('local'), role: 'radio', 'aria-checked': type === 'local' },
            h('span', { className: 'kb-type-name' }, t('typeLocal')),
            h('span', { className: 'kb-type-desc' }, t('typeLocalDesc'))),
          h('div', { className: `kb-type-row${type === 'webdav' ? ' kb-type-row-selected' : ''}`, style: { flex: 1 }, onClick: () => setType('webdav'), role: 'radio', 'aria-checked': type === 'webdav' },
            h('span', { className: 'kb-type-name' }, t('typeWebdav')),
            h('span', { className: 'kb-type-desc' }, t('typeWebdavDesc')))),
        h('label', null, t('nameLabel'),
          h('input', { className: 'kb-input', value: name, placeholder: t('namePlaceholder'), onChange: (event) => setName(event.target.value) })),
        type === 'local' && h('label', null, t('pathLabel'),
          h('div', { className: 'kb-form-row' },
            h('input', { className: 'kb-input', style: { flex: 1 }, value: path, onChange: (event) => setPath(event.target.value) }),
            h('button', { className: 'kb-btn', onClick: pickFolder }, t('pickFolder')))),
        type === 'webdav' && h(React.Fragment, null,
          h('label', null, t('urlLabel'),
            h('input', { className: 'kb-input', value: url, placeholder: t('urlPlaceholder'), onChange: (event) => setUrl(event.target.value) })),
          url.trim().startsWith('http:') && h('div', { className: 'kb-status kb-status-warn' }, t('httpWarning')),
          h('label', null, t('usernameLabel'),
            h('input', { className: 'kb-input', value: username, onChange: (event) => setUsername(event.target.value), autoComplete: 'off' })),
          h('label', null, t('passwordLabel'),
            h('input', { className: 'kb-input', type: 'password', value: password, onChange: (event) => setPassword(event.target.value), autoComplete: 'new-password' })),
          initial.hasPassword === true && h('label', { style: { flexDirection: 'row', alignItems: 'center', gap: 6 } },
            h('input', { type: 'checkbox', checked: clearPassword, onChange: (event) => setClearPassword(event.target.checked) }),
            t('removePassword')),
          h('label', null, t('basePathLabel'),
            h('input', { className: 'kb-input', value: basePath, onChange: (event) => setBasePath(event.target.value) }))),
        type === 'webdav' && h('div', { className: 'kb-form-row' },
          h('button', { className: 'kb-btn', onClick: runTest, disabled: testing || !valid }, testing ? t('testing') : t('testConn')),
          testResult !== undefined && h('span', { className: `kb-status ${testResult.ok ? 'kb-status-ok' : 'kb-status-error'}` },
            testResult.ok ? t('connOk', { n: testResult.items ?? 0 }) : `${t('connFailed')}: ${testResult.message ?? ''}`)),
        error !== undefined && h('div', { className: 'kb-status kb-status-error' }, `${t('saveFailed')}: ${error}`),
        h('div', { className: 'kb-form-row', style: { justifyContent: 'flex-end', marginTop: 4 } },
          props.onCancel !== undefined && h('button', { className: 'kb-btn', onClick: props.onCancel }, t('cancel')),
          h('button', { className: 'kb-btn kb-btn-primary', onClick: submit, disabled: saving || !valid }, saving ? t('saving') : t('saveSource'))),
      )
    }

    // ---------- sources manager ----------
    function statusLabel(status) {
      if (status === 'missing') return { text: t('statusMissing'), cls: 'kb-status-warn' }
      if (status === 'not-folder') return { text: t('statusNotFolder'), cls: 'kb-status-warn' }
      if (status === 'needs-password') return { text: t('statusNeedsPassword'), cls: 'kb-status-warn' }
      return { text: t('statusOk'), cls: 'kb-status-ok' }
    }

    function SourcesView(props) {
      const { sources, onEdit, onDelete, onAdd, onDone, canEdit } = props
      const [confirmingId, setConfirmingId] = React.useState(undefined)
      // Diagnostics-style layout: left-aligned rows on one surface, footer
      // actions left-aligned in the same rhythm (Add first, Back after).
      return h('div', { className: 'kb-main', style: { padding: '10px 14px 14px' } },
        h('div', { className: 'kb-surface' },
          h('div', { className: 'kb-toolbar', style: { borderBottom: '1px solid var(--dsw-alias-border-l1)' } }, h('h2', { className: 'kb-modal-title' }, t('sourcesTitle'))),
          h('div', { className: 'kb-sources' },
            sources.length === 0 && h('div', { className: 'kb-hint' }, t('noSources')),
            sources.map((source) => {
              const status = statusLabel(source.status)
              const meta = source.type === 'local' ? source.path : `${source.url}${source.basePath ? '/' + source.basePath : ''}`
              return h('div', { key: source.id, className: 'kb-source-row' },
                h('div', { className: 'kb-source-main' },
                  h('div', { className: 'kb-source-name' }, `${source.name} · ${source.type === 'local' ? t('typeLocal') : t('typeWebdav')}`),
                  h('div', { className: 'kb-source-meta' }, meta)),
                h('span', { className: `kb-status ${status.cls}` }, status.text),
                canEdit && h('button', { className: 'kb-btn kb-btn-sm', onClick: () => onEdit(source) }, t('edit')),
                canEdit && (confirmingId === source.id
                  ? h('button', {
                    className: 'kb-btn kb-btn-sm kb-btn-danger', autoFocus: true,
                    onClick: () => { setConfirmingId(undefined); onDelete(source) },
                    onBlur: () => setConfirmingId(undefined),
                  }, t('confirm'))
                  : h('button', { className: 'kb-btn kb-btn-sm kb-btn-danger', onClick: () => setConfirmingId(source.id) }, t('delete'))))
            }),
            h('div', { className: 'kb-surface-foot' },
              canEdit && h('button', { className: 'kb-btn kb-btn-primary', onClick: onAdd }, t('addSource')),
              h('button', { className: 'kb-btn', onClick: onDone }, t('back')),
              h('span', { style: { flex: 1 } }),
              t('itemsCount', { n: sources.length }))),
        ))
    }

    // ---------- folder picker tree (move-to destination selection) ----------
    function FolderPickerTree(props) {
      const { sourceId, currentPath, onPick } = props
      const [picked, setPicked] = React.useState('') // '' = source root
      const isDescendantOfCurrent = (folder) => folder === currentPath || currentPath.startsWith(`${folder}/`)
      const Row = ({ path: rowPath, name, depth }) => {
        const [open, setOpen] = React.useState(false)
        const [children, setChildren] = React.useState(null)
        const load = () => {
          if (open || children !== null) { setOpen(value => !value); return }
          api('list', { source: sourceId, path: rowPath })
            .then((payload) => { setChildren((payload.items ?? []).filter(item => item.kind === 'folder')); setOpen(true) })
            .catch(() => { setChildren([]); setOpen(true) })
        }
        const disabled = rowPath === currentPath || isDescendantOfCurrent(rowPath)
        return h(React.Fragment, null,
          h('div', {
            className: `kb-tree-row${picked === rowPath ? ' kb-tree-row-active' : ''}`,
            style: { paddingLeft: 4 + depth * 14, opacity: disabled ? 0.45 : 1 },
            role: 'treeitem', 'aria-selected': picked === rowPath,
            onClick: () => { if (!disabled) setPicked(rowPath) },
            onDoubleClick: () => { if (!disabled) onPick(rowPath) },
          },
            Icon.chevron(open),
            h('span', { style: { marginRight: 6, display: 'inline-flex', alignItems: 'center' } }, open ? Icon.folderOpen() : Icon.folder()),
            h('span', { className: 'kb-tree-name' }, name)),
          open && children !== null && children.length > 0 && h('div', { role: 'group' },
            children.map((child) => h(Row, {
              key: `${rowPath}/${child.name}`,
              path: `${rowPath}/${child.name}`,
              name: child.name,
              depth: depth + 1,
            }))),
        )
      }
      const rootState = useAsync(() => api('list', { source: sourceId, path: '' }), [sourceId])
      const roots = (rootState.value?.items ?? []).filter(item => item.kind === 'folder')
      return h('div', null,
        h('div', {
          className: `kb-tree-row${picked === '' ? ' kb-tree-row-active' : ''}`,
          style: { paddingLeft: 4 },
          role: 'treeitem', 'aria-selected': picked === '',
          onClick: () => setPicked(''),
          onDoubleClick: () => onPick(''),
        },
          h('span', { className: 'kb-tree-caret' }),
          h('span', { style: { marginRight: 6, display: 'inline-flex', alignItems: 'center' } }, Icon.folder()),
          h('span', { className: 'kb-tree-name' }, t('rootFolder'))),
        roots.map((child) => h(Row, { key: child.name, path: child.name, name: child.name, depth: 1 })),
        h('div', { className: 'kb-form-row', style: { justifyContent: 'flex-end', padding: '8px 0 0' } },
          h('button', { className: 'kb-btn kb-btn-primary', onClick: () => onPick(picked) }, t('moveHere'))),
      )
    }

    // ---------- task attach menu (own component: hooks must not be conditional) ----------
    function TaskAttachMenu(props) {
      const { sourceId, path, name, anchor, onClose, openSession, startSession, readSourceRoot } = props
      const [sessions, setSessions] = React.useState(() => {
        try { return typeof window.__KB_SESSIONS__ === 'function' ? window.__KB_SESSIONS__().slice(0, 5) : [] }
        catch { return [] }
      })
      const [attachMode, setAttachMode] = React.useState('path')
      React.useEffect(() => {
        let live = true
        const read = () => {
          let rows = []
          try { rows = typeof window.__KB_SESSIONS__ === 'function' ? window.__KB_SESSIONS__().slice(0, 5) : [] }
          catch { rows = [] }
          if (rows.length === 0 && typeof window.__KB_SESSIONS_DIRECT__ === 'function') {
            try { rows = window.__KB_SESSIONS_DIRECT__().slice(0, 5) } catch { rows = [] }
          }
          if (live) setSessions(rows)
        }
        read()
        const timer = setInterval(read, 500)
        const stop = setTimeout(() => clearInterval(timer), 5000)
        return () => { live = false; clearInterval(timer); clearTimeout(stop) }
      }, [])
      // Build an @-mention of the original absolute path. The source root
      // comes from the panel's source list (the host exposes it for local
      // roots), so the agent reads the ORIGINAL file and can reach its
      // neighbours in the same knowledge-base folder.
      const buildPathMention = async () => {
        const root = (await readSourceRoot?.(sourceId)) ?? ''
        if (root === '') return undefined
        const absolute = `${root.replace(/[/\\]+$/, '')}/${path}`
        const mention = /\s/u.test(absolute) ? `@"${absolute}"` : `@${absolute}`
        return `${mention} ${t('readKbFile')}`
      }
      const attach = async (jump) => {
        try {
          if (jump !== undefined) {
            if (jump.sessionId !== undefined) jump.openSession(jump.sessionId)
            else jump.startSession()
            await new Promise((resolve) => setTimeout(resolve, jump.sessionId === undefined ? 1200 : 700))
          }
          if (attachMode === 'path') {
            const mention = await buildPathMention()
            if (mention === undefined) { onClose(t('taskNoComposer')); return }
            // The knowledge-base panel is unmounted as soon as the session
            // view takes over, so the insertion is scheduled on a detached
            // timer that keeps running after this panel unmounts.
            const id = `kb-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
            window.__KB_PENDING_MENTION__ = { id, text: mention }
            const insertMention = () => {
              if (window.__KB_MENTION_CLAIMED__ === id) return
              const editor = document.querySelector('[data-composer-input], [data-composer-editor], [contenteditable="true"][data-placeholder], textarea[aria-label]')
              if (editor === null) {
                // The composer is not mounted yet; retry until it is.
                if (attempt < 60) { attempt += 1; setTimeout(insertMention, 150) }
                return
              }
              const inserted = insertIntoComposer(editor, mention)
              if (inserted) {
                // Claim only after the text really landed.
                window.__KB_MENTION_CLAIMED__ = id
                window.__KB_PENDING_MENTION__ = undefined
              } else if (attempt < 60) { attempt += 1; setTimeout(insertMention, 150) }
            }
            let attempt = 0
            setTimeout(insertMention, 200)
            onClose(t('attached', { name }))
            return
          }
          const response = await fetch(`api/kb?op=bytes&source=${encodeURIComponent(sourceId)}&path=${encodeURIComponent(path)}`)
          const payload = await response.json().catch(() => ({ ok: false }))
          if (!payload.ok) throw new Error(payload.message ?? 'read failed')
          const bin = atob(payload.data)
          const bytes = new Uint8Array(bin.length)
          for (let i = 0; i < bin.length; i += 1) bytes[i] = bin.charCodeAt(i)
          const mime = fileMime(name)
          const file = new File([bytes], name, { type: mime })
          const transfer = new DataTransfer()
          transfer.items.add(file)
          const paste = new ClipboardEvent('paste', { bubbles: true, cancelable: true })
          try {
            Object.defineProperty(paste, 'clipboardData', { value: transfer, configurable: true })
          } catch { /* older engine: fall back below */ }
          // Exactly ONE delivery path may run, otherwise the file lands in the
          // draft twice. The composer bridge owns the official draft creation
          // (conversation service + inputActions.addAttachments); the hidden
          // file input is the fallback for a composer without the bridge; the
          // synthetic paste is the last resort; the reference line only runs
          // when no path delivered anything.
          window.__KB_ATTACH_DELIVERED__ = false
          window.__KB_PENDING_ATTACHMENT__ = {
            id: `kb-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
            files: [file],
            targetSessionId: jump?.sessionId,
          }
          const composer = await waitForComposer()
          if (composer === null) { window.__KB_PENDING_ATTACHMENT__ = undefined; onClose(t('taskNoComposer')); return }
          composer.focus()
          await new Promise((resolve) => setTimeout(resolve, 150))
          if (window.__KB_BRIDGE_MOUNTED__ !== true) {
            // No bridge: deliver through the composer's own file input and
            // drop the hand-off so a bridge mounting later cannot add it too.
            window.__KB_PENDING_ATTACHMENT__ = undefined
            const input = findComposerFileInput(composer)
            if (deliverFileToComposer(input, file)) window.__KB_ATTACH_DELIVERED__ = true
          }
          // Wait for the bridge to report the chip (bounded), then decide
          // whether any fallback delivery is still needed.
          const chipDeadline = Date.now() + 2500
          while (window.__KB_ATTACH_DELIVERED__ !== true && Date.now() < chipDeadline) {
            await new Promise((resolve) => setTimeout(resolve, 100))
          }
          if (window.__KB_ATTACH_DELIVERED__ !== true && typeof paste.clipboardData === 'object' && paste.clipboardData !== null) {
            if (document.dispatchEvent(paste)) window.__KB_ATTACH_DELIVERED__ = true
          }
          // Nothing was delivered (no backend, busy session): leave a visible
          // reference line so the model still knows which file to read.
          if (window.__KB_ATTACH_DELIVERED__ !== true) {
            const mention = `${t('readKbFile')} ${name}`
            insertIntoComposer(composer, mention)
          }
          window.__KB_ATTACH_DELIVERED__ = false
          window.__KB_PENDING_ATTACHMENT__ = undefined
          onClose(t('attached', { name }))
        } catch (error) {
          onClose(`${t('attachFailed')}: ${error instanceof Error ? error.message : ''}`)
        }
      }
      const sessionRows = sessions.length === 0
        ? h('div', { className: 'kb-hint', style: { padding: '6px 10px' } }, t('noSessions'))
        : sessions.map((entry) => h('button', {
          key: entry.id, className: 'kb-pop-item', role: 'menuitem',
          title: entry.title,
          onClick: () => { void attach({ sessionId: entry.id, openSession }) },
        }, Icon.task(14), h('span', { style: { flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } }, entry.title)))
      return h(Popup, { anchor, onClose },
        h('div', { className: 'kb-pop-form', style: { minWidth: 260, maxHeight: 380, overflow: 'auto' } },
          h('h4', { className: 'kb-pop-form-title' }, t('addToTask')),
          h('div', { className: 'kb-attach-mode' },
            h('button', {
              className: `kb-pop-item${attachMode === 'path' ? ' kb-pop-item-active' : ''}`,
              role: 'menuitemradio', 'aria-checked': attachMode === 'path',
              onClick: () => setAttachMode('path'),
            }, Icon.open(14), h('span', { style: { flex: 1 } }, t('attachAsPath')),
              h('span', { className: 'kb-pop-item-hint' }, t('attachAsPathHint'))),
            h('button', {
              className: `kb-pop-item${attachMode === 'file' ? ' kb-pop-item-active' : ''}`,
              role: 'menuitemradio', 'aria-checked': attachMode === 'file',
              onClick: () => setAttachMode('file'),
            }, Icon.copy(14), h('span', { style: { flex: 1 } }, t('attachAsFile')),
              h('span', { className: 'kb-pop-item-hint' }, t('attachAsFileHint')))),
          h('div', { className: 'kb-pop-sep' }),
          h('button', {
            className: 'kb-pop-item', role: 'menuitem',
            onClick: () => { void attach({ startSession }) },
          }, Icon.plus(14), h('span', { style: { flex: 1 } }, t('newTask'))),
          h('div', { className: 'kb-pop-sep' }),
          h('div', { className: 'kb-hint', style: { padding: '2px 10px 4px' } }, t('pickSession')),
          h('div', { style: { display: 'flex', flexDirection: 'column', gap: 2 } }, sessionRows)))
    }

    // ---------- more (file) menu ----------
    function MoreMenu(props) {
      const { sourceId, path, name, kind, onClose, onChanged } = props
      const [mode, setMode] = React.useState(undefined) // undefined|'rename'|'move'|'task'|'delete'
      const [value, setValue] = React.useState('')
      const run = async (op, body, message) => {
        try {
          const result = await postKb(op, body)
          onChanged()
          // Structural ops invalidate the previewed file — the host panel
          // backs out of preview (delete/rename/move of the open file).
          if (op === 'delete' || op === 'rename' || op === 'move') props.onAfterOp?.(op)
          if (message) onClose(message)
          else onClose()
          void result
        } catch (error) {
          onClose(`${t('opFailed')}: ${error instanceof Error ? error.message : ''}`)
        }
      }
      const item = (icon, label, onClick, options = {}) => h('button', {
        className: `kb-pop-item${options.danger === true ? ' kb-pop-item-danger' : ''}`,
        role: 'menuitem', onClick, disabled: options.disabled === true,
      }, icon, h('span', { style: { flex: 1 } }, label))
      if (mode === 'delete') {
        // Soft delete: confirm, then capture the trash path so the panel can
        // offer a toast-level Undo (restoreTrash).
        return h(Popup, { anchor: props.anchor, onClose },
          h('div', { className: 'kb-pop-confirm' },
            h('h4', { className: 'kb-pop-form-title' }, t('confirmDeleteTitle')),
            h('div', { className: 'kb-pop-confirm-text' }, t('confirmDeleteFile', { name })),
            h('div', { className: 'kb-form-row', style: { justifyContent: 'flex-end' } },
              h('button', { className: 'kb-btn', onClick: onClose }, t('cancel')),
              h('button', {
                className: 'kb-btn kb-btn-primary', style: { background: 'var(--dsw-alias-state-error-primary)' }, autoFocus: true,
                onClick: () => {
                  void (async () => {
                    try {
                      const result = await postKb('delete', { path })
                      onChanged()
                      props.onDeleteDone?.({ trashPath: result.trashPath, originalPath: path })
                      onClose()
                    } catch (error) {
                      onClose(`${t('opFailed')}: ${error instanceof Error ? error.message : ''}`)
                    }
                  })()
                },
              }, t('confirm')))))
      }
      if (mode === 'rename') {
        return h(Popup, { anchor: props.anchor, onClose },
          h('div', { className: 'kb-pop-form' },
            h('h4', { className: 'kb-pop-form-title' }, t('rename')),
            h('label', null, t('renamePrompt'),
              h('input', { className: 'kb-input', autoFocus: true, value, onChange: (event) => setValue(event.target.value), onKeyDown: (event) => { if (event.key === 'Enter' && value.trim().length > 0) {
                const parentDir = path.includes('/') ? `${path.slice(0, path.lastIndexOf('/'))}/` : ''
                void run('rename', { from: path, to: `${parentDir}${value.trim()}` }, t('renamed', { path: value.trim() }))
              } } })),
            h('div', { className: 'kb-form-row', style: { justifyContent: 'flex-end' } },
              h('button', { className: 'kb-btn', onClick: onClose }, t('cancel')),
              h('button', {
                className: 'kb-btn kb-btn-primary', disabled: value.trim().length === 0,
                onClick: () => {
                  const parentDir = path.includes('/') ? `${path.slice(0, path.lastIndexOf('/'))}/` : ''
                  void run('rename', { from: path, to: `${parentDir}${value.trim()}` }, t('renamed', { path: value.trim() }))
                },
              }, t('create')))))
      }
      if (mode === 'move') {
        // Tree-based destination picker: pick a folder row, confirm to move.
        return h(Popup, { anchor: props.anchor, onClose },
          h('div', { className: 'kb-pop-form', style: { minWidth: 280 } },
            h('h4', { className: 'kb-pop-form-title' }, t('moveTo')),
            h('div', { className: 'kb-move-tree' },
              h(FolderPickerTree, {
                sourceId, currentPath: path,
                onPick: (folderPath) => {
                  void run('move', { from: path, toFolder: folderPath }, t('moved', { path: folderPath || '/' }))
                },
              })),
            h('div', { className: 'kb-form-row', style: { justifyContent: 'flex-end' } },
              h('button', { className: 'kb-btn', onClick: onClose }, t('cancel')))))
      }
      if (mode === 'task') {
        return h(TaskAttachMenu, { sourceId, path, name, anchor: props.anchor, onClose, openSession: props.openSession, startSession: props.startSession, readSourceRoot: props.readSourceRoot })
      }
      const parent = path.includes('/') ? `${path.slice(0, path.lastIndexOf('/'))}/` : ''
      return h(Popup, { anchor: props.anchor, onClose },
        item(Icon.task(), t('addToTask'), () => setMode('task')),
        // Inline rename lives in the tree row itself; fall back to the popup
        // form only when the host (e.g. preview toolbar menu) has no row.
        item(Icon.rename(), t('rename'), () => {
          if (props.onInlineRename) { props.onClose(); props.onInlineRename() }
          else setMode('rename')
        }),
        kind !== 'folder' && item(Icon.copy(), t('copyLink'), () => {
          const link = `${document.baseURI}#kb=${encodeURIComponent(`${sourceId}/${path}`)}`
          void navigator.clipboard?.writeText(link).then(() => onClose(t('copied')), () => onClose(t('copied')))
        }),
        item(Icon.open(), t('openFolder'), () => { void run('reveal', { path }, undefined) }),
        item(Icon.move(), t('moveTo'), () => setMode('move')),
        h('div', { className: 'kb-pop-sep' }),
        item(Icon.trash(), t('deleteFile'), () => setMode('delete'), { danger: true }))
    }

    // ---------- new menu ----------
    function NewMenu(props) {
      const { anchor, onClose, onCreate, onPickFolder } = props
      const [mode, setMode] = React.useState(undefined) // 'md'|'csv'|'folder'|'link'|'upload'
      const [name, setName] = React.useState('')
      const [url, setUrl] = React.useState('')
      const submitName = () => {
        const clean = name.trim()
        if (clean.length === 0) return
        if (mode === 'folder') { onCreate({ kind: 'folder', name: clean }); onClose(); return }
        if (mode === 'link') {
          if (url.trim().length === 0) return
          onCreate({ kind: 'link', name: clean, url: url.trim() }); onClose(); return
        }
        const ext = mode === 'csv' ? '.csv' : '.md'
        onCreate({ kind: 'doc', name: clean.endsWith(ext) ? clean : clean + ext }); onClose()
      }
      const input = (label, value, set, placeholder, autoFocus) => h('label', null, label,
        h('input', { className: 'kb-input', autoFocus: autoFocus === true, value, placeholder, onChange: (event) => set(event.target.value), onKeyDown: (event) => { if (event.key === 'Enter') submitName() } }))
      if (mode !== undefined) {
        const title = mode === 'link' ? t('addLink') : mode === 'folder' ? t('newFolder') : mode === 'csv' ? t('newDocCsv') : t('newDocMd')
        return h(Popup, { anchor, onClose },
          h('div', { className: 'kb-pop-form' },
            h('h4', { className: 'kb-pop-form-title' }, title),
            mode === 'link' ? h(React.Fragment, null,
              input(t('linkName'), name, setName, t('namePlaceholder'), true),
              input(t('linkUrl'), url, setUrl, 'https://…', false)) : input(t('newDocName'), name, setName, title, true),
            h('div', { className: 'kb-form-row', style: { justifyContent: 'flex-end' } },
              h('button', { className: 'kb-btn', onClick: onClose }, t('cancel')),
              h('button', { className: 'kb-btn kb-btn-primary', onClick: submitName, disabled: name.trim().length === 0 || (mode === 'link' && url.trim().length === 0) }, t('create')))))
      }
      return h(Popup, { anchor, onClose },
        h('button', { className: 'kb-pop-item', role: 'menuitem', onClick: () => setMode('md') }, fileTypeIcon('新文档.md', 22), h('span', { style: { flex: 1 } }, t('newDocMd'))),
        h('button', { className: 'kb-pop-item', role: 'menuitem', onClick: () => setMode('csv') }, fileTypeIcon('新表格.csv', 22), h('span', { style: { flex: 1 } }, t('newDocCsv'))),
        h('div', { className: 'kb-pop-sep' }),
        h('button', { className: 'kb-pop-item', role: 'menuitem', onClick: () => { onClose(); onPickFolder() } }, Icon.upload2(16), h('span', { style: { flex: 1 } }, t('uploadImport'))),
        h('button', { className: 'kb-pop-item', role: 'menuitem', onClick: () => setMode('link') }, Icon.link(16), h('span', { style: { flex: 1 } }, t('addLink'))),
        h('div', { className: 'kb-pop-sep' }),
        h('button', { className: 'kb-pop-item', role: 'menuitem', onClick: () => setMode('folder') }, Icon.folder(), h('span', { style: { flex: 1 } }, t('newFolder'))))
    }


    // ---------- composer attachment entry ----------
    // The composer owns the attachment chips. This slot entry receives the
    // pending knowledge-base file, creates the official draft through the
    // conversation service, and appends it with inputActions.addAttachments.
    function ComposerAttachmentBridge(props) {
      const { inputActions, sessionId } = props
      // The conversation service is session-scoped: it lives in the session's
      // Agent scope, not on the root context.
      const conversation = (() => {
        try {
          const scope = props.sessions?.scope?.(sessionId)
          return scope?.get?.('conversation')
        } catch { return undefined }
      })()
      React.useEffect(() => {
        // The pending file is written by the knowledge-base panel, which can
        // run before or after this composer mounts — poll briefly so either
        // order works, and consume it exactly once.
        // The session view mounts its composer asynchronously; wait long
        // enough for a session switch to settle.
        const deadline = Date.now() + 15000
        const timer = setInterval(() => {
          const pending = window.__KB_PENDING_ATTACHMENT__
          if (pending === undefined || pending === null) {
            if (Date.now() > deadline) clearInterval(timer)
            return
          }
          // Claim this hand-off exactly once, even when several composer
          // bridges are mounted (one per conversation occurrence).
          if (pending.id !== undefined && window.__KB_ATTACH_CLAIMED__ === pending.id) return
          if (pending.id !== undefined) window.__KB_ATTACH_CLAIMED__ = pending.id
          window.__KB_PENDING_ATTACHMENT__ = undefined
          clearInterval(timer)
          const { files, targetSessionId } = pending
          if (conversation === undefined || inputActions === undefined) {
            return
          }
          const id = targetSessionId ?? sessionId
          if (id === undefined) {
            return
          }
          try {
            const drafts = conversation.createDrafts(id, files, true)
            const ids = drafts.map((draft) => draft.id)
            if (ids.length > 0) {
              inputActions.addAttachments(ids)
              // The chip is on screen; no other path may add it again.
              window.__KB_ATTACH_DELIVERED__ = true
            }
          } catch { /* the composer refuses attachments while busy */ }
        }, 250)
        return () => clearInterval(timer)
      }, [inputActions, sessionId, conversation])
      React.useEffect(() => { window.__KB_BRIDGE_MOUNTED__ = true }, [])
      // Rendered as an invisible marker so the slot keeps this entry alive
      // (a null-rendering entry may be skipped by the slot renderer).
      return h('span', { 'data-kb-attachment-bridge': '', style: { display: 'none' } })
    }

    // ---------- panel root ----------
    function KnowledgePanel(props) {
      const [, setLocaleTick] = React.useState(0)
      React.useEffect(() => {
        try { return props.localeSubscribe(() => setLocaleTick(value => value + 1)) }
        catch { return undefined }
      }, [])
      const sourcesState = useAsync(() => api('sources'), [])
      const [view, setView] = React.useState(undefined) // undefined = auto; 'wizard' | 'sources' | 'form' | 'browse' | 'search' | 'diag' | 'memory'
      const [formTarget, setFormTarget] = React.useState(undefined)
      const [selectedId, setSelectedId] = React.useState(undefined)
      const [activeFile, setActiveFile] = React.useState(undefined)
      const [mode, setMode] = React.useState('browse')
      const [searchQuery, setSearchQuery] = React.useState('')
      const [searchTick, setSearchTick] = React.useState(0)
      const [searchResult, setSearchResult] = React.useState(undefined)
      // Debounced instant search: typing in the box runs after 300ms idle;
      // Enter still fires immediately (timer cleared).
      const searchDebounce = React.useRef(undefined)
      React.useEffect(() => () => clearTimeout(searchDebounce.current), [])
      const queueSearch = () => {
        clearTimeout(searchDebounce.current)
        searchDebounce.current = setTimeout(() => {
          setMode('search')
          setSearchTick(tick => tick + 1)
        }, 300)
      }
      const [toast, setToast] = React.useState(undefined)
      const [newOpen, setNewOpen] = React.useState(false)
      const [newAnchor, setNewAnchor] = React.useState(undefined)
      const [sideWidth, setSideWidth] = React.useState(240)
      const [draggingSide, setDraggingSide] = React.useState(false)
      // Breadcrumb "open folder" request: {sourceId, dirPath, tick} — the tree
      // auto-expands the directory chain once per tick.
      const [reveal, setReveal] = React.useState(undefined)
      const toastTimer = React.useRef(undefined)
      React.useEffect(() => () => clearTimeout(toastTimer.current), [])
      const showToast = (text, isError, action) => {
        clearTimeout(toastTimer.current)
        setToast({ text, isError, action })
        toastTimer.current = setTimeout(() => setToast(undefined), action ? 6000 : 2600)
      }
      // Soft-delete undo: toast with an action button restores the entry.
      const handleDeleteDone = ({ trashPath, originalPath }) => {
        showToast(t('trashDeleted'), false, {
          label: t('undo'),
          onClick: () => {
            void postKb('restoreTrash', { trashPath, originalPath })
              .then(() => { refreshTree(); showToast(t('trashRestored')) })
              .catch((error) => showToast(`${t('opFailed')}: ${error instanceof Error ? error.message : ''}`, true))
          },
        })
      }
      const reloadSources = () => { sourcesState.reload() }
      const refreshTree = () => { treeBus.publish() }
      const sources = sourcesState.value?.sources ?? []
      const canEdit = sourcesState.value?.canEdit === true

      if (sourcesState.loading) return h('div', { className: 'kb-page' }, h('div', { className: 'kb-hint' }, t('loading')))
      if (sourcesState.error !== undefined) {
        return h('div', { className: 'kb-page' }, h('div', { className: 'kb-hint kb-status-error' }, `${t('loadFailed')}: ${sourcesState.error}`))
      }

      const saveSource = async (source) => {
        const rest = sources.filter((item) => item.id !== source.id)
        await saveSources([...rest, source])
        showToast(t('savedToast'))
        setView(undefined); setFormTarget(undefined); setSelectedId(source.id)
        reloadSources()
      }
      const deleteSource = async (source) => {
        const rest = sources.filter((item) => item.id !== source.id)
        try {
          await saveSources(rest)
          showToast(t('savedToast'))
          if (selectedId === source.id) { setSelectedId(undefined); setActiveFile(undefined) }
          reloadSources()
        } catch (error) {
          showToast(`${t('saveFailed')}: ${error instanceof Error ? error.message : ''}`, true)
        }
      }
      const createEntry = async (entry) => {
        try {
          if (entry.kind === 'folder') {
            await postKb('createFolder', { path: entry.name })
            showToast(t('savedToast')); refreshTree()
          } else if (entry.kind === 'doc') {
            await postKb('create', { path: entry.name })
            showToast(t('savedToast')); refreshTree()
            setActiveFile({ sourceId: selected?.id, path: entry.name, name: entry.name, kind: 'file' })
            setMode('browse')
          } else if (entry.kind === 'link') {
            await postKb('create', { path: `${entry.name}.md` })
            await postKb('write', { path: `${entry.name}.md`, content: `# ${entry.name}\n\n<${entry.url}>\n` })
            showToast(t('savedToast')); refreshTree()
            setActiveFile({ sourceId: selected?.id, path: `${entry.name}.md`, name: `${entry.name}.md`, kind: 'file' })
            setMode('browse')
          }
        } catch (error) {
          showToast(`${t('opFailed')}: ${error instanceof Error ? error.message : ''}`, true)
        }
      }
      const pickUploadFolder = async () => {
        try {
          const picked = typeof props.pickDirectory === 'function' ? await props.pickDirectory() : null
          if (!picked) return
          const rest = sources
          const id = `kb-${Date.now().toString(36)}`
          await saveSources([...rest, { id, name: picked.split('/').pop() || 'Folder', type: 'local', path: picked }])
          showToast(t('savedToast')); reloadSources(); setSelectedId(id)
        } catch (error) {
          showToast(`${t('saveFailed')}: ${error instanceof Error ? error.message : ''}`, true)
        }
      }

      const effectiveView = view ?? (sources.length === 0 ? 'wizard' : 'browse')
      const selected = sources.find((source) => source.id === selectedId) ?? sources[0]
      const wizardBlocked = effectiveView === 'wizard' && canEdit === false
      // Search-first model: a non-empty query shows the results view; an open
      // file previews on top of it; clearing the query returns to browse.
      const effectiveMode = selected === undefined ? 'browse' : (searchQuery.trim().length > 0 ? 'search' : 'browse')

      const header = h('div', { className: 'kb-head' },
        h('h1', { className: 'kb-head-title' }, t('panel')),
        selected !== undefined && h('div', { className: 'kb-search-box', style: { marginLeft: 16, marginRight: -8 } },
          Icon.searchGlyph(14),
          h('input', {
            value: searchQuery, placeholder: t('searchPlaceholder'), 'aria-label': t('search'),
            onChange: (event) => {
              const value = event.target.value
              setSearchQuery(value)
              if (value.trim().length > 0) queueSearch()
              else { clearTimeout(searchDebounce.current); setSearchResult(undefined) }
            },
            onFocus: () => { if (searchQuery.trim().length > 0) setActiveFile(undefined) },
            onKeyDown: (event) => {
              if (event.key === 'Enter') { clearTimeout(searchDebounce.current); setSearchTick(tick => tick + 1) }
              else if (event.key === 'Escape' && !document.querySelector('.kb-toolbar .kb-crumb-path')) {
                // Esc in the box exits search — but when a preview is open the
                // window handler returns to the results instead (guarded).
                event.stopPropagation()
                clearTimeout(searchDebounce.current)
                setSearchQuery(''); setSearchResult(undefined); setActiveFile(undefined)
              }
            },
          }),
          searchQuery.length > 0 && h('button', { className: 'kb-search-clear', 'aria-label': t('clear'), onClick: () => { clearTimeout(searchDebounce.current); setSearchQuery(''); setSearchResult(undefined) } }, '×')),
        h('div', { className: 'kb-head-space' }),
        h('button', { className: 'kb-btn', onClick: () => { setView('memory'); setFormTarget(undefined) } }, Icon.task(), t('memory')),
        h('button', { className: 'kb-btn', onClick: () => { setView('diag'); setFormTarget(undefined) } }, Icon.gear(), t('diagnostics')),
        canEdit && h('button', { className: 'kb-btn', onClick: () => { setView('sources'); setFormTarget(undefined) } }, t('sources')),
      )

      // WorkBuddy library shell: toolbar row (segmented tabs left, search
      // group right) above one bordered rounded surface.
      const browseMain = selected === undefined
        ? h('div', { className: 'kb-hint' }, t('noSources'))
        : activeFile !== undefined && activeFile.kind === 'file'
          ? h(Preview, {
              // Key by path: switching files remounts Preview so the 预览/代码
              // view state resets to the new file type's default.
              key: `${activeFile.sourceId ?? selected.id}/${activeFile.path}`,
              sourceId: activeFile.sourceId ?? selected.id, path: activeFile.path,
              sourceName: selected.name,
              onBack: () => setActiveFile(undefined),
              onOpenDir: (dirPath) => { setActiveFile(undefined); setReveal({ sourceId: selected.id, dirPath, tick: Date.now() }) },
              onToast: showToast,
              onDeleteDone: handleDeleteDone,
              onChanged: refreshTree,
              openSession: props.openSession,
              startSession: props.startSession,
              readSourceRoot: async (sid) => {
                const src = sources.find((item) => item.id === sid)
                return src?.rootPath ?? src?.path ?? ''
              },
              onAfterOp: (op) => {
                // The open file was deleted/renamed/moved — leave preview and
                // let the tree refresh (already triggered via onChanged).
                if (op === 'delete' || op === 'rename' || op === 'move') setActiveFile(undefined)
              },
              onWiki: (targetName) => {
                // Wikilink: resolve the target inside the active file's folder chain.
                const dir = activeFile.path.includes('/') ? activeFile.path.slice(0, activeFile.path.lastIndexOf('/') + 1) : ''
                const candidates = [`${dir}${targetName}.md`, `${dir}${targetName}`, `${targetName}.md`, targetName]
                void (async () => {
                  for (const candidate of candidates) {
                    const read = await api('read', { source: selected.id, path: candidate }).catch(() => undefined)
                    if (read !== undefined) { setActiveFile({ sourceId: selected.id, path: candidate, name: targetName, kind: 'file' }); return }
                  }
                  showToast(`${t('loadFailed')}: ${targetName}`, true)
                })()
              },
            })
          : effectiveMode === 'search'
            ? h(SearchView, { source: selected, query: searchQuery, runTick: searchTick, result: searchResult, onResult: setSearchResult, onOpenHit: (path) => { setActiveFile({ sourceId: selected.id, path, name: path.split('/').pop(), kind: 'file' }) } })
            : h('div', { className: 'kb-surface' },
              h('div', { className: 'kb-empty' },
                h('div', { className: 'kb-empty-icon' }, Icon.book(28)),
                h('div', null, `${selected.name} · ${selected.type === 'local' ? t('typeLocal') : t('typeWebdav')}`),
                h('div', { className: 'kb-empty-desc' }, t('selectHint'))))

      // The sidebar column runs the full page height; the right column holds
      // head + toolbar + surface. Selection keeps the tree mounted.
      const showSide = effectiveView === 'browse' && selected !== undefined && effectiveMode === 'browse'
      const sideCol = showSide && h('div', { className: 'kb-side', style: { '--kb-side-width': `${sideWidth}px` } },
        h('div', { className: 'kb-side-top' },
          canEdit && h('button', {
            className: 'kb-btn', style: { width: '100%', justifyContent: 'flex-start' },
            onClick: (event) => { setNewAnchor(event.currentTarget); setNewOpen(value => !value) },
          }, Icon.plus(), t('newMenu')),
          sources.length > 1 && h('div', { className: 'kb-src-chips', style: { marginTop: 8 } },
            sources.map((source) => h('button', {
              key: source.id, className: 'kb-src-chip',
              'data-active': source.id === selected.id ? '' : undefined,
              title: source.name,
              onClick: () => { setSelectedId(source.id); setActiveFile(undefined) },
            }, source.name)))),
        h('div', { className: 'kb-side-scroll', role: 'tree', 'aria-label': selected.name,
          // ARIA tree keyboard model: ↑↓ move between visible rows, → expands
          // (or enters), ← collapses (or exits), Enter opens, Home/End jump.
          onKeyDown: (event) => {
            if (!['ArrowDown','ArrowUp','ArrowRight','ArrowLeft','Enter',' ','Home','End'].includes(event.key)) return
            const rows = [...event.currentTarget.querySelectorAll('.kb-tree-row')]
            if (rows.length === 0) return
            const current = document.activeElement?.classList?.contains('kb-tree-row')
              ? document.activeElement
              : rows[0]
            const index = rows.indexOf(current)
            const step = (next) => { rows[Math.max(0, Math.min(rows.length - 1, next))]?.focus(); event.preventDefault() }
            const rowState = (row) => ({ isFolder: row.getAttribute('aria-expanded') !== null, open: row.getAttribute('aria-expanded') === 'true' })
            if (event.key === 'ArrowDown') return step(index + 1)
            if (event.key === 'ArrowUp') return step(index - 1)
            if (event.key === 'Home') return step(0)
            if (event.key === 'End') return step(rows.length - 1)
            if (event.key === 'ArrowRight') {
              const { isFolder, open } = rowState(current)
              if (isFolder && !open) { current.click(); return event.preventDefault() }
              return step(index + 1)
            }
            if (event.key === 'ArrowLeft') {
              const { isFolder, open } = rowState(current)
              if (isFolder && open) { current.click(); return event.preventDefault() }
              return step(index - 1)
            }
            if (event.key === 'Enter' || event.key === ' ') { current.click(); return event.preventDefault() }
          },
        },
          h(TreeRoot, {
            sourceId: selected.id,
            activePath: activeFile?.path,
            reveal,
            onOpen: (item) => { if (item.kind === 'file') setActiveFile(item) },
            onChanged: refreshTree,
            // Inline-rename bookkeeping: keep the open preview on the renamed
            // file instead of leaving a stale path behind.
            onRenamed: (oldPath, newPath) => {
              setActiveFile((file) => file?.path === oldPath
                ? { ...file, path: newPath, name: newPath.split('/').pop() }
                : file)
            },
            onToast: showToast,
            onDeleteDone: handleDeleteDone,
            renderMoreMenu: MoreMenu,
            openSession: props.openSession,
            startSession: props.startSession,
            readSourceRoot: async (sourceId) => {
              const source = sources.find((item) => item.id === sourceId)
              // Fall back to the source's own path when rootPath is absent.
              return source?.rootPath ?? source?.path ?? ''
            },
          })))
      const dragCol = showSide && h('div', {
        className: 'kb-side-drag', 'data-dragging': draggingSide ? '' : undefined,
        role: 'separator', 'aria-label': t('resizeSidebar'), 'aria-orientation': 'vertical',
        title: t('resizeSidebarHint'),
        onDoubleClick: () => setSideWidth(240),
        onPointerDown: (event) => {
          event.preventDefault()
          const startX = event.clientX
          const startWidth = sideWidth
          const onMove = (moveEvent) => {
            setSideWidth(Math.min(480, Math.max(180, startWidth + (moveEvent.clientX - startX))))
          }
          const onUp = () => {
            setDraggingSide(false)
            window.removeEventListener('pointermove', onMove)
            window.removeEventListener('pointerup', onUp)
          }
          setDraggingSide(true)
          window.addEventListener('pointermove', onMove)
          window.addEventListener('pointerup', onUp)
        },
      })
      const viewBody = effectiveView === 'wizard'
        ? h('div', { className: 'kb-wizard', style: { width: '100%' } },
          h('div', { className: 'kb-wizard-title' }, t('wizardTitle')),
          h('div', { className: 'kb-wizard-intro' }, t('wizardIntro')),
          wizardBlocked
            ? h('div', { className: 'kb-hint kb-status-warn' }, t('readOnlyNotice'))
            : h(SourceForm, {
              pickDirectory: props.pickDirectory,
              onCancel: sources.length > 0 ? () => setView('browse') : undefined,
              onSave: saveSource,
            }))
        : effectiveView === 'sources' ? (formTarget !== undefined
          ? h('div', { className: 'kb-wizard', style: { width: '100%', marginTop: 24 } },
            h('div', { className: 'kb-wizard-title' }, formTarget.initial?.name ?? t('addSource')),
            h(SourceForm, {
              initial: formTarget.initial, pickDirectory: props.pickDirectory,
              onCancel: () => setFormTarget(undefined), onSave: saveSource,
            }))
          : h(SourcesView, {
            sources, canEdit,
            onAdd: () => setFormTarget({ initial: undefined }),
            onEdit: (source) => setFormTarget({ initial: source }),
            onDelete: deleteSource,
            onDone: () => { setView('browse'); setFormTarget(undefined); reloadSources() },
          }))
        : effectiveView === 'diag' ? h(DiagnosticsView, null)
        : effectiveView === 'memory' ? h(MemoryView, { showToast })
        : h('div', { className: 'kb-main', style: { padding: '0 14px 14px' } }, browseMain)

      return h('div', { className: 'kb-page' },
        h('div', { className: 'kb-page-fill' },
          sideCol,
          dragCol,
          h('div', { className: 'kb-right' }, header, viewBody)),
        newOpen && h(NewMenu, {
          anchor: newAnchor, onClose: () => setNewOpen(false),
          onCreate: createEntry, onPickFolder: pickUploadFolder,
        }),
        toast !== undefined && h('div', { className: 'kb-toast', style: toast.isError ? { color: 'var(--dsw-alias-state-error-primary)' } : undefined },
          toast.text,
          toast.action && h('button', {
            className: 'kb-btn kb-btn-sm', style: { marginLeft: 10 },
            onClick: () => { clearTimeout(toastTimer.current); setToast(undefined); toast.action.onClick() },
          }, toast.action.label)),
      )
    }

    // ---------- icon factory ----------
    function PanelIcon() {
      return Icon.book(16)
    }

    return {
      inject: ['slots', 'locale', 'uiWorkspace', 'sessions', 'conversation'],
      apply(ctx) {
        ensureStyles()
        // Follow the host locale for all panel copy; re-render on switches.
        ctx.effect(() => {
          const readActive = () => {
            try {
              const snapshot = ctx.locale.getSnapshot()
              const active = snapshot?.active ?? 'zh'
              return String(active).toLowerCase().startsWith('zh') ? 'zh' : 'en'
            } catch { return 'zh' }
          }
          currentLocale = readActive()
          return ctx.locale.subscribe(() => { currentLocale = readActive() })
        }, 'dsh-super-kb: locale')

        ctx.effect(() => ctx.slots.inject('sidebar.panellist', () => ctx.slots.register({
          name: 'sidebar.panellist',
          id: 'dsh-super-kb',
          order: 30,
          label: () => t('iconLabel'),
        }, PanelIcon)), 'dsh-super-kb: sidebar icon')

        ctx.effect(() => ctx.slots.inject('main', () => ctx.slots.register({
          name: 'main',
          key: 'dsh-super-kb',
          inject: () => ({
            pickDirectory: () => {
              try {
                return ctx.uiWorkspace.pickDirectory()
              } catch {
                return Promise.resolve(null)
              }
            },
            openSession: (sessionId) => {
              try {
                // Jump only when the session is linkable from this window.
                const list = ctx.sessions?.list?.getSnapshot?.()
                const row = list?.byId?.[sessionId]
                if (row !== undefined) { ctx.uiWorkspace.openSession(sessionId); return true }
              } catch { /* fallthrough */ }
              return false
            },
            startSession: () => {
              try {
                ctx.uiWorkspace.startSession(undefined, {})
                return true
              } catch { return false }
            },
            localeSubscribe: (listener) => {
              try {
                return ctx.locale.subscribe(listener)
              } catch {
                return () => {}
              }
            },
          }),
        }, KnowledgePanel)), 'dsh-super-kb: main panel')


        // Composer attachment entry: turns a pending knowledge-base file into
        // a real composer attachment chip through the official draft path.
        // The composer dock is a session-scoped list slot that is actually
        // rendered (the input-left cell has no occupants, so an entry there
        // would never mount).
        ctx.effect(() => ctx.slots.inject('conversation.composer.dock', () => ctx.slots.register({
          name: 'conversation.composer.dock',
          id: 'kb-attachment',
          order: 100,
          inject: () => ({ sessions: ctx.sessions }),
        }, ComposerAttachmentBridge)), 'dsh-super-kb: composer attachment')
        ctx.effect(() => ctx.slots.inject('conversation.input.left', () => ctx.slots.register({
          name: 'conversation.input.left',
          id: 'kb-attachment',
          order: 100,
          inject: () => ({ sessions: ctx.sessions }),
        }, ComposerAttachmentBridge)), 'dsh-super-kb: composer attachment (input row)')

        // Context-menu contribution: upload a generated or sent file into the
        // knowledge base. Scoped injection keeps the plugin soft when the menu
        // or Remote services are absent.
        ctx.inject(['contextMenus', 'remote', 'remote.workspaceFiles'], (child) => {
          const uploadLifetime = new AbortController()
          child.effect(() => () => { uploadLifetime.abort() }, 'dsh-super-kb: upload lifetime')
          const upload = async (sessionId, path, signal) => {
            const read = await child.remote.workspaceFiles.readBytes(sessionId, path, {}, signal)
            if (!read.ok) throw new Error(t('uploadReadFailed'))
            const name = path.slice(Math.max(path.lastIndexOf('/'), path.lastIndexOf('\\')) + 1) || 'file'
            const bytes = read.value.data instanceof Uint8Array ? read.value.data : new Uint8Array(read.value.data)
            let binary = ''
            const chunk = 0x8000
            for (let offset = 0; offset < bytes.length; offset += chunk) {
              binary += String.fromCharCode(...bytes.subarray(offset, offset + chunk))
            }
            const response = await fetch('api/kb?op=upload', {
              method: 'POST',
              headers: { 'content-type': 'application/json' },
              body: JSON.stringify({ name, data: btoa(binary) }),
              signal,
            })
            const payload = await response.json().catch(() => ({ ok: false, message: `HTTP ${response.status}` }))
            if (!payload.ok) throw new Error(payload.message ?? t('uploadFailed'))
            return payload
          }
          const uploadAction = (sessionId, path) => ({
            id: 'kb.upload',
            icon: { key: 'kb.upload' },
            separatorBefore: true,
            failureLabel: t('uploadFailed'),
            label: t('uploadToKb'),
            run: async () => {
              try {
                const result = await upload(sessionId, path, uploadLifetime.signal)
                child.contextMenus.notify(t('uploadedTo', { name: result.sourceName, path: result.path }), true)
              } catch (error) {
                if (error?.name === 'AbortError') return
                throw error instanceof Error ? error : new Error(t('uploadFailed'))
              }
            },
          })
          child.effect(() => child.contextMenus.register({
            id: 'kb.upload-file', target: 'file', order: 300,
            resolve: async ({ sessionId, path }, signal) => {
              if (sessionId === undefined || path === undefined) return []
              signal.throwIfAborted()
              return [uploadAction(sessionId, path)]
            },
          }), 'dsh-super-kb: file upload menu')
          child.effect(() => child.contextMenus.register({
            id: 'kb.upload-image', target: 'image', order: 300,
            resolve: async ({ sessionId, path }, signal) => {
              if (sessionId === undefined || path === undefined) return []
              signal.throwIfAborted()
              return [uploadAction(sessionId, path)]
            },
          }), 'dsh-super-kb: image upload menu')
          child.effect(() => child.slots.inject('contextMenu.icon', () => child.slots.register({
            name: 'contextMenu.icon',
            key: 'kb.upload',
          }, () => Icon.upload2(14))), 'dsh-super-kb: menu icon')
        })

        // Composer "+" menu: 添加文件 → 本地文件. A picked file reaches the
        // composer through the same synthetic-paste path as 添加到任务, so it
        // becomes a real attachment chip.
        ctx.inject(['commandUi'], (scope) => {
          const pickLocalFile = () => {
            const input = document.createElement('input')
            input.type = 'file'
            input.style.display = 'none'
            input.addEventListener('change', () => {
              const files = Array.from(input.files ?? [])
              input.remove()
              if (files.length === 0) return
              const transfer = new DataTransfer()
              for (const file of files) transfer.items.add(file)
              const paste = new ClipboardEvent('paste', { bubbles: true, cancelable: true })
              try { Object.defineProperty(paste, 'clipboardData', { value: transfer, configurable: true }) } catch { /* old engine */ }
              const composer = document.querySelector('[data-composer-input], [data-composer-editor], [contenteditable="true"][data-placeholder], textarea[aria-label]')
              if (composer === null) return
              composer.focus()
              // Official intake path: hand the picked files to the composer's
              // hidden file input so its change handler drafts them.
              const input = findComposerFileInput(composer)
              if (input !== null && files.length > 0) {
                try {
                  const transfer = new DataTransfer()
                  for (const file of files) transfer.items.add(file)
                  const wasDisabled = input.disabled
                  if (wasDisabled) input.disabled = false
                  input.files = transfer.files
                  input.dispatchEvent(new Event('change', { bubbles: true }))
                  if (wasDisabled) setTimeout(() => { input.disabled = true }, 0)
                  return
                } catch { /* fall back to the synthetic paste */ }
              }
              setTimeout(() => { document.dispatchEvent(paste) }, 120)
            })
            document.body.appendChild(input)
            input.click()
          }
          scope.effect(() => scope.get('commandUi').register({
            name: 'kb-add-file',
            label: () => t('addFile'),
            description: () => t('localFile'),
            available: () => true,
            ui: { kind: 'action', run: () => pickLocalFile() },
          }), 'dsh-super-kb: add-file command')
        })

        // Recent-session feed for 添加到任务: publish the 5 most recent
        // session titles where the panel can read them. ctx.sessions is a
        // root client service (same face the schedule panel reads).
        ctx.effect(() => {
          const readRows = () => {
            const list = ctx.sessions?.list
            if (list === undefined || typeof list.getSnapshot !== 'function') return []
            const snapshot = list.getSnapshot()
            if (snapshot === undefined) return []
            const ids = Array.isArray(snapshot.ids) ? snapshot.ids : Object.keys(snapshot.byId ?? {})
            return ids.slice(0, 5).map((id) => ({
              id,
              title: snapshot.byId?.[id]?.displayTitle ?? snapshot.byId?.[id]?.title ?? id,
            }))
          }
          const publish = () => {
            try {
              const rows = readRows()
              window.__KB_SESSIONS__ = () => rows
              window.__KB_SESSIONS_DIRECT__ = () => { try { return readRows() } catch { return [] } }
            } catch { /* list not ready yet */ }
          }
          publish()
          let unsubscribe
          try {
            const list = ctx.sessions?.list
            if (typeof list?.subscribe === 'function') unsubscribe = list.subscribe(publish)
          } catch { /* no subscribe */ }
          // Safety net: keep the feed fresh even without subscription support.
          const timer = setInterval(publish, 1000)
          return () => { clearInterval(timer); try { unsubscribe?.() } catch { /* ignore */ } }
        }, 'dsh-super-kb: session feed')
      },
    }
  },
})
