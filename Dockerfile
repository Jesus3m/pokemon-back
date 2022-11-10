FROM node:16.14.2
ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN yarn install --silent

COPY . .
EXPOSE 4000
RUN npm run build
CMD [ "yarn", "start" ]