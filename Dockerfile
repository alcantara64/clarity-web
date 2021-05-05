FROM node:12
WORKDIR /usr
COPY . .
RUN npm install
RUN npm install -g env-cmd
EXPOSE 3000
RUN npm run build:__MYENV__ --verbose
CMD npm run start:__MYENV__