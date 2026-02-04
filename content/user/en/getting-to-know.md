# Getting to Know the GoalFinder
## Interfaces
![Port Showcase](assets/img/showcase/P1440915-N.JPG)(400x400)
In addition to wireless communication via WiFi, the GoalFinder has an external USB-C connector for power supply and data transfer, as well as a connector for the LED strip (2).

## Connecting
As soon as the GoalFinder is connected, it automatically opens a WiFi network named `GoalFinder`.
Help with connecting to WiFi networks: [Android Guide](https://support.google.com/android/answer/9075847?hl=en), [iOS Guide](https://support.apple.com/en-us/111107)
The web app can be accessed either [here](http://192.168.4.1) or by opening the IP address `192.168.4.1` in a web browser.
The complete guide to the web app can be found ^[here](content/user/en/webapp.md).

## Functionality
The GoalFinder has 2 sensors used for game detection.
![Shake Sensor](assets/img/assembly/P1440892-N.JPG)(623x450)
Shake Sensor (1)
![Distance Sensor](assets/img/showcase/P1440908-N.JPG)(403x450)
Distance Sensor (2)

#ih Note
#ib Due to technical limitations, the GoalFinder cannot detect shots that do not touch the board. For this reason, there is the possibility to mark a miss in the web app.

The following steps are performed to evaluate a shot:

1. The shake sensor (1) constantly performs measurements to detect vibrations.
2. As soon as a vibration is detected, a 5-second window opens in which a successful hit is recognized.
3. If the distance sensor (2) detects a hit through the ring, it is counted as a hit. If the time runs out, it is counted as a miss.

#end