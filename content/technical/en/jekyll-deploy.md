# Local Build & Deploy
The GoalFinder website uses Jekyll to clean up urls. This page contains a description on how to build and deploy jekyll locally.
Local testing is made possible by Node.js, Bundle and the `serve-local.js` script.

## Node.js
Simply run `npm run dev` for local testing with live updates.

## Bundle
**1. Build**: `bundle exec jekyll build`
**2. Deploy**: `bundle exec jekyll serve --host localhost --livereload --watch`

## Local Serve Script
```
node serve-local.js
pkill -f "node serve-local.js" && sleep 1 && cd ~/Desktop/Coding/Goalfinder/Website/goalfinder.github.io && node serve-local.js &
```

#end