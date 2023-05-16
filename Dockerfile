FROM node:18.12.1-alpine as build
ARG app=/opt/project
WORKDIR $app
RUN mkdir -p $app/node_modules
COPY package*.json ./
COPY .env.vault ./
RUN npm install
COPY --chown=node:node . .
RUN ["npm", "run", "build"]

FROM node:18.12.1-alpine as prod
ARG app=/opt/project
WORKDIR $app
RUN mkdir -p $app/node_modules
COPY --chown=node:node --from=build $app/dist $app/dist
COPY package*.json ./
COPY .env.vault ./
RUN npm ci && chown -R node:node $app
USER node
CMD ["npm", "run", "prod"]
