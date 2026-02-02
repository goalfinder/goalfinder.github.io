# GoalFinder

This repository is used for deploying the [GoalFinder website](https://goalfinder.github.io).

Visit the project repository [here](https://github.com/htl-leo-club-embedded-iot/GoalFinder).

## Branches

`deploy`: The GitHub pages deployment branch
`main`: The development branch

with each deployment a pull request is opened to merge the changes from `main` → `deploy`

## Local Development

To run the website locally without affecting GitHub Pages deployment:

```bash
# Using Node.js
node serve-local.js

pkill -f "node serve-local.js" && sleep 1 && cd ~/Desktop/Coding/Goalfinder/Website/goalfinder.github.io && node serve-local.js &

# Using Python
python3 -m http.server 8000
# Note: Python server won't process Jekyll variables, so some paths may not work

Visit the server at localhost:8000
```


The `serve-local.js` server automatically processes Jekyll template variables (`{{ site.baseurl }}`) for local development while keeping your GitHub Pages configuration intact.
