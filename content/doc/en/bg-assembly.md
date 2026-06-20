# Assembly
## 1. Assemble the PCB
Follow the provided schematics and sources to assemble the PCB. The ToF sensor and amplifier should be mounted directly onto the PCB.
![Schematic](assets/img/assembly/doc/schematic.png)
*PCB schematic*
![PCB from above](assets/img/assembly/steps/high_res/GF_assembly_01.jpg)(1020x1228)
![PCB from below](assets/img/assembly/steps/high_res/GF_assembly_02.jpg)(1020x1228)
*Expected result after assembling the PCB* 
#ih Note
#ib We recommend cutting of the top layer of the Micro USB breakout to avoid breaking the Microcontrollers port

## 2. Prepare the Microcontroller
Solder the pin headers onto the ESP32 microcontroller. You may solder only the required pins (see the [KiCad Project](https://github.com/htl-leo-club-embedded-iot/GoalFinder/tree/main/blueprint/pcb/1.5) for details). Place the microcontroller onto the PCB as indicated by the PCB markings.
![Microcontroller on PCB](assets/img/assembly/steps/high_res/GF_assembly_30.jpg)(1020x1228)
*Microcontroller assembled and connected to the PCB*

## 3. Mount the Audio Driver
Attach the audio driver to the bottom housing plate using four screws and flat washers.
![Audio Driver Mounted](assets/img/assembly/steps/high_res/GF_assembly_34.jpg)(1020x1228)
*Audio driver mounted to the bottom housing plate*

## 4. Insert Threaded Inserts
Use a soldering iron to melt the plastic and place the threaded inserts into the main bracket. This helps secure the inserts in place.
![Adding Threaded Inserts](assets/img/assembly/steps/high_res/GF_assembly_35.jpg)(1020x1228)
*Threaded inserts added to the main bracket*

## 5. Mount the Shake Sensor
Clip the SW420 shake sensor into the inner bracket. It should fit securely into place.
![Shake Sensor Mounted](assets/img/assembly/steps/high_res/GF_assembly_63.jpg)(1020x1228)
*Shake sensor mounted on the inner bracket*

## 6. Connect Main Bracket with Audio Plate
Screw the bottom plate (with the audio driver) to the inner bracket.
![Bottom Assembly](assets/img/assembly/steps/high_res/GF_assembly_42.jpg)(1020x1228)
*Bottom plate and inner bracket assembled*

## 7. Mount the PCB on the Main Bracket
Connect the shake sensor using the 3-pin JST connector and connect the audio driver to the amplifier. Place the PCB onto the main bracket—the through holes should allow the PCB to snap into place without additional fasteners.
![PCB Connecting](assets/img/assembly/steps/high_res/GF_assembly_45.jpg)(1020x1228)
*Connecting electronic components to the PCB*
![PCB Mounted](assets/img/assembly/steps/high_res/GF_assembly_46.jpg)(1020x1228)
*PCB mounted to the inner bracket*

## 8. Assemble the Housing
Mount the four vertical housing plates around the device, then secure the top plate in place using screws.
![Side Mounting](assets/img/assembly/steps/high_res/GF_assembly_49.jpg)(1020x1228)
*Attaching the vertical housing plates*
![Top Plate Mounting](assets/img/assembly/steps/high_res/GF_assembly_54.jpg)(1020x1228)
*Mounting the top plate*

## 9. Upload the Firmware
Visit the [GoalFinder Repository](https://github.com/htl-leo-club-embedded-iot/GoalFinder) to clone the project and upload the firmware using PlatformIO. Run `pio run -t upload` and `pio run -t uploadfs` from the `client/embedded/` directory.

## 10. Further Information
If you've reached this step, your GoalFinder assembly is complete. If you encountered any issues or have suggestions for improvement, please reach out to us. 

#end