# GitHub-Projekte
## Projekte
### Iterative Entwicklung
Das Iterative Entwicklung Projekt hat mehrere Ansichten:

Feature Requests, User stories, Features Ansicht werden verwendet, um Issues mit den entsprechenden Labels sowie das Iteration Board mit folgenden Spalten anzuzeigen:
- **Backlog**: User stories, die in feature-requests oder features unterteilt werden müssen
- **Feature Request**: Spezifischere Ideen, die noch überprüft werden müssen
- **Feature**: Spezifische Funktion, die implementiert werden soll und in Tasks unterteilt wird
- **Todo** — Bereit zur Bearbeitung; noch nicht begonnen.
- **In Progress** — Arbeit ist aktiv im Gange.
- **Review** — Änderung ist implementiert und wartet auf Verifizierung durch ein anderes Teammitglied.
- **Done** — Das Issue ist erledigt und geschlossen.

**Verfahren für neue Issues:**
1. Triage: schließen, wenn das Issue irrelevant oder außerhalb des Geltungsbereichs ist.
2. Reproduzieren: versuchen, das Problem zu reproduzieren; bei Bedarf weitere Informationen anfordern.
3. Klassifizieren: wenn reproduzierbar, entscheiden, ob es sich um einen Bug, eine User Story oder eine Feature Request handelt. Für User Stories/Features das Issue nach Überprüfung in die `Feature`-Spalte konvertieren oder verschieben.
4. Zuweisen: entsprechende Tags hinzufügen und einem Teammitglied zuweisen.
5. Planen: das Issue zur Planung in `Todo` verschieben.
6. Arbeiten: wenn die Arbeit beginnt, das Issue in `In Progress` verschieben.
7. Verifizieren: nach Implementierung in `Review` zur Verifizierung verschieben.
8. Schließen: sobald ein Reviewer die Änderung akzeptiert, das Issue in `Done` verschieben.

### Bug Tracker
Der Bug Tracker verwendet ein einzelnes Board mit diesen Spalten:

- **Identified** — Das Issue wurde gemeldet und anerkannt.
- **Todo** — Bereit zur Bearbeitung; noch nicht begonnen.
- **In Progress** — Arbeit ist aktiv im Gange.
- **Review** — Änderung ist implementiert und wartet auf Verifizierung durch ein anderes Teammitglied.
- **Done** — Das Issue ist gelöst und geschlossen.

**Verfahren für neue Issues:**
1. Das Issue triagieren: schließen, wenn irrelevant oder außerhalb des Geltungsbereichs.
2. Wenn die Informationen nicht ausreichen; weitere Informationen anfordern.
3. Wenn reproduzierbar, ein Schweregrad-Label zuweisen (`severe`, `major` oder `minor`) — bei Unsicherheit das Team konsultieren.
6. Das Issue zur Planung in `Todo` verschieben.
7. Wenn die Arbeit beginnt, in `In Progress` verschieben.
8. Nach Implementierung in `Review` zur Verifizierung verschieben.
9. Ein Reviewer verifiziert die Korrektur; wenn akzeptiert, das Issue in `Done` verschieben.

## Labels
Folgende benutzerdefinierte Labels können auf Issues angewendet werden. Eine Beschreibung jedes Labels und wann es zu verwenden ist, wird unten bereitgestellt:

### Bugs
 - `bug` — Identifizierter Bug
 - `bug-fix` — Bug-Fixing-Task
 - `severe` — Schwerer Bug
 - `major` — Großer Bug
 - `minor` — Kleiner Bug
Wenden Sie ein Schweregrad-Label auf jedes Bug-Issue an.

### Kategorien
 - `cad` — Bezieht sich auf das CAD-Design (Gehäuse, Montage, ...)
 - `doc` — Bezieht sich auf die interne / technische Dokumentation
 - `hardware` — Bezieht sich auf die Hardware
 - `firmware` — Bezieht sich auf die Firmware
 - `web-app` — Bezieht sich auf den Web-Zugangspunkt des GoalFinder-Geräts
 - `pages` — Bezieht sich auf die Webseite
 - `pcb` — Bezieht sich auf das PCB-Design
 - `infrastructure` — Bezieht sich auf die Infrastruktur

Wenden Sie ein Kategorie-Label auf Features und übergeordnete Tasks an

### Priorität
 - `p0` - `p4` — Priorität von höchster zu niedrigster
Wenden Sie ein Prioritäts-Label auf jedes nicht User Story / Feature (Request) Issue an

### Iterative Entwicklung
 - `user-story` — User Story
 - `feature-request` — Feature Request
 - `feature` — Feature

### Andere
 - `enhancement` — Task, die keines anderen Labels würdig ist
 - `notice` — Hinweis - Nicht zu bearbeiten
 - `review` — Einfache Review-Task
 - `task` — Task, die mit keinem anderen Label kategorisiert ist

#end
