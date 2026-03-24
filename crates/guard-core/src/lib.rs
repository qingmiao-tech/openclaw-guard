use serde::{Deserialize, Serialize};
use std::env;
use std::fs;
use std::net::{TcpStream, ToSocketAddrs};
use std::path::{Path, PathBuf};
use std::time::Duration;

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
pub struct GuardProbe {
    pub platform: String,
    pub architecture: String,
    pub home_dir: String,
    pub guard_root: String,
    pub managed_prefix: String,
    pub managed_bin_dir: String,
    pub managed_binary_path: String,
    pub openclaw_dir: String,
    pub path_binary: Option<String>,
    pub managed_binary_present: bool,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
pub struct WebRuntimeProbe {
    pub runtime_dir: String,
    pub runtime_file: String,
    pub runtime_file_present: bool,
    pub managed: bool,
    pub pid: Option<u32>,
    pub configured_port: u16,
    pub detected_port: u16,
    pub api_base_url: String,
    pub workbench_url: String,
    pub next_url: String,
    pub tcp_reachable: bool,
    pub source: String,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
pub struct OpenClawProbe {
    pub managed_prefix: String,
    pub managed_binary_path: String,
    pub managed_binary_present: bool,
    pub path_binary: Option<String>,
    pub path_binary_present: bool,
    pub detected_binary: Option<String>,
    pub openclaw_dir: String,
    pub source_summary: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
struct WebRuntimeRecord {
    pid: u32,
    port: u16,
    managed: bool,
}

fn home_dir() -> PathBuf {
    if cfg!(windows) {
        env::var_os("USERPROFILE")
            .map(PathBuf::from)
            .unwrap_or_else(|| PathBuf::from("C:\\"))
    } else {
        env::var_os("HOME")
            .map(PathBuf::from)
            .unwrap_or_else(|| PathBuf::from("/"))
    }
}

fn guard_root(home: &Path) -> PathBuf {
    home.join(".openclaw").join("guard")
}

fn managed_prefix(root: &Path) -> PathBuf {
    root.join("npm-global")
}

fn managed_binary_path(prefix: &Path) -> PathBuf {
    if cfg!(windows) {
        prefix.join("openclaw.cmd")
    } else {
        prefix.join("openclaw")
    }
}

fn openclaw_dir(home: &Path) -> PathBuf {
    home.join(".openclaw")
}

fn runtime_dir() -> PathBuf {
    env::var_os("OPENCLAW_GUARD_RUNTIME_DIR")
        .map(PathBuf::from)
        .unwrap_or_else(|| {
            env::current_dir()
                .unwrap_or_else(|_| home_dir())
                .join(".guard-runtime")
        })
}

fn runtime_file(runtime_dir: &Path) -> PathBuf {
    runtime_dir.join("guard-web.pid.json")
}

fn default_guard_port() -> u16 {
    env::var("OPENCLAW_GUARD_PORT")
        .ok()
        .and_then(|value| value.parse::<u16>().ok())
        .unwrap_or(18088)
}

fn loopback_url(port: u16, path: &str) -> String {
    format!("http://127.0.0.1:{port}{path}")
}

fn read_runtime_record(file_path: &Path) -> Option<WebRuntimeRecord> {
    let payload = fs::read_to_string(file_path).ok()?;
    serde_json::from_str::<WebRuntimeRecord>(&payload).ok()
}

fn is_tcp_port_reachable(port: u16) -> bool {
    let address = format!("127.0.0.1:{port}");
    let Some(socket_addr) = address.to_socket_addrs().ok().and_then(|mut addrs| addrs.next()) else {
        return false;
    };
    TcpStream::connect_timeout(&socket_addr, Duration::from_millis(500)).is_ok()
}

fn summarize_openclaw_source(managed_present: bool, path_present: bool) -> &'static str {
    match (managed_present, path_present) {
        (true, true) => "managed-and-path",
        (true, false) => "managed-only",
        (false, true) => "path-only",
        (false, false) => "missing",
    }
}

fn find_binary_on_path(binary_name: &str) -> Option<PathBuf> {
    let path_var = env::var_os("PATH")?;
    let candidates: Vec<String> = if cfg!(windows) {
        env::var_os("PATHEXT")
            .map(|value| {
                env::split_paths(&PathBuf::from(value))
                    .map(|segment| segment.to_string_lossy().into_owned())
                    .collect()
            })
            .unwrap_or_else(|| vec![".COM".into(), ".EXE".into(), ".BAT".into(), ".CMD".into()])
    } else {
        vec![String::new()]
    };

    for directory in env::split_paths(&path_var) {
        if cfg!(windows) {
            let direct = directory.join(binary_name);
            if direct.is_file() {
                return Some(direct);
            }
            for ext in &candidates {
                let candidate = directory.join(format!("{binary_name}{ext}"));
                if candidate.is_file() {
                    return Some(candidate);
                }
            }
        } else {
            let candidate = directory.join(binary_name);
            if candidate.is_file() {
                return Some(candidate);
            }
        }
    }

    None
}

pub fn probe_guard_environment() -> GuardProbe {
    let home = home_dir();
    let root = guard_root(&home);
    let prefix = managed_prefix(&root);
    let managed_binary = managed_binary_path(&prefix);
    let path_binary = find_binary_on_path("openclaw");

    GuardProbe {
        platform: env::consts::OS.to_string(),
        architecture: env::consts::ARCH.to_string(),
        home_dir: home.display().to_string(),
        guard_root: root.display().to_string(),
        managed_prefix: prefix.display().to_string(),
        managed_bin_dir: prefix.display().to_string(),
        managed_binary_path: managed_binary.display().to_string(),
        openclaw_dir: openclaw_dir(&home).display().to_string(),
        path_binary: path_binary.map(|path| path.display().to_string()),
        managed_binary_present: managed_binary.is_file(),
    }
}

pub fn probe_web_runtime() -> WebRuntimeProbe {
    let dir = runtime_dir();
    let file = runtime_file(&dir);
    let record = read_runtime_record(&file);
    let configured_port = default_guard_port();
    let detected_port = record.as_ref().map(|item| item.port).unwrap_or(configured_port);
    let tcp_reachable = is_tcp_port_reachable(detected_port);
    let source = if record.is_some() {
        "runtime-file"
    } else if tcp_reachable {
        "port-probe"
    } else {
        "default"
    };

    WebRuntimeProbe {
        runtime_dir: dir.display().to_string(),
        runtime_file: file.display().to_string(),
        runtime_file_present: file.is_file(),
        managed: record.as_ref().map(|item| item.managed).unwrap_or(false),
        pid: record.as_ref().map(|item| item.pid),
        configured_port,
        detected_port,
        api_base_url: loopback_url(detected_port, ""),
        workbench_url: loopback_url(detected_port, "/workbench"),
        next_url: loopback_url(detected_port, "/next"),
        tcp_reachable,
        source: source.to_string(),
    }
}

pub fn probe_openclaw_install() -> OpenClawProbe {
    let guard = probe_guard_environment();
    let path_binary_present = guard.path_binary.is_some();
    let managed_binary_present = guard.managed_binary_present;
    let detected_binary = if managed_binary_present {
        Some(guard.managed_binary_path.clone())
    } else {
        guard.path_binary.clone()
    };

    OpenClawProbe {
        managed_prefix: guard.managed_prefix.clone(),
        managed_binary_path: guard.managed_binary_path.clone(),
        managed_binary_present,
        path_binary: guard.path_binary.clone(),
        path_binary_present,
        detected_binary,
        openclaw_dir: guard.openclaw_dir.clone(),
        source_summary: summarize_openclaw_source(managed_binary_present, path_binary_present).to_string(),
    }
}

#[cfg(test)]
mod tests {
    use super::{
        guard_root, managed_prefix, summarize_openclaw_source, GuardProbe, OpenClawProbe,
        WebRuntimeProbe,
    };
    use serde_json::Value;
    use std::path::Path;

    #[test]
    fn guard_paths_stay_under_openclaw_home() {
        let home = if cfg!(windows) { Path::new("C:\\Users\\tester") } else { Path::new("/home/tester") };
        let root = guard_root(home);
        let prefix = managed_prefix(&root);

        assert!(root.ends_with(".openclaw/guard") || root.ends_with(".openclaw\\guard"));
        assert!(prefix.ends_with("npm-global"));
    }

    #[test]
    fn openclaw_source_summary_covers_all_states() {
        assert_eq!(summarize_openclaw_source(true, true), "managed-and-path");
        assert_eq!(summarize_openclaw_source(true, false), "managed-only");
        assert_eq!(summarize_openclaw_source(false, true), "path-only");
        assert_eq!(summarize_openclaw_source(false, false), "missing");
    }

    #[test]
    fn guard_probe_json_shape_stays_stable() {
        let probe = GuardProbe {
            platform: "windows".into(),
            architecture: "x64".into(),
            home_dir: "C:/Users/tester".into(),
            guard_root: "C:/Users/tester/.openclaw/guard".into(),
            managed_prefix: "C:/Users/tester/.openclaw/guard/npm-global".into(),
            managed_bin_dir: "C:/Users/tester/.openclaw/guard/npm-global".into(),
            managed_binary_path: "C:/Users/tester/.openclaw/guard/npm-global/openclaw.cmd".into(),
            openclaw_dir: "C:/Users/tester/.openclaw".into(),
            path_binary: Some("C:/Program Files/nodejs/openclaw.cmd".into()),
            managed_binary_present: true,
        };

        let value = serde_json::to_value(&probe).expect("guard probe should serialize");
        assert!(value.get("platform").is_some());
        assert!(value.get("managed_prefix").is_some());
        assert!(value.get("managed_binary_present").is_some());
    }

    #[test]
    fn web_runtime_probe_json_shape_stays_stable() {
        let probe = WebRuntimeProbe {
            runtime_dir: ".guard-runtime".into(),
            runtime_file: ".guard-runtime/guard-web.pid.json".into(),
            runtime_file_present: true,
            managed: true,
            pid: Some(12345),
            configured_port: 18088,
            detected_port: 18088,
            api_base_url: "http://127.0.0.1:18088".into(),
            workbench_url: "http://127.0.0.1:18088/workbench".into(),
            next_url: "http://127.0.0.1:18088/next".into(),
            tcp_reachable: true,
            source: "runtime-file".into(),
        };

        let value = serde_json::to_value(&probe).expect("web runtime probe should serialize");
        assert_eq!(value.get("configured_port"), Some(&Value::from(18088)));
        assert!(value.get("api_base_url").is_some());
        assert!(value.get("source").is_some());
    }

    #[test]
    fn openclaw_probe_json_shape_stays_stable() {
        let probe = OpenClawProbe {
            managed_prefix: "C:/Users/tester/.openclaw/guard/npm-global".into(),
            managed_binary_path: "C:/Users/tester/.openclaw/guard/npm-global/openclaw.cmd".into(),
            managed_binary_present: true,
            path_binary: Some("C:/Program Files/nodejs/openclaw.cmd".into()),
            path_binary_present: true,
            detected_binary: Some("C:/Users/tester/.openclaw/guard/npm-global/openclaw.cmd".into()),
            openclaw_dir: "C:/Users/tester/.openclaw".into(),
            source_summary: "managed-and-path".into(),
        };

        let value = serde_json::to_value(&probe).expect("openclaw probe should serialize");
        assert!(value.get("detected_binary").is_some());
        assert!(value.get("source_summary").is_some());
    }
}
