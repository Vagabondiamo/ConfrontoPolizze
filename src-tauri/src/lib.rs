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

      // Splash screen: usa un thread OS separato per attendere e poi
      // mostrare la finestra principale e chiudere lo splash
      let splashscreen = app.get_webview_window("splashscreen");
      let main_window = app.get_webview_window("main");

      std::thread::spawn(move || {
        std::thread::sleep(std::time::Duration::from_millis(1500));
        if let Some(main) = main_window {
          let _ = main.show();
        }
        if let Some(splash) = splashscreen {
          let _ = splash.close();
        }
      });

      Ok(())
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
