# GoalFinder Web-App
Diese Seite enthält detaillierte Anleitungen zur Verwendung der GoalFinder-Web-App.

## Öffnen der Web-App
Um eine Verbindung zur Web-App herzustellen, verbinden Sie sich zunächst mit dem GoalFinder-WLAN-Netzwerk namens `GoalFinder XX` oder einem ähnlichen Namen (sofern nicht anders konfiguriert). In den meisten Fällen wird eine Benachrichtigung angezeigt, die zur Anmeldung im Netzwerk auffordert. Folgen Sie dieser Aufforderung, um die Web-App zu öffnen.
Falls diese Benachrichtigung nicht angezeigt wird oder die Web-App lieber über einen Webbrowser geöffnet werden soll, öffnen Sie die folgende Adresse: `goalfinder.local` oder geben Sie die folgende IP-Adresse in die Adressleiste des Browsers ein: `192.168.4.1`. Letztere sollte in nahezu allen Fällen funktionieren.
Falls keine dieser Möglichkeiten funktioniert, wenden Sie sich an Ihre Netzwerkadministration oder senden Sie eine E-Mail an `goalfinder@htl-leonding.ac.at`.

## Steuerelemente
![Header Controls](content/doc/wa-img/de/1.webp)(300)
- **Spiele**: Führt zur Spielauswahl
- **Einstellungen**: Führt zur Einstellungsseite
- **Über uns**: Führt zur Informationsseite
- **Einschalt Knopf**: Aktiviert oder deaktiviert die Audioausgabe des GoalFinders.

## Dashboard
Das Dashboard enthält Verknüpfungen zur Spielauswahl und zur Einstellungsseite.
![Dashboard View](content/doc/wa-img/de/2.webp)(400)

## Spiele
Die Spieleseite enthält eine Auswahl von Spielen, die mit dem GoalFinder gespielt werden können.
![Games View](content/doc/wa-img/de/3.webp)(400)

### Wuf-Challenge
Die Wurf-Challenge ist der Standard-Spielmodus des GoalFinder. Jeder Spieler erhält 60 Sekunden Zeit, um Treffer oder Fehlwürfe zu erzielen. Anschließend ist der nächste Spieler an der Reihe.
Spieler können hinzugefügt werden, indem der Name des Spielers in das Textfeld am oberen Rand eingegeben und auf „Add Person“ geklickt wird. Hinzugefügte Spieler erscheinen in einer Liste darunter. Spieler können durch Klicken auf das Papierkorb-Symbol neben ihrem Namen entfernt werden.
Das Spiel kann mit der Wiedergabetaste gestartet oder pausiert werden.
Die Web-App zeigt die verbleibende Zeit des aktuellen Spielers sowie die Treffer und Fehlwürfe aller Spieler an.
Falls der GoalFinder einen Treffer oder Fehlwurf nicht korrekt erkennt, können die Treffer- und Fehlwurfzähler jedes Spielers über die Schaltflächen `+` und `-` neben dem jeweiligen Namen angepasst werden.
Das Spiel kann durch Klicken auf die Schaltfläche „Finish“ beendet werden.
![Throw Challenge](content/doc/wa-img/de/4.webp)(400)

### Zeitspiel-Challenge
In der Zeitspiel-Challenge erhält jeder Spieler 120 Sekunden Zeit, um möglichst viele Treffer oder Fehlwürfe zu erzielen.
Spieler können hinzugefügt werden, indem der Name des Spielers in das Textfeld am oberen Rand eingegeben und auf „Add Person“ geklickt wird. Hinzugefügte Spieler erscheinen in einer Liste darunter. Spieler können durch Klicken auf das Papierkorb-Symbol neben ihrem Namen entfernt werden.
Das Spiel kann mit der Wiedergabetaste gestartet oder pausiert werden.
Die Web-App zeigt die verbleibende Zeit des aktuellen Spielers sowie die Treffer und Fehlwürfe aller Spieler an.
Falls der GoalFinder einen Treffer oder Fehlwurf nicht korrekt erkennt, können die Treffer- und Fehlwurfzähler jedes Spielers über die Schaltflächen `+` und `-` neben dem jeweiligen Namen angepasst werden.
Das Spiel kann durch Klicken auf die Schaltfläche „Finish“ beendet werden.
![Timed Game Challenge](content/doc/wa-img/de/5.webp)(400)

### Freies Spiel
Im Modus Freies Spiel müssen keine Spieler eingerichtet werden. Das Gerät zählt einfach alle Treffer und Fehlwürfe.
Das Spiel kann mit der Wiedergabetaste gestartet oder pausiert werden. Der Zähler kann über die Schaltfläche „Reset“ zurückgesetzt werden.
![Free Play](content/doc/wa-img/de/6.webp)(400)

## Einstellungen
### Audioeinstellungen
Im Reiter `Audio` können die Lautstärke der Lautsprecher sowie die Töne für Metronom (Tick), Warten, Treffer und Fehlwurf angepasst werden.
![Audio Settings](content/doc/wa-img/de/7.webp)(400)

### LED-Einstellungen
Im Reiter  `LED` können die Helligkeit des LED-Streifens sowie die Animation im Leerlaufzustand angepasst werden.
![LED Settings](content/doc/wa-img/de/8.webp)(400)

### Erkennungseinstellungen
Im Reiter `Erkennung` kann die Erkennungsempfindlichkeit mithilfe einer von vier Voreinstellungen angepasst werden.
![Detection Settings](content/doc/wa-img/de/9.webp)(400)

### Verbindungseinstellungen
Im Reiter `Verbindung` können der Gerätename (der Name des WLAN-Netzwerks) geändert und ein Passwort für das WLAN-Netzwerk festgelegt werden.
Eine detaillierte Anleitung zur Verbindung des Geräts mit bestehenden Netzwerken finden Sie ^[hier](../content/doc/de/t-webapp-advanced.md).
![Connection Settings](content/doc/wa-img/de/10.webp)(400)

### Systemeinstellungen
Im Reiter `System` können Design, Akzentfarbe und Sprache der Web-App geändert werden.
Der GoalFinder kann über die Schaltfläche „Restart“ neu gestartet werden. Die Geräteeinstellungen können über die Schaltfläche „Reset to factory settings“ auf die Werkseinstellungen zurückgesetzt werden.
Geräteaktualisierungen können ebenfalls über diesen Reiter durchgeführt werden. Detaillierte Anweisungen finden sich im ^[Update-Tutorial](../content/doc/de/u-update.md).
![Connection Settings](content/doc/wa-img/de/11.webp)(400)

#end