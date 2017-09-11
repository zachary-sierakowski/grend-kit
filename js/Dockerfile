FROM node:boron

# Create app directory
WORKDIR /usr/src/app/express

# Copy express directory
ADD express /usr/src/app/express

# Copy app bundle
ADD react/dist /usr/src/app/react/dist

ENV APP_PORT=8080
ENV NODE_ENV=production

EXPOSE 8080

CMD yarn start