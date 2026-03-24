use guard_core::{
    probe_guard_environment, probe_openclaw_install, probe_web_runtime, GuardProbe, OpenClawProbe,
    WebRuntimeProbe,
};
use tauri_plugin_opener::OpenerExt;

#[tauri::command]
fn guard_probe() -> GuardProbe {
    probe_guard_environment()
}

#[tauri::command]
fn web_runtime_probe() -> WebRuntimeProbe {
    probe_web_runtime()
}

#[tauri::command]
fn openclaw_probe() -> OpenClawProbe {
    probe_openclaw_install()
}

#[tauri::command]
fn open_external_url(app: tauri::AppHandle, url: String) -> Result<(), String> {
    if !url.starts_with("http://") && !url.starts_with("https://") {
        return Err("only http(s) URLs are supported".to_string());
    }

    app.opener()
        .open_url(url, None::<&str>)
        .map_err(|error| error.to_string())
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            guard_probe,
            web_runtime_probe,
            openclaw_probe,
            open_external_url
        ])
        .run(tauri::generate_context!())
        .expect("failed to run OpenClaw Guard desktop shell");
}
