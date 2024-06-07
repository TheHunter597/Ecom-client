FROM node:alpine

WORKDIR /app

COPY package.json .

RUN npm install -g pnpm
RUN pnpm install

COPY . .
COPY entry.sh .
RUN chmod +x ./entry.sh
ENTRYPOINT ["./entry.sh"]

