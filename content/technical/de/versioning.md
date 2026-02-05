# Versionierung
Das Folgende ist eine Anleitung zur Aktualisierung der angezeigten Version in der Web-App und zum Pushen von Versionen mit Tags zu GitHub.

## Version in der Web-App aktualisieren
Aktualisieren Sie die in der Web-App angezeigte Version mit dem `update-version.py` Skript.

**Dev-Builds:**: `python update-version.py X.Y.Z-dev`
**Reguläre Builds:**: `python update-version.py X.Y.Z`

**Das Format der Versionen wird erzwungen und die Versionierung schlägt fehl, wenn es nicht ordnungsgemäß angegeben wird**

## Release auf GitHub
Taggen und pushen, um automatischen Build auszulösen

```bash
git tag vX.Y.Z
git push origin vX.Y.Z
```

#end