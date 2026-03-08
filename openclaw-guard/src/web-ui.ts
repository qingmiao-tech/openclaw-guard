/**
 * Web UI HTML builder.
 * getHtmlPage() returns the full HTML page for the guard dashboard.
 */

export function getHtmlPage(): string {
  const css = `
*{margin:0;padding:0;box-sizing:border-box}
:root{--bg:#0f172a;--card:#1e293b;--border:#334155;--text:#e2e8f0;--dim:#94a3b8;--green:#22c55e;--yellow:#eab308;--red:#ef4444;--blue:#3b82f6;--purple:#a855f7;--orange:#f97316}
body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;background:var(--bg);color:var(--text);min-height:100vh}
.header{background:linear-gradient(135deg,#1e293b,#0f172a);border-bottom:1px solid var(--border);padding:1rem 2rem;display:flex;align-items:center;gap:1rem}
.header h1{font-size:1.25rem;font-weight:600}
.header .badge{background:var(--blue);color:#fff;font-size:.7rem;padding:2px 8px;border-radius:9999px}
.lang-switch{margin-left:auto;display:flex;align-items:center;gap:.35rem}
.lang-btn{padding:.3rem .7rem;border:1px solid var(--border);background:var(--card);color:var(--dim);border-radius:9999px;font-size:.75rem;cursor:pointer;transition:all .2s}
.lang-btn:hover{border-color:var(--blue);color:var(--text)}
.lang-btn.active{background:var(--blue);border-color:var(--blue);color:#fff}
.tabs{display:flex;gap:0;border-bottom:1px solid var(--border);padding:0 2rem;background:var(--card);flex-wrap:wrap}
.tab{padding:.75rem 1.25rem;cursor:pointer;color:var(--dim);border-bottom:2px solid transparent;transition:all .2s;font-size:.9rem;white-space:nowrap}
.tab:hover{color:var(--text)}
.tab.active{color:var(--blue);border-bottom-color:var(--blue)}
.content{max-width:1100px;margin:0 auto;padding:1.5rem 2rem}
.card{background:var(--card);border:1px solid var(--border);border-radius:.5rem;padding:1.25rem;margin-bottom:1rem}
.card h3{font-size:1rem;margin-bottom:.75rem;color:var(--text)}
.info-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:.75rem}
.info-item{background:var(--bg);padding:.75rem;border-radius:.375rem}
.info-item .label{font-size:.75rem;color:var(--dim);margin-bottom:.25rem}
.info-item .value{font-size:.9rem;word-break:break-all}
.audit-item{display:flex;align-items:flex-start;gap:.75rem;padding:.6rem 0;border-bottom:1px solid var(--border)}
.audit-item:last-child{border-bottom:none}
.status-dot{width:10px;height:10px;border-radius:50%;margin-top:5px;flex-shrink:0}
.status-dot.pass{background:var(--green)}.status-dot.warn{background:var(--yellow)}.status-dot.fail{background:var(--red)}
.audit-detail{flex:1}
.audit-detail .name{font-size:.9rem;font-weight:500}
.audit-detail .msg{font-size:.8rem;color:var(--dim);margin-top:2px}
.audit-detail .fix{font-size:.75rem;color:var(--yellow);margin-top:4px;font-family:monospace}
.summary-bar{display:flex;gap:1.5rem;margin-bottom:1rem}
.summary-item{display:flex;align-items:center;gap:.4rem;font-size:.85rem}
.profile-card{background:var(--bg);border:1px solid var(--border);border-radius:.375rem;padding:1rem;margin-bottom:.75rem;display:flex;justify-content:space-between;align-items:center}
.profile-info .pname{font-weight:600;font-size:.9rem}
.profile-info .pdesc{font-size:.8rem;color:var(--dim);margin-top:2px}
.profile-info .prisk{font-size:.75rem;margin-top:4px}
.btn{padding:.4rem 1rem;border-radius:.375rem;border:1px solid var(--border);background:var(--card);color:var(--text);cursor:pointer;font-size:.8rem;transition:all .2s}
.btn:hover{border-color:var(--blue);color:var(--blue)}
.btn.primary{background:var(--blue);border-color:var(--blue);color:#fff}
.btn.primary:hover{opacity:.85}
.btn.success{background:var(--green);border-color:var(--green);color:#fff}
.btn.success:hover{opacity:.85}
.btn.warning{background:var(--orange);border-color:var(--orange);color:#fff}
.btn.warning:hover{opacity:.85}
.btn.danger{background:var(--red);border-color:var(--red);color:#fff}
.btn.danger:hover{opacity:.85}
.btn:disabled{opacity:.5;cursor:not-allowed}
.step-card{background:var(--bg);border:1px solid var(--border);border-radius:.375rem;padding:1rem;margin-bottom:.75rem}
.step-card .stitle{font-weight:600;font-size:.9rem;margin-bottom:.25rem}
.step-card .sdesc{font-size:.8rem;color:var(--dim);margin-bottom:.5rem}
.step-card .optional-tag{font-size:.7rem;background:var(--purple);color:#fff;padding:1px 6px;border-radius:4px;margin-left:.5rem}
.step-card pre{background:var(--card);padding:.5rem;border-radius:.25rem;font-size:.8rem;overflow-x:auto;line-height:1.6;white-space:pre-wrap}
.platform-select{display:flex;gap:.5rem;margin-bottom:1rem}
.platform-select .btn.selected{background:var(--blue);border-color:var(--blue);color:#fff}
.loading{text-align:center;padding:2rem;color:var(--dim)}
.error-msg{text-align:center;padding:2rem;color:var(--red)}
.toast{position:fixed;bottom:2rem;right:2rem;background:var(--green);color:#fff;padding:.75rem 1.25rem;border-radius:.5rem;font-size:.85rem;opacity:0;transition:opacity .3s;pointer-events:none;z-index:100}
.toast.show{opacity:1}
.toast.error{background:var(--red)}
.hidden{display:none}
.oc-banner{padding:1.25rem;border-radius:.5rem;margin-bottom:1rem;display:flex;align-items:center;justify-content:space-between;gap:1rem;flex-wrap:wrap}
.oc-banner.not-installed{background:linear-gradient(135deg,#7f1d1d,#991b1b);border:1px solid #dc2626}
.oc-banner.installed{background:linear-gradient(135deg,#14532d,#166534);border:1px solid #22c55e}
.oc-banner.update-available{background:linear-gradient(135deg,#78350f,#92400e);border:1px solid #f59e0b}
.oc-banner .oc-info{flex:1}
.oc-banner .oc-title{font-size:1.1rem;font-weight:600;margin-bottom:.25rem}
.oc-banner .oc-desc{font-size:.85rem;opacity:.85}
.oc-banner .oc-actions{display:flex;gap:.5rem;flex-shrink:0}
.oc-detail-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:.75rem;margin-top:1rem}
.spinner{display:inline-block;width:14px;height:14px;border:2px solid rgba(255,255,255,.3);border-top-color:#fff;border-radius:50%;animation:spin .6s linear infinite;margin-right:.4rem;vertical-align:middle}
@keyframes spin{to{transform:rotate(360deg)}}
.log-box{background:var(--bg);border:1px solid var(--border);border-radius:.375rem;padding:.75rem;margin-top:.75rem;font-family:monospace;font-size:.8rem;max-height:200px;overflow-y:auto;white-space:pre-wrap;color:var(--dim)}
.form-group{margin-bottom:1rem}
.form-group label{display:block;font-size:.8rem;color:var(--dim);margin-bottom:.35rem}
.form-group input,.form-group select,.form-group textarea{width:100%;padding:.5rem .75rem;background:var(--bg);border:1px solid var(--border);border-radius:.375rem;color:var(--text);font-size:.85rem;outline:none;transition:border-color .2s}
.form-group input:focus,.form-group select:focus,.form-group textarea:focus{border-color:var(--blue)}
.form-group select{cursor:pointer}
.form-group textarea{resize:vertical;min-height:60px;font-family:monospace}
.form-row{display:grid;grid-template-columns:1fr 1fr;gap:1rem}
.form-row-3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:1rem}
.form-check{display:flex;align-items:center;gap:.5rem;margin-bottom:.75rem}
.form-check input[type=checkbox]{width:16px;height:16px;accent-color:var(--blue);cursor:pointer}
.form-check label{font-size:.85rem;color:var(--text);cursor:pointer}
.toggle{position:relative;display:inline-block;width:40px;height:22px}
.toggle input{opacity:0;width:0;height:0}
.toggle .slider{position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background:var(--border);border-radius:22px;transition:.3s}
.toggle .slider:before{content:"";position:absolute;height:16px;width:16px;left:3px;bottom:3px;background:#fff;border-radius:50%;transition:.3s}
.toggle input:checked+.slider{background:var(--green)}
.toggle input:checked+.slider:before{transform:translateX(18px)}
.channel-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:1rem}
.channel-card{background:var(--bg);border:1px solid var(--border);border-radius:.5rem;padding:1rem;transition:border-color .2s;cursor:pointer}
.channel-card:hover{border-color:var(--blue)}
.channel-card.expanded{border-color:var(--blue);cursor:default}
.channel-header{display:flex;align-items:center;gap:.75rem}
.channel-icon{font-size:1.5rem}
.channel-meta{flex:1}
.channel-meta .ch-name{font-weight:600;font-size:.9rem}
.channel-meta .ch-status{font-size:.75rem;margin-top:2px}
.channel-config{margin-top:1rem;padding-top:1rem;border-top:1px solid var(--border)}
.channel-actions{display:flex;gap:.5rem;margin-top:1rem}
.provider-card{background:var(--bg);border:1px solid var(--border);border-radius:.5rem;padding:1rem;margin-bottom:1rem}
.provider-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:.75rem}
.provider-header .p-name{font-weight:600;font-size:.95rem}
.provider-header .p-url{font-size:.75rem;color:var(--dim);margin-top:2px}
.model-list{display:flex;flex-wrap:wrap;gap:.5rem}
.model-tag{background:var(--card);border:1px solid var(--border);border-radius:.375rem;padding:.3rem .6rem;font-size:.8rem;display:flex;align-items:center;gap:.4rem}
.model-tag.is-primary{border-color:var(--green);background:rgba(34,197,94,.1)}
.model-tag .set-primary{cursor:pointer;color:var(--dim);font-size:.7rem;transition:color .2s}
.model-tag .set-primary:hover{color:var(--blue)}
.preset-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:.75rem;margin-top:1rem}
.preset-card{background:var(--bg);border:1px solid var(--border);border-radius:.5rem;padding:1rem;cursor:pointer;transition:border-color .2s}
.preset-card:hover{border-color:var(--blue)}
.preset-card .preset-icon{font-size:1.25rem;margin-bottom:.25rem}
.preset-card .preset-name{font-weight:600;font-size:.9rem}
.preset-card .preset-type{font-size:.75rem;color:var(--dim);margin-top:2px}
.log-viewer{background:#0a0e1a;border:1px solid var(--border);border-radius:.5rem;padding:1rem;font-family:"Fira Code","Cascadia Code",Consolas,monospace;font-size:.8rem;color:#a0aec0;min-height:400px;max-height:600px;overflow-y:auto;white-space:pre-wrap;line-height:1.6}
.log-toolbar{display:flex;align-items:center;gap:1rem;margin-bottom:1rem;flex-wrap:wrap}
.log-toolbar select{padding:.35rem .5rem;background:var(--bg);border:1px solid var(--border);border-radius:.375rem;color:var(--text);font-size:.8rem}
.dash-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:1rem;margin-bottom:1rem}
.dash-card{background:var(--card);border:1px solid var(--border);border-radius:.5rem;padding:1.25rem}
.dash-card .dash-label{font-size:.75rem;color:var(--dim);margin-bottom:.5rem;text-transform:uppercase;letter-spacing:.5px}
.dash-card .dash-value{font-size:1.5rem;font-weight:700}
.dash-card .dash-sub{font-size:.8rem;color:var(--dim);margin-top:.25rem}
.dash-actions{display:flex;gap:.5rem;flex-wrap:wrap;margin-top:1rem}
.token-display{display:flex;align-items:center;gap:.5rem;background:var(--bg);padding:.5rem .75rem;border-radius:.375rem;border:1px solid var(--border);font-family:monospace;font-size:.85rem;cursor:pointer;transition:border-color .2s}
.token-display:hover{border-color:var(--blue)}
.section-title{font-size:.85rem;color:var(--dim);text-transform:uppercase;letter-spacing:.5px;margin-bottom:.75rem;margin-top:1.25rem}
.add-provider-form{background:var(--bg);border:1px solid var(--border);border-radius:.5rem;padding:1.25rem;margin-top:1rem}
`;

  const js = [
    'var API = "";',
    'var currentPlatform = "";',
    'var ocStatus = null;',
    'var logAutoRefresh = null;',
    'var logLines = 100;',
    'var LANG_STORAGE_KEY = "openclaw.guard.lang";',
    'var guardLang = "en";',
    'var i18nObserver = null;',
    'var i18nMutating = false;',
    '',
    'var TAB_LABELS = {',
    ' en: { dashboard: "Dashboard", info: "System", openclaw: "OpenClaw", feishu: "Feishu", channels: "Channels", ai: "AI Models", mission: "Mission", audit: "Audit", profiles: "Profiles", harden: "Harden", logs: "Logs" },',
    ' zh: { dashboard: "娴狀亣銆冮惄?, info: "缁崵绮?, openclaw: "OpenClaw", feishu: "妞嬬偘鍔?, channels: "濞撶娀浜?, ai: "AI 濡€崇€?, mission: "娴犺濮?, audit: "鐎孤ゎ吀", profiles: "妫板嫯顔?, harden: "閸旂姴娴?, logs: "閺冦儱绻? }',
    '};',
    '',
    'var I18N_ZH_PAIRS = [',
    ' ["OpenClaw Guard - Security Dashboard","OpenClaw Guard - 鐎瑰鍙忛幒褍鍩楅崣?],',
    ' ["If copy fails, ensure Node.js v22+ is installed, then run onboard.","婵″倹鐏夋径宥呭煑婢惰精瑙﹂敍宀冾嚞閸忓牏鈥樼拋?Node.js v22+ 瀹告彃鐣ㄧ憗鍜冪礉閸愬秵澧界悰?onboard閵?],',
    ' ["Use comma-separated provider/model IDs. Order matters.","娴ｈ法鏁ら柅妤€褰块崚鍡涙 provider/model閿涘矂銆庢惔蹇撳祮娴兼ê鍘涚痪褋鈧?],',
    ' ["Configure channel defaults and runtime settings.","闁板秶鐤嗛崥鍕闁捇绮拋銈呪偓闂寸瑢鏉╂劘顢戦崣鍌涙殶閵?],',
    ' ["Mission API Token (optional for remote calls)","Mission API Token閿涘牐绻欑粙瀣殶閻劌褰查柅澶涚礆"],',
    ' ["Keep empty for loopback-only usage","閻ｆ瑧鈹栫悰銊с仛娴犲懎鍘戠拋鍛婃拱閺堝搫娲栭悳顖濈殶閻?],',
    ' ["Task is in progress. Waiting for status updates...","娴犺濮熼幍褑顢戞稉顓ㄧ礉缁涘绶熼悩鑸碘偓浣规纯閺?.."],',
    ' ["Mission command completed, but status confirmation timed out","Mission 閸涙垝鎶ゅ鎻掔暚閹存劧绱濇担鍡欏Ц閹胶鈥樼拋銈堢Т閺?],',
    ' ["Current status: running=","瑜版挸澧犻悩鑸碘偓? running="],',
    ' ["Status confirmation pending: ","閻樿埖鈧胶鈥樼拋銈囩搼瀵板懍鑵戦敍?],',
    ' ["Current version: ","瑜版挸澧犻悧鍫熸拱閿?],',
    ' ["Latest version: ","閺堚偓閺傛壆澧楅張顒婄窗"],',
    ' ["Log auto refresh enabled (3s interval)","閺冦儱绻旈懛顏勫З閸掗攱鏌婂鎻掓儙閻㈩煉绱?缁夋帡妫块梾鏃撶礆"],',
    ' ["Log auto refresh disabled","閺冦儱绻旈懛顏勫З閸掗攱鏌婂鎻掑彠闂?],',
    ' ["No configurable keys returned for this channel.","瑜版挸澧犲〒鐘讳壕濞屸剝婀侀崣顖炲帳缂冾喖鐡у▓鐐光偓?],',
    ' ["Please provide Provider name and Base URL","鐠囧嘲锝為崘?Provider 閸氬秶袨閸?Base URL"],',
    ' ["Please select at least one model","鐠囩柉鍤︾亸鎴︹偓澶嬪娑撯偓娑擃亝膩閸?],',
    ' ["Choose a preset to bootstrap provider configuration.","闁瀚ㄦ稉鈧稉顏堫暕鐠佹儳鎻╅柅鐔峰灡瀵?Provider 闁板秶鐤嗛妴?],',
    ' ["Failed to load logs: ","閸旂姾娴囬弮銉ョ箶婢惰精瑙﹂敍?],',
    ' ["Load presets failed: ","閸旂姾娴囨０鍕啎婢惰精瑙﹂敍?],',
    ' ["Load failed: ","閸旂姾娴囨径杈Е閿?],',
    ' ["Service is not running","閺堝秴濮熼張顏囩箥鐞?],',
    ' ["OpenClaw installed","OpenClaw 瀹告彃鐣ㄧ憗?],',
    ' ["Update available","閸欐垹骞囬崣顖滄暏閺囧瓨鏌?],',
    ' ["Security Profiles","鐎瑰鍙忔０鍕啎"],',
    ' ["Hardening Steps","閸旂姴娴愬銉╊€?],',
    ' ["Download Script","娑撳娴囬懘姘拱"],',
    ' ["Quick Install","韫囶偊鈧喎鐣ㄧ憗?],',
    ' ["Service Status","閺堝秴濮熼悩鑸碘偓?],',
    ' ["Service Actions","閺堝秴濮熼幙宥勭稊"],',
    ' ["Gateway Token","缂冩垵鍙ф禒銈囧"],',
    ' ["Click to copy","閻愮懓鍤径宥呭煑"],',
    ' ["System Info","缁崵绮烘穱鈩冧紖"],',
    ' ["OpenClaw Status","OpenClaw 閻樿埖鈧?],',
    ' ["OpenClaw Home","OpenClaw 閻╊喖缍?],',
    ' ["OpenClaw Dir","OpenClaw 閻╊喖缍?],',
    ' ["Audit Summary","鐎孤ゎ吀濮瑰洦鈧?],',
    ' ["Pass: ","闁俺绻冮敍?],',
    ' ["Warn: ","鐠€锕€鎲￠敍?],',
    ' ["Fail: ","婢惰精瑙﹂敍?],',
    ' ["Fix: ","娣囶喖顦插楦款唴閿?],',
    ' ["Feishu Plugin Status","妞嬬偘鍔熼幓鎺嶆閻樿埖鈧?],',
    ' ["Basic Credentials","閸╄櫣顢呴崙顓熷祦"],',
    ' ["Access Control","鐠佸潡妫堕幒褍鍩?],',
    ' ["Message Settings","濞戝牊浼呯拋鍓х枂"],',
    ' ["Webhook Config","Webhook 闁板秶鐤?],',
    ' ["Render Mode","濞撳弶鐓嬪Ο鈥崇础"],',
    ' ["Whisper Model","Whisper 濡€崇€?],',
    ' ["Connection Mode","鏉╃偞甯村Ο鈥崇础"],',
    ' ["Verification Token","閺嶏繝鐛?Token"],',
    ' ["Encrypt Key","閸旂姴鐦?Key"],',
    ' ["App Secret","鎼存梻鏁ょ€靛棝鎸?],',
    ' ["App ID","鎼存梻鏁?ID"],',
    ' ["Domain","閸╃喎鎮?],',
    ' ["Webhook Path","Webhook 鐠侯垰绶?],',
    ' ["Webhook Host","Webhook 閸︽澘娼?],',
    ' ["Webhook Port","Webhook 缁旑垰褰?],',
    ' ["DM Policy (dmPolicy)","缁変浇浜扮粵鏍殣 (dmPolicy)"],',
    ' ["Group Policy (groupPolicy)","缂囥倛浜扮粵鏍殣 (groupPolicy)"],',
    ' ["Require @mention","韫囧懘銆?@ 閹绘劕寮?],',
    ' ["Enable Streaming","閸氼垳鏁ゅù浣哥础鏉堟挸鍤?],',
    ' ["Channel Configuration","濞撶娀浜鹃柊宥囩枂"],',
    ' ["Primary Model","娑撶粯膩閸?],',
    ' ["Fallback Models","閸ョ偤鈧偓濡€崇€?],',
    ' ["Save Fallbacks","娣囨繂鐡ㄩ崶鐐衡偓鈧柧?],',
    ' ["Configured Providers","瀹告煡鍘ょ純?Provider"],',
    ' ["No providers configured yet.","鐏忔碍婀柊宥囩枂娴犺缍?Provider閵?],',
    ' ["Provider Presets","Provider 妫板嫯顔?],',
    ' ["Provider Name","Provider 閸氬秶袨"],',
    ' ["Recommended Models","閹恒劏宕樺Ο鈥崇€?],',
    ' ["Save Provider","娣囨繂鐡?Provider"],',
    ' ["Add Provider","閺傛澘顤?Provider"],',
    ' ["Set as primary","鐠佸彞璐熸稉缁樐侀崹?],',
    ' ["Fallback","閸ョ偤鈧偓"],',
    ' ["Requires API Key","闂団偓鐟?API Key"],',
    ' ["No Key Needed","閺冪娀娓?Key"],',
    ' ["No API Key","閺?API Key"],',
    ' ["Mission Task Timeline","Mission 娴犺濮熼弮鍫曟？缁?],',
    ' ["Mission Control Logs","Mission 閹貉冨煑閺冦儱绻?],',
    ' ["Task running","娴犺濮熸潻娑滎攽娑?],',
    ' ["Health check OK","閸嬨儱鎮嶅Λ鈧弻銉┾偓姘崇箖"],',
    ' ["Health check failed","閸嬨儱鎮嶅Λ鈧弻銉ャ亼鐠?],',
    ' ["Install/Update","鐎瑰顥?閺囧瓨鏌?],',
    ' ["Start DEV","閸氼垰濮?DEV"],',
    ' ["Start PROD","閸氼垰濮?PROD"],',
    ' ["Restart DEV","闁插秴鎯?DEV"],',
    ' ["Restart PROD","闁插秴鎯?PROD"],',
    ' ["Save Config","娣囨繂鐡ㄩ柊宥囩枂"],',
    ' ["Delete Config","閸掔娀娅庨柊宥囩枂"],',
    ' ["Save Token","娣囨繂鐡?Token"],',
    ' ["Delete provider: ","閸掔娀娅?Provider閿?],',
    ' ["Clear this channel configuration?","绾喛顓诲〒鍛敄鐠囥儲绗柆鎾诲帳缂冾噯绱?],',
    ' ["Loading logs...","閸旂姾娴囬弮銉ョ箶娑?.."],',
    ' ["No logs yet","閺嗗倹妫ら弮銉ョ箶"],',
    ' ["Loading OpenClaw...","閸旂姾娴?OpenClaw 娑?.."],',
    ' ["Loading...","閸旂姾娴囨稉?.."],',
    ' ["Starting...","閸氼垰濮╂稉?.."],',
    ' ["Stopping...","閸嬫粍顒涙稉?.."],',
    ' ["Restarting...","闁插秴鎯庢稉?.."],',
    ' ["Processing...","婢跺嫮鎮婃稉?.."],',
    ' ["Success: ","閹存劕濮涢敍?],',
    ' ["Failed: ","婢惰精瑙﹂敍?],',
    ' ["Dashboard","娴狀亣銆冮惄?],',
    ' ["System","缁崵绮?],',
    ' ["Feishu","妞嬬偘鍔?],',
    ' ["Channels","濞撶娀浜?],',
    ' ["AI Models","AI 濡€崇€?],',
    ' ["Mission","娴犺濮?],',
    ' ["Audit","鐎孤ゎ吀"],',
    ' ["Profiles","妫板嫯顔?],',
    ' ["Harden","閸旂姴娴?],',
    ' ["Logs","閺冦儱绻?],',
    ' ["Service Logs","閺堝秴濮熼弮銉ョ箶"],',
    ' ["Refresh Logs","閸掗攱鏌婇弮銉ョ箶"],',
    ' ["Auto refresh","閼奉亜濮╅崚閿嬫煀"],',
    ' ["Installed","瀹告彃鐣ㄧ憗?],',
    ' ["Not Installed","閺堫亜鐣ㄧ憗?],',
    ' ["Details","鐠囷附鍎?],',
    ' ["Platform","楠炲啿褰?],',
    ' ["Version","閻楀牊婀?],',
    ' ["Latest","閺堚偓閺?],',
    ' ["Binary Path","娴滃矁绻橀崚鎯扮熅瀵?],',
    ' ["Architecture","閺嬭埖鐎?],',
    ' ["Directory","閻╊喖缍?],',
    ' ["User","閻劍鍩?],',
    ' ["Home","娑撹崵娲拌ぐ?],',
    ' ["Start","閸氼垰濮?],',
    ' ["Stop","閸嬫粍顒?],',
    ' ["Restart","闁插秴鎯?],',
    ' ["Apply","鎼存梻鏁?],',
    ' ["Delete","閸掔娀娅?],',
    ' ["Clear","濞撳懐鈹?],',
    ' ["Back","鏉╂柨娲?],',
    ' ["Optional","閸欘垶鈧?]',
    '];',
    'I18N_ZH_PAIRS.sort(function(a, b) { return b[0].length - a[0].length; });',
    '',
    'function detectGuardLang() {',
    ' try {',
    ' var saved = localStorage.getItem(LANG_STORAGE_KEY);',
    ' if (saved === "zh" || saved === "en") return saved;',
    ' } catch (e) {}',
    ' var nav = String((navigator && navigator.language) || "").toLowerCase();',
    ' return nav.indexOf("zh") === 0 ? "zh" : "en";',
    '}',
    '',
    'function setGuardLang(nextLang) {',
    ' if (nextLang !== "zh" && nextLang !== "en") return;',
    ' try { localStorage.setItem(LANG_STORAGE_KEY, nextLang); } catch (e) {}',
    ' if (nextLang !== guardLang) location.reload();',
    '}',
    '',
    'function updateLangButtons() {',
    ' var zhBtn = document.getElementById("lang-btn-zh");',
    ' var enBtn = document.getElementById("lang-btn-en");',
    ' if (zhBtn) zhBtn.classList.toggle("active", guardLang === "zh");',
    ' if (enBtn) enBtn.classList.toggle("active", guardLang === "en");',
    '}',
    '',
    'function updateTabLabels() {',
    ' var labels = TAB_LABELS[guardLang] || TAB_LABELS.en;',
    ' Object.keys(labels).forEach(function(tab) {',
    ' var el = document.querySelector(".tab[data-tab=\\"" + tab + "\\"]");',
    ' if (el) el.textContent = labels[tab];',
    ' });',
    '}',
    '',
    'function translateTextValue(input) {',
    ' if (guardLang !== "zh" || input == null) return input;',
    ' var out = String(input);',
    ' for (var i = 0; i < I18N_ZH_PAIRS.length; i += 1) {',
    ' var from = I18N_ZH_PAIRS[i][0];',
    ' var to = I18N_ZH_PAIRS[i][1];',
    ' if (!from || out.indexOf(from) < 0) continue;',
    ' out = out.split(from).join(to);',
    ' }',
    ' return out;',
    '}',
    '',
    'function shouldSkipTranslate(el) {',
    ' if (!el || !el.closest) return false;',
    ' return !!el.closest("script,style,pre,code,textarea,.log-viewer,.log-box");',
    '}',
    '',
    'function translateAttributes(el) {',
    ' if (!el || !el.getAttribute) return;',
    ' ["title", "placeholder", "aria-label"].forEach(function(attr) {',
    ' var oldValue = el.getAttribute(attr);',
    ' if (!oldValue) return;',
    ' var nextValue = translateTextValue(oldValue);',
    ' if (nextValue !== oldValue) el.setAttribute(attr, nextValue);',
    ' });',
    '}',
    '',
    'function localizeTree(root) {',
    ' if (guardLang !== "zh" || !root || i18nMutating) return;',
    ' if (root.nodeType === 1 && shouldSkipTranslate(root)) return;',
    ' i18nMutating = true;',
    ' try {',
    ' if (root.nodeType === 1) {',
    ' var elRoot = root;',
    ' translateAttributes(elRoot);',
    ' var walker = document.createTreeWalker(elRoot, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, null);',
    ' var nodes = [];',
    ' while (walker.nextNode()) nodes.push(walker.currentNode);',
    ' nodes.forEach(function(node) {',
    ' if (node.nodeType === 1) {',
    ' if (!shouldSkipTranslate(node)) translateAttributes(node);',
    ' return;',
    ' }',
    ' if (!node.parentElement || shouldSkipTranslate(node.parentElement)) return;',
    ' var src = node.nodeValue;',
    ' var dst = translateTextValue(src);',
    ' if (dst !== src) node.nodeValue = dst;',
    ' });',
    ' } else if (root.nodeType === 3) {',
    ' if (!root.parentElement || shouldSkipTranslate(root.parentElement)) return;',
    ' var srcText = root.nodeValue;',
    ' var dstText = translateTextValue(srcText);',
    ' if (dstText !== srcText) root.nodeValue = dstText;',
    ' }',
    ' } finally {',
    ' i18nMutating = false;',
    ' }',
    '}',
    '',
    'function stopI18nObserver() {',
    ' if (i18nObserver) { i18nObserver.disconnect(); i18nObserver = null; }',
    '}',
    '',
    'function startI18nObserver() {',
    ' if (i18nObserver || guardLang !== "zh") return;',
    ' i18nObserver = new MutationObserver(function(mutations) {',
    ' if (i18nMutating || guardLang !== "zh") return;',
    ' mutations.forEach(function(m) {',
    ' if (m.type === "characterData" && m.target) { localizeTree(m.target); return; }',
    ' if (!m.addedNodes || m.addedNodes.length === 0) return;',
    ' m.addedNodes.forEach(function(node) { localizeTree(node); });',
    ' });',
    ' });',
    ' i18nObserver.observe(document.body, { childList: true, subtree: true, characterData: true });',
    '}',
    '',
    'function applyI18n() {',
    ' document.documentElement.lang = guardLang === "zh" ? "zh-CN" : "en";',
    ' document.title = guardLang === "zh" ? "OpenClaw Guard - 鐎瑰鍙忛幒褍鍩楅崣? : "OpenClaw Guard - Security Dashboard";',
    ' updateTabLabels();',
    ' updateLangButtons();',
    ' if (guardLang === "zh") {',
    ' startI18nObserver();',
    ' localizeTree(document.body);',
    ' } else {',
    ' stopI18nObserver();',
    ' }',
    '}',
    '',
    'function initI18n() {',
    ' guardLang = detectGuardLang();',
    ' var zhBtn = document.getElementById("lang-btn-zh");',
    ' var enBtn = document.getElementById("lang-btn-en");',
    ' if (zhBtn) zhBtn.addEventListener("click", function() { setGuardLang("zh"); });',
    ' if (enBtn) enBtn.addEventListener("click", function() { setGuardLang("en"); });',
    ' applyI18n();',
    '}',
    '',
    'initI18n();',
    '',
    'document.querySelectorAll(".tab").forEach(function(t) {',
    ' t.addEventListener("click", function() {',
    ' document.querySelectorAll(".tab").forEach(function(x) { x.classList.remove("active"); });',
    ' t.classList.add("active");',
    ' document.querySelectorAll("[id^=panel-]").forEach(function(p) { p.classList.add("hidden"); });',
    ' document.getElementById("panel-" + t.dataset.tab).classList.remove("hidden");',
    ' var tab = t.dataset.tab;',
    ' if (tab === "logs") loadLogs();',
    ' if (tab === "mission") loadMission();',
    ' if (tab === "feishu") loadFeishu();',
    ' if (tab === "channels") loadChannels();',
    ' if (tab === "ai") loadAI();',
    ' });',
    '});',
    '',
    'function toast(msg, isError) {',
    ' var el = document.getElementById("toast");',
    ' el.textContent = msg;',
    ' el.className = "toast show" + (isError ? " error" : "");',
    ' setTimeout(function() { el.className = "toast"; }, 3000);',
    '}',
    '',
    'function resolveActionEl(elOrId) {',
    ' if (!elOrId) return null;',
    ' if (typeof elOrId === "string") return document.getElementById(elOrId);',
    ' return elOrId;',
    '}',
    '',
    'function setActionLoading(elOrId, loadingText) {',
    ' var el = resolveActionEl(elOrId);',
    ' if (!el) return null;',
    ' if (!el.getAttribute("data-default-html")) el.setAttribute("data-default-html", el.innerHTML || "");',
    ' if (!el.getAttribute("data-default-label")) el.setAttribute("data-default-label", el.textContent || "");',
    ' el.style.pointerEvents = "none";',
    ' if ("disabled" in el) el.disabled = true;',
    ' el.innerHTML = "<span class=\\"spinner\\"></span>" + (loadingText || "Processing...");',
    ' return el;',
    '}',
    '',
    'function clearActionLoading(elOrId) {',
    ' var el = resolveActionEl(elOrId);',
    ' if (!el) return;',
    ' el.style.pointerEvents = "";',
    ' if ("disabled" in el) el.disabled = false;',
    ' var html = el.getAttribute("data-default-html");',
    ' if (html != null && html !== "") el.innerHTML = html;',
    ' else el.textContent = el.getAttribute("data-default-label") || el.textContent;',
    '}',
    '',
    'function esc(s) {',
    ' if (s == null) return "-";',
    ' var d = document.createElement("div");',
    ' d.textContent = String(s);',
    ' return d.innerHTML;',
    '}',
    '',
    'function infoItem(label, value) {',
    ' return \'<div class="info-item"><div class="label">\' + esc(label) + \'</div><div class="value">\' + esc(value) + \'</div></div>\';',
    '}',
    '',
    // === Dashboard tab ===
    'function loadDashboard() {',
    ' var panel = document.getElementById("panel-dashboard");',
    ' panel.innerHTML = \'<div class="loading">Loading...</div>\';',
    ' Promise.all([',
    ' fetch(API + "/api/service/status").then(function(r) { return r.json(); }),',
    ' fetch(API + "/api/info").then(function(r) { return r.json(); }),',
    ' fetch(API + "/api/gateway/token").then(function(r) { return r.json(); }),',
    ' fetch(API + "/api/gateway/dashboard").then(function(r) { return r.json(); })',
    ' ]).then(function(results) {',
    ' var svc = results[0];',
    ' var info = results[1];',
    ' var gw = results[2];',
    ' var dash = results[3];',
    ' currentPlatform = info.platform;',
    ' var oc = info.openclaw || {};',
    ' var running = svc.running;',
    ' var statusColor = running ? "var(--green)" : "var(--red)";',
    ' var statusText = running ? "Running" : "Stopped";',
    '',
    ' var html = \'<div class="dash-grid">\';',
    ' html += \'<div class="dash-card"><div class="dash-label">Service Status</div>\'',
    ' + \'<div class="dash-value" style="color:\' + statusColor + \'">\' + statusText + \'</div>\'',
    ' + \'<div class="dash-sub">\' + (running ? "PID: " + svc.pid + " | Port: " + svc.port : "Service is not running") + \'</div></div>\';',
    ' html += \'<div class="dash-card"><div class="dash-label">Platform</div>\'',
    ' + \'<div class="dash-value">\' + esc(info.platform) + \'</div>\'',
    ' + \'<div class="dash-sub">\' + esc(info.arch) + \' | \' + esc(info.user) + \'</div></div>\';',
    ' html += \'<div class="dash-card"><div class="dash-label">Node.js</div>\'',
    ' + \'<div class="dash-value">\' + esc(info.nodeVersion) + \'</div>\'',
    ' + \'<div class="dash-sub">OpenClaw: \' + (oc.installed ? esc(oc.version || "Installed") : "Not Installed") + \'</div></div>\';',
    ' html += \'<div class="dash-card"><div class="dash-label">OpenClaw Home</div>\'',
    ' + \'<div class="dash-value" style="font-size:.85rem;word-break:break-all">\' + esc(info.openclawDir) + \'</div></div>\';',
    ' html += \'</div>\';',
    '',
    ' // Service actions',
    ' html += \'<div class="card"><h3>Service Actions</h3><div class="dash-actions">\'',
    ' + \'<button class="btn success" id="btn-svc-start" onclick="svcAction(\\x27start\\x27)" \' + (running ? "disabled" : "") + \'>Start</button>\'',
    ' + \'<button class="btn danger" id="btn-svc-stop" onclick="svcAction(\\x27stop\\x27)" \' + (!running ? "disabled" : "") + \'>Stop</button>\'',
    ' + \'<button class="btn warning" id="btn-svc-restart" onclick="svcAction(\\x27restart\\x27)">Restart</button>\'',
    ' + \'</div></div>\';',
    '',
    ' // Gateway Token',
    ' html += \'<div class="card"><h3>Gateway Token</h3>\'',
    ' + \'<div class="token-display" onclick="copyToken(this)" title="Click to copy">\'',
    ' + \'<span>Token</span><span id="gw-token">\' + esc(gw.token ? gw.token.slice(0, 8) + "..." + gw.token.slice(-4) : "-") + \'</span>\'',
    ' + \'<span style="color:var(--dim);font-size:.75rem">Click to copy</span>\'',
    ' + \'</div>\'',
    ' + \'<input type="hidden" id="gw-token-full" value="\' + esc(gw.token || "") + \'">\'',
    ' + \'</div>\';',
    '',
    ' // Dashboard URL',
    ' if (dash.url) {',
    ' html += \'<div class="card"><h3>Dashboard</h3>\'',
    ' + \'<a href="\' + esc(dash.url) + \'" target="_blank" style="color:var(--blue);font-size:.9rem">\' + esc(dash.url) + \' Open</a>\'',
    ' + \'</div>\';',
    ' }',
    '',
    ' panel.innerHTML = html;',
    ' }).catch(function(e) {',
    ' panel.innerHTML = \'<div class="error-msg">Load failed: \' + esc(e.message) + \'</div>\';',
    ' });',
    '}',
    '',
    'var svcBusy = false;',
    'var svcActiveAction = "";',
    'var svcActionLabels = { start: "Start", stop: "Stop", restart: "Restart" };',
    'var svcActionLoading = { start: "Starting...", stop: "Stopping...", restart: "Restarting..." };',
    '',
    'function setSvcButtonsBusy(activeAction) {',
    ' ["start","stop","restart"].forEach(function(a) {',
    ' var btn = document.getElementById("btn-svc-" + a);',
    ' if (!btn) return;',
    ' btn.disabled = true;',
    ' if (a === activeAction) btn.innerHTML = \"<span class=\\"spinner\\"></span>\" + (svcActionLoading[a] || "Processing...");',
    ' else btn.innerHTML = svcActionLabels[a] || a;',
    ' });',
    '}',
    '',
    'function waitForServiceState(expectedRunning, timeoutMs, intervalMs) {',
    ' timeoutMs = timeoutMs || 30000;',
    ' intervalMs = intervalMs || 1000;',
    ' var startedAt = Date.now();',
    ' return new Promise(function(resolve, reject) {',
    ' function poll() {',
    ' fetch(API + "/api/service/status").then(function(r) { return r.json(); }).then(function(svc) {',
    ' if (!!svc.running === expectedRunning) return resolve(svc);',
    ' if (Date.now() - startedAt >= timeoutMs) return reject(new Error("Timed out waiting for service state"));',
    ' setTimeout(poll, intervalMs);',
    ' }).catch(function(err) {',
    ' if (Date.now() - startedAt >= timeoutMs) return reject(err);',
    ' setTimeout(poll, intervalMs);',
    ' });',
    ' }',
    ' poll();',
    ' });',
    '}',
    '',
    'function svcAction(action) {',
    ' if (svcBusy) { toast("Service task is already running", true); return; }',
    ' svcBusy = true;',
    ' svcActiveAction = action;',
    ' setSvcButtonsBusy(action);',
    ' var expectedRunning = action === "stop" ? false : true;',
    ' fetch(API + "/api/service/" + action, { method: "POST" })',
    ' .then(function(r) { return r.json(); })',
    ' .then(function(d) {',
    ' if (!d || d.success === false) throw new Error((d && d.message) || ("Service " + action + " failed"));',
    ' return waitForServiceState(expectedRunning, 45000, 1000)',
    ' .then(function() { return { data: d }; })',
    ' .catch(function(waitErr) { return { data: d, waitErr: waitErr }; });',
    ' }).then(function(result) {',
    ' if (result.waitErr) toast("Service command sent, but status confirmation timed out: " + result.waitErr.message, true);',
    ' else toast("Service " + action + " completed", false);',
    ' }).catch(function(e) {',
    ' toast("Service action failed: " + e.message, true);',
    ' }).finally(function() {',
    ' svcBusy = false;',
    ' svcActiveAction = "";',
    ' refreshDashboardStatus();',
    ' });',
    '}',
    '',
    'function refreshDashboardStatus() {',
    ' fetch(API + "/api/service/status").then(function(r) { return r.json(); }).then(function(svc) {',
    ' var running = !!svc.running;',
    ' var statusColor = running ? "var(--green)" : "var(--red)";',
    ' var statusText = running ? "Running" : "Stopped";',
    ' var cards = document.querySelectorAll(".dash-card");',
    ' if (cards.length > 0) {',
    ' var card = cards[0];',
    ' var valEl = card.querySelector(".dash-value");',
    ' var subEl = card.querySelector(".dash-sub");',
    ' if (valEl) { valEl.style.color = statusColor; valEl.textContent = statusText; }',
    ' if (subEl) { subEl.textContent = running ? "PID: " + svc.pid + " | Port: " + svc.port : "Service is not running"; }',
    ' }',
    ' if (svcBusy) {',
    ' setSvcButtonsBusy(svcActiveAction);',
    ' return;',
    ' }',
    ' var btnStart = document.getElementById("btn-svc-start");',
    ' var btnStop = document.getElementById("btn-svc-stop");',
    ' var btnRestart = document.getElementById("btn-svc-restart");',
    ' if (btnStart) { btnStart.disabled = running; btnStart.innerHTML = svcActionLabels.start; }',
    ' if (btnStop) { btnStop.disabled = !running; btnStop.innerHTML = svcActionLabels.stop; }',
    ' if (btnRestart) { btnRestart.disabled = false; btnRestart.innerHTML = svcActionLabels.restart; }',
    ' }).catch(function() {',
    ' if (svcBusy) {',
    ' setSvcButtonsBusy(svcActiveAction);',
    ' return;',
    ' }',
    ' ["start","stop","restart"].forEach(function(a) {',
    ' var b = document.getElementById("btn-svc-" + a);',
    ' if (b) { b.disabled = false; b.innerHTML = svcActionLabels[a]; }',
    ' });',
    ' });',
    '}',
    '',
    'function copyToken(el) {',
    ' var full = document.getElementById("gw-token-full").value;',
    ' if (!full) return;',
    ' navigator.clipboard.writeText(full).then(function() { toast("Token copied", false); }).catch(function() {',
    ' var ta = document.createElement("textarea"); ta.value = full; document.body.appendChild(ta); ta.select(); document.execCommand("copy"); document.body.removeChild(ta); toast("Token copied", false);',
    ' });',
    '}',
    '',
    // === OpenClaw tab ===
    'function loadOpenClaw() {',
    ' return fetch(API + "/api/openclaw/status").then(function(r) { return r.json(); }).then(function(d) {',
    ' ocStatus = d;',
    ' renderOpenClaw(d);',
    ' }).catch(function(e) {',
    ' document.getElementById("panel-openclaw").innerHTML = \'<div class="error-msg">OpenClaw load failed? \' + esc(e.message) + \'</div>\';',
    ' });',
    '}',
    '',
    'function renderOpenClaw(d) {',
    ' var bannerClass, title, desc;',
    ' if (!d.installed) {',
    ' bannerClass = "not-installed";',
    ' title = "OpenClaw not installed";',
    ' desc = "Install OpenClaw to enable onboarding and management features.";',
    ' } else if (d.updateAvailable) {',
    ' bannerClass = "update-available";',
    ' title = "Update available";',
    ' desc = "Current version: " + d.version + " | Latest version: " + d.latestVersion;',
    ' } else {',
    ' bannerClass = "installed";',
    ' title = "OpenClaw installed";',
    ' desc = "Version: " + (d.version || "unknown") + (d.latestVersion ? " (latest: " + d.latestVersion + ")" : "");',
    ' }',
    '',
    ' var html = \'<div class="oc-banner \' + bannerClass + \'">\'',
    ' + \'<div class="oc-info"><div class="oc-title">\' + title + \'</div>\'',
    ' + \'<div class="oc-desc">\' + esc(desc) + \'</div></div>\'',
    ' + \'<div class="oc-actions">\';',
    '',
    ' if (!d.installed) {',
    ' html += \'<button class="btn success" id="btn-install" onclick="doInstall()">Install</button>\';',
    ' } else {',
    ' html += \'<button class="btn warning" id="btn-update" onclick="doUpdate()">Update</button>\';',
    ' html += \'<button class="btn" id="btn-refresh" onclick="doRefresh(this)">Refresh Status</button>\';',
    ' }',
    ' html += \'</div></div>\';',
    '',
    ' // Details',
    ' html += \'<div class="card"><h3>Details</h3><div class="oc-detail-grid">\'',
    ' + infoItem("Installed", d.installed ? "Yes" : "No")',
    ' + infoItem("Version", d.version || "-")',
    ' + infoItem("Latest", d.latestVersion || "checking...")',
    ' + infoItem("Binary Path", d.binPath || "-")',
    ' + infoItem("Node.js", d.nodeVersion)',
    ' + infoItem("npm", d.npmVersion || "-")',
    ' + \'</div></div>\';',
    '',
    ' // Quick install commands',
    ' html += \'<div class="card"><h3>Quick Install</h3>\'',
    ' + \'<pre>npm install -g openclaw@latest\\nopenclaw onboard --install-daemon</pre>\'',
    ' + \'<div style="font-size:.8rem;color:#94a3b8;margin-top:.5rem">If copy fails, ensure Node.js v22+ is installed, then run onboard.</div>\'',
    ' + \'</div>\';',
    '',
    ' // Install/update logs',
    ' html += \'<div id="install-log-area"></div>\';',
    '',
    ' document.getElementById("panel-openclaw").innerHTML = html;',
    '}',
    '',
    'function doInstall() {',
    ' var btn = document.getElementById("btn-install");',
    ' setActionLoading(btn, "Installing...");',
    ' showLog("[Install] npm install -g openclaw@latest ...");',
    ' fetch(API + "/api/openclaw/install", { method: "POST" })',
    ' .then(function(r) { return r.json(); })',
    ' .then(function(d) {',
    ' appendLog(d.output || "");',
    ' if (d.success) {',
    ' appendLog("\\n" + d.message);',
    ' toast("Success: " + d.message);',
        ' setTimeout(function() {',
        ' loadOpenClaw().finally(function() { clearActionLoading(btn); });',
        ' }, 1000);',
    ' } else {',
    ' appendLog("\\nFailed: " + d.message);',
    ' toast("Failed: " + d.message, true);',
        ' clearActionLoading(btn);',
    ' }',
    ' }).catch(function(e) {',
    ' appendLog("\\nRequest failed: " + e.message);',
    ' toast("Request failed", true);',
      ' clearActionLoading(btn);',
    ' });',
    '}',
    '',
    'function doUpdate() {',
    ' var btn = document.getElementById("btn-update");',
    ' setActionLoading(btn, "Updating...");',
    ' showLog("[Update] npm install -g openclaw@latest ...");',
    ' fetch(API + "/api/openclaw/update", { method: "POST" })',
    ' .then(function(r) { return r.json(); })',
    ' .then(function(d) {',
    ' appendLog(d.output || "");',
    ' if (d.success) {',
    ' appendLog("\\n" + d.message);',
    ' toast("Success: " + d.message);',
        ' setTimeout(function() {',
        ' loadOpenClaw().finally(function() { clearActionLoading(btn); });',
        ' }, 1000);',
    ' } else {',
    ' appendLog("\\nFailed: " + d.message);',
    ' toast("Failed: " + d.message, true);',
        ' clearActionLoading(btn);',
    ' }',
    ' }).catch(function(e) {',
    ' appendLog("\\nRequest failed: " + e.message);',
    ' toast("Request failed", true);',
      ' clearActionLoading(btn);',
    ' });',
    '}',
    '',
    'function doRefresh(btnEl) {',
    ' setActionLoading(btnEl || "btn-refresh", "Refreshing...");',
    ' document.getElementById("panel-openclaw").innerHTML = \'<div class="loading">Loading OpenClaw...</div>\';',
    ' loadOpenClaw().finally(function() { clearActionLoading(btnEl || "btn-refresh"); });',
    '}',
    '',
    'function showLog(msg) {',
    ' var area = document.getElementById("install-log-area");',
    ' if (area) area.innerHTML = \'<div class="card"><h3>Logs</h3><div class="log-box" id="log-content">\' + esc(msg) + \'</div></div>\';',
    '}',
    '',
    'function appendLog(msg) {',
    ' var el = document.getElementById("log-content");',
    ' if (el) { el.textContent += msg; el.scrollTop = el.scrollHeight; }',
    '}',
    '',
    // === Info tab ===
    'function loadInfo() {',
    ' return fetch(API + "/api/info").then(function(r) { return r.json(); }).then(function(d) {',
    ' currentPlatform = d.platform;',
    ' var oc = d.openclaw || {};',
    ' var ocBadge = oc.installed',
    ' ? \'<span style="color:#22c55e">Installed\' + (oc.version ? " (" + esc(oc.version) + ")" : "") + \'</span>\'',
    ' : \'<span style="color:#ef4444">Not Installed</span>\';',
    ' document.getElementById("panel-info").innerHTML = \'<div class="card"><h3>System Info</h3><div class="info-grid">\'',
    ' + infoItem("Platform", d.platform) + infoItem("User", d.user) + infoItem("Home", d.home)',
    ' + infoItem("OpenClaw Dir", d.openclawDir) + infoItem("Node.js", d.nodeVersion) + infoItem("Architecture", d.arch)',
    ' + \'</div></div>\'',
    ' + \'<div class="card"><h3>OpenClaw Status</h3><div style="font-size:.9rem">\' + ocBadge',
    ' + (oc.updateAvailable ? \' <span style="color:#f59e0b">Update available: \' + esc(oc.latestVersion) + \'</span>\' : "")',
    ' + (!oc.installed ? \' <button class="btn primary" style="margin-left:.75rem;font-size:.75rem" onclick="document.querySelectorAll(\\x27.tab\\x27)[2].click()">Install -></button>\' : "")',
    ' + \'</div></div>\';',
    ' }).catch(function(e) {',
    ' document.getElementById("panel-info").innerHTML = \'<div class="error-msg">Load failed: \' + esc(e.message) + \'</div>\';',
    ' });',
    '}',
    '',
    // === Audit tab ===
    'function loadAudit() {',
    ' return fetch(API + "/api/audit").then(function(r) { return r.json(); }).then(function(d) {',
    ' var html = \'<div class="card"><h3>Audit Summary</h3><div class="summary-bar">\'',
    ' + \'<div class="summary-item"><span class="status-dot pass"></span> Pass: \' + d.summary.pass + \'</div>\'',
    ' + \'<div class="summary-item"><span class="status-dot warn"></span> Warn: \' + d.summary.warn + \'</div>\'',
    ' + \'<div class="summary-item"><span class="status-dot fail"></span> Fail: \' + d.summary.fail + \'</div>\'',
    ' + \'</div>\';',
    ' d.results.forEach(function(r) {',
    ' html += \'<div class="audit-item"><div class="status-dot \' + r.status + \'"></div><div class="audit-detail">\'',
    ' + \'<div class="name">[\' + esc(r.category) + \'] \' + esc(r.item) + \'</div>\'',
    ' + \'<div class="msg">\' + esc(r.message) + \'</div>\'',
    ' + (r.fix ? \'<div class="fix">Fix: \' + esc(r.fix) + \'</div>\' : \'\')',
    ' + \'</div></div>\';',
    ' });',
    ' html += \'</div>\';',
    ' document.getElementById("panel-audit").innerHTML = html;',
    ' }).catch(function(e) {',
    ' document.getElementById("panel-audit").innerHTML = \'<div class="error-msg">Load failed: \' + esc(e.message) + \'</div>\';',
    ' });',
    '}',
    '',
    // === Profiles tab ===
    'function loadProfiles() {',
    ' return fetch(API + "/api/profiles").then(function(r) { return r.json(); }).then(function(profiles) {',
    ' var html = \'<div class="card"><h3>Security Profiles</h3>\';',
    ' profiles.forEach(function(p) {',
    ' html += \'<div class="profile-card"><div class="profile-info">\'',
    ' + \'<div class="pname">\' + esc(p.name) + \'</div>\'',
    ' + \'<div class="pdesc">\' + esc(p.description) + \'</div>\'',
    ' + \'<div class="prisk">\' + esc(p.riskLevel) + \'</div>\'',
    ' + \'</div><button class="btn primary" onclick="applyProfile(\\x27\' + p.key + \'\\x27)">Apply</button></div>\';',
    ' });',
    ' html += \'</div>\';',
    ' document.getElementById("panel-profiles").innerHTML = html;',
    ' }).catch(function(e) {',
    ' document.getElementById("panel-profiles").innerHTML = \'<div class="error-msg">Load failed: \' + esc(e.message) + \'</div>\';',
    ' });',
    '}',
    '',
    'function applyProfile(key) {',
    ' fetch(API + "/api/profiles/apply", {',
    ' method: "POST", headers: {"Content-Type":"application/json"},',
    ' body: JSON.stringify({ profile: key })',
    ' }).then(function(r) { return r.json(); }).then(function(d) {',
    ' toast(d.success ? ("Success: " + d.message) : ("Failed: " + d.message), !d.success);',
    ' });',
    '}',
    '',
    // === Harden tab ===
    'function loadHarden(platform) {',
    ' platform = platform || currentPlatform || "linux";',
    ' fetch(API + "/api/harden/steps?platform=" + platform).then(function(r) { return r.json(); }).then(function(d) {',
    ' var platforms = ["windows","macos","linux"];',
    ' var html = \'<div class="card"><h3>Hardening Steps</h3><div class="platform-select">\';',
    ' platforms.forEach(function(pl) {',
    ' html += \'<button class="btn\' + (pl === d.platform ? " selected" : "") + \'" onclick="loadHarden(\\x27\' + pl + \'\\x27)">\' + pl + \'</button>\';',
    ' });',
    ' html += \'<button class="btn" style="margin-left:auto" onclick="downloadScript(\\x27\' + d.platform + \'\\x27)">Download Script</button></div>\';',
    ' d.steps.forEach(function(s) {',
    ' html += \'<div class="step-card"><div class="stitle">\' + esc(s.title)',
    ' + (s.optional ? \'<span class="optional-tag">Optional</span>\' : "") + \'</div>\'',
    ' + \'<div class="sdesc">\' + esc(s.description) + \'</div>\'',
    ' + \'<pre>\' + s.commands.map(function(c) { return esc(c); }).join("\\n") + \'</pre></div>\';',
    ' });',
    ' html += \'</div>\';',
    ' document.getElementById("panel-harden").innerHTML = html;',
    ' }).catch(function(e) {',
    ' document.getElementById("panel-harden").innerHTML = \'<div class="error-msg">Load failed: \' + esc(e.message) + \'</div>\';',
    ' });',
    '}',
    '',
    'function downloadScript(platform) {',
    ' window.open(API + "/api/harden/script?platform=" + platform);',
    '}',
    '',
    // === Feishu tab ===
    'function loadFeishu() {',
    ' var panel = document.getElementById("panel-feishu");',
    ' panel.innerHTML = \'<div class="loading">Loading...</div>\';',
    ' Promise.all([',
    ' fetch(API + "/api/feishu/config").then(function(r) { return r.json(); }),',
    ' fetch(API + "/api/feishu/plugin").then(function(r) { return r.json(); })',
    ' ]).then(function(results) {',
    ' var cfg = results[0];',
    ' var plugin = results[1];',
    ' var html = "";',
    '',
    ' // Plugin status',
    ' html += \'<div class="card"><h3>Feishu Plugin Status</h3>\'',
    ' + (plugin.installed',
    ' ? \'<span style="color:var(--green)">Installed\' + (plugin.version ? " (v" + esc(plugin.version) + ")" : "") + \'</span>\'',
    ' : \'<span style="color:var(--red)">Not Installed</span>\')',
    ' + \'</div>\';',
    '',
    ' // Basic credentials',
    ' html += \'<div class="card"><h3>Basic Credentials</h3>\'',
    ' + \'<div class="form-row"><div class="form-group"><label>App ID</label>\'',
    ' + \'<input id="fs-appId" value="\' + esc(cfg.appId || "") + \'"></div>\'',
    ' + \'<div class="form-group"><label>App Secret</label>\'',
    ' + \'<input id="fs-appSecret" type="password" value="\' + esc(cfg.appSecret || "") + \'"></div></div>\'',
    ' + \'<div class="form-row"><div class="form-group"><label>Encrypt Key</label>\'',
    ' + \'<input id="fs-encryptKey" type="password" value="\' + esc(cfg.encryptKey || "") + \'"></div>\'',
    ' + \'<div class="form-group"><label>Verification Token</label>\'',
    ' + \'<input id="fs-verificationToken" value="\' + esc(cfg.verificationToken || "") + \'"></div></div>\'',
    ' + \'<div class="form-row"><div class="form-group"><label>Domain</label>\'',
    ' + \'<select id="fs-domain"><option value="feishu"\' + (cfg.domain === "feishu" ? " selected" : "") + \'>Feishu (feishu)</option>\'',
    ' + \'<option value="lark"\' + (cfg.domain === "lark" ? " selected" : "") + \'>Lark (lark)</option></select></div>\'',
    ' + \'<div class="form-group"><label>Connection Mode</label>\'',
    ' + \'<select id="fs-connectionMode"><option value="webhook"\' + (cfg.connectionMode === "webhook" ? " selected" : "") + \'>Webhook</option>\'',
    ' + \'<option value="websocket"\' + (cfg.connectionMode === "websocket" ? " selected" : "") + \'>WebSocket</option></select></div></div>\'',
    ' + \'</div>\';',
    '',
    ' // Webhook Config?',
    ' html += \'<div class="card"><h3>Webhook Config</h3>\'',
    ' + \'<div class="form-row-3"><div class="form-group"><label>Webhook Path</label>\'',
    ' + \'<input id="fs-webhookPath" value="\' + esc(cfg.webhookPath || "") + \'" placeholder="/webhook/feishu"></div>\'',
    ' + \'<div class="form-group"><label>Webhook Host</label>\'',
    ' + \'<input id="fs-webhookHost" value="\' + esc(cfg.webhookHost || "") + \'" placeholder="0.0.0.0"></div>\'',
    ' + \'<div class="form-group"><label>Webhook Port</label>\'',
    ' + \'<input id="fs-webhookPort" type="number" value="\' + esc(cfg.webhookPort || "") + \'" placeholder="3000"></div></div>\'',
    ' + \'</div>\';',
    '',
    ' // Access control',
    ' html += \'<div class="card"><h3>Access Control</h3>\'',
    ' + \'<div class="form-row-3"><div class="form-group"><label>DM Policy (dmPolicy)</label>\'',
    ' + \'<select id="fs-dmPolicy"><option value="allow"\' + (cfg.dmPolicy === "allow" ? " selected" : "") + \'>allow (allow)</option>\'',
    ' + \'<option value="deny"\' + (cfg.dmPolicy === "deny" ? " selected" : "") + \'>deny (deny)</option>\'',
    ' + \'<option value="whitelist"\' + (cfg.dmPolicy === "whitelist" ? " selected" : "") + \'>whitelist (whitelist)</option></select></div>\'',
    ' + \'<div class="form-group"><label>Group Policy (groupPolicy)</label>\'',
    ' + \'<select id="fs-groupPolicy"><option value="allow"\' + (cfg.groupPolicy === "allow" ? " selected" : "") + \'>allow (allow)</option>\'',
    ' + \'<option value="deny"\' + (cfg.groupPolicy === "deny" ? " selected" : "") + \'>deny (deny)</option>\'',
    ' + \'<option value="whitelist"\' + (cfg.groupPolicy === "whitelist" ? " selected" : "") + \'>whitelist (whitelist)</option></select></div>\'',
    ' + \'<div style="display:flex;align-items:flex-end;padding-bottom:.35rem"><div class="form-check">\'',
    ' + \'<input type="checkbox" id="fs-requireMention"\' + (cfg.requireMention ? " checked" : "") + \'>\'',
    ' + \'<label for="fs-requireMention">Require @mention</label></div></div></div>\'',
    ' + \'</div>\';',
    '',
    ' // Message settings',
    ' html += \'<div class="card"><h3>Message Settings</h3>\'',
    ' + \'<div class="form-row-3"><div style="display:flex;align-items:center;gap:1rem;padding-top:.5rem">\'',
    ' + \'<div class="form-check"><input type="checkbox" id="fs-streaming"\' + (cfg.streaming ? " checked" : "") + \'>\'',
    ' + \'<label for="fs-streaming">Enable Streaming</label></div></div>\'',
    ' + \'<div class="form-group"><label>Render Mode</label>\'',
    ' + \'<select id="fs-renderMode"><option value="markdown"\' + (cfg.renderMode === "markdown" ? " selected" : "") + \'>Markdown</option>\'',
    ' + \'<option value="raw"\' + (cfg.renderMode === "raw" ? " selected" : "") + \'>Raw</option></select></div>\'',
    ' + \'<div class="form-group"><label>Whisper Model</label>\'',
    ' + \'<input id="fs-whisperModel" value="\' + esc(cfg.whisperModel || "") + \'" placeholder="whisper-1"></div></div>\'',
    ' + \'<div style="margin-top:1rem"><button class="btn primary" id="btn-feishu-save" onclick="saveFeishu()">Save Config</button></div>\'',
    ' + \'</div>\';',
    '',
    ' panel.innerHTML = html;',
    ' }).catch(function(e) {',
    ' panel.innerHTML = \'<div class="error-msg">Load failed: \' + esc(e.message) + \'</div>\';',
    ' });',
    '}',
    '',
    'function saveFeishu() {',
    ' var btn = document.getElementById("btn-feishu-save");',
    ' setActionLoading(btn, "Saving...");',
    ' var data = {',
    ' appId: document.getElementById("fs-appId").value,',
    ' appSecret: document.getElementById("fs-appSecret").value,',
    ' encryptKey: document.getElementById("fs-encryptKey").value,',
    ' verificationToken: document.getElementById("fs-verificationToken").value,',
    ' domain: document.getElementById("fs-domain").value,',
    ' connectionMode: document.getElementById("fs-connectionMode").value,',
    ' webhookPath: document.getElementById("fs-webhookPath").value,',
    ' webhookHost: document.getElementById("fs-webhookHost").value,',
    ' webhookPort: document.getElementById("fs-webhookPort").value,',
    ' dmPolicy: document.getElementById("fs-dmPolicy").value,',
    ' groupPolicy: document.getElementById("fs-groupPolicy").value,',
    ' requireMention: document.getElementById("fs-requireMention").checked,',
    ' streaming: document.getElementById("fs-streaming").checked,',
    ' renderMode: document.getElementById("fs-renderMode").value,',
    ' whisperModel: document.getElementById("fs-whisperModel").value',
    ' };',
    ' fetch(API + "/api/feishu/config", {',
    ' method: "POST", headers: {"Content-Type":"application/json"},',
    ' body: JSON.stringify(data)',
    ' }).then(function(r) { return r.json(); }).then(function(d) {',
    ' toast(d.success ? "Feishu config saved" : ("Save failed: " + d.message), !d.success);',
    ' }).catch(function(e) {',
    ' toast("Save config: " + e.message, true);',
    ' }).finally(function() {',
    ' clearActionLoading(btn);',
    ' });',
    '}',
    '',
    // === Channels tab ===
    'var expandedChannel = null;',
    '',
    'function loadChannels() {',
    ' var panel = document.getElementById("panel-channels");',
    ' panel.innerHTML = \'<div class="loading">Loading...</div>\';',
    ' fetch(API + "/api/channels").then(function(r) { return r.json(); }).then(function(channels) {',
    ' var html = \'<div class="card"><h3>Channel Configuration</h3>\'',
    ' + \'<div style="font-size:.8rem;color:var(--dim);margin-bottom:1rem">Configure channel defaults and runtime settings.</div>\'',
    ' + \'<div class="channel-grid">\';',
    ' channels.forEach(function(ch) {',
    ' var isExpanded = expandedChannel === ch.id;',
    ' var statusColor = ch.enabled ? "var(--green)" : "var(--dim)";',
    ' var statusText = ch.enabled ? "Enabled" : "Disabled";',
    ' if (ch.configured) statusText += " | Configured";',
    ' html += \'<div class="channel-card\' + (isExpanded ? " expanded" : "") + \'" id="ch-\' + ch.id + \'">\';',
    ' html += \'<div class="channel-header" onclick="toggleChannel(\\x27\' + ch.id + \'\\x27)">\'',
    ' + \'<div class="channel-icon">\' + (ch.icon || "Channel") + \'</div>\'',
    ' + \'<div class="channel-meta"><div class="ch-name">\' + esc(ch.name) + \'</div>\'',
    ' + \'<div class="ch-status" style="color:\' + statusColor + \'">\' + statusText + \'</div></div>\'',
    ' + \'<label class="toggle" onclick="event.stopPropagation()">\'',
    ' + \'<input type="checkbox"\' + (ch.enabled ? " checked" : "") + \' onchange="toggleChannelEnabled(\\x27\' + ch.id + \'\\x27, this.checked, this)">\'',
    ' + \'<span class="slider"></span></label></div>\';',
    '',
    ' if (isExpanded) {',
    ' html += \'<div class="channel-config">\';',
    ' var cfg = ch.config || {};',
    ' var keys = Object.keys(cfg);',
    ' if (keys.length === 0) {',
    ' html += \'<div style="font-size:.85rem;color:var(--dim)">No configurable keys returned for this channel.</div>\';',
    ' } else {',
    ' keys.forEach(function(k) {',
    ' html += \'<div class="form-group"><label>\' + esc(k) + \'</label>\'',
    ' + \'<input class="ch-cfg-input" data-channel="\' + ch.id + \'" data-key="\' + esc(k) + \'" value="\' + esc(cfg[k] || "") + \'"></div>\';',
    ' });',
    ' }',
    ' html += \'<div class="channel-actions">\'',
    ' + \'<button class="btn primary" onclick="saveChannelConfig(\\x27\' + ch.id + \'\\x27, this)">Save Config</button>\'',
    ' + \'<button class="btn danger" onclick="clearChannelConfig(\\x27\' + ch.id + \'\\x27, this)">Delete Config</button>\'',
    ' + \'</div></div>\';',
    ' }',
    ' html += \'</div>\';',
    ' });',
    ' html += \'</div></div>\';',
    ' panel.innerHTML = html;',
    ' }).catch(function(e) {',
    ' panel.innerHTML = \'<div class="error-msg">Load failed: \' + esc(e.message) + \'</div>\';',
    ' });',
    '}',
    '',
    'function toggleChannel(id) {',
    ' expandedChannel = expandedChannel === id ? null : id;',
    ' loadChannels();',
    '}',
    '',
    'function toggleChannelEnabled(id, enabled, el) {',
    ' if (el) { el.disabled = true; }',
    ' fetch(API + "/api/channels/" + id, {',
    ' method: "POST", headers: {"Content-Type":"application/json"},',
    ' body: JSON.stringify({ enabled: enabled })',
    ' }).then(function(r) { return r.json(); }).then(function(d) {',
    ' toast(d.success ? "Channel enabled state updated" : ("Update failed: " + d.message), !d.success);',
    ' loadChannels();',
    ' }).catch(function(e) {',
    ' toast("Channel action failed: " + e.message, true);',
    ' }).finally(function() {',
    ' if (el) el.disabled = false;',
    ' });',
    '}',
    '',
    'function saveChannelConfig(id, btnEl) {',
    ' setActionLoading(btnEl, "Saving...");',
    ' var inputs = document.querySelectorAll(".ch-cfg-input[data-channel=\'" + id + "\']");',
    ' var cfg = {};',
    ' inputs.forEach(function(inp) { cfg[inp.dataset.key] = inp.value; });',
    ' fetch(API + "/api/channels/" + id, {',
    ' method: "POST", headers: {"Content-Type":"application/json"},',
    ' body: JSON.stringify(cfg)',
    ' }).then(function(r) { return r.json(); }).then(function(d) {',
    ' toast(d.success ? "Channel config saved" : ("Save failed: " + d.message), !d.success);',
    ' }).catch(function(e) {',
    ' toast("Save config: " + e.message, true);',
    ' }).finally(function() {',
    ' clearActionLoading(btnEl);',
    ' });',
    '}',
    '',
    'function clearChannelConfig(id, btnEl) {',
    ' if (!confirm("Clear this channel configuration?")) return;',
    ' setActionLoading(btnEl, "Clearing...");',
    ' fetch(API + "/api/channels/" + id, { method: "DELETE" })',
    ' .then(function(r) { return r.json(); }).then(function(d) {',
    ' toast(d.success ? "Channel config cleared" : ("Clear failed: " + d.message), !d.success);',
    ' loadChannels();',
    ' }).catch(function(e) {',
    ' toast("Channel action failed: " + e.message, true);',
    ' }).finally(function() {',
    ' clearActionLoading(btnEl);',
    ' });',
    '}',
    '',
    // === AI Config tab ===
    'var showAddProvider = false;',
    'var selectedPreset = null;',
    '',
    'function loadAI() {',
    ' var panel = document.getElementById("panel-ai");',
    ' panel.innerHTML = \'<div class="loading">Loading...</div>\';',
    ' fetch(API + "/api/ai/config").then(function(r) { return r.json(); }).then(function(d) {',
    ' var html = "";',
    '',
    ' // Primary model',
    ' html += \'<div class="card"><h3>Primary Model</h3>\'',
    ' + \'<div style="font-size:1.1rem;font-weight:600;color:\' + (d.primaryModel ? "var(--green)" : "var(--dim)") + \'">\' + esc(d.primaryModel || "Not set") + \'</div>\'',
    ' + \'</div>\';',
    '',
    ' // Fallback models',
    ' var fallbackValue = (Array.isArray(d.fallbackModels) ? d.fallbackModels : []).join(", ");',
    ' html += \'<div class="card"><h3>Fallback Models</h3>\'',
    ' + \'<div style="color:var(--dim);font-size:.85rem;margin-bottom:.5rem">Use comma-separated provider/model IDs. Order matters.</div>\'',
    ' + \'<div style="display:flex;gap:.5rem;flex-wrap:wrap">\'',
    ' + \'<input id="ai-fallback-input" style="flex:1;min-width:320px" placeholder="qwen/qwen3.5-plus, openai-codex/gpt-5.3-codex" value="\' + esc(fallbackValue) + \'">\'',
    ' + \'<button class="btn primary" id="btn-ai-save-fallbacks" onclick="setAIFallbacks()">Save Fallbacks</button>\'',
    ' + \'<button class="btn" id="btn-ai-clear-fallbacks" onclick="clearAIFallbacks()">Clear</button>\'',
    ' + \'</div></div>\';',
    '',
    ' // Provider list',
    ' html += \'<div class="card"><h3>Configured Providers</h3>\';',
    ' if (d.providers.length === 0) {',
    ' html += \'<div style="color:var(--dim);font-size:.85rem">No providers configured yet.</div>\';',
    ' } else {',
    ' d.providers.forEach(function(p) {',
    ' html += \'<div class="provider-card"><div class="provider-header"><div>\'',
    ' + \'<div class="p-name">\' + esc(p.name) + \'</div>\'',
    ' + \'<div class="p-url">\' + esc(p.baseUrl) + (p.hasApiKey ? " | Token " + esc(p.apiKeyMasked) : " | No API Key") + \'</div>\'',
    ' + \'</div><button class="btn danger" onclick="deleteAIProvider(\\x27\' + esc(p.name) + \'\\x27, this)" style="font-size:.75rem">Delete</button></div>\'',
    ' + \'<div class="model-list">\';',
    ' p.models.forEach(function(m) {',
    ' html += \'<div class="model-tag\' + (m.isPrimary ? " is-primary" : "") + \'">\'',
    ' + \'<span>\' + esc(m.name || m.id) + \'</span>\'',
    ' + (m.isPrimary ? \'<span style="color:var(--green);font-size:.7rem">Primary</span>\' : \'<span class="set-primary" onclick="setAIPrimary(\\x27\' + esc(m.fullId) + \'\\x27, this)">Set as primary</span>\')',
    ' + (m.isFallback ? \'<span style="color:var(--accent2);font-size:.7rem;margin-left:.5rem">Fallback</span>\' : "")',
    ' + \'</div>\';',
    ' });',
    ' html += \'</div></div>\';',
    ' });',
    ' }',
    ' html += \'<div style="margin-top:1rem"><button class="btn primary" onclick="toggleAddProvider()">Add Provider</button></div>\'',
    ' + \'</div>\';',
    '',
    ' // Add provider area',
    ' html += \'<div id="add-provider-area"></div>\';',
    '',
    ' panel.innerHTML = html;',
    ' if (showAddProvider) loadPresets();',
    ' }).catch(function(e) {',
    ' panel.innerHTML = \'<div class="error-msg">Load failed: \' + esc(e.message) + \'</div>\';',
    ' });',
    '}',
    '',
    'function toggleAddProvider() {',
    ' showAddProvider = !showAddProvider;',
    ' if (showAddProvider) { loadPresets(); } else { document.getElementById("add-provider-area").innerHTML = ""; }',
    '}',
    '',
    'function loadPresets() {',
    ' fetch(API + "/api/ai/providers").then(function(r) { return r.json(); }).then(function(presets) {',
    ' var area = document.getElementById("add-provider-area");',
    ' if (!area) return;',
    ' if (selectedPreset) { renderPresetForm(selectedPreset, presets); return; }',
    ' var html = \'<div class="card"><h3>Provider Presets</h3>\'',
    ' + \'<div style="font-size:.8rem;color:var(--dim);margin-bottom:.75rem">Choose a preset to bootstrap provider configuration.</div>\'',
    ' + \'<div class="preset-grid">\';',
    ' presets.forEach(function(p) {',
    ' html += \'<div class="preset-card" onclick="selectPreset(\\x27\' + esc(p.id) + \'\\x27)">\'',
    ' + \'<div class="preset-icon">\' + (p.icon || "Add") + \'</div>\'',
    ' + \'<div class="preset-name">\' + esc(p.name) + \'</div>\'',
    ' + \'<div class="preset-type">\' + esc(p.apiType) + (p.requiresApiKey ? " | Requires API Key" : " | No Key Needed") + \'</div>\'',
    ' + \'</div>\';',
    ' });',
    ' html += \'</div><div style="margin-top:1rem"><button class="btn" onclick="toggleAddProvider()">Cancel</button></div></div>\';',
    ' area.innerHTML = html;',
    ' }).catch(function(e) { toast("Load presets failed: " + e.message, true); });',
    '}',
    '',
    'function selectPreset(id) {',
    ' selectedPreset = id;',
    ' fetch(API + "/api/ai/providers").then(function(r) { return r.json(); }).then(function(presets) {',
    ' renderPresetForm(id, presets);',
    ' });',
    '}',
    '',
    'function renderPresetForm(id, presets) {',
    ' var preset = presets.find(function(p) { return p.id === id; });',
    ' if (!preset) return;',
    ' var area = document.getElementById("add-provider-area");',
    ' if (!area) return;',
    ' var html = \'<div class="add-provider-form"><h3>\' + (preset.icon || "Add") + " " + esc(preset.name) + \'</h3>\'',
    ' + \'<div class="form-row"><div class="form-group"><label>Provider Name</label>\'',
    ' + \'<input id="ap-name" value="\' + esc(preset.id) + \'"></div>\'',
    ' + \'<div class="form-group"><label>Base URL</label>\'',
    ' + \'<input id="ap-baseUrl" value="\' + esc(preset.defaultBaseUrl) + \'"></div></div>\';',
    ' if (preset.requiresApiKey) {',
    ' html += \'<div class="form-group"><label>API Key</label>\'',
    ' + \'<input id="ap-apiKey" type="password" placeholder="Enter API Key"></div>\';',
    ' }',
    ' html += \'<input type="hidden" id="ap-apiType" value="\' + esc(preset.apiType) + \'">\';',
    ' html += \'<div class="section-title">Recommended Models</div>\';',
    ' preset.suggestedModels.forEach(function(m) {',
    ' html += \'<div class="form-check"><input type="checkbox" id="ap-model-\' + esc(m.id) + \'" value="\' + esc(m.id) + \'" data-name="\' + esc(m.name) + \'"\' + (m.recommended ? " checked" : "") + \'>\'',
    ' + \'<label for="ap-model-\' + esc(m.id) + \'">\' + esc(m.name) + (m.description ? " - " + esc(m.description) : "") + \'</label></div>\';',
    ' });',
    ' html += \'<div style="margin-top:1rem;display:flex;gap:.5rem">\'',
    ' + \'<button class="btn primary" id="btn-ai-save-provider" onclick="saveNewProvider()">Save Provider</button>\'',
    ' + \'<button class="btn" onclick="selectedPreset=null;loadPresets()">Back</button>\'',
    ' + \'<button class="btn" onclick="selectedPreset=null;showAddProvider=false;document.getElementById(\\x27add-provider-area\\x27).innerHTML=\\x27\\x27">Cancel</button>\'',
    ' + \'</div></div>\';',
    ' area.innerHTML = html;',
    '}',
    '',
    'function saveNewProvider() {',
    ' var btn = document.getElementById("btn-ai-save-provider");',
    ' setActionLoading(btn, "Saving Provider...");',
    ' var name = document.getElementById("ap-name").value.trim();',
    ' var baseUrl = document.getElementById("ap-baseUrl").value.trim();',
    ' var apiType = document.getElementById("ap-apiType").value;',
    ' var apiKeyEl = document.getElementById("ap-apiKey");',
    ' var apiKey = apiKeyEl ? apiKeyEl.value.trim() : "";',
    ' if (!name || !baseUrl) {',
    ' toast("Please provide Provider name and Base URL", true);',
    ' clearActionLoading(btn);',
    ' return;',
    ' }',
    ' var models = [];',
    ' document.querySelectorAll("[id^=ap-model-]:checked").forEach(function(cb) {',
    ' models.push({ id: cb.value, name: cb.dataset.name || cb.value });',
    ' });',
    ' if (models.length === 0) {',
    ' toast("Please select at least one model", true);',
    ' clearActionLoading(btn);',
    ' return;',
    ' }',
    ' var data = { name: name, baseUrl: baseUrl, apiType: apiType, models: models };',
    ' if (apiKey) data.apiKey = apiKey;',
    ' fetch(API + "/api/ai/provider", {',
    ' method: "POST", headers: {"Content-Type":"application/json"},',
    ' body: JSON.stringify(data)',
    ' }).then(function(r) { return r.json(); }).then(function(d) {',
    ' if (d.success) {',
    ' toast("Success: " + d.message);',
    ' showAddProvider = false;',
    ' selectedPreset = null;',
    ' loadAI();',
    ' } else { toast("Failed: " + d.message, true); }',
    ' }).catch(function(e) {',
    ' toast("Save config: " + e.message, true);',
    ' }).finally(function() {',
    ' clearActionLoading(btn);',
    ' });',
    '}',
    '',
    'function deleteAIProvider(name, btnEl) {',
    ' if (!confirm("Delete provider: " + name + "?")) return;',
    ' setActionLoading(btnEl, "Deleting...");',
    ' fetch(API + "/api/ai/provider/" + encodeURIComponent(name), { method: "DELETE" })',
    ' .then(function(r) { return r.json(); }).then(function(d) {',
    ' toast(d.success ? ("Success: " + d.message) : ("Failed: " + d.message), !d.success);',
    ' loadAI();',
    ' }).catch(function(e) {',
    ' toast("Delete failed: " + e.message, true);',
    ' }).finally(function() {',
    ' clearActionLoading(btnEl);',
    ' });',
    '}',
    '',
    'function setAIPrimary(modelId, triggerEl) {',
    ' setActionLoading(triggerEl, "Applying...");',
    ' fetch(API + "/api/ai/primary", {',
    ' method: "POST", headers: {"Content-Type":"application/json"},',
    ' body: JSON.stringify({ modelId: modelId })',
    ' }).then(function(r) { return r.json(); }).then(function(d) {',
    ' toast(d.success ? ("Success: " + d.message) : ("Failed: " + d.message), !d.success);',
    ' loadAI();',
    ' }).catch(function(e) {',
    ' toast("Set primary failed: " + e.message, true);',
    ' }).finally(function() {',
    ' clearActionLoading(triggerEl);',
    ' });',
    '}',
    '',
    'function setAIFallbacks() {',
    ' var input = document.getElementById("ai-fallback-input");',
    ' var btn = document.getElementById("btn-ai-save-fallbacks");',
    ' var raw = input ? String(input.value || "") : "";',
    ' var modelIds = raw.split(",").map(function(v) { return v.trim(); }).filter(function(v) { return !!v; });',
    ' setActionLoading(btn, "Saving...");',
    ' fetch(API + "/api/ai/fallbacks", {',
    ' method: "POST", headers: {"Content-Type":"application/json"},',
    ' body: JSON.stringify({ modelIds: modelIds })',
    ' }).then(function(r) { return r.json(); }).then(function(d) {',
    ' toast(d.success ? (d.message || "Fallbacks saved") : ("Save failed: " + (d.message || "unknown")), !d.success);',
    ' if (d.success) loadAI();',
    ' }).catch(function(e) {',
    ' toast("Save fallbacks failed: " + e.message, true);',
    ' }).finally(function() {',
    ' clearActionLoading(btn);',
    ' });',
    '}',
    '',
    'function clearAIFallbacks() {',
    ' var input = document.getElementById("ai-fallback-input");',
    ' if (input) input.value = "";',
    ' var btn = document.getElementById("btn-ai-clear-fallbacks");',
    ' setActionLoading(btn, "Clearing...");',
    ' fetch(API + "/api/ai/fallbacks", {',
    ' method: "POST", headers: {"Content-Type":"application/json"},',
    ' body: JSON.stringify({ modelIds: [] })',
    ' }).then(function(r) { return r.json(); }).then(function(d) {',
    ' toast(d.success ? (d.message || "Fallbacks cleared") : ("Clear failed: " + (d.message || "unknown")), !d.success);',
    ' if (d.success) loadAI();',
    ' }).catch(function(e) {',
    ' toast("Clear fallbacks failed: " + e.message, true);',
    ' }).finally(function() {',
    ' clearActionLoading(btn);',
    ' });',
    '}',
    '',
    // === Logs tab ===
    'function loadLogs() {',
    ' var viewer = document.getElementById("log-viewer-content");',
    ' if (!viewer) return;',
    ' fetch(API + "/api/service/logs?lines=" + logLines).then(function(r) { return r.json(); }).then(function(d) {',
    ' var logs = d.logs || [];',
    ' viewer.textContent = logs.length > 0 ? logs.join("\\n") : "";',
    ' viewer.scrollTop = viewer.scrollHeight;',
    ' }).catch(function(e) {',
    ' viewer.textContent = "Load failed: " + e.message;',
    ' });',
    '}',
    '',
    'function toggleLogAutoRefresh() {',
    ' var cb = document.getElementById("log-auto-refresh");',
    ' if (cb.checked) {',
    ' logAutoRefresh = setInterval(loadLogs, 3000);',
    ' toast("Log auto refresh enabled (3s interval)", false);',
    ' } else {',
    ' if (logAutoRefresh) { clearInterval(logAutoRefresh); logAutoRefresh = null; }',
    ' toast("Log auto refresh disabled", false);',
    ' }',
    '}',
    '',
    'function setLogLines(val) {',
    ' logLines = parseInt(val, 10) || 100;',
    ' loadLogs();',
    '}',
    '',
    // === Mission tab ===
    'function getMissionTokenValue() {',
    ' try { return (localStorage.getItem("openclaw.guard.mission.token") || "").trim(); } catch (e) { return ""; }',
    '}',
    '',
    'function getMissionHeaders() {',
    ' var headers = {"Content-Type":"application/json"};',
    ' var token = getMissionTokenValue();',
    ' if (token) headers["X-Mission-Token"] = token;',
    ' return headers;',
    '}',
    '',
    'function missionGet(path) {',
    ' return fetch(API + path, { headers: getMissionHeaders() }).then(function(r) { return r.json(); });',
    '}',
    '',
    'function missionPost(path, payload) {',
    ' return fetch(API + path, {',
    ' method: "POST",',
    ' headers: getMissionHeaders(),',
    ' body: JSON.stringify(payload || {})',
    ' }).then(function(r) { return r.json(); });',
    '}',
    '',
    'function saveMissionToken() {',
    ' var tokenInput = document.getElementById("mission-token");',
    ' if (!tokenInput) return;',
    ' var token = String(tokenInput.value || "").trim();',
    ' try {',
    ' if (token) localStorage.setItem("openclaw.guard.mission.token", token);',
    ' else localStorage.removeItem("openclaw.guard.mission.token");',
    ' toast(token ? "Mission token saved" : "Mission token cleared", false);',
    ' } catch (e) {',
    ' toast("Failed to save Mission token: " + e.message, true);',
    ' }',
    '}',
    '',
    'function clearMissionToken() {',
    ' var tokenInput = document.getElementById("mission-token");',
    ' if (tokenInput) tokenInput.value = "";',
    ' saveMissionToken();',
    '}',
    '',
    'var missionBusy = false;',
    'var missionBusyButtonId = "";',
    'var missionBusyLabel = "";',
    'var missionStatusTimer = null;',
    'var missionLogTimer = null;',
    'var missionTimeline = {',
    ' active: false,',
    ' action: "-",',
    ' label: "-",',
    ' stage: "Idle",',
    ' startedAt: "-",',
    ' completedAt: "-",',
    ' duration: "-",',
    ' result: "-",',
    ' detail: "-",',
    ' status: "-",',
    ' startedAtMs: 0',
    '};',
    'var missionActionMeta = {',
    ' install: { buttonId: "btn-mission-install", loading: "Installing..." },',
    ' sync: { buttonId: "btn-mission-sync", loading: "Syncing..." },',
    ' bootstrap: { buttonId: "btn-mission-bootstrap", loading: "Bootstrapping..." },',
    ' start_dev: { buttonId: "btn-mission-start-dev", loading: "Starting DEV..." },',
    ' start_prod: { buttonId: "btn-mission-start-prod", loading: "Starting PROD..." },',
    ' stop: { buttonId: "btn-mission-stop", loading: "Stopping..." },',
    ' restart_dev: { buttonId: "btn-mission-restart-dev", loading: "Restarting DEV..." },',
    ' restart_prod: { buttonId: "btn-mission-restart-prod", loading: "Restarting PROD..." }',
    '};',
    '',
    'function missionPad2(n) { return n < 10 ? "0" + n : String(n); }',
    '',
    'function missionFormatDateTime(d) {',
    ' if (!d) return "-";',
    ' return d.getFullYear() + "-" + missionPad2(d.getMonth() + 1) + "-" + missionPad2(d.getDate()) + " "',
    ' + missionPad2(d.getHours()) + ":" + missionPad2(d.getMinutes()) + ":" + missionPad2(d.getSeconds());',
    '}',
    '',
    'function missionFormatDuration(ms) {',
    ' if (!ms || ms < 0) return "00:00";',
    ' var total = Math.floor(ms / 1000);',
    ' var m = Math.floor(total / 60);',
    ' var s = total % 60;',
    ' return missionPad2(m) + ":" + missionPad2(s);',
    '}',
    '',
    'function missionTimelineBegin(action, label) {',
    ' var now = new Date();',
    ' missionTimeline.active = true;',
    ' missionTimeline.action = action || "-";',
    ' missionTimeline.label = label || action || "-";',
    ' missionTimeline.stage = "Starting";',
    ' missionTimeline.startedAt = missionFormatDateTime(now);',
    ' missionTimeline.completedAt = "-";',
    ' missionTimeline.duration = "00:00";',
    ' missionTimeline.result = "Running";',
    ' missionTimeline.detail = "Task started";',
    ' missionTimeline.status = "-";',
    ' missionTimeline.startedAtMs = now.getTime();',
    ' renderMissionTimeline();',
    '}',
    '',
    'function missionTimelineUpdate(stage, detail, statusText) {',
    ' if (stage) missionTimeline.stage = stage;',
    ' if (detail) missionTimeline.detail = detail;',
    ' if (statusText) missionTimeline.status = statusText;',
    ' if (missionTimeline.startedAtMs > 0) missionTimeline.duration = missionFormatDuration(Date.now() - missionTimeline.startedAtMs);',
    ' renderMissionTimeline();',
    '}',
    '',
    'function missionTimelineComplete(success, detail) {',
    ' var now = new Date();',
    ' missionTimeline.active = false;',
    ' missionTimeline.result = success ? "Success" : "Failed";',
    ' missionTimeline.stage = success ? "Completed" : "Failed";',
    ' if (detail) missionTimeline.detail = detail;',
    ' missionTimeline.completedAt = missionFormatDateTime(now);',
    ' if (missionTimeline.startedAtMs > 0) missionTimeline.duration = missionFormatDuration(now.getTime() - missionTimeline.startedAtMs);',
    ' renderMissionTimeline();',
    '}',
    '',
    'function renderMissionTimeline() {',
    ' var body = document.getElementById("mission-timeline-body");',
    ' if (!body) return;',
    ' var html = "<div class=\\"info-grid\\">"',
    ' + infoItem("Task", missionTimeline.label || "-")',
    ' + infoItem("Stage", missionTimeline.stage || "-")',
    ' + infoItem("Result", missionTimeline.result || "-")',
    ' + infoItem("Started At", missionTimeline.startedAt || "-")',
    ' + infoItem("Completed At", missionTimeline.completedAt || "-")',
    ' + infoItem("Elapsed", missionTimeline.duration || "-")',
    ' + infoItem("Runtime Status", missionTimeline.status || "-")',
    ' + "</div>";',
    ' if (missionTimeline.detail && missionTimeline.detail !== "-") {',
    ' html += "<div class=\\"log-box\\" style=\\"margin-top:.8rem\\">" + esc(missionTimeline.detail) + "</div>";',
    ' }',
    ' body.innerHTML = html;',
    '}',
    '',
    'function missionActionKey(action, payload) {',
    ' if (action === "start") return payload && payload.prod ? "start_prod" : "start_dev";',
    ' if (action === "restart") return payload && payload.prod ? "restart_prod" : "restart_dev";',
    ' return action;',
    '}',
    '',
    'function missionActionButtonIds() {',
    ' var seen = {};',
    ' Object.keys(missionActionMeta).forEach(function(k) { seen[missionActionMeta[k].buttonId] = true; });',
    ' return Object.keys(seen);',
    '}',
    '',
    'function setMissionResult(text) {',
    ' var result = document.getElementById("mission-result");',
    ' if (result) result.textContent = text;',
    '}',
    '',
    'function setMissionActionButtonsBusy(activeButtonId, loadingLabel) {',
    ' missionActionButtonIds().forEach(function(id) {',
    ' var btn = document.getElementById(id);',
    ' if (!btn) return;',
    ' if (!btn.getAttribute("data-default-label")) btn.setAttribute("data-default-label", btn.textContent || "");',
    ' if (missionBusy) {',
    ' btn.disabled = true;',
    ' if (id === activeButtonId) btn.innerHTML = \"<span class=\\"spinner\\"></span>\" + (loadingLabel || "Running...");',
    ' else btn.innerHTML = btn.getAttribute("data-default-label") || btn.textContent;',
    ' return;',
    ' }',
    ' btn.disabled = false;',
    ' btn.innerHTML = btn.getAttribute("data-default-label") || btn.textContent;',
    ' });',
    '}',
    '',
    'function stopMissionProgress() {',
    ' if (missionStatusTimer) { clearInterval(missionStatusTimer); missionStatusTimer = null; }',
    ' if (missionLogTimer) { clearInterval(missionLogTimer); missionLogTimer = null; }',
    '}',
    '',
    'function startMissionProgress(label) {',
    ' setMissionResult((label || "Task running") + "\\n\\nTask is in progress. Waiting for status updates...");',
    ' stopMissionProgress();',
    ' missionStatusTimer = setInterval(function() {',
    ' missionGet("/api/mission/status").then(function(s) {',
    ' var lines = [',
    ' (label || "Task running") + "\\n",',
    ' "running: " + (!!s.running),',
    ' "mode: " + (s.runMode || "-"),',
    ' "pid: " + (s.pid || "-"),',
    ' "port: " + (s.port || "-"),',
    ' "url: " + (s.url || "-")',
    ' ];',
    ' setMissionResult(lines.join("\\n"));',
    ' missionTimelineUpdate("Task running", label || "Task running", "running=" + (!!s.running) + ", mode=" + (s.runMode || "-") + ", pid=" + (s.pid || "-"));',
    ' }).catch(function() {});',
    ' }, 1500);',
    ' missionLogTimer = setInterval(function() { loadMissionLogs(); }, 2000);',
    '}',
    '',
    'function waitForMissionRunning(expectedRunning, timeoutMs, intervalMs) {',
    ' timeoutMs = timeoutMs || 90000;',
    ' intervalMs = intervalMs || 1500;',
    ' var startedAt = Date.now();',
    ' return new Promise(function(resolve, reject) {',
    ' function poll() {',
    ' missionGet("/api/mission/status").then(function(s) {',
    ' if (!!s.running === expectedRunning) return resolve(s);',
    ' if (Date.now() - startedAt >= timeoutMs) return reject(new Error("Timed out waiting for mission state"));',
    ' setTimeout(poll, intervalMs);',
    ' }).catch(function(err) {',
    ' if (Date.now() - startedAt >= timeoutMs) return reject(err);',
    ' setTimeout(poll, intervalMs);',
    ' });',
    ' }',
    ' poll();',
    ' });',
    '}',
    '',
    'function shouldWaitMissionState(action) {',
    ' return action === "start" || action === "stop" || action === "restart";',
    '}',
    '',
    'function loadMission() {',
    ' var panel = document.getElementById("panel-mission");',
    ' if (!panel) return;',
    ' panel.innerHTML = \"<div class=\\"loading\\">Loading...</div>\";',
    ' missionGet("/api/mission/status").then(function(d) {',
    ' var running = !!d.running;',
    ' var installed = !!d.installed;',
    ' var html = \"<div class=\\"card\\"><h3>Mission Control (tenacitOS)</h3>\";',
    ' html += \"<div class=\\"info-grid\\">\"',
    ' + infoItem("Installed", installed ? "Yes" : "No")',
    ' + infoItem("Running", running ? ("PID: " + (d.pid || "-")) : "No")',
    ' + infoItem("Run Mode", d.runMode || "-")',
    ' + infoItem("Started At", d.startedAt || "-")',
    ' + infoItem("Port", d.port || "-")',
    ' + infoItem("URL", d.url || "-")',
    ' + infoItem("Directory", d.missionDir || "-")',
    ' + infoItem("Branch/HEAD", (d.branch || "-") + " / " + (d.head || "-"))',
    ' + infoItem("Env Ready", d.envReady ? "Yes" : "No")',
    ' + infoItem("Data Ready", d.dataReady ? "Yes" : "No")',
    ' + \"</div>\";',
    '',
    ' html += \"<div class=\\"dash-actions\\" style=\\"margin-top:1rem\\">\"',
    ' + \"<button class=\\"btn success\\" id=\\"btn-mission-install\\" onclick=\\"missionAction(\\\\x27install\\\\x27)\\">Install/Update</button>\"',
    ' + \"<button class=\\"btn\\" id=\\"btn-mission-sync\\" onclick=\\"missionAction(\\\\x27sync\\\\x27)\\" \" + (!installed ? \"disabled\" : \"\") + \">Sync</button>\"',
    ' + \"<button class=\\"btn\\" id=\\"btn-mission-bootstrap\\" onclick=\\"missionAction(\\\\x27bootstrap\\\\x27)\\" \" + (!installed ? \"disabled\" : \"\") + \">Bootstrap</button>\"',
    ' + \"<button class=\\"btn primary\\" id=\\"btn-mission-start-dev\\" onclick=\\"missionAction(\\\\x27start\\\\x27, { prod: false })\\" \" + (!installed || running ? \"disabled\" : \"\") + \">Start DEV</button>\"',
    ' + \"<button class=\\"btn primary\\" id=\\"btn-mission-start-prod\\" onclick=\\"missionAction(\\\\x27start\\\\x27, { prod: true })\\" \" + (!installed || running ? \"disabled\" : \"\") + \">Start PROD</button>\"',
    ' + \"<button class=\\"btn danger\\" id=\\"btn-mission-stop\\" onclick=\\"missionAction(\\\\x27stop\\\\x27)\\" \" + (!running ? \"disabled\" : \"\") + \">Stop</button>\"',
    ' + \"<button class=\\"btn warning\\" id=\\"btn-mission-restart-dev\\" onclick=\\"missionAction(\\\\x27restart\\\\x27, { prod: false })\\" \" + (!installed ? \"disabled\" : \"\") + \">Restart DEV</button>\"',
    ' + \"<button class=\\"btn warning\\" id=\\"btn-mission-restart-prod\\" onclick=\\"missionAction(\\\\x27restart\\\\x27, { prod: true })\\" \" + (!installed ? \"disabled\" : \"\") + \">Restart PROD</button>\"',
    ' + \"<button class=\\"btn\\" id=\\"btn-mission-health\\" onclick=\\"missionHealth()\\" \" + (!running ? \"disabled\" : \"\") + \">Health</button>\"',
    ' + \"<button class=\\"btn\\" id=\\"btn-mission-open\\" onclick=\\"window.open(\\\\x27\" + esc(d.url || \"\") + \"\\\\x27, \\\\x27_blank\\\\x27)\\" \" + (!running ? \"disabled\" : \"\") + \">Open</button>\"',
    ' + \"</div>\";',
    '',
    ' html += \"<div class=\\"form-group\\" style=\\"margin-top:1rem\\"><label>Mission API Token (optional for remote calls)</label>\"',
    ' + \"<div style=\\"display:flex;gap:.5rem;flex-wrap:wrap\\">\"',
    ' + \"<input id=\\"mission-token\\" type=\\"password\\" placeholder=\\"Keep empty for loopback-only usage\\" value=\\"\" + esc(getMissionTokenValue()) + \"\\" style=\\"flex:1;min-width:260px\\">\"',
    ' + \"<button class=\\"btn\\" onclick=\\"saveMissionToken()\\">Save Token</button>\"',
    ' + \"<button class=\\"btn\\" onclick=\\"clearMissionToken()\\">Clear</button>\"',
    ' + \"</div></div>\";',
    '',
    ' html += \"<div id=\\"mission-result\\" class=\\"log-box\\" style=\\"margin-top:1rem\\">Choose an action to run.</div>\";',
    ' html += \"</div>\";',
    '',
    ' html += \"<div class=\\"card\\"><h3>Mission Task Timeline</h3><div id=\\"mission-timeline-body\\"></div></div>\";',
    '',
    ' html += \"<div class=\\"card\\"><h3>Mission Control Logs</h3>\"',
    ' + \"<div class=\\"log-toolbar\\">\"',
    ' + \"<button class=\\"btn primary\\" id=\\"btn-mission-refresh-logs\\" onclick=\\"loadMissionLogs()\\">Refresh Logs</button>\"',
    ' + \"<select id=\\"mission-log-lines\\" onchange=\\"loadMissionLogs()\\">\"',
    ' + \"<option value=\\"100\\">100 lines</option><option value=\\"200\\" selected>200 lines</option><option value=\\"500\\">500 lines</option>\"',
    ' + \"</select></div>\"',
    ' + \"<div class=\\"log-viewer\\" id=\\"mission-log-viewer\\">Click refresh to load logs...</div>\"',
    ' + \"</div>\";',
    '',
    ' panel.innerHTML = html;',
    ' setTimeout(function() {',
    ' missionActionButtonIds().forEach(function(id) {',
    ' var btn = document.getElementById(id);',
    ' if (btn && !btn.getAttribute("data-default-label")) btn.setAttribute("data-default-label", btn.textContent || "");',
    ' });',
    ' }, 0);',
    ' renderMissionTimeline();',
    ' loadMissionLogs();',
    ' if (missionBusy) setMissionActionButtonsBusy(missionBusyButtonId, missionBusyLabel);',
    ' }).catch(function(e) {',
    ' panel.innerHTML = \"<div class=\\"error-msg\\">Load failed: \" + esc(e.message) + \"</div>\";',
    ' });',
    '}',
    '',
    'function missionAction(action, payload) {',
    ' if (missionBusy) { toast("Mission task is already running", true); return; }',
    ' var key = missionActionKey(action, payload || {});',
    ' var meta = missionActionMeta[key] || { buttonId: "", loading: "Running..." };',
    ' missionBusy = true;',
    ' missionBusyButtonId = meta.buttonId || "";',
    ' missionBusyLabel = meta.loading || "Running...";',
    ' setMissionActionButtonsBusy(missionBusyButtonId, missionBusyLabel);',
    ' missionTimelineBegin(action, missionBusyLabel);',
    ' missionTimelineUpdate("Sending request", "POST /api/mission/" + action);',
    ' startMissionProgress(missionBusyLabel);',
    ' missionPost("/api/mission/" + action, payload || {}).then(function(d) {',
    ' if (!d || d.success === false) throw new Error((d && d.message) || "Mission action failed");',
    ' if (!shouldWaitMissionState(action)) return { data: d };',
    ' missionTimelineUpdate("Waiting for target state", "Command accepted, waiting for runtime state confirmation...");',
    ' var expectedRunning = action === "stop" ? false : true;',
    ' return waitForMissionRunning(expectedRunning, 90000, 1500)',
    ' .then(function(s) { return { data: d, status: s }; })',
    ' .catch(function(waitErr) { return { data: d, waitErr: waitErr }; });',
    ' }).then(function(result) {',
    ' var d = result.data || {};',
    ' var text = "Success: " + (d.message || "Mission action completed");',
    ' if (d.output) text += "\\n\\n" + d.output;',
    ' if (result.waitErr) text += "\\n\\nStatus confirmation pending: " + result.waitErr.message;',
    ' if (result.status) text += "\\n\\nCurrent status: running=" + (!!result.status.running) + ", pid=" + (result.status.pid || "-") + ", mode=" + (result.status.runMode || "-");',
    ' setMissionResult(text);',
    ' missionTimelineComplete(true, text);',
    ' if (result.waitErr) missionTimelineUpdate("Completed with warning", text);',
    ' if (result.waitErr) toast("Mission command completed, but status confirmation timed out", true);',
    ' else toast("Mission action completed", false);',
    ' }).catch(function(e) {',
    ' setMissionResult("Failed: " + e.message);',
    ' missionTimelineComplete(false, "Failed: " + e.message);',
    ' toast("Mission action failed: " + e.message, true);',
    ' }).finally(function() {',
    ' missionBusy = false;',
    ' missionBusyButtonId = "";',
    ' missionBusyLabel = "";',
    ' stopMissionProgress();',
    ' loadMission();',
    ' });',
    '}',
    '',
    'function missionHealth() {',
    ' if (missionBusy) { toast("Mission task is already running", true); return; }',
    ' var btn = document.getElementById("btn-mission-health");',
    ' if (btn) {',
    ' if (!btn.getAttribute("data-default-label")) btn.setAttribute("data-default-label", btn.textContent || "Health");',
    ' btn.disabled = true;',
    ' btn.innerHTML = \"<span class=\\"spinner\\"></span>Checking...\";',
    ' }',
    ' missionGet("/api/mission/health").then(function(d) {',
    ' var text = (d.success ? "Health check OK" : "Health check failed") + "\\n\\n" + JSON.stringify(d, null, 2);',
    ' setMissionResult(text);',
    ' toast(d.success ? "Health check OK" : "Health check failed", !d.success);',
    ' }).catch(function(e) {',
    ' setMissionResult("Health check failed: " + e.message);',
    ' toast("Health check failed: " + e.message, true);',
    ' }).finally(function() {',
    ' if (btn) {',
    ' btn.disabled = false;',
    ' btn.innerHTML = btn.getAttribute("data-default-label") || "Health";',
    ' }',
    ' });',
    '}',
    '',
    'function loadMissionLogs() {',
    ' var viewer = document.getElementById("mission-log-viewer");',
    ' if (!viewer) return;',
    ' var lineSel = document.getElementById("mission-log-lines");',
    ' var lines = lineSel ? parseInt(lineSel.value, 10) : 200;',
    ' missionGet("/api/mission/logs?lines=" + lines).then(function(d) {',
    ' var logs = d.logs || [];',
    ' viewer.textContent = logs.length > 0 ? logs.join("\\n") : "No logs yet";',
    ' viewer.scrollTop = viewer.scrollHeight;',
    ' }).catch(function(e) {',
    ' viewer.textContent = "Failed to load logs: " + e.message;',
    ' });',
    '}',
    '',
    '// Initialize',
    'loadDashboard();',
    'Promise.all([loadInfo(), loadOpenClaw(), loadAudit(), loadProfiles()]).then(function() { loadHarden(); }).catch(function(e) { console.error("Init error:", e); });',
  ].join('\n');

  return '<!DOCTYPE html>\n'
    + '<html lang="zh-CN">\n<head>\n'
    + '<meta charset="UTF-8">\n'
    + '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n'
    + '<title>OpenClaw Guard - Security Dashboard</title>\n'
    + '<style>' + css + '</style>\n'
    + '</head>\n<body>\n'
    + '<div class="header">\n'
    + ' <span style="font-size:1.5rem"></span>\n'
    + ' <h1>OpenClaw Guard</h1>\n'
    + ' <span class="badge">v2.0.0</span>\n'
    + ' <div class="lang-switch">\n'
    + '   <button class="lang-btn" id="lang-btn-zh" type="button">娑擃厽鏋?/button>\n'
    + '   <button class="lang-btn" id="lang-btn-en" type="button">EN</button>\n'
    + ' </div>\n'
    + '</div>\n'
    + '<div class="tabs">\n'
    + ' <div class="tab active" data-tab="dashboard">Dashboard</div>\n'
    + ' <div class="tab" data-tab="info">System</div>\n'
    + ' <div class="tab" data-tab="openclaw">OpenClaw</div>\n'
    + ' <div class="tab" data-tab="feishu">Feishu</div>\n'
    + ' <div class="tab" data-tab="channels">Channels</div>\n'
    + ' <div class="tab" data-tab="ai">AI Models</div>\n'
    + ' <div class="tab" data-tab="mission">Mission</div>\n'
    + ' <div class="tab" data-tab="audit">Audit</div>\n'
    + ' <div class="tab" data-tab="profiles">Profiles</div>\n'
    + ' <div class="tab" data-tab="harden">Harden</div>\n'
    + ' <div class="tab" data-tab="logs">Logs</div>\n'
    + '</div>\n'
    + '<div class="content">\n'
    + ' <div id="panel-dashboard"><div class="loading">Loading...</div></div>\n'
    + ' <div id="panel-info" class="hidden"><div class="loading">Loading...</div></div>\n'
    + ' <div id="panel-openclaw" class="hidden"><div class="loading">Loading...</div></div>\n'
    + ' <div id="panel-feishu" class="hidden"><div class="loading">Loading...</div></div>\n'
    + ' <div id="panel-channels" class="hidden"><div class="loading">Loading...</div></div>\n'
    + ' <div id="panel-ai" class="hidden"><div class="loading">Loading...</div></div>\n'
    + ' <div id="panel-mission" class="hidden"><div class="loading">Loading...</div></div>\n'
    + ' <div id="panel-audit" class="hidden"><div class="loading">Loading...</div></div>\n'
    + ' <div id="panel-profiles" class="hidden"><div class="loading">Loading...</div></div>\n'
    + ' <div id="panel-harden" class="hidden"><div class="loading">Loading...</div></div>\n'
    + ' <div id="panel-logs" class="hidden">\n'
    + ' <div class="card">\n'
    + ' <h3>Service Logs</h3>\n'
    + ' <div class="log-toolbar">\n'
    + ' <button class="btn primary" onclick="loadLogs()">Refresh Logs</button>\n'
    + ' <label style="display:flex;align-items:center;gap:.4rem;font-size:.85rem">\n'
    + ' <input type="checkbox" id="log-auto-refresh" onchange="toggleLogAutoRefresh()"> Auto refresh\n'
    + ' </label>\n'
    + ' <select onchange="setLogLines(this.value)">\n'
    + ' <option value="50">50 lines</option>\n'
    + ' <option value="100" selected>100 lines</option>\n'
    + ' <option value="200">200 lines</option>\n'
    + ' <option value="500">500 lines</option>\n'
    + ' </select>\n'
    + ' </div>\n'
    + ' <div class="log-viewer" id="log-viewer-content">Loading logs...</div>\n'
    + ' </div>\n'
    + ' </div>\n'
    + '</div>\n'
    + '<div class="toast" id="toast"></div>\n'
    + '<script>\n' + js + '\n</script>\n'
    + '</body>\n</html>';
}




export function getCompatibilityPage(): string {
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>OpenClaw Guard 兼容迁移页</title>
  <style>
    :root {
      --bg: #f4f7f1;
      --panel: #ffffff;
      --line: #d7ddcf;
      --text: #1f2a20;
      --muted: #617061;
      --accent: #1f6f52;
      --accent-soft: #e3efe7;
      --warn: #8a4b12;
      --warn-soft: #fff1e2;
      --shadow: 0 18px 42px rgba(25, 56, 37, 0.08);
      --radius: 18px;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif;
      color: var(--text);
      background:
        radial-gradient(circle at top right, rgba(153, 192, 163, 0.22), transparent 28%),
        linear-gradient(180deg, #fbfdf8 0%, var(--bg) 100%);
      min-height: 100vh;
    }
    .wrap {
      max-width: 1080px;
      margin: 0 auto;
      padding: 40px 20px 56px;
    }
    .hero, .card {
      background: rgba(255,255,255,0.9);
      border: 1px solid rgba(0,0,0,0.05);
      border-radius: var(--radius);
      box-shadow: var(--shadow);
    }
    .hero {
      padding: 28px;
      margin-bottom: 18px;
    }
    .badge {
      display: inline-flex;
      padding: 6px 12px;
      border-radius: 999px;
      background: var(--warn-soft);
      color: var(--warn);
      font-size: 12px;
      font-weight: 700;
      letter-spacing: .02em;
      margin-bottom: 14px;
    }
    h1 {
      margin: 0 0 12px;
      font-size: 32px;
      line-height: 1.25;
    }
    p {
      margin: 0;
      line-height: 1.75;
      color: var(--muted);
    }
    .actions {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
      margin-top: 20px;
    }
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      text-decoration: none;
      padding: 12px 18px;
      border-radius: 12px;
      border: 1px solid var(--line);
      color: var(--text);
      background: #fff;
      font-weight: 600;
    }
    .btn.primary {
      background: var(--accent);
      border-color: var(--accent);
      color: #fff;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 16px;
      margin-top: 18px;
    }
    .card {
      padding: 20px;
    }
    .card h2 {
      margin: 0 0 12px;
      font-size: 20px;
    }
    ul, ol {
      margin: 0;
      padding-left: 20px;
      color: var(--muted);
      line-height: 1.8;
    }
    code {
      font-family: Consolas, "Courier New", monospace;
      background: var(--accent-soft);
      color: var(--accent);
      padding: 2px 8px;
      border-radius: 999px;
      font-size: 12px;
    }
    .table {
      display: grid;
      gap: 10px;
    }
    .row {
      display: grid;
      grid-template-columns: minmax(180px, 220px) minmax(0, 1fr);
      gap: 12px;
      padding: 12px 0;
      border-top: 1px solid rgba(0,0,0,0.06);
    }
    .row:first-child { border-top: 0; padding-top: 0; }
    .label { font-weight: 700; }
    .muted { color: var(--muted); }
    @media (max-width: 760px) {
      .wrap { padding: 24px 16px 40px; }
      h1 { font-size: 26px; }
      .row { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
  <div class="wrap">
    <section class="hero">
      <div class="badge">兼容层 / 迁移模式</div>
      <h1>旧版面板已经降级为迁移页</h1>
      <p>
        OpenClaw Guard 的默认入口已经切换到新的原生工作台。这个页面现在只负责告诉你“去哪里、怎么迁移、旧保险丝还在什么地方”，
        不再承担完整的日常操作面板职责。
      </p>
      <div class="actions">
        <a class="btn primary" href="/">打开新工作台</a>
        <a class="btn" href="/legacy">仍需打开旧版完整面板</a>
      </div>
    </section>

    <div class="grid">
      <section class="card">
        <h2>现在应该怎么用</h2>
        <ul>
          <li>日常查看与操作，优先使用根路由 <code>/</code> 的新工作台。</li>
          <li>如果你还在沿用旧流程，可以暂时继续使用 <code>mission</code> CLI，但它已经进入兼容维护阶段。</li>
          <li>如果你确实需要旧版完整面板，仍可通过 <code>/legacy</code> 打开。</li>
        </ul>
      </section>

      <section class="card">
        <h2>为什么要迁移</h2>
        <ul>
          <li>新工作台已经覆盖概览、Agent、会话、文件、记忆、搜索、成本、Cron、Git 同步等主流程。</li>
          <li><code>mission</code> 保留的主要价值已经变成旧链路兼容与回滚保险丝，而不是主入口。</li>
          <li>后续版本会继续收缩兼容层，先迁移可以减少后面切换成本。</li>
        </ul>
      </section>
    </div>

    <section class="card" style="margin-top:18px;">
      <h2>常见迁移对照</h2>
      <div class="table">
        <div class="row">
          <div class="label">旧的打开方式</div>
          <div class="muted">新默认入口是 <code>/</code>，兼容说明页是 <code>/compat</code>，旧版完整面板保险丝是 <code>/legacy</code>。</div>
        </div>
        <div class="row">
          <div class="label">查看总览 / 系统状态</div>
          <div class="muted">优先使用新工作台首页，CLI 可用 <code>openclaw-guard dashboard</code>。</div>
        </div>
        <div class="row">
          <div class="label">查看 Agent / 会话</div>
          <div class="muted">使用 <code>openclaw-guard agents list</code>、<code>openclaw-guard sessions list</code>，Web 侧直接在新工作台切换对应标签页。</div>
        </div>
        <div class="row">
          <div class="label">文件 / 记忆 / 搜索</div>
          <div class="muted">使用 <code>openclaw-guard files</code>、<code>memory</code>、<code>search</code> 命令，或在新工作台的文件、记忆、搜索标签页完成。</div>
        </div>
        <div class="row">
          <div class="label">Cron / Git 同步</div>
          <div class="muted">迁移到 <code>openclaw-guard cron-ui</code> 与 <code>openclaw-guard git-sync</code>，这些能力已经有原生 Web API 与工作台入口。</div>
        </div>
        <div class="row">
          <div class="label">仍然要用 mission</div>
          <div class="muted">可以继续执行 <code>openclaw-guard mission ...</code>，但命令会提示它已处于兼容层，后续版本计划移除。</div>
        </div>
      </div>
    </section>

    <section class="card" style="margin-top:18px;">
      <h2>迁移建议</h2>
      <ol>
        <li>先把团队的默认入口改成新工作台 <code>/</code>。</li>
        <li>把脚本、README、课程文档中对 <code>mission</code> 的默认引用替换为原生命令或新工作台。</li>
        <li>只有在需要兜底时，再使用 <code>/legacy</code> 或 <code>mission</code> CLI。</li>
      </ol>
    </section>
  </div>
</body>
</html>`;
}
