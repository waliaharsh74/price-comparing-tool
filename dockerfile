FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY tsconfig.json ./
COPY src ./src
RUN npm run build
EXPOSE 3000
CMD ["node", "dist/index.js"]