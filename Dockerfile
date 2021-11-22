FROM node:17
WORKDIR /clerk

COPY package*.json ./
RUN npm install
COPY . ./

EXPOSE 8357

CMD node run
