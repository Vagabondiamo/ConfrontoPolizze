#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder::default()
    .plugin(tauri_plugin_fs::init())
    .plugin(tauri_plugin_dialog::init())
    .plugin(tauri_plugin_updater::Builder::new().build())
    .plugin(tauri_plugin_process::init())
    .setup(|app| {
      if cfg!(debug_assertions) {
        app.handle().plugin(
          tauri_plugin_log::Builder::default()
            .level(log::LevelFilter::Info)
            .build(),
        )?;
      }

      // Gestione splash screen: chiude lo splash e mostra la finestra principale dopo 1.5s
      let splashscreen = app.get_webview_window("splashscreen");
      let main_window = app.get_webview_window("main");

      if splashscreen.is_some() || main_window.is_some() {
        tauri::async_runtime::spawn(async move {
          std::thread::sleep(std::time::Duration::from_millis(1500));
          if let Some(main) = main_window {
            main.show().unwrap_or_default();
          }
          if let Some(splash) = splashscreen {
            splash.close().unwrap_or_default();
          }
        });
      }

      Ok(())
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
