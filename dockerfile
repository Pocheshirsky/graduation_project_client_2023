# этап сборки (build stage)
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# этап production (production-stage)
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# Нужно внедрять в /etc/nginx/conf.d/default.conf
# location / {
#         root   /usr/share/nginx/html;
#         index  index.html index.htm;
#         try_files $uri $uri/ /index.html;
#     }