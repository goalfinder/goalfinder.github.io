## Software Setup
Diese Seite enthält eine Einleitung zum Aufsetzten aller Software für die Software-Seite des GoalFinder Project.

#ih Anmerkung
#ib Alle Installationsanleitungen sind auf Ubuntu basierende Linux Distributionen ausgelegt.

## Website
Folgende Anleitungen sind zum Installieren und Aufsetzten der Software für die Webseite nötig.

## Ruby
**1. Paketliste updaten**: `sudo apt update`
**2. Ruby installieren**: `sudo apt install -y ruby-full build-essential zlib1g-dev`

## Ruby Gem zur Umgebungsvariable hinzufügen (Optional)
#ih Hinweis
#ib `<cli>` mit der jeweiligen Shell wie `bash` oder `zsh` ersetzen.
#ib Die genutzte Shell kann mit `echo "$SHELL"` abgefragt werden. 
**1. Gem Home setzen**: `echo 'export GEM_HOME="$HOME/gems"' >> ~/.<cli>rc`
**2. Gem zur Umgebungsvariable hinzufügen** `echo 'export PATH="$HOME/gems/bin:$PATH"' >> ~/.<cli>rc`
**3. Änderungen übernehmen**: `source ~/.<cli>rc`


## Jekyll
**Jekyll installieren**: `gem install bundler jekyll`

