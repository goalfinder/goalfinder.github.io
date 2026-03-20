# Parts
This page provides a comprehensive overview of all components required for the complete assembly of the GoalFinder device.
#wh Notice
#wb The precise dimensions and specifications of the basic parts are still under review and will be updated once available.

## Basic Assembly Parts
### Chassis Material
We recommend 3D-printing the device housing and inner mounts using solid, rigid filaments like `PLA`, `PETG` or `ABS`   
 - [PLA 3D printing material](https://www.amazon.de/-/en/Creality-Official-Filament-Printing-Dimensional/dp/B0BYSP6QBH/ref=sr_1_17) in a color of choice
 - Optionally [Acrylic Glass](https://www.amazon.de/gp/product?1=Submit&ASIN=B0FJWZT2VW&twisterDimKeys=size_name%2Cnumber_of_items&twisterNonJs=1&th=1) for the Housing

## Housing
#ih Downloads
#ib All `.obj` file measurements are in millimeters (mm).

/[Download the archive containing all files](/content/build-guide/download/gf-1.10-housing.zip)
### Inner Mounts
The inner mounts consist of three brackets designed for the PCB, sensors, and accessories. These ensure secure placement and easy installation of all internal components.

- /[Main Bracket](/content/build-guide/download/goalfinder-1.10-bracket-inner.obj)
- /[Top Left Bracket](/content/build-guide/download/goalfinder-1.10-bracket-top-left.obj)
- /[Top Right Bracket](/content/build-guide/download/goalfinder-1.10-bracket-top-right.obj)

![Main Bracket](assets/img/assembly/steps/low_res/GF_assembly_10.jpg)(510x614)
*Main Bracket for PCB and sensors*
![Top Brackets](assets/img/assembly/steps/low_res/GF_assembly_12.jpg)(510x614)
*Top Left and Top Right Brackets*

### Outer Housing
![Outer Housing](assets/img/assembly/steps/high_res/GF_assembly_14.jpg)(482x226)
*Outer housing*
![Housing Top](assets/img/assembly/steps/low_res/GF_assembly_19.jpg)(510x614)
*Top side housing plate*
![Housing Bottom](assets/img/assembly/steps/low_res/GF_assembly_22.jpg)(510x614)
*Bottom side housing plate*

The outer housing is made up of six plates. Two of these plates can be replaced with mounting variants, depending on your installation needs. The plates shown are cut from plexiglas, but they can also be easily 3D printed.

- /[Bottom](/content/build-guide/download/goalfinder-1.10-housing-bottom.obj)
- /[Back](/content/build-guide/download/goalfinder-1.10-housing-back.obj)
- /[Left](/content/build-guide/download/goalfinder-1.10-housing-left.obj)
- /[Right](/content/build-guide/download/goalfinder-1.10-housing-right.obj)
- /[Top](/content/build-guide/download/goalfinder-1.10-housing-top.obj) or as mounting variant /[Top with Mount](/content/build-guide/download/goalfinder-1.10-housing-top-mount.obj)
- /[Front](/content/build-guide/download/goalfinder-1.10-housing-front.obj) or as mounting variant /[Front with Mount](/content/build-guide/download/goalfinder-1.10-housing-front-mount.obj)

#### Mounting vs. Standard Plates
![Back Mounting](assets/img/design/mouting/back-plate.png)(672x346)
*Example: Mounting on the back plate*
![Top Mounting](assets/img/design/mouting/top-plate.png)(672x346)
*Example: Mounting on the top plate*


## Electronic Components
This page lists all electronic components required for assembling the GoalFinder device.

### Breakout Boards
#### ESP32 D1 Mini
Main controller for the GoalFinder device.
![ESP Microcontroller](assets/img/assembly/steps/high_res/GF_assembly_24.jpg)(510x614)
[Product Link](https://www.amazon.de/-/en/AZDelivery-Bluetooth-Development-Connection-Compatible/dp/B0DHY5C3Q3/ref=sr_1_6)
[Documentation](https://cdn.shopify.com/s/files/1/1509/1638/files/D1_Mini_ESP32_Datenblatt_AZ-Delivery_Vertriebs_GmbH.pdf)

#### SW420
Shake sensor for shot detection.
![SW420](assets/img/assembly/steps/high_res/GF_assembly_08.jpg)(510x614)
[Product Link](https://www.amazon.de/-/en/AZDelivery-Vibration-Shaker-Compatible-Arduino/dp/B07D92XBMS/ref=sr_1_2)
[Documentation](https://cdn.shopify.com/s/files/1/1509/1638/files/SW420_Vibration_Schuttel_Erschutterung_Sensor_Modul_Datenblatt_AZ-Delivery_Vertriebs_GmbH.pdf)

#### VL53L0X
Time-of-Flight (ToF) sensor for hit detection.
[Product Link](https://www.amazon.de/-/en/AZDelivery-VL53L0X-Flight-Ranging-Sensor/dp/B086V37JJ7/ref=sr_1_4)
[Documentation](https://cdn.shopify.com/s/files/1/1509/1638/files/VL53L0X_Time_of_Flight_Sensor_Datenblatt_AZ-Delivery_Vertriebs_GmbH.pdf)

#### MAX98357A
Amplifier for connecting to the audio driver.
[Product Link](https://www.amazon.de/-/en/MAX98357A-Amplifier-Filterless-Breakout-Application/dp/B0F21T7Q3P/ref=sr_1_4)
[Documentation](https://www.analog.com/media/en/technical-documentation/data-sheets/max98357a-max98357b.pdf)

#### Audio Driver
Speaker for acoustic feedback.
![Audio Driver](assets/img/assembly/steps/high_res/GF_assembly_28.jpg)(510x614)
[Product Link](https://www.amazon.de/-/en/HUAREW-JST-PH2-0-Interface-Motherboard-Electronic/dp/B0CRNZYW1R/ref=sr_1_6)

### Other Parts
#### USB-C Breakout
Breakout board for external USB-C connection on the side panel.
![USB-C Breakout](assets/img/assembly/steps/high_res/GF_assembly_06.jpg)(510x614)

#### LED Strip
LED strip for visual feedback.

#### XYQ JST Connectors
Connectors for device-to-LED strip connection.
![XYQ JST Connector](assets/img/assembly/steps/high_res/GF_assembly_07.jpg)(510x614)
[Product Link](https://www.amazon.com/Pairs-Female-Connector-22AWG-Battery/dp/B01HHY9ZKW)

#### Micro USB Breakout
Connects the PCB to the microcontroller via USB.
![Micro USB Breakout](assets/img/assembly/steps/high_res/GF_assembly_29.jpg)(510x614)

## Printed Circuit Board
The printed circuit board (PCB) connects the main microcontroller to all electronic components in the system.

### Required Components
Below is a list of all utility parts needed for assembly:

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
/[Download Gerber Files](content/build-guide/download/gf-1.5-pcb.zip)

#end