FROM node:lts-alpine as install
WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm install

FROM node:lts-alpine as run
WORKDIR /app
COPY --from=install /app/node_modules node_modules
COPY --from=install /app/socket socket
COPY --from=install /app/package*.json ./
ENV PORT=9000
EXPOSE 9000
CMD ["npm", "run", "start:server"]
