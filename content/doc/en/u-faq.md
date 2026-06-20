# Frequently Asked Questions
## Network and Connectivity

Q: `goalfinder.local` doesn't open anything in my browser. Is there another way to reach the web app?
A: Yes. You can access the web app by entering the device IP address `192.168.4.1` into your browser's address bar. (This only works when the GoalFinder is not connected to an existing network. If it is connected to an existing network, contact your network administrator for assistance.)

Q: I connected the GoalFinder to my home Wi-Fi, but now I can't find it. How do I access it again?
A: Navigate to the connection settings, enable `Use external network`, and enter the network name and password. Find more information about connecting to existing networks ^[here](../content/doc/en/t-webapp-advanced.md)

Q: My school uses 5 GHz WiFi. Why can't the GoalFinder connect?
A: To keep the cost of the device low and maintain accessibility, we use hardware that unfortunately does not support 5 GHz networks. Contact your network administrator for assistance with setting up a 2.4 GHz WiFi network.

Q: The web app says "Disconnected" even though I'm connected to the same Wi-Fi as the device.

Q: My browser shows a "Not Secure" warning when I open the web app. Is this normal?
A: Yes. The GoalFinder device uses the less secure HTTP protocol; however, as an open-source project, we maintain the highest level of security possible. There is no known risk associated with connecting to or using the GoalFinder device or network.

Q: I'm trying to set up an external network connection, but the default gateway and subnet mask look unusual. What values should I use?

## Detection and Gameplay

Q: The GoalFinder keeps registering hits when nobody is near the basket. How do I stop this?
A: Change the detection preset in the detection settings tab to match your basket. If this does not resolve the issue, enable ^[advanced settings](../content/doc/en/t-webapp-advanced.md) and find a hit detection distance that works for your setup.

Q: My shots hit the rim but the GoalFinder doesn't detect them. What adjustments can I make?
A: Change the detection preset in the detection settings tab to match your basket. If this does not resolve the issue, enable ^[advanced settings](../content/doc/en/t-webapp-advanced.md) and find a sensor sensitivity that works for your setup.

Q: The ball goes through the hoop but the device still counts it as a miss. What's wrong?
A: Your hit detection preset may not match your setup. Change the detection preset in the detection settings tab to match your basket. If this does not resolve the issue, enable ^[advanced settings](../content/doc/en/t-webapp-advanced.md) and find a hit detection distance that works for your setup.

Q: Can I use the GoalFinder without ever opening the web app?
A: Yes. Out of the box, the device will work as expected and detect hits and misses. While it will function without configuration, unexpected behavior may occur, which is why we recommend properly configuring the device through the web app.

Q: My game scores were lost after the device lost power. Are they saved anywhere?
A: Unfortunately not. However, we are working on changes that will make saving player names and game results possible.

## Configuration and Settings

Q: I enabled Advanced Settings but still can't find some options I've heard about. Where are they?
A: You can find the complete list of adjustments available with advanced settings enabled ^[here](../content/doc/en/t-webapp-advanced.md)

Q: I tried setting a password for the web app, but it didn't seem to work. Is there a length requirement?
A: Yes. To ensure security, we enforce an industry-standard minimum password length of **8** characters.

Q: I changed a settings value but there was no confirmation it was saved. How do I know it worked?
A: Most settings take effect immediately. Those that do not will either prompt you to restart the device or restart it automatically (if automatic restart was enabled previously in the restart prompt).

Q: Can I rename my GoalFinder to something other than the default name?
A: Yes. You can rename the device in the connection settings tab.

## Updates and Firmware

Q: The downloads page lists `firmware.bin` and `system.gfpkg`. Which file do I actually need?
A: `firmware.bin` files are legacy update packages retained for backwards compatibility. All new versions use the newer "**G**oal**F**inder **P**ac**k**a**g**e" `system.gfpkg` format.

Q: The update succeeded but now the device behaves differently than before. Is that expected?
A: In most cases, yes. With every update, we aim to improve the functionality of the GoalFinder device. Specific differences may result from changes to device settings. Check the release notes, settings tab, or ^[settings documentation](../content/doc/en/u-webapp.md) for more information.

Q: The web app looks completely different from the screenshots in the documentation. Is something wrong?
A: No. Your web app is most likely configured to use a different theme or accent color. If you notice differences in the actual functionality or content of the web app, please ^[report this to us](../content/doc/en/t-bug-report-feature-req.md).

## Security and Privacy

Q: Are my Wi-Fi passwords and credentials protected when I enter them into the web app?
A: Yes. All sensitive data transmitted between the device and web app is encrypted in a way that only the device can decrypt it.

Q: Someone else connected to my GoalFinder and changed my settings. How do I prevent this?
A: Consider ^[setting up a WiFi password](../content/doc/en/u-webapp.md) or, if the device is used on an existing network, a ^[web app password](../content/doc/en/t-webapp-advanced.md).

## Support and Contribution

Q: I want to build the firmware myself, but the `main` branch seems outdated. Where is active development?
A: Active development takes place on the `development` branch. However, using the development version may lead to unexpected behavior.

Q: I found a bug or have an idea. What's the best way to report it?
A: Thank you for your motivation to contribute to our mission. For more information, read our ^[guide on reporting bugs or suggesting features](../content/doc/en/t-bug-report-feature-req.md).

#end