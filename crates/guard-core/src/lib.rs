use serde::{Deserialize, Serialize};
use std::env;
use std::path::{Path, PathBuf};

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
    let guard_root = guard_root(&home);
    let managed_prefix = managed_prefix(&guard_root);
    let managed_binary = managed_binary_path(&managed_prefix);
    let path_binary = find_binary_on_path("openclaw");

    GuardProbe {
        platform: env::consts::OS.to_string(),
        architecture: env::consts::ARCH.to_string(),
        home_dir: home.display().to_string(),
        guard_root: guard_root.display().to_string(),
        managed_prefix: managed_prefix.display().to_string(),
        managed_bin_dir: managed_prefix.display().to_string(),
        managed_binary_path: managed_binary.display().to_string(),
        openclaw_dir: openclaw_dir(&home).display().to_string(),
        path_binary: path_binary.map(|path| path.display().to_string()),
        managed_binary_present: managed_binary.is_file(),
    }
}

#[cfg(test)]
mod tests {
    use super::{guard_root, managed_prefix};
    use std::path::Path;

    #[test]
    fn guard_paths_stay_under_openclaw_home() {
        let home = if cfg!(windows) { Path::new("C:\\Users\\tester") } else { Path::new("/home/tester") };
        let root = guard_root(home);
        let prefix = managed_prefix(&root);

        assert!(root.ends_with(".openclaw/guard") || root.ends_with(".openclaw\\guard"));
        assert!(prefix.ends_with("npm-global"));
    }
}
