FROM node:alpine


WORKDIR /app/frontend

COPY frontend/package*.json ./

RUN npm install

COPY frontend/ .

EXPOSE 8080

CMD ["npm", "run", "serve"]
