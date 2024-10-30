# Build in a different image to keep the target image clean
FROM node:20-alpine as build
WORKDIR /usr/src/app
COPY ./package.json ./yarn.lock ./
RUN yarn
COPY ./ ./
RUN yarn build

# The target image that will be run
FROM nginx:alpine as target
WORKDIR /usr/src/app
COPY ./docker/nginx.conf /etc/nginx/nginx.conf
COPY --from=build --chown=nginx /usr/src/app/dist/ /usr/src/app