# PCB Assembly
## 1. Assemble the PCB
Follow the provided schematics and sources to assemble the PCB. The ToF sensor and amplifier should be mounted directly onto the PCB.
![Schematic](assets/img/assembly/doc/schematic.png)
*PCB schematic*
![PCB from above](assets/img/assembly/steps/high_res/GF_assembly_01.jpg)(1020x1228)
![PCB from below](assets/img/assembly/steps/high_res/GF_assembly_02.jpg)(1020x1228)
*Expected result after assembling the PCB* 

![PCB Top Rendering](assets/img/render/top.png)(900)
*Top side of the PCB*
![PCB Main Rendering](assets/img/render/main.png)(900)
*Overall view*

#wh Caution regarding the USB socket
#wb If hardwiring, mount the socket in the housing before soldering it to the PCB, as it can no longer be inserted through the opening afterwards.

### Recommendation: Solder low components first
We recommend soldering the low-profile components onto the PCB first before mounting larger components. This makes soldering easier and ensures a clean assembly.

### Soldering the VL53L0X Breakout Board
Solder the VL53L0X breakout board onto the straight pins of the right-angle header, so that the bent pins are on the side opposite the sensor (back side). Insert the bent pins through the main PCB and solder one pin first. Position the breakout board as perpendicular as possible to the main PCB and parallel to the front edge of the PCB. Then solder the remaining pins.

#ih Note
#ib We recommend cutting of the top layer of the Micro USB breakout to avoid breaking the Microcontrollers port

## 2. Prepare the Microcontroller
Solder the pin headers onto the ESP32 microcontroller. You may solder only the required pins (see the [KiCad Project](https://github.com/htl-leo-club-embedded-iot/GoalFinder/tree/main/blueprint/pcb/1.5) for details). Place the microcontroller onto the PCB as indicated by the PCB markings.
![Microcontroller on PCB](assets/img/assembly/steps/high_res/GF_assembly_30.jpg)(1020x1228)
*Microcontroller assembled and connected to the PCB*

#end