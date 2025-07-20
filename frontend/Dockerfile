FROM node:20
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . .
CMD ["npm", "run", "dev", "--", "--host", "--port", "5174"]
