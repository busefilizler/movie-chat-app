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
ENV PORT=8000
EXPOSE 8000
CMD ["npm", "run", "start:server"]
