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

# Stage 2: Serve with nginx
FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /site/_site /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
