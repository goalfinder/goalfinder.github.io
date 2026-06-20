# Advanced Web App Settings
This guide lists all advanced settings available through the web app.
To enable advanced settings, navigate to the system settings and enable `Advanced Settings`.

## Audio
- The volume can be adjusted more precisely within a range of 0 (audio disabled) to 100 (maximum volume).
- The time between metronome ticks can be adjusted in milliseconds. (This will also affect the timing of the `Flash` and `Turbo` LED modes.)

## LED
- The LED brightness can be adjusted more precisely within a range of 0 (lowest brightness) to 100 (highest brightness).

## Sensors
Instead of using presets with fixed values, the sensitivity (0 - 100), hit detection distance (150 - 350 (mm)), and post-hit detection timeout can be adjusted manually.

## Connection
- You can set a web app password to protect access to the web app when the device is not running in access point mode. When enabled, the web app will prompt for the configured password if the client has not connected previously.
- DNS (available only in access point mode) can be enabled or disabled. The GoalFinder's onboard DNS server resolves both `goalfinder.local` and `<device-name>.local` to the device's IP address.

### Use External Network
When enabled, the device can connect to an external (already existing) network.
#ih Notice
#ib The GoalFinder device can only connect to 2.4GHz networks

 1. Enter the SSID (name) of the network.
 2. Select the authentication mode of the target network.

### WPA/WPA2 Personal
 1. Enter the network password.

### WPA/WPA2 Enterprise
 1. Enter a valid enterprise network username.
 2. Enter the associated network password.
**Advanced Enterprise Network Options (optional)**
 3. Enterprise identity
 4. Enterprise anonymous identity
 5. Enterprise phase 2 method
 6. CA certificate
 7. Client certificate
 8. Client private key

 3. Manual DHCP configuration (optional but recommended): Device IP address, network default gateway, network subnet mask, and network DNS server.
 4. Click `Apply network configuration`.

#+h AP Fallback
#+b If connecting to the external network fails for any reason, the device will automatically fall back to access point mode.

#end