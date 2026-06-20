# Erweiterte Web-App-Einstellungen
Diese Anleitung listet alle erweiterten Einstellungen auf, die über die Web-App vorgenommen werden können.
Um die erweiterten Einstellungen zu aktivieren, navigieren Sie zu den Systemeinstellungen und aktivieren Sie `Advanced Settings`.

## Audio
- Die Lautstärke kann präziser innerhalb eines Bereichs von 0 (Audio deaktiviert) bis 100 (maximale Lautstärke) eingestellt werden.
- Die Zeit zwischen den Metronom-Ticks kann in Millisekunden angepasst werden. (Dies wirkt sich auch auf die Zeitsteuerung der LED-Modi `Flash` und `Turbo` aus.)

## LED
- Die LED-Helligkeit kann präziser innerhalb eines Bereichs von 0 (geringste Helligkeit) bis 100 (höchste Helligkeit) eingestellt werden.

## Sensoren
Anstelle von Voreinstellungen mit festen Werten können die Empfindlichkeit (0 - 100), die Treffererkennungsdistanz (150 - 350 (mm)) sowie die Timeout-Zeit nach der Treffererkennung manuell angepasst werden.

## Verbindung
- Es kann ein Passwort für die Web-App festgelegt werden, um den Zugriff auf die Web-App zu schützen, wenn das Gerät nicht im Access-Point-Modus betrieben wird. Ist diese Funktion aktiviert, fordert die Web-App das konfigurierte Passwort an, sofern der Client zuvor noch nicht verbunden war.
- DNS (nur im Access-Point-Modus verfügbar) kann aktiviert oder deaktiviert werden. Der integrierte DNS-Server des GoalFinder löst sowohl `goalfinder.local` als auch `<device-name>.local` auf die IP-Adresse des Geräts auf.

### Externes Netzwerk verwenden
Wenn aktiviert, kann das Gerät mit einem externen (bereits vorhandenen) Netzwerk verbunden werden.
#ih Hinweis
#ib Der GoalFinder kann nur mit 2,4-GHz-Netzwerken verbunden werden.

 1. Geben Sie die SSID (den Namen) des Netzwerks ein.
 2. Wählen Sie den Authentifizierungsmodus des Zielnetzwerks aus.

### WPA/WPA2 Personal
 1. Geben Sie das Passwort des Netzwerks ein.

### WPA/WPA2 Enterprise
 1. Geben Sie einen gültigen Benutzernamen für das Enterprise-Netzwerk ein.
 2. Geben Sie das zugehörige Netzwerkpasswort ein.
**Erweiterte Enterprise-Netzwerkoptionen (optional)**
 3. Enterprise-Identität
 4. Anonyme Enterprise-Identität
 5. Enterprise-Phase-2-Methode
 6. CA-Zertifikat
 7. Client-Zertifikat
 8. Privater Client-Schlüssel

 3. Manuelle DHCP-Konfiguration (optional, aber empfohlen): IP-Adresse des Geräts, Standard-Gateway des Netzwerks, Subnetzmaske des Netzwerks und DNS-Server des Netzwerks.
 4. Klicken Sie auf `Apply network configuration`.

#+h AP-Fallback
#+b Sollte die Verbindung zum externen Netzwerk aus irgendeinem Grund fehlschlagen, wechselt das Gerät automatisch zurück in den Access-Point-Modus.

#end