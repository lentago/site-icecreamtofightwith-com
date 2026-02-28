FROM nginx:latest
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
