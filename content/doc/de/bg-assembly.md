# Montage
## 1. Leiterplatte montieren
Folgen Sie den bereitgestellten Schaltplänen und Referenzbildern, um die Leiterplatte zu montieren. Der ToF-Sensor und der Verstärker sollten direkt auf der Leiterplatte montiert werden.
![Schematic](assets/img/assembly/doc/schematic.webp)
*Schaltplan der Leiterplatte*
![PCB from above](assets/img/assembly/steps/GF_assembly_01.webp)(1020x1228)
![PCB from below](assets/img/assembly/steps/GF_assembly_02.webp)(1020x1228)
*Erwartetes Ergebnis nach der Montage der Leiterplatte*
#ih Hinweis
#ib Wir empfehlen, den oberen Teil des Micro-USB-Breakout-Boards abzuschneiden, um Schäden am USB-Anschluss des Mikrocontrollers zu vermeiden.

## 2. Mikrocontroller vorbereiten
Löten Sie die Stiftleisten auf den ESP32-Mikrocontroller. Es müssen nur die erforderlichen Pins verlötet werden (Details finden sich im [KiCad-Projekt](https://github.com/htl-leo-club-embedded-iot/GoalFinder/tree/main/blueprint/pcb/1.5)). Platzieren Sie den Mikrocontroller entsprechend der Markierungen auf der Leiterplatte.
![Microcontroller on PCB](assets/img/assembly/steps/GF_assembly_30.webp)(1020x1228)
*Montierter Mikrocontroller, verbunden mit der Leiterplatte*

## 3. Audiotreiber montieren
Befestigen Sie den Lautsprecher mit vier Schrauben und Unterlegscheiben an der unteren Gehäuseplatte.
![Audio Driver Mounted](assets/img/assembly/steps/GF_assembly_34.webp)(1020x1228)
*Lautsprecher an der unteren Gehäuseplatte montiert*

## 4. Gewindeeinsätze einsetzen
Verwenden Sie einen Lötkolben, um den Kunststoff zu anzuschmelzen, und setzen Sie die Gewindeeinsätze in die Haupthalterung ein. Dadurch werden die Einsätze sicher fixiert.
![Adding Threaded Inserts](assets/img/assembly/steps/GF_assembly_35.webp)(1020x1228)
*Gewindeeinsätze in die Haupthalterung eingesetzt*

## 5. Erschütterungssensor montieren
Klipsen Sie den SW420 Erschütterungssensor in die innere Halterung ein. Er sollte sicher einrasten.
![Shake Sensor Mounted](assets/img/assembly/steps/GF_assembly_63.webp)(1020x1228)
*Erschütterungssensor an der inneren Halterung montiert*

## 6. Haupthalterung mit der Audioplatte verbinden
Verschrauben Sie die Bodenplatte (mit montiertem Audiotreiber) mit der inneren Halterung.
![Bottom Assembly](assets/img/assembly/steps/GF_assembly_42.webp)(1020x1228)
*Bodenplatte und innere Halterung montiert*

## 7. Leiterplatte auf der Haupthalterung montieren
Verbinden Sie den Erschütterungssensor über den 3-poligen JST-Stecker und schließen Sie den Audiotreiber an den Verstärker an. Platzieren Sie die Leiterplatte auf der Haupthalterung – die Durchgangsbohrungen sollten es ermöglichen, dass die Leiterplatte ohne zusätzliche Befestigungselemente einrastet.
![PCB Connecting](assets/img/assembly/steps/GF_assembly_45.webp)(1020x1228)
*Elektronische Komponenten mit der Leiterplatte verbinden*
![PCB Mounted](assets/img/assembly/steps/GF_assembly_46.webp)(1020x1228)
*Leiterplatte an der inneren Halterung montiert*

## 8. Gehäuse montieren
Montieren Sie die vier vertikalen Gehäuseplatten um das Gerät herum und befestigen Sie anschließend die obere Platte mit Schrauben.
![Side Mounting](assets/img/assembly/steps/GF_assembly_49.webp)(1020x1228)
*Befestigen der vertikalen Gehäuseplatten*
![Top Plate Mounting](assets/img/assembly/steps/GF_assembly_54.webp)(1020x1228)
*Montage der oberen Platte*

## 9. Firmware hochladen
Besuchen Sie das [GoalFinder Repository](https://github.com/htl-leo-club-embedded-iot/GoalFinder), um das Projekt zu klonen und die Firmware mit PlatformIO hochzuladen. Führen Sie `pio run -t upload` und `pio run -t uploadfs` im Verzeichnis `client/embedded/` aus.

## 10. Weitere Informationen
Wenn dieser Schritt erreicht wurde, ist die Montage des GoalFinder abgeschlossen. Falls Probleme aufgetreten sind oder Verbesserungsvorschläge bestehen, kontaktieren Sie uns bitte.

#end