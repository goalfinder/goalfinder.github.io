# Deploying GitHub Pages
GitHub Deployment is set up to use the `deploy` branch. This means that no commit on the `main` default branch will trigger a deployment right away.

## Pull Request
Once you open a pull request with base:`deploy` ← compare:`main`, name it using the following scheme: `Deploy at dd.mm.yyyy hh:mm` where the first 3 placeholders are for the date using the European format and then the time und `hh:mm`.
You may add one or more reviewers to the pull request if unsure about the changes made.

#end