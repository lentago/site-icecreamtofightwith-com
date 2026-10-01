# Dockerfile for the cookbook site
#
# This is a SIMPLE Dockerfile — no multi-stage build needed because
# CI/CD builds the Astro site before Docker runs. We just copy the
# pre-built static files into nginx.
#
# The Astro build happens in the GitHub Action (Node environment).
# Docker's only job: package the output into a serving container.

# nginx 1.31.3 — comment must stay on its own line: '#' mid-line is not a
# comment in a Dockerfile, and an inline tag note makes FROM unparsable.
FROM nginx@sha256:abe47724e466aeab9a345d8e46a221c2fa8953c7848bb4a3bd9976a7199f8cf2

# Copy the nginx config (port 8080, /health endpoint, clean URLs, security headers)
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY nginx-security-headers.conf /etc/nginx/nginx-security-headers.conf

# Copy pre-built static site from Astro
COPY dist/ /usr/share/nginx/html/

EXPOSE 8080
