FROM node:11.11.0

ENV TASK build_start_prod_task

EXPOSE 3000

WORKDIR /var/www

RUN npm install sequelize-cli

COPY yarn.lock ./
RUN yarn

COPY ./ ./

CMD ["make"]
