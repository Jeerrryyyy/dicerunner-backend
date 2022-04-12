# BUILD
FROM node:16-alpine as node-builder
ENV NODE_ENV build

USER node
WORKDIR /home/node

COPY package*.json ./
RUN npm ci

COPY --chown=node:node . .
RUN npm run build && npm prune --production

# PROD RUN
FROM node:16-alpine
ENV NODE_ENV production

USER node
WORKDIR /home/node

COPY --from=node-builder --chown=node:node /home/node/package*.json ./
COPY --from=node-builder --chown=node:node /home/node/node_modules/ ./node_modules/
COPY --from=node-builder --chown=node:node /home/node/dist/ ./dist/

EXPOSE 8080

CMD ["node", "dist/main.js"]