# pull the official base image
FROM node:alpine
# set working direction
WORKDIR /app
# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH
# install application dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn
# add app
COPY . ./
# start app
CMD ["yarn", "start"]

# To build Image:
# docker build -t covid:dev .
# To run 
# docker run -it --rm -p 3000:3000 covid:dev