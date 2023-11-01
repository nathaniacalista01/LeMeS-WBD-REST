FROM node:latest
WORKDIR /app
COPY package.json .
COPY tsconfig.json .
COPY yarn.lock .
COPY prisma ./prisma/
COPY .env .
RUN yarn install
COPY . .
RUN yarn build
RUN yarn global add pm2
EXPOSE 8080
# CMD ["pm2-runtime", "dist/index.js"]
CMD ["yarn","dev"];