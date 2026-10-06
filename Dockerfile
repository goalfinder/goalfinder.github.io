# Stage 1: Build Jekyll site
FROM ruby:3.2-alpine AS builder

WORKDIR /site

# Build dependencies for native gems
RUN apk add --no-cache build-base

COPY Gemfile Gemfile.lock* ./
RUN bundle install

COPY . .

# baseurl is "" for root deployment (GitHub user pages + nginx at /).
# Override at build time if you need a subpath: docker build --build-arg JEKYLL_BASEURL=/my-path .
ARG JEKYLL_BASEURL=""
RUN bundle exec jekyll build --baseurl "$JEKYLL_BASEURL"

# Stage 2: Serve with nginx + ModSecurity WAF (OWASP Core Rule Set)
# The base image ships ModSecurity v3, the ModSecurity-nginx connector and
# CRS rules, all wired up by its entrypoint (envsubst templates + crs setup).
FROM owasp/modsecurity-crs:4.30.0-nginx-alpine-202610051210

# Start in detection-only mode to rule out false positives first.
# Switch to blocking at run time: -e MODSEC_RULE_ENGINE=on
ENV MODSEC_RULE_ENGINE=DetectionOnly

COPY nginx.conf /etc/nginx/templates/conf.d/default.conf.template
COPY --from=builder /site/_site /usr/share/nginx/html

EXPOSE 8080

# The base image healthcheck targets https on 8443, which we do not serve here.
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD wget -q -O /dev/null "http://127.0.0.1:${PORT:-8080}/healthz" || exit 1
