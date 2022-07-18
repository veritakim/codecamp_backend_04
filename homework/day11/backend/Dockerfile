FROM node:14

WORKDIR /miniproject/

COPY ./package.json /miniproject/
COPY ./yarn.lock /miniproject/ 
RUN yarn install

COPY . /miniproject/

RUN yarn install
CMD yarn dev

