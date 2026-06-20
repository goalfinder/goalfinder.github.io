# Häufig gestellte Fragen

## Netzwerk und Konnektivität

Q: `goalfinder.local` öffnet nichts in meinem Browser. Gibt es eine andere Möglichkeit, die Web-App zu erreichen?
A: Ja. Die Web-App kann durch Eingabe der Geräte-IP-Adresse `192.168.4.1` in die Adressleiste des Browsers aufgerufen werden. (Dies funktioniert nur, wenn der GoalFinder nicht mit einem bestehenden Netzwerk verbunden ist. Falls er mit einem bestehenden Netzwerk verbunden ist, wenden Sie sich bitte an Ihre Netzwerkadministration.)

Q: Ich habe den GoalFinder mit meinem Heim-WLAN verbunden, kann ihn aber jetzt nicht mehr finden. Wie kann ich wieder darauf zugreifen?
A: Navigieren Sie zu den Verbindungseinstellungen, aktivieren Sie `Use external network` und geben Sie den Netzwerknamen sowie das Passwort ein. Weitere Informationen zur Verbindung mit bestehenden Netzwerken finden sich ^[hier](../content/doc/de/t-webapp-advanced.md).

Q: Meine Schule verwendet ein 5-GHz-WLAN. Warum kann sich der GoalFinder nicht verbinden?
A: Um die Kosten des Geräts niedrig zu halten und die Zugänglichkeit zu gewährleisten, verwenden wir Hardware, die leider keine 5-GHz-Netzwerke unterstützt. Wenden Sie sich an Ihre Netzwerkadministration, um Unterstützung bei der Einrichtung eines 2,4-GHz-WLANs zu erhalten.

Q: Die Web-App zeigt „Disconnected“ an, obwohl ich mit demselben WLAN wie das Gerät verbunden bin.

Q: Mein Browser zeigt beim Öffnen der Web-App eine Warnung „Nicht sicher“ an. Ist das normal?
A: Ja. Der GoalFinder verwendet das weniger sichere HTTP-Protokoll. Als Open-Source-Projekt gewährleisten wir jedoch das höchstmögliche Sicherheitsniveau. Es sind keine Risiken bekannt, die mit der Verbindung zum oder der Nutzung des GoalFinder-Geräts beziehungsweise Netzwerks verbunden sind.

Q: Ich versuche, eine Verbindung zu einem externen Netzwerk einzurichten, aber das Standard-Gateway und die Subnetzmaske sehen ungewöhnlich aus. Welche Werte sollte ich verwenden?

## Erkennung und Spielbetrieb

Q: Der GoalFinder registriert ständig Treffer, obwohl sich niemand in der Nähe des Korbs befindet. Wie kann ich das verhindern?
A: Ändern Sie die Erkennungsvoreinstellung im Reiter für die Erkennungseinstellungen, sodass sie zu Ihrem Korb passt. Falls das Problem weiterhin besteht, aktivieren Sie die ^[erweiterten Einstellungen](../content/doc/de/t-webapp-advanced.md) und wählen Sie eine für Ihr Setup geeignete Treffererkennungsdistanz.

Q: Meine Würfe treffen den Ring, aber der GoalFinder erkennt sie nicht. Welche Anpassungen kann ich vornehmen?
A: Ändern Sie die Erkennungsvoreinstellung im Reiter für die Erkennungseinstellungen, sodass sie zu Ihrem Korb passt. Falls das Problem weiterhin besteht, aktivieren Sie die ^[erweiterten Einstellungen](../content/doc/de/t-webapp-advanced.md) und wählen Sie eine Sensorsensitivität, die für Ihr Setup geeignet ist.

Q: Der Ball geht durch den Korb, aber das Gerät zählt den Wurf trotzdem als Fehlwurf. Woran liegt das?
A: Die Treffererkennungsvoreinstellung passt möglicherweise nicht zu Ihrem Setup. Ändern Sie die Erkennungsvoreinstellung im Reiter für die Erkennungseinstellungen, sodass sie zu Ihrem Korb passt. Falls das Problem weiterhin besteht, aktivieren Sie die ^[erweiterten Einstellungen](../content/doc/de/t-webapp-advanced.md) und wählen Sie eine für Ihr Setup geeignete Treffererkennungsdistanz.

Q: Kann ich den GoalFinder verwenden, ohne jemals die Web-App zu öffnen?
A: Ja. Im Auslieferungszustand funktioniert das Gerät wie vorgesehen und erkennt Treffer sowie Fehlwürfe. Obwohl das Gerät auch ohne Konfiguration funktioniert, kann es zu unerwartetem Verhalten kommen. Daher wird empfohlen, das Gerät über die Web-App korrekt zu konfigurieren.

Q: Meine Spielergebnisse gingen verloren, nachdem das Gerät die Stromversorgung verloren hat. Werden sie irgendwo gespeichert?
A: Leider nicht. Wir arbeiten jedoch an Änderungen, die das Speichern von Spielernamen und Spielergebnissen ermöglichen werden.

## Konfiguration und Einstellungen

Q: Ich habe die erweiterten Einstellungen aktiviert, kann aber einige Optionen, von denen ich gehört habe, trotzdem nicht finden. Wo befinden sie sich?
A: Die vollständige Liste aller verfügbaren Anpassungen mit aktivierten erweiterten Einstellungen finden Sie ^[hier](../content/doc/de/t-webapp-advanced.md).

Q: Ich habe versucht, ein Passwort für die Web-App festzulegen, aber es scheint nicht zu funktionieren. Gibt es eine Mindestlänge?
A: Ja. Zur Gewährleistung der Sicherheit setzen wir eine branchenübliche Mindestpasswortlänge von **8** Zeichen voraus.

Q: Ich habe einen Einstellungswert geändert, aber keine Bestätigung erhalten, dass er gespeichert wurde. Woher weiß ich, dass die Änderung übernommen wurde?
A: Die meisten Einstellungen werden sofort wirksam. Einstellungen, die dies nicht tun, fordern entweder zu einem Neustart des Geräts auf oder starten es automatisch neu (falls der automatische Neustart zuvor im Neustartdialog aktiviert wurde).

Q: Kann ich meinen GoalFinder anders benennen als mit dem Standardnamen?
A: Ja. Das Gerät kann im Reiter für die Verbindungseinstellungen umbenannt werden.

## Updates und Firmware

Q: Auf der Download-Seite werden `firmware.bin` und `system.gfpkg` aufgeführt. Welche Datei benötige ich tatsächlich?
A: Dateien vom Typ `firmware.bin` sind ältere Update-Pakete, die aus Gründen der Abwärtskompatibilität weiterhin bereitgestellt werden. Alle neuen Versionen verwenden das neuere Format `system.gfpkg` (**G**oal**F**inder **P**ac**k**a**g**e).

Q: Das Update war erfolgreich, aber jetzt verhält sich das Gerät anders als zuvor. Ist das zu erwarten?
A: In den meisten Fällen ja. Mit jedem Update möchten wir die Funktionalität des GoalFinders verbessern. Bestimmte Unterschiede können durch Änderungen an den Geräteeinstellungen verursacht werden. Weitere Informationen finden sich in den Release Notes, im Einstellungsreiter oder in der ^[Einstellungsdokumentation](../content/doc/de/u-webapp.md).

Q: Die Web-App sieht völlig anders aus als die Screenshots in der Dokumentation. Ist etwas falsch?
A: Nein. Die Web-App ist höchstwahrscheinlich für die Verwendung eines anderen Designs oder einer anderen Akzentfarbe konfiguriert. Falls Unterschiede in der tatsächlichen Funktionalität oder im Inhalt der Web-App festgestellt werden, ^[melden Sie dies bitte](../content/doc/de/t-bug-report-feature-req.md).

## Sicherheit und Datenschutz

Q: Sind meine WLAN-Passwörter und Zugangsdaten geschützt, wenn ich sie in die Web-App eingebe?
A: Ja. Alle sensiblen Daten, die zwischen dem Gerät und der Web-App übertragen werden, werden so verschlüsselt, dass sie ausschließlich vom Gerät entschlüsselt werden können.

Q: Jemand anderes hat sich mit meinem GoalFinder verbunden und meine Einstellungen geändert. Wie kann ich das verhindern?
A: Ziehen Sie die Einrichtung eines ^[WLAN-Passworts](../content/doc/de/u-webapp.md) oder – falls das Gerät in einem bestehenden Netzwerk verwendet wird – eines ^[Web-App-Passworts](../content/doc/de/t-webapp-advanced.md) in Betracht.

## Support und Mitwirkung

Q: Ich möchte die Firmware selbst erstellen, aber der Branch `main` scheint veraltet zu sein. Wo findet die aktive Entwicklung statt?
A: Die aktive Entwicklung findet auf dem Branch `development` statt. Die Verwendung der Entwicklungsversion kann jedoch zu unerwartetem Verhalten führen.

Q: Ich habe einen Fehler gefunden oder eine Idee. Wie kann ich dies am besten melden?
A: Vielen Dank für Ihre Bereitschaft, zu unserer Mission beizutragen. Weitere Informationen finden sich in unserem ^[Leitfaden zum Melden von Fehlern oder Vorschlagen neuer Funktionen](../content/doc/de/t-bug-report-feature-req.md).

#end