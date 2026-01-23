## Software Setup
This page contains instructions to install all software for the software of the GoalFinder project.

## Windows
Installation instruction for Windows (primary for Windows 10 and 11)

### CP210x Driver
1. Download the [CP210x Universal Device Driver](https://www.silabs.com/documents/public/software/CP210x_Universal_Windows_Driver.zip)
2. Unzip and open the folder
3. Right click on `silabser.inf` and select `Install`
4. Follow the instructions on screen

### Python and esptool
1. Download the [Python Installer](https://www.python.org/ftp/python/pymanager/python-manager-25.2.msix)
2. Open the installer and follow the instructions on screen
3. Open a **command prompt** and install esptool using `pip install esptool`

### Ruby and Jekyll
1. Download [Ruby](https://github.com/oneclick/rubyinstaller2/releases/download/RubyInstaller-3.4.8-1/rubyinstaller-devkit-3.4.8-1-x64.exe)
2. Open the installer and select the `MSYS2 development toolchain` during the installation
3. Run the following commands in a **PowerShell**:
```
[System.Environment]::SetEnvironmentVariable(
  "GEM_HOME",
  "$env:USERPROFILE\gems",
  "User"
)
```
```
$oldPath = [System.Environment]::GetEnvironmentVariable("PATH", "User")
$newPath = "$env:USERPROFILE\gems\bin;$oldPath"

[System.Environment]::SetEnvironmentVariable(
  "PATH",
  $newPath,
  "User"
)
```
4. Install Jekyll using `gem install bundler jekyll`

## Linux
Installation instruction for Debian based Linux operation systems

## Python and esptool
1. Update package list using `sudo apt update`
2. Install python using `sudo apt install -y python3 python3-pip`
3. Install esptool using `pip3 install --user esptool`

### Ruby and Jekyll

#ih Notice
#ib Replace `&ltcli>` with the current shell like `bash` or `zsh`
#ib The current shell can be determined using `echo "$SHELL"` 

1. Update package list using `sudo apt update`
2. Install ruby using `sudo apt install -y ruby-full build-essential zlib1g-dev`
3. Set gem home using `echo 'export GEM_HOME="$HOME/gems"' >> ~/.<cli>rc`
4. Add gem to the `PATH` environmental variable `echo 'export PATH="$HOME/gems/bin:$PATH"' >> ~/.<cli>rc`
5. Apply changes using `source ~/.<cli>rc`
6. Install Jekyll using `gem install bundler jekyll`

#end
