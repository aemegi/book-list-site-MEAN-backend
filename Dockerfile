# Filename: Dockerfile
FROM node:18-alpine
WORKDIR /
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "Index.js"]
