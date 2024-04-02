FROM node:20

WORKDIR /src/app

COPY package*.json ./
COPY ./prisma .

RUN npm install
RUN npx prisma generate

COPY . .
RUN npm run build

EXPOSE 3000

CMD [ "npm" , "run", "docker" ]



