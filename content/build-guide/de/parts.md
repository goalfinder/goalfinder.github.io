# Teile
Diese Seite bietet einen umfassenden Überblick über alle Komponenten, die für die vollständige Montage des GoalFinder-Geräts benötigt werden.
#wh Hinweis
#wb Die genauen Maße und Spezifikationen der Grundteile werden derzeit überprüft und werden aktualisiert, sobald sie verfügbar sind.

## Downloads und Ressourcen
- [Komplette Amazon-Artikel-Liste](https://amzn.eu/04dzXJmA)
- /[Archiv mit allen Dateien herunterladen](/content/build-guide/download/gf-1.10-housing.zip)

## Grundlegende Montage-Teile
### Gehäusematerial
Wir empfehlen, das Gehäuse und die inneren Halterungen des Geräts mit festen, stabilen Filamenten wie `PLA`, `PETG` oder `ABS` im 3D-Druckverfahren herzustellen.
 - [PLA 3D-Druckmaterial](https://www.amazon.de/-/en/Creality-Official-Filament-Printing-Dimensional/dp/B0BYSP6QBH/ref=sr_1_17) in einer Farbe Ihrer Wahl
 - Optional [Acrylglas](https://www.amazon.de/gp/product?1=Submit&ASIN=B0FJWZT2VW&twisterDimKeys=size_name%2Cnumber_of_items&twisterNonJs=1&th=1) für das Gehäuse

## Gehäuse
#ih Downloads
#ib Alle Maße der `.obj`-Dateien sind in Millimetern (mm).

/[Archiv mit allen Dateien herunterladen](/content/build-guide/download/gf-1.10-housing.zip)
### Innere Halterungen
Die inneren Halterungen bestehen aus drei Halterungen für die Platine, Sensoren und Zubehör. Diese sorgen für sicheren Halt und eine einfache Installation aller internen Komponenten.

- /[Haupthalterung](/content/build-guide/download/goalfinder-1.10-bracket-inner.obj)
- /[Obere linke Halterung](/content/build-guide/download/goalfinder-1.10-bracket-top-left.obj)
- /[Obere rechte Halterung](/content/build-guide/download/goalfinder-1.10-bracket-top-right.obj)

![Haupthalterung](assets/img/assembly/steps/low_res/GF_assembly_10.jpg)(510x614)
*Haupthalterung für Platine und Sensoren*
![Obere Halterungen](assets/img/assembly/steps/low_res/GF_assembly_12.jpg)(510x614)
*Obere linke und rechte Halterung*

### Äußeres Gehäuse
![Äußeres Gehäuse](assets/img/assembly/steps/high_res/GF_assembly_14.jpg)(482x226)
*Äußeres Gehäuse*
![Gehäuse oben](assets/img/assembly/steps/low_res/GF_assembly_19.jpg)(510x614)
*Obere Gehäuseplatte*
![Gehäuse unten](assets/img/assembly/steps/low_res/GF_assembly_22.jpg)(510x614)
*Untere Gehäuseplatte*

Das äußere Gehäuse besteht aus sechs Platten. Zwei dieser Platten können je nach Installationsbedarf durch Montagevarianten ersetzt werden. Die gezeigten Platten sind aus Plexiglas geschnitten, können aber auch problemlos 3D-gedruckt werden.

- /[Unten](/content/build-guide/download/goalfinder-1.10-housing-bottom.obj)
- /[Hinten](/content/build-guide/download/goalfinder-1.10-housing-back.obj)
- /[Links](/content/build-guide/download/goalfinder-1.10-housing-left.obj)
- /[Rechts](/content/build-guide/download/goalfinder-1.10-housing-right.obj)
- /[Oben](/content/build-guide/download/goalfinder-1.10-housing-top.obj) oder als Montagevariante /[Oben mit Halterung](/content/build-guide/download/goalfinder-1.10-housing-top-mount.obj)
- /[Vorne](/content/build-guide/download/goalfinder-1.10-housing-front.obj) oder als Montagevariante /[Vorne mit Halterung](/content/build-guide/download/goalfinder-1.10-housing-front-mount.obj)

#### Montage- vs. Standardplatten
![Rückseitenmontage](assets/img/design/mouting/back-plate.png)(672x346)
*Beispiel: Montage an der Rückplatte*
![Obere Montage](assets/img/design/mouting/top-plate.png)(672x346)
*Beispiel: Montage an der oberen Platte*


## Elektronische Komponenten
Diese Seite listet alle elektronischen Komponenten auf, die für die Montage des GoalFinder-Geräts benötigt werden.

### Breakout-Boards
#### ESP32 D1 Mini
Hauptcontroller für das GoalFinder-Gerät.
![ESP Mikrocontroller](assets/img/assembly/steps/high_res/GF_assembly_24.jpg)(510x614)
[Produktlink](https://www.amazon.de/-/en/AZDelivery-Bluetooth-Development-Connection-Compatible/dp/B0DHY5C3Q3/ref=sr_1_6)
[Dokumentation](https://cdn.shopify.com/s/files/1/1509/1638/files/D1_Mini_ESP32_Datenblatt_AZ-Delivery_Vertriebs_GmbH.pdf)

#### SW420
Schüttelsensor zur Schusserkennung.
![SW420](assets/img/assembly/steps/high_res/GF_assembly_08.jpg)(510x614)
[Produktlink](https://www.amazon.de/-/en/AZDelivery-Vibration-Shaker-Compatible-Arduino/dp/B07D92XBMS/ref=sr_1_2)
[Dokumentation](https://cdn.shopify.com/s/files/1/1509/1638/files/SW420_Vibration_Schuttel_Erschutterung_Sensor_Modul_Datenblatt_AZ-Delivery_Vertriebs_GmbH.pdf)

#### VL53L0X
Time-of-Flight (ToF) Sensor zur Treffererkennung.
![VL53L0X](assets/img/components/vl.png)(400)
[Produktlink](https://www.amazon.de/-/en/AZDelivery-VL53L0X-Flight-Ranging-Sensor/dp/B086V37JJ7/ref=sr_1_4)
[Dokumentation](https://cdn.shopify.com/s/files/1/1509/1638/files/VL53L0X_Time_of_Flight_Sensor_Datenblatt_AZ-Delivery_Vertriebs_GmbH.pdf)

#### MAX98357A
Verstärker zum Anschluss an den Audiotreiber.
![MAX98357A](assets/img/components/max.png)(400x320)
[Produktlink](https://www.amazon.de/-/en/MAX98357A-Amplifier-Filterless-Breakout-Application/dp/B0F21T7Q3P/ref=sr_1_4)
[Dokumentation](https://www.analog.com/media/en/technical-documentation/data-sheets/max98357a-max98357b.pdf)

#### Audiotreiber
Lautsprecher für akustisches Feedback.
![Audiotreiber](assets/img/assembly/steps/high_res/GF_assembly_28.jpg)(510x614)
[Produktlink](https://www.amazon.de/-/en/HUAREW-JST-PH2-0-Interface-Motherboard-Electronic/dp/B0CRNZYW1R/ref=sr_1_6)

### Weitere Teile
#### USB-C Breakout
Breakout-Board für den externen USB-C-Anschluss an der Seitenwand.
![USB-C Breakout](assets/img/assembly/steps/high_res/GF_assembly_06.jpg)(510x614)

#### LED-Streifen
LED-Streifen für visuelles Feedback. Die meisten Nutzer bevorzugen den violetten Streifen, da er am auffälligsten ist.
![LED-Streifen](assets/img/components/led.JPG)(450)
[Produktlink](https://www.amazon.de/dp/B0BXWV3FD4?th=1)

#### XYQ JST-Steckverbinder
Steckverbinder für die Verbindung zwischen Gerät und LED-Streifen.
![XYQ JST-Steckverbinder](assets/img/assembly/steps/high_res/GF_assembly_07.jpg)(510x614)
[Produktlink](https://www.amazon.com/Pairs-Female-Connector-22AWG-Battery/dp/B01HHY9ZKW)

#### Micro USB Breakout
Verbindet die Platine mit dem Mikrocontroller über USB.
![Micro USB Breakout](assets/img/assembly/steps/high_res/GF_assembly_29.jpg)(510x614)

## Leiterplatte (PCB)
Die Leiterplatte verbindet den Hauptmikrocontroller mit allen elektronischen Komponenten im System.

### PCB-Renderings
Hier finden Sie Renderings der Leiterplatte zur besseren Visualisierung:
![PCB Rendering Vorderseite](assets/img/render/top.png)(510x614)
*Oberseite der Leiterplatte*
![PCB Rendering Rückseite](assets/img/render/main.png)(510x614)
*Gesamtansicht*

### Benötigte Komponenten
Nachfolgend eine Liste aller Hilfsteile für die Montage:

- 1x 22µF Kondensator
- 1x 4.7µF Kondensator
- 6x 100nF SMD-Kondensator
- 2x 100k SMD-Widerstand
- 1x 1k SMD-Widerstand
- 1x 35k SMD-Widerstand
- 1x IRLML2502 SMD-MOSFET

- 3x 2-poliger weiblicher JST-Steckverbinder
- 1x 2-poliger männlicher JST-Steckverbinder
- 1x 3-poliger weiblicher JST-Steckverbinder
- 30x 2,54mm Pin-Header (längster: 10 Pins)

### Downloads
/[Gerber-Dateien herunterladen](content/build-guide/download/gf-1.5-pcb.zip)

#end
