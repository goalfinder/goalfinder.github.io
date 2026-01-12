# Website
## Struktur
Die Webseite hat eine folgende Ordnerstruktur
```
.
├── _layouts                Jekyll-Build-Dateien
│   └── default.html            Hauptwebseite
├── .vscode                 Visual Studio Code Konfiguration
│   ├── .prettierrc             Konfiguration für den Prettier-Code-Formatter
│   └── settings.json           Konfiguration für weitere Erweiterungen
├── assets                  Dateien für die Website
│   ├── fonts                   Schriftarten
│   └── img                     Bilder
│       ├── assembly                Bilder des Bauprozesses
│       ├── design                  Bilder des 3D-Designs
│       ├── logos                   Logos
│       │   └── goalfinder              Verschiedene Varianten des GoalFinder-Logos
│       ├── mission-cards           Icons für die Startseite (Mission-Karten)
│       ├── showcase                Allgemeine Bilder des GoalFinder
│       └── svg                     SVG-Icons, hauptsächlich für die Dokumentation
├── content                 Markdown-Inhalte für Benutzer- und technische Dokumentation
│   ├── content-structures      Content-Strukturen für unterschiedliche Dokumentationen und Sprachen
│   │   ├── user-content-structure-de.json      Deutsche Inhaltsstruktur für die Benutzerdokumentation
│   │   ├── user-content-structure-en.json      Englische Inhaltsstruktur für die Benutzerdokumentation
│   │   ├── technical-content-structure-de.json Deutsche Inhaltsstruktur für die technische Dokumentation
│   │   └── technical-content-structure-en.json Englische Inhaltsstruktur für die technische Dokumentation
│   ├── technical               Inhalte der technischen Dokumentation
│   │   ├── de                      Technische Dokumentation (Deutsch)
│   │   └── en                      Technische Dokumentation (Englisch)
│   └── user                    Inhalte der Benutzerdokumentation
│       ├── de                      Benutzerdokumentation (Deutsch)
│       └── en                      Benutzerdokumentation (Englisch)
├── doc-alt                 Dokumentation aus dem vorherigen Repository
│   ├── getting-started-de.md   Benutzerhilfe
│   └── README_de.md            Deutsche README
├── locales                 Lokalisierungsdateien für verschiedene Sprachen
│   ├── de.json                 Deutsche Übersetzungsdatei
│   └── en.json                 Englische Übersetzungsdatei
├── pages                   HTML-Seiten für die Website
│   ├── credits.html            Credits-Seite
│   ├── help.html               Hilfeseite
│   ├── home.html               Startseite
│   ├── technical.html          Seiten der technischen Dokumentation
│   └── user.html               Seiten der Benutzerdokumentation
├── scripts                 JavaScript-Dateien für dynamische Funktionalität
│   ├── i18n.js                 Übersetzungsskript für statische Inhalte
│   ├── home.js                 Skripte für die Startseite
│   ├── technical.js            Skripte für die technische Dokumentation
│   └── user.js                 Skripte für die Benutzerdokumentation
├── styles                  CSS-Stylesheets für die Website
│   ├── documentation.css       Stylesheet für die Dokumentation
│   └── main.css                Haupt-Stylesheet
├── tools                   Web-Tools für die Entwicklung
│   ├── content-browser         Ordnerstruktur-Browser-Skript
│   │   ├── content-browser.js      Hauptskript des Inhalts-Browsers
│   │   └── content-checker.js      Hilfsskript zur Überprüfung von Inhaltsstrukturen auf Abweichungen
│   ├── markdown-converter      Markdown-zu-HTML-Konverter
│   │   ├── assets/font             Schriftarten für den Markdown-Konverter
│   │   ├── markdown-converter.js   Hauptskript des Markdown-Konverters
│   │   └── markdown-styles.css     Stylesheet des Konverters
│   └── markdown-documentation  Initialisierungsskripte für die Dokumentation
├── _config.yml             Konfiguration für Jekyll
├── .gitignore              Dateien und Verzeichnisse, die von Git ausgeschlossen sind
├── Gemfile                 Ruby-Gemfile
├── index.html              Jekyll-Indexdatei
├── LICENSE                 Lizenzinformationen für das Projekt
└── README.md               Beschreibung des Repositories
```

#end
