# Teile
Diese Seite enthält eine vollständige Liste aller Komponenten, die für die Montage des GoalFinder-Geräts benötigt werden.

#wh Hinweis
#wb Die genauen Abmessungen und Spezifikationen der grundlegenden Montageteile werden derzeit überprüft und veröffentlicht, sobald sie final festgelegt sind.

## Grundlegende Montageteile
- Schrauben
- Muttern
- Unterlegscheiben
- Gewindeeinsätze

## Elektronische Komponenten
### Breakout-Boards
**ESP32 D1 Mini**
Hauptcontroller des GoalFinder-Geräts.
![ESP Microcontroller](assets/img/assembly/steps/GF_assembly_24.webp)(510x614)
[Product Link](https://www.amazon.de/-/de/AZDelivery-Bluetooth-Development-Connection-Compatible/dp/B0DHY5C3Q3/ref=sr_1_6)
[Documentation](https://cdn.shopify.com/s/files/1/1509/1638/files/D1_Mini_ESP32_Datenblatt_AZ-Delivery_Vertriebs_GmbH.pdf)

**SW420**
Erschütterungssensor zur Schusserkennung.
![SW420](assets/img/assembly/steps/GF_assembly_08.webp)(510x614)
[Product Link](https://www.amazon.de/-/de/AZDelivery-Vibration-Shaker-Compatible-Arduino/dp/B07D92XBMS/ref=sr_1_2)
[Documentation](https://cdn.shopify.com/s/files/1/1509/1638/files/SW420_Vibration_Schuttel_Erschutterung_Sensor_Modul_Datenblatt_AZ-Delivery_Vertriebs_GmbH.pdf)

**VL53L0X**
Time-of-Flight-(ToF)-Sensor zur Treffererkennung.
[Product Link](https://www.amazon.de/-/de/AZDelivery-VL53L0X-Flight-Ranging-Sensor/dp/B086V37JJ7/ref=sr_1_4)
[Documentation](https://cdn.shopify.com/s/files/1/1509/1638/files/VL53L0X_Time_of_Flight_Sensor_Datenblatt_AZ-Delivery_Vertriebs_GmbH.pdf)

**MAX98357A**
Verstärker für die Ansteuerung des Lautsprechers.
[Product Link](https://www.amazon.de/-/de/MAX98357A-Amplifier-Filterless-Breakout-Application/dp/B0F21T7Q3P/ref=sr_1_4)
[Documentation](https://www.analog.com/media/en/technical-documentation/data-sheets/max98357a-max98357b.pdf)

**Audio Driver**
Lautsprecher für akustisches Feedback.
![Audio Driver](assets/img/assembly/steps/GF_assembly_28.webp)(510x614)
[Product Link](https://www.amazon.de/-/de/HUAREW-JST-PH2-0-Interface-Motherboard-Electronic/dp/B0CRNZYW1R/ref=sr_1_6)

### Weitere elektronische Bauteile
**USB-C Breakout**
Breakout-Board für die externe USB-C-Verbindung an der Seitenplatte.
![USB-C Breakout](assets/img/assembly/steps/GF_assembly_06.webp)(510x614)

**LED Strip**
LED-Streifen für visuelles Feedback.

**XYQ JST Connectors**
Steckverbinder für die Verbindung zwischen Gerät und LED-Streifen.
![XYQ JST Connector](assets/img/assembly/steps/GF_assembly_07.webp)(510x614)
[Product Link](https://www.amazon.com/Pairs-Female-Connector-22AWG-Battery/dp/B01HHY9ZKW)

**Micro USB Breakout**
Verbindet die Leiterplatte über USB mit dem Mikrocontroller.
![Micro USB Breakout](assets/img/assembly/steps/GF_assembly_29.webp)(510x614)

## Leiterplattenkomponenten
Nachfolgend sind alle Bauteile aufgeführt, die für die Bestückung der Leiterplatte benötigt werden:
- 1x 22µF-Kondensator
- 1x 4,7µF-Kondensator
- 6x 100nF SMD-Kondensator
- 2x 100k SMD-Widerstand
- 1x 1k SMD-Widerstand
- 1x 35k SMD-Widerstand
- 1x IRLML2502 SMD-MOSFET

- 3x 2-polige JST-Buchse
- 1x 2-poliger JST-Stecker
- 1x 3-polige JST-Buchse
- 30x 2,54-mm-Stiftleiste (längste Variante: 10 Pins)

### Downloads
/[Gerber-Dateien herunterladen](content/downloads/gf-1.5-pcb.zip)

## Gehäuse
#ih Downloads
#ib Alle Abmessungen der `.obj`-Dateien sind in Millimetern (mm) angegeben.

/[Archiv mit allen Dateien herunterladen](/content/doc/download/gf-1.10-housing.zip)

### Innere Halterungen
Die inneren Halterungen bestehen aus drei Trägern für die Leiterplatte, Sensoren und weiteres Zubehör. Sie gewährleisten eine sichere Positionierung und eine einfache Installation aller internen Komponenten.

- /[Haupthalterung](/content/doc/download/goalfinder-1.10-bracket-inner.obj)
- /[Obere linke Halterung](/content/doc/download/goalfinder-1.10-bracket-top-left.obj)
- /[Obere rechte Halterung](/content/doc/download/goalfinder-1.10-bracket-top-right.obj)

![Main Bracket](assets/img/assembly/steps/GF_assembly_10.webp)(510x614)
*Haupthalterung für Leiterplatte und Sensoren*
![Top Brackets](assets/img/assembly/steps/GF_assembly_12.webp)(510x614)
*Obere linke und obere rechte Halterung*

## Äußeres Gehäuse
![Housing Showcase](assets/img/assembly/steps/GF_assembly_14.webp)(510x614)
*Äußeres Gehäuse aus Plexiglas*

Das äußere Gehäuse besteht aus sechs Platten. Zwei dieser Platten können je nach gewünschter Montageart durch Montagevarianten ersetzt werden. Die gezeigten Beispiele wurden aus Plexiglas gefertigt, die Teile können jedoch ebenso einfach im 3D-Druck hergestellt werden.

- /[Boden](/content/doc/download/goalfinder-1.10-housing-bottom.obj)
- /[Rückseite](/content/doc/download/goalfinder-1.10-housing-back.obj)
- /[Links](/content/doc/download/goalfinder-1.10-housing-left.obj)
- /[Rechts](/content/doc/download/goalfinder-1.10-housing-right.obj)
- /[Oberseite](/content/doc/download/goalfinder-1.10-housing-top.obj) oder als Montagevariante /[Oberseite mit Halterung](/content/doc/download/goalfinder-1.10-housing-top-mount.obj)
- /[Vorderseite](/content/doc/download/goalfinder-1.10-housing-front.obj) oder als Montagevariante /[Vorderseite mit Halterung](/content/doc/download/goalfinder-1.10-housing-front-mount.obj)

### Montage- vs. Standardplatten
![Back Mounting](assets/img/design/back-plate.webp)(672x346)
*Beispiel: Montage an der Rückseite*
![Top Mounting](assets/img/design/top-plate.webp)(672x346)
*Beispiel: Montage an der Oberseite*

#end