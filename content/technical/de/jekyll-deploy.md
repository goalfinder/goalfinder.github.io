# Lokaler Build & Deployment
Die GoalFinder-Website verwendet Jekyll, um saubere URLs zu erzeugen. Diese Seite beschreibt, wie man Jekyll lokal baut und bereitstellt.
Lokales Testen ist mit Node.js, Bundle und dem Skript `serve-local.js` möglich.

## Node.js
Der Befehl `npm run dev` ermöglicht das lokale Testen.

## Bundle
**1. Bauen**: `bundle exec jekyll build`
**2. Bereitstellen**: `bundle exec jekyll serve --host localhost --livereload --watch`

## Lokales Serve-Skript
```
node serve-local.js
pkill -f "node serve-local.js" && sleep 1 && cd ~/Desktop/Coding/Goalfinder/Website/goalfinder.github.io && node serve-local.js &
```

#end