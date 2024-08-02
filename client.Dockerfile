# build
FROM node:lts-alpine as build
WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm install
RUN npm run build

# serve
FROM nginx:stable-alpine as serve
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]%

