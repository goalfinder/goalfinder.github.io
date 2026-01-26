## Software Aufsetzen
Diese Seite enthält eine Einleitung zum Aufsetzten aller Software für die Software-Seite des GoalFinder Project.

## Windows
Installationsanleitungen für Windows (primär für Windows 10 und 11)

### CP210x Driver
1. [CP210x Universal Windows Geräte-Driver](https://www.silabs.com/documents/public/software/CP210x_Universal_Windows_Driver.zip) herunterladen.
2. Entpacken und öffnen Sie den Ordner
3. Mit der rechten Maustaste auf die Datei `silabser.inf` und `Installieren` wählen aus.
4. Den Anweisungen der Anwendung folgen.

### Python und esptool
1. [Python Installer](https://www.python.org/ftp/python/pymanager/python-manager-25.2.msix) herunterladen.
2. Installer ausführen und den Anweisungen folgen.
3. **Eingabeaufforderung** öffnen und `pip install esptool` ausführen um esptool zu installieren.

### Ruby und Jekyll
1. [Ruby](https://github.com/oneclick/rubyinstaller2/releases/download/RubyInstaller-3.4.8-1/rubyinstaller-devkit-3.4.8-1-x64.exe) herunter.
2. Installer ausführen und `MSYS2 development toolchain` während der Installation auswählen. 
3. Folgende Befehle in der **PowerShell** zum Aufsetzen von Ruby ausführen:
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
4. Abschließend noch Jekyll mit `gem install bundler jekyll` installieren.

## Linux
Installationsanleitungen für Debian basierende Linux Betriebssysteme

## Python und esptool
1. Paketliste mit `sudo apt update` abfragen.
2. Python mit `sudo apt install -y python3 python3-pip` installieren.
3. Esptool mit `pip3 install --user esptool` installieren.

### Ruby und Jekyll

#ih Hinweis
#ib `&ltcli>` mit der jeweiligen Shell wie `bash` oder `zsh` ersetzen.
#ib Die genutzte Shell kann mit `echo "$SHELL"` abgefragt werden. 

1. Paketliste mit `sudo apt update` abfragen.
2. Ruby mit `sudo apt install -y ruby-full build-essential zlib1g-dev` installieren.
3. Gem Home mit `echo 'export GEM_HOME="$HOME/gems"' >> ~/.<cli>rc` setzen.
4. Gem zur Umgebungsvariable mit `echo 'export PATH="$HOME/gems/bin:$PATH"' >> ~/.<cli>rc` hinzufügen.
5. Änderungen mit `source ~/.<cli>rc` übernehmen.
6. Jekyll mit `gem install bundler jekyll` installieren.

#end
