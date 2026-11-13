# Dockerfile for the cookbook site
#
# This is a SIMPLE Dockerfile — no multi-stage build needed because
# CI/CD builds the Astro site before Docker runs. We just copy the
# pre-built static files into nginx.
#
# The Astro build happens in the GitHub Action (Node environment).
# Docker's only job: package the output into a serving container.

# nginx 1.31.8 — comment must stay on its own line: '#' mid-line is not a
# comment in a Dockerfile, and an inline tag note makes FROM unparsable.
FROM nginx@sha256:165ddde8751e75a1c907d24ef10d9f6deb08b57e0fe56caf67512486aff76d82

# Copy the nginx config (port 8080, /health endpoint, clean URLs, security headers)
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY nginx-security-headers.conf /etc/nginx/nginx-security-headers.conf

# Copy pre-built static site from Astro
COPY dist/ /usr/share/nginx/html/

EXPOSE 8080
