```
# Teile
Diese Seite bietet einen umfassenden Überblick über alle Komponenten, die für die vollständige Montage des GoalFinder-Geräts erforderlich sind.

#wh Hinweis
#wb Die genauen Abmessungen und Spezifikationen der Basisteile werden derzeit noch überprüft und werden aktualisiert, sobald sie verfügbar sind.

## Grundlegende Montageteile
 - Schrauben
 - Unterlegscheiben
 - Gewindeeinsätze

## Elektronische Komponenten
Diese Seite listet alle elektronischen Komponenten auf, die für die Montage des GoalFinder-Geräts erforderlich sind.

### Breakout-Boards
#### ESP32 D1 Mini
Hauptcontroller für das GoalFinder-Gerät.
![ESP Mikrocontroller](assets/img/assembly/steps/high_res/GF_assembly_24.jpg)(510x614)
[Produktlink](https://www.amazon.de/-/en/AZDelivery-Bluetooth-Development-Connection-Compatible/dp/B0DHY5C3Q3/ref=sr_1_6)
[Dokumentation](https://cdn.shopify.com/s/files/1/1509/1638/files/D1_Mini_ESP32_Datenblatt_AZ-Delivery_Vertriebs_GmbH.pdf)

#### SW420
Erschütterungssensor zur Schusserkennung.
![SW420](assets/img/assembly/steps/high_res/GF_assembly_08.jpg)(510x614)
[Produktlink](https://www.amazon.de/-/en/AZDelivery-Vibration-Shaker-Compatible-Arduino/dp/B07D92XBMS/ref=sr_1_2)
[Dokumentation](https://cdn.shopify.com/s/files/1/1509/1638/files/SW420_Vibration_Schuttel_Erschutterung_Sensor_Modul_Datenblatt_AZ-Delivery_Vertriebs_GmbH.pdf)

#### VL53L0X
Time-of-Flight-(ToF)-Sensor zur Treffererkennung.
[Produktlink](https://www.amazon.de/-/en/AZDelivery-VL53L0X-Flight-Ranging-Sensor/dp/B086V37JJ7/ref=sr_1_4)
[Dokumentation](https://cdn.shopify.com/s/files/1/1509/1638/files/VL53L0X_Time_of_Flight_Sensor_Datenblatt_AZ-Delivery_Vertriebs_GmbH.pdf)

#### MAX98357A
Verstärker zur Verbindung mit dem Audio-Treiber.
[Produktlink](https://www.amazon.de/-/en/MAX98357A-Amplifier-Filterless-Breakout-Application/dp/B0F21T7Q3P/ref=sr_1_4)
[Dokumentation](https://www.analog.com/media/en/technical-documentation/data-sheets/max98357a-max98357b.pdf)

#### Audio-Treiber
Lautsprecher für akustisches Feedback.
![Audio-Treiber](assets/img/assembly/steps/high_res/GF_assembly_28.jpg)(510x614)
[Produktlink](https://www.amazon.de/-/en/HUAREW-JST-PH2-0-Interface-Motherboard-Electronic/dp/B0CRNZYW1R/ref=sr_1_6)

### Weitere Teile
#### USB-C-Breakout
Breakout-Board für eine externe USB-C-Verbindung an der Seitenwand.
![USB-C Breakout](assets/img/assembly/steps/high_res/GF_assembly_06.jpg)(510x614)

#### LED-Streifen
LED-Streifen für visuelles Feedback.

#### XYQ JST-Steckverbinder
Steckverbinder für die Verbindung zwischen Gerät und LED-Streifen.
![XYQ JST-Steckverbinder](assets/img/assembly/steps/high_res/GF_assembly_07.jpg)(510x614)
[Produktlink](https://www.amazon.com/Pairs-Female-Connector-22AWG-Battery/dp/B01HHY9ZKW)

#### Micro-USB-Breakout
Verbindet die Leiterplatte über USB mit dem Mikrocontroller.
![Micro USB Breakout](assets/img/assembly/steps/high_res/GF_assembly_29.jpg)(510x614)

## Gehäuse
#ih Downloads
#ib Alle `.obj`-Dateimaße sind in Millimetern (mm) angegeben.

/[Archiv mit allen Dateien herunterladen](/content/build-guide/download/gf-1.10-housing.zip)

### Innere Halterungen
Die inneren Halterungen bestehen aus drei Halterungen, die für die Leiterplatte, Sensoren und Zubehör ausgelegt sind. Sie sorgen für eine sichere Platzierung und eine einfache Installation aller internen Komponenten.

- /[Haupthalterung](/content/build-guide/download/goalfinder-1.10-bracket-inner.obj)
- /[Obere linke Halterung](/content/build-guide/download/goalfinder-1.10-bracket-top-left.obj)
- /[Obere rechte Halterung](/content/build-guide/download/goalfinder-1.10-bracket-top-right.obj)

![Haupthalterung](assets/img/assembly/steps/low_res/GF_assembly_10.jpg)(510x614)
*Haupthalterung für Leiterplatte und Sensoren*
![Obere Halterungen](assets/img/assembly/steps/low_res/GF_assembly_12.jpg)(510x614)
*Obere linke und obere rechte Halterungen*

### Äußeres Gehäuse
![Gehäuseübersicht](assets/img/assembly/steps/low_res/GF_assembly_14.jpg)(510x614)
*Äußeres Gehäuse aus Plexiglas*

Das äußere Gehäuse besteht aus sechs Platten. Zwei dieser Platten können je nach Installationsanforderungen durch Montagevarianten ersetzt werden. Die gezeigten Platten sind aus Plexiglas geschnitten, können jedoch auch problemlos 3D-gedruckt werden.

- /[Boden](/content/build-guide/download/goalfinder-1.10-housing-bottom.obj)
- /[Rückseite](/content/build-guide/download/goalfinder-1.10-housing-back.obj)
- /[Links](/content/build-guide/download/goalfinder-1.10-housing-left.obj)
- /[Rechts](/content/build-guide/download/goalfinder-1.10-housing-right.obj)
- /[Oben](/content/build-guide/download/goalfinder-1.10-housing-top.obj) oder als Montagevariante /[Oben mit Halterung](/content/build-guide/download/goalfinder-1.10-housing-top-mount.obj)
- /[Vorderseite](/content/build-guide/download/goalfinder-1.10-housing-front.obj) oder als Montagevariante /[Vorderseite mit Halterung](/content/build-guide/download/goalfinder-1.10-housing-front-mount.obj)

#### Montage vs. Standardplatten
![Rückseitige Montage](assets/img/design/mouting/back-plate.png)(672x346)
*Beispiel: Montage an der Rückplatte*
![Obere Montage](assets/img/design/mouting/top-plate.png)(672x346)
*Beispiel: Montage an der oberen Platte*

## Leiterplatte
Die Leiterplatte (PCB) verbindet den Hauptmikrocontroller mit allen elektronischen Komponenten im System.

### Erforderliche Komponenten
Nachfolgend ist eine Liste aller benötigten Bauteile für die Montage aufgeführt:

- 1x 22µF Kondensator
- 1x 4.7µF Kondensator
- 6x 100nF SMD-Kondensator
- 2x 100k SMD-Widerstand
- 1x 1k SMD-Widerstand
- 1x 35k SMD-Widerstand
- 1x IRLML2502 SMD-MOSFET

- 3x 2-poliger JST-Buchsenstecker
- 1x 2-poliger JST-Stecker
- 1x 3-poliger JST-Buchsenstecker
- 30x 2.54mm Stiftleiste (längste: 10 Pins)

### Downloads
/[Gerber-Dateien herunterladen](content/build-guide/download/gf-1.5-pcb.zip)

#end
```
