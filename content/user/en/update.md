# Updates
This page explains how to update the GoalFinder device in clear, step-by-step instructions.

#ih Update Compatibility
#ib Starting with version `v0.4.0a`, the firmware and Web App are combined into a single `system.gfpkg` file.
#ib Uploading pre-`v0.4.0a` `firmware.bin` files is still supported but strongly discouraged, as it will lock the Web App to that uploaded version without the ability to update it.

## Download the Update
Download the recommended software from the [GoalFinder Downloads Page](https://goalfinder.github.io/download).
Select the recommended version and the page will download a `system.gfpkg` file containing the complete software package for your device.

## Apply the Update
#wh Important Warning
#wb Updating the device incorrectly may cause permanent damage.
#wb During the upload process, do not unplug, power off, or interact with the GoalFinder device in any way.
1. Open the GoalFinder Web App and navigate to **Settings** > **System**
2. Click `Upload Firmware` in the **Software Update** section and select the downloaded file
3. The device will automatically begin installing the update
4. A progress modal will display the update status and confirm completion

## Other Releases
Certain alpha and beta releases may not be found on the official [GoalFinder Downloads Page](https://goalfinder.github.io/download) but can still be obtained through [GoalFinder GitHub Releases](https://github.com/htl-leo-club-embedded-iot/GoalFinder/releases)

#end