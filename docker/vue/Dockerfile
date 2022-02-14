FROM node:alpine3.14

ENV PS1="\033[0;31m\e[1m\u\e[0m\033[0m@\[\e[32m\]\w\[\e[0m\]: "
ENV NODE_OPTIONS=--openssl-legacy-provider

RUN apk add --no-cache --virtual .temp-install shadow \
    && usermod -l rick -c "Rick Sanchez" node \
    && npm install -g npm @vue/cli \
    && apk del --no-network .temp-install \
    && mkdir -p /var/www/frontend

USER rick

WORKDIR /var/www/frontend

CMD [ "sh" ]