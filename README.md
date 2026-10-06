# GoalFinder

This repository is used for deploying the [GoalFinder website](https://goalfinder.github.io).

Visit the project repository [here](https://github.com/htl-leo-club-embedded-iot/GoalFinder).

## Documentation

Visit the [technical documentation](https://goalfinder.github.io/technical) for more information

## Branches

`deploy`: The GitHub pages deployment branch
`main`: The development branch

with each deployment a pull request is opened to merge the changes from `main` → `deploy`

## Running the site with Docker

The image builds the Jekyll site and serves it with nginx behind a WAF (ModSecurity v3 with the OWASP Core Rule Set).

Build:

```sh
docker build -t goalfinder-website .
```

Run (the container listens on port 8080 internally):

```sh
docker run --rm -p 8080:8080 goalfinder-website
```

The WAF starts in **detection-only mode**: attacks such as SQL injection or XSS are logged but not blocked. After checking the logs for false positives, switch to blocking mode:

```sh
docker run --rm -p 8080:8080 -e MODSEC_RULE_ENGINE=on goalfinder-website
```
