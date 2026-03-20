# Zusammenbau der Leiterplatte
## 1. Leiterplatte montieren
Montiere die elektronischen Komponenten auf der Platine. Als Hilfestellung können der Schaltplan und dass [KiCad-Projekt](https://github.com/htl-leo-club-embedded-iot/GoalFinder/tree/main/blueprint/pcb/1.5) weiterhelfen. Der ToF-Sensor und der Verstärker werden direkt auf der Leiterplatte angebracht.
![Schaltplan](assets/img/assembly/doc/schematic.png)
*Schaltplan der Leiterplatte*
![Leiterplatte von oben](assets/img/assembly/steps/high_res/GF_assembly_01.jpg)(1020x1228)
![Leiterplatte von unten](assets/img/assembly/steps/high_res/GF_assembly_02.jpg)(1020x1228)
*Erwartetes Ergebnis nach dem Zusammenbau der Leiterplatte*

![PCB Rendering Vorderseite](assets/img/render/top.png)(900)
*Oberseite der Leiterplatte*
![PCB Rendering Rückseite](assets/img/render/main.png)(900)
*Gesamtansicht*


### Empfehlung: Niedrige Komponenten zuerst bestücken
Wir empfehlen, zuerst die niedrigen Bauteile auf der Leiterplatte zu bestücken und zu löten, bevor größere Komponenten montiert werden. Dies erleichtert das Löten und sorgt für eine saubere Montage.

### VL53L0X Breakout Board löten
Löten Sie das VL53L0X Breakout-Board auf die geraden Pins des Winkel-Headers, sodass die gebogenen Pins auf der dem Sensor gegenüberliegenden Seite (Rückseite) liegen. Führen Sie die gebogenen Pins durch die Hauptplatine und löten Sie zunächst einen Pin fest. Positionieren Sie das Breakout-Board so senkrecht wie möglich zur Hauptplatine und parallel zur Vorderkante der Platine. Anschließend die restlichen Pins verlöten.

#ih Empfehlung
#ib Wir empfehlen den oberen Teil des Micro USB Breakout Boards abzuschneiden, um ein mögliches Abbrechen der Buchse des Microcontrollers zu vermeiden

## 2. Mikrocontroller vorbereiten
Löte die Stiftleisten auf den ESP32 Mikrocontroller. Es können auch nur die tatsächlich benötigten Pins angelötet werden (Details dazu findest du im [KiCad-Projekt](https://github.com/htl-leo-club-embedded-iot/GoalFinder/tree/main/blueprint/pcb/1.5)). Setze den Mikrocontroller entsprechend der Markierung auf der Leiterplatte auf.
![Mikrocontroller auf Leiterplatte](assets/img/assembly/steps/high_res/GF_assembly_30.jpg)(1020x1228)
*Mikrocontroller montiert und mit der Leiterplatte verbunden*

#end
