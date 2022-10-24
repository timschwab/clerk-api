FROM node:17
WORKDIR /clerk/repo

COPY package*.json ./
RUN npm ci --ignore-scripts
COPY . ./

EXPOSE 8357

CMD node run
