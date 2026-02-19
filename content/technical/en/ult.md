## Upload Tool (ULT)

**Always run the upload tool from the root directory**

The upload tool is built to improve workflow when flashing firmware. Default workflow will be run by default:

1. `npm run build`: build and compress the latest web app
2. `pio run -t upload`: upload the firmware
3. `pio run -t uploadfs`: upload the filesystem containing the Web App

### Parameters

- `-f`: Erases flash and cleans `pio`
- `-m`: Monitor after upload

All parameters can be combined

#end