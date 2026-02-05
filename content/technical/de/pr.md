# Veröffentlichen mit GitHub Pages

Die GitHub-Bereitstellung ist so eingerichtet, dass sie den `deploy`-Branch verwendet. Das bedeutet, dass kein Commit auf dem Standard-Branch `main` sofort eine Bereitstellung auslöst.

## Pull Request
Sobald Sie einen Pull Request mit base:`deploy` ← compare:`main` öffnen, benennen Sie ihn nach dem folgenden Schema: `Deploy at dd.mm.yyyy hh:mm`, wobei die ersten 3 Platzhalter für das Datum im europäischen Format und dann die Zeit in `hh:mm` stehen.
Sie können dem Pull Request einen oder mehrere Reviewer hinzufügen, wenn Sie unsicher über die vorgenommenen Änderungen sind.

#end