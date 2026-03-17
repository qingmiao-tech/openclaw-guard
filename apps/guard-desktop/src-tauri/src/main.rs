use guard_core::{probe_guard_environment, GuardProbe};

#[tauri::command]
fn guard_probe() -> GuardProbe {
    probe_guard_environment()
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![guard_probe])
        .run(tauri::generate_context!())
        .expect("failed to run OpenClaw Guard desktop shell");
}
