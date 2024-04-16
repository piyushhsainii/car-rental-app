FROM node:20

WORKDIR /src/app

COPY package*.json ./
RUN npm install

COPY ./prisma .
RUN npx prisma generate

COPY . .
RUN npm run build

EXPOSE 3000

CMD [ "npm" , "run", "docker" ]



