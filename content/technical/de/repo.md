# Verzeichnis
## Hauptverzeichnis
Die Struktur des Hauptverzeichnisses.
```
    ..
    ├── github              GitHub Aufgabenabläufe
    ├── .vscode             Einstellungen und Konfigurationen für Visual Studio code
    ├── assets              Assets für Entwicklung und Dokumentation
    ├── blueprint           Hardware-Design-Dateien, einschließlich 3D-Modelle und PCB-Layouts
    ├── client              Software für das Goalfinder-Board, einschließlich Firmware
    ├── web                 Verzeichnis zum getrennten Entwickeln der Web App des GoalFinder
    ├── .gitignore          Dateien und Verzeichnisse, die von der Git-Quellcodeverwaltung ausgeschlossen sind
    ├── LICENSE             Lizenzinformationen für das Projekt
    ├── package-lock.json   Gesperrte npm-Abhängigkeiten für konsistente Builds
    ├── README.md           Kurzbeschreibung des Projekts
    └── update-version.py   Script zum Ändern der Versionsnummer
```

## Geräteverzeichnis
Verzeichnis zum Entwickeln des Mikrocontrollers des GoalFinder Gerätes.
```
    .
    ├── .gitignore           Git-Ignore-Regeln für das Client-Verzeichnis
    ├── merge-bin.py         Python-Skript zum Zusammenführen von Binärdateien
    ├── platformio.ini       PlatformIO-Konfigurationsdatei
    ├── data/                Daten-Dateien für die Firmware
    │   └── web/             Web-Assets für die Firmware
    │       └── assets/      CSS-Dateien für Web-Ansichten
    │           ├── GamesView.css
    │           ├── GeneralSettingsView.css
    │           └── NotFoundView.css
    ├── lib/                In der Firmware verwendete Bibliotheken
    │   ├── file_system/    Dateisystem-Verwaltungs-Bibliothek
    │   │   ├── FileSystem.cpp
    │   │   └── FileSystem.h
    │   ├── lib_audioplayer/    Audio-Player-Bibliothek
    │   │   ├── library.json
    │   │   ├── include/
    │   │   │   └── AudioPlayer.h
    │   │   └── src/
    │   │       └── AudioPlayer.cpp
    │   ├── lib_bluetoothmanager/   Bluetooth-Manager-Bibliothek
    │   │   ├── library.json
    │   │   ├── include/
    │   │   │   └── BluetoothManager.h
    │   │   └── src/
    │   │       └── BluetoothManager.cpp
    │   ├── lib_settings/    Einstellungs-Verwaltungs-Bibliothek
    │   │   ├── hal_selector.py
    │   │   ├── library.json
    │   │   ├── include/
    │   │   │   └── system/
    │   │   │       └── Settings.h
    │   │   └── src/
    │   │       └── hal/
    │   │           └── system/
    │   │               ├── dummy/
    │   │               │   └── DummySettings.cpp
    │   │               ├── esp32/
    │   │               │   └── Esp32Settings.cpp
    │   │               └── esp8266/
    │   │                   └── Esp8266Settings.cpp
    │   ├── lib_tofsensor/   Time-of-Flight-Sensor-Bibliothek
    │   │   ├── library.json
    │   │   ├── include/
    │   │   │   └── ToFSensor.h
    │   │   └── src/
    │   │       └── ToFSensor.cpp
    │   └── lib_vibrationsensor/    Vibrationssensor-Bibliothek
    │       ├── library.json
    │       ├── include/
    │       │   └── VibrationSensor.h
    │       └── src/
    │           └── VibrationSensor.cpp
    └── src/    Haupt-Anwendungs-Quellcode
        ├── GoalfinderApp.cpp
        ├── GoalfinderApp.h
        ├── LedController.cpp
        ├── LedController.h
        ├── LedMode.h
        ├── main.cpp    Einstiegspunkt der Firmware
        ├── Settings.cpp
        ├── Settings.h
        ├── Singleton.h
        └── web/             Web-bezogener Quellcode
            ├── SNTP.cpp
            ├── SNTP.h
            ├── SoftwareUpdater.cpp
            ├── SoftwareUpdater.h
            ├── WebServer.cpp
            ├── WebServer.h
            ├── WifiManager.cpp
            └── WifiManager.h
```

#end