# Advanced Web App Settings
This guide lists all advanced settings that can be made through the web app.
To enable advanced settings navigate to the system settings and enable `Advanced Settings`.

## Audio
- The volume can be adjusted more precisely within a range of 0 (audio off) to 100 (audio at max. volume).
- The time between metronome ticks can be adjusted in milliseconds. (This will also change the LED mode `Flash` and `Turbo` timing)

## LED
- The LED brightness can be adjusted more precisely within a range of 0 (least bright) to 100 (most bright).

## Sensors
Instead of presets with fixed values the sensitivity (0 - 100), hit detection distance (150 - 350 (mm)) and after hit detection timeout can be adjusted manually

## Connection
- You can set a web app password which can protect access to the web app when the device is not running in access point mode. When enabled the web app will prompt for the set password when the client hasn't been connected yet.
- DNS (only available in access point mode) can be disabled or enabled. The GoalFinder's onboard DNS server resolves both `goalfinder.local` and `<device-name>.local` to the device's IP address.

### Use External Network
When enabled, the device can be connected to an external (already existing) network.
#ih Notice
#ib The GoalFinder device can only be connected to 2.4GHz networks

 1. Enter the SSID (name) of the network
 2. Select the authentication mode of the target network

### WPA/WPA2 Personal
 1. Enter the password of the network.

### WPA/WPA2 Enterprise
 1. Enter a valid enterprise network username
 2. Enter the associated network password
**Advanced Enterprise Network Options (optional)**
 3. Enterprise identity
 4. Enterprise anonymous identity
 5. Enterprise phase 2 method
 6. CA certificate
 7. Client certificate
 8. Client private key

 3. Manual DHCP configuration (optional but recommended): Device IP address, Network default gateway, Network subnet mask and Network DNS server 
 4. Click `Apply network configuration`