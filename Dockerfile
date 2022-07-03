FROM node:14-alpine
WORKDIR /app 
COPY package.json ./app 
RUN npm install
COPY . .
RUN npm run start