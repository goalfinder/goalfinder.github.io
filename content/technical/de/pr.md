# Veröffentlichen mit GitHub Pages

Die GitHub-Bereitstellung ist so eingerichtet, dass sie den `deploy`-Branch verwendet. Das bedeutet, dass kein Commit auf dem Standard-Branch `main` sofort eine Bereitstellung auslöst.

## Pull Request
Sobald du einen Pull Request mit base:`deploy` ← compare:`main` öffnest, benenne ihn nach dem folgenden Schema: `Deploy at dd.mm.yyyy hh:mm`, wobei die ersten 3 Platzhalter für das Datum im europäischen Format und dann die Zeit in `hh:mm` stehen.
Du kannst dem Pull Request einen oder mehrere Reviewer hinzufügen, wenn du unsicher über die vorgenommenen Änderungen bist.

#end