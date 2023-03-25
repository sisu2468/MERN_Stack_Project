FROM nginx:1.22.1-alpine

COPY web.conf /etc/nginx/conf.d/default.conf

# COPY ./web.conf /web.conf

# CMD ["/bin/sh" , "-c" , "envsubst < web.conf > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"]