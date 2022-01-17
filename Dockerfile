FROM node:alpine as base
COPY . /app
WORKDIR /app


FROM base as test
RUN npm ci
COPY . .

RUN apk add --no-cache chromium nodejs 
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
   PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
RUN npm install puppeteer
CMD node tests\Datasets.test.js