## Upload Tool (ULT)

**Führen Sie das Upload-Tool immer aus dem Stammverzeichnis aus**

Das Upload-Tool wurde entwickelt, um den Workflow beim Flashen der Firmware zu verbessern. Der Standard-Workflow wird standardmäßig ausgeführt:

1. `npm run build`: baut und komprimiert die neueste Web-App
2. `pio run -t upload`: lädt die Firmware hoch
3. `pio run -t uploadfs`: lädt das Dateisystem mit der Web-App hoch

### Parameter

- `-f`: Löscht den Flash und säubert `pio`
- `-m`: Überwacht die Ausgabe nach dem Upload

Alle Parameter können kombiniert werden

#end