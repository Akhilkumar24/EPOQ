
use tauri::AppHandle;
use tauri_plugin_shell::ShellExt;
use serde::Serialize;

#[derive(Serialize)]
pub struct IPCResponse {
    pub success: bool,
    pub data: Option<String>,
    pub error: Option<String>,
}

pub async fn execute_python(
    app: &AppHandle,
    args: &[&str],
) -> Result<IPCResponse, IPCResponse> {
    let cmds = ["python", "python3"];
    let mut last_err = String::new();

    for cmd in cmds {
        match app.shell().command(cmd).args(args).output().await {
            Ok(output) => {
                let stdout = String::from_utf8_lossy(&output.stdout).to_string();
                let stderr = String::from_utf8_lossy(&output.stderr).to_string();

                if output.status.success() {
                    return Ok(IPCResponse {
                        success: true,
                        data: Some(stdout),
                        error: None,
                    });
                } else {
                    last_err = stderr;
                }
            }
            Err(e) => {
                last_err = e.to_string();
            }
        }
    }

    Err(IPCResponse {
        success: false,
        data: None,
        error: Some(last_err),
    })
}
