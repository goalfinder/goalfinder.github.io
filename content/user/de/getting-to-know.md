# Kennenlernen des GoalFinders
## Schnittstellen
![Port Showcase](assets/img/showcase/P1440915-N.JPG)(400x400)
Neben kabelloser Kommunikation über Wi-Fi hat der GoalFinder noch einen äußeren USB-C-Stecker als Stromanschluss und zur Datenübertragung, sowie einen Stecker für die LED-Leiste (2).

## Verbinden
Sobald der GoalFinder angeschlossen wurde, öffnet er automatisch ein Wi-Fi-Netzwerk unter dem Namen `GoalFinder` gefolgt von 2 Zahlen.
(Der Name des Geräts kann in der Web App geändert werden) 
Hilfe beim Verbinden mit Wi-Fi-Netzwerken: [Android-Anleitung](https://support.google.com/android/answer/9075847?hl=en), [iOS-Anleitung](https://support.apple.com/en-us/111107)

### Öffnen der Web App
#wh Anmerkung für Android
#wb Auf Android 15 Geräten, besonders Samsung, wird in Version 1.1 keine Anzeige zum Öffnen der Web App erscheinen.
#wb Auf der Behebung dieses Fehlers wird gearbeitet.
Bei dem ersten Verbinden mit dem Gerät wird eine Benachrichtigung erscheinen die auf die Web App weiterleitet erscheinen oder die Web App sich selbst öffnen. **Weiters empfehlen wir, die Web App im Browser zu markieren, um besser zurückkehren zu können.**
Die Web App kann sonst entweder [hier](http://192.168.4.1) oder durch Öffnen der IP-Adresse `192.168.4.1` in einem Webbrowser geöffnet werden.  **Dies funktioniert nur, wenn man mit dem Netzwerk des GoalFinders verbunden ist.**
Die vollständige Anleitung zur Web-App findest du ^[hier](content/user/de/webapp.md).

## Funktionsweise
Der GoalFinder hat 2 Sensoren, die zur Erkennung des Spielgeschehens dienen.
![SchüttelSensor](assets/img/assembly/general/P1440892-N.JPG)(623x450)
Schüttel Sensor (1)
![Abstandssensor](assets/img/showcase/P1440908-N.JPG)(403x450)
Abstandssensor (2)

#ih Anmerkung
#ib Aufgrund von technischen Limitationen kann der GoalFinder Schüsse, die das Brett nicht berühren, nicht erkennen. Aus diesem Grund besteht die Möglichkeit, einen Fehlschuss in der Web-App zu kennzeichnen.

Folgende Schritte werden ausgeführt, um einen Schuss auszuwerten:
1. Der Schüttel Sensor (1) führt konstant Messungen aus, um Vibrationen zu erkennen.
2. Sobald eine Vibration erkannt wird, wird ein 5-Sekunden-Fenster geöffnet in dem ein erfolgreicher Treffer erkannt wird.
3. Wenn der Abstandssensor (2) einen Treffer durch den Ring erkennt, wird ein Treffer gewertet. Läuft die Zeit ab, wird es als Fehlschuss gewertet.

#end