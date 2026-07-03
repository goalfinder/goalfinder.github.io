# Parts
This page provides a complete list of all components required for assembling the GoalFinder device.

#wh Notice
#wb The exact dimensions and specifications of the basic assembly parts are currently under review and will be updated once finalized.

## Basic Assembly Parts
- Screws
- Nuts
- Flat Washers
- Threaded Inserts

## Electronic Components
### Breakout Boards
**ESP32 D1 Mini**
Main controller for the GoalFinder device.
![ESP Microcontroller](assets/img/assembly/steps/GF_assembly_24.webp)(510x614)
[Product Link](https://www.amazon.de/-/en/AZDelivery-Bluetooth-Development-Connection-Compatible/dp/B0DHY5C3Q3/ref=sr_1_6)
[Documentation](https://cdn.shopify.com/s/files/1/1509/1638/files/D1_Mini_ESP32_Datenblatt_AZ-Delivery_Vertriebs_GmbH.pdf)

**SW420**
Shake sensor used for shot detection.
![SW420](assets/img/assembly/steps/GF_assembly_08.webp)(510x614)
[Product Link](https://www.amazon.de/-/en/AZDelivery-Vibration-Shaker-Compatible-Arduino/dp/B07D92XBMS/ref=sr_1_2)
[Documentation](https://cdn.shopify.com/s/files/1/1509/1638/files/SW420_Vibration_Schuttel_Erschutterung_Sensor_Modul_Datenblatt_AZ-Delivery_Vertriebs_GmbH.pdf)

**VL53L0X**
Time-of-Flight (ToF) sensor used for hit detection.
[Product Link](https://www.amazon.de/-/en/AZDelivery-VL53L0X-Flight-Ranging-Sensor/dp/B086V37JJ7/ref=sr_1_4)
[Documentation](https://cdn.shopify.com/s/files/1/1509/1638/files/VL53L0X_Time_of_Flight_Sensor_Datenblatt_AZ-Delivery_Vertriebs_GmbH.pdf)

**MAX98357A**
Amplifier used to drive the audio speaker.
[Product Link](https://www.amazon.de/-/en/MAX98357A-Amplifier-Filterless-Breakout-Application/dp/B0F21T7Q3P/ref=sr_1_4)
[Documentation](https://www.analog.com/media/en/technical-documentation/data-sheets/max98357a-max98357b.pdf)

**Audio Driver**
Speaker used for acoustic feedback.
![Audio Driver](assets/img/assembly/steps/GF_assembly_28.webp)(510x614)
[Product Link](https://www.amazon.de/-/en/HUAREW-JST-PH2-0-Interface-Motherboard-Electronic/dp/B0CRNZYW1R/ref=sr_1_6)

### Other Electronic Parts
**USB-C Breakout**
Breakout board used for the external USB-C connection on the side panel.
![USB-C Breakout](assets/img/assembly/steps/GF_assembly_06.webp)(510x614)

**LED Strip**
LED strip used for visual feedback.

**XYQ JST Connectors**
Connectors used for the connection between the device and the LED strip.
![XYQ JST Connector](assets/img/assembly/steps/GF_assembly_07.webp)(510x614)
[Product Link](https://www.amazon.com/Pairs-Female-Connector-22AWG-Battery/dp/B01HHY9ZKW)

**Micro USB Breakout**
Connects the PCB to the microcontroller via USB.
![Micro USB Breakout](assets/img/assembly/steps/GF_assembly_29.webp)(510x614)

## PCB Components
Below is a list of all parts required for PCB assembly:
- 1x 22µF Capacitor
- 1x 4.7µF Capacitor
- 6x 100nF SMD Capacitor
- 2x 100k SMD Resistor
- 1x 1k SMD Resistor
- 1x 35k SMD Resistor
- 1x IRLML2502 SMD MOSFET

- 3x 2-pin Female JST Connector
- 1x 2-pin Male JST Connector
- 1x 3-pin Female JST Connector
- 30x 2.54mm Pin Header (longest: 10 pins)

### Downloads
/[Download Gerber Files](content/downloads/gf-1.5-pcb.zip)

## Housing
#ih Downloads
#ib All `.obj` file dimensions are specified in millimeters (mm).

/[Download the archive containing all files](/content/doc/download/gf-1.10-housing.zip)

### Inner Mounts
The inner mounts consist of three brackets designed to hold the PCB, sensors, and accessories. They ensure secure placement and straightforward installation of all internal components.

- /[Main Bracket](/content/doc/download/goalfinder-1.10-bracket-inner.obj)
- /[Top Left Bracket](/content/doc/download/goalfinder-1.10-bracket-top-left.obj)
- /[Top Right Bracket](/content/doc/download/goalfinder-1.10-bracket-top-right.obj)

![Main Bracket](assets/img/assembly/steps/GF_assembly_10.webp)(510x614)
*Main bracket for the PCB and sensors*
![Top Brackets](assets/img/assembly/steps/GF_assembly_12.webp)(510x614)
*Top left and top right brackets*

## Outer Housing
![Housing Showcase](assets/img/assembly/steps/GF_assembly_14.webp)(510x614)
*Outer housing made of plexiglass*

The outer housing consists of six plates. Two of these plates can be replaced with mounting variants, depending on the intended installation method. The examples shown are cut from plexiglass, but the parts can also be easily 3D printed.

- /[Bottom](/content/doc/download/goalfinder-1.10-housing-bottom.obj)
- /[Back](/content/doc/download/goalfinder-1.10-housing-back.obj)
- /[Left](/content/doc/download/goalfinder-1.10-housing-left.obj)
- /[Right](/content/doc/download/goalfinder-1.10-housing-right.obj)
- /[Top](/content/doc/download/goalfinder-1.10-housing-top.obj) or as a mounting variant /[Top with Mount](/content/doc/download/goalfinder-1.10-housing-top-mount.obj)
- /[Front](/content/doc/download/goalfinder-1.10-housing-front.obj) or as a mounting variant /[Front with Mount](/content/doc/download/goalfinder-1.10-housing-front-mount.obj)

### Mounting vs. Standard Plates
![Back Mounting](assets/img/design/back-plate.webp)(672x346)
*Example: Mounting on the back plate*
![Top Mounting](assets/img/design/top-plate.webp)(672x346)
*Example: Mounting on the top plate*

#end