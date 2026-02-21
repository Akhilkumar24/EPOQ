// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::Manager;
use tauri_plugin_shell::ShellExt;
use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize)]
struct ExecutionMetadata {
    id: String,
    timestamp: String,
    action: String,
    params: Option<String>,
    status: String,
    message: Option<String>,
    output_path: Option<String>,
}

/// Tries to run `python` first, then `python3` as a fallback.
/// Returns (stdout, stderr).
async fn run_python(
    app: &tauri::AppHandle,
    args: &[&str],
) -> Result<String, String> {
    // Try `python` first
    let cmds = ["python", "python3"];
    let mut last_err = String::new();

    for cmd in cmds {
        match app
            .shell()
            .command(cmd)
            .args(args)
            .output()
            .await
        {
            Ok(output) => {
                let stdout = String::from_utf8_lossy(&output.stdout).to_string();
                let stderr = String::from_utf8_lossy(&output.stderr).to_string();
                if !output.status.success() && stdout.is_empty() {
                    last_err = stderr;
                    continue;
                }
                return Ok(stdout);
            }
            Err(e) => {
                last_err = e.to_string();
            }
        }
    }
    Err(last_err)
}

async fn log_execution(
    app: &tauri::AppHandle,
    metadata: ExecutionMetadata,
) -> Result<(), String> {
    use std::fs;
    use std::path::PathBuf;

    let mut dir = app.path()
        .app_data_dir()
        .map_err(|e| e.to_string())?;

    dir.push("logs");

    if !dir.exists() {
        fs::create_dir_all(&dir).map_err(|e| e.to_string())?;
    }

    let mut file_path = PathBuf::from(dir);
    file_path.push(format!("{}.json", metadata.id));

    let content = serde_json::to_string_pretty(&metadata)
        .map_err(|e| e.to_string())?;

    fs::write(file_path, content)
        .map_err(|e| e.to_string())?;

    Ok(())
}

/// Runs tabular_processor.py with the given action, file, and optional params.
/// Returns the JSON string printed by the script.
#[tauri::command]
async fn run_tabular_processor(
    app: tauri::AppHandle,
    file: String,
    action: String,
    params: Option<String>,
    out: Option<String>,
) -> Result<String, String> {
    let script_path = app
        .path()
        .resource_dir()
        .map_err(|e| e.to_string())?
        .join("python_backend")
        .join("tabular_processor.py");

    let script = script_path.to_string_lossy().to_string();

    // Build args list
    let mut args: Vec<String> = vec![
        script,
        "--action".to_string(),
        action,
        "--file".to_string(),
        file,
    ];
    if let Some(p) = params {
        args.push("--params".to_string());
        args.push(p);
    }
    if let Some(o) = out {
        args.push("--out".to_string());
        args.push(o);
    }

    let args_ref: Vec<&str> = args.iter().map(String::as_str).collect();
   let result = run_python(&app, &args_ref).await;

let metadata = ExecutionMetadata {
    id: format!("run_{}", chrono::Utc::now().timestamp()),
    timestamp: chrono::Utc::now().to_rfc3339(),
    action: action.clone(),
    params,
    status: if result.is_ok() { "success".into() } else { "error".into() },
    message: result.clone().err(),
    output_path: out,
};

log_execution(&app, metadata).await.ok();

result
}

/// Runs check_gpu.py and returns the stdout lines as a plain string.
#[tauri::command]
async fn run_check_gpu(app: tauri::AppHandle) -> Result<String, String> {
    let script_path = app
        .path()
        .resource_dir()
        .map_err(|e| e.to_string())?
        .join("python_backend")
        .join("check_gpu.py");

    let script = script_path.to_string_lossy().to_string();

 let result = run_python(&app, &[script.as_str()]).await;

let metadata = ExecutionMetadata {
    id: format!("gpu_{}", chrono::Utc::now().timestamp()),
    timestamp: chrono::Utc::now().to_rfc3339(),
    action: "gpu_check".into(),
    params: None,
    status: if result.is_ok() { "success".into() } else { "error".into() },
    message: result.clone().err(),
    output_path: None,
};

log_execution(&app, metadata).await.ok();

match result {
    Ok(output) => Ok(output.trim().to_string()),
    Err(e) => Err(format!("GPU detection failed: {}", e)),
}
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_fs::init())
        .invoke_handler(tauri::generate_handler![
            run_tabular_processor,
            run_check_gpu
        ])
        .setup(|app| {
            let window = app.get_webview_window("main").unwrap();
            let icon = tauri::include_image!("icons/icon.png");
            window.set_icon(icon).unwrap();
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
