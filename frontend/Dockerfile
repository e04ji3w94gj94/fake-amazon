FROM node:alpine as frontend

WORKDIR /app

COPY package.json .
RUN npm install

COPY . .

RUN npm run build

FROM nginx 
EXPOSE 3000
COPY --from=frontend /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/default.conf /etc/nginx/conf.d