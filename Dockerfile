FROM node:alpine

# create root application folder
WORKDIR /app

# copy configs to /app folder
COPY package*.json .
COPY tsconfig.json .

COPY .env.example .env

# copy source code to /app/src folder
COPY src /app/src

# install packages
RUN npm install

# build app
RUN npm run build

CMD ["npm", "run", "start"]