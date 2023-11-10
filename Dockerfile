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
EXPOSE 3000
# RUN npx prisma migrate dev
# CMD ["pm2-runtime", "dist/index.js"]
CMD ["yarn","dev"];