# Release
Dies ist eine Anleitung, wie neue Firmware-Versionen auf GitHub veröffentlicht werden.

## Release-Workflow
Folgender Workflow aus `.github/workflows/main.yml` wird verwendet:
1. Klont das Repository mit vollständiger Historie.
2. Extrahiert die Version aus dem Tag und den aktuellen Git-Commit-Hash.
3. Aktualisiert die Versionsdateien mit einem Python-Skript.
4. Richtet Node.js ein und installiert Web-Abhängigkeiten.
5. Baut die Web-App.
6. Cacht Python- und PlatformIO-Abhängigkeiten.
7. Installiert Python und PlatformIO.
8. Baut die Firmware und das Dateisystem für das Ziel-Board.
9. Veröffentlicht die gebauten Firmware- und Dateisystem-Binaries als GitHub-Release.
Dies stellt sicher, dass die gesamte Firmware ohne Probleme gebaut wird, um keine nicht funktionierende Version zu veröffentlichen.

## Versionsregeln
Folgende Regeln sind bei der Versionierung eines neuen Releases zu beachten.
Versionsformat: `vX.Y.Z(o)`
- `X`: Es wurden größere Änderungen vorgenommen und es besteht keine Abwärtskompatibilität. **Solch ein Release immer zuerst mit anderen Teammitgliedern absprechen!**
- `Y`: Neue Features oder Verbesserungen wurden implementiert. Die Abwärtskompatibilität bleibt erhalten oder wird verbessert.
- `Z`: Ein Patch wurde für Bugfixes, Performance-Verbesserungen oder kleinere interne Änderungen angewendet.
### Pre-Release-Tags
Pre-Release-Tags sind optional und ersetzen den optionalen Platzhalter `o`.
- `a`: **alpha** Sehr frühe Version, wahrscheinlich fehlerhaft und kaum getestet.
- `b`: **beta** Stabiler als Alpha, mit mehr Tests.
- keiner: Vollständiges Release: Komplett getestet und produktionsbereit.

## Release auf GitHub
Taggen und pushen, um den automatischen Build und Release auszulösen.
```
git tag vX.Y.Z(o)
git push origin vX.Y.Z(o)
```

## Dev-Builds & Tests
**Dieses Skript ist nur für die Entwicklung gedacht und darf nicht in der Produktion verwendet werden.**
Die in der Web-App angezeigte Version wird mit dem Skript `update-version.py` aktualisiert.
**Dev-Builds:**: `python update-version.py X.Y.Z(o)-dev`
**Reguläre Builds:**: `python update-version.py X.Y.Z(o)`

#end