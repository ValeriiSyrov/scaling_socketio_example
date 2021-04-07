FROM node:15
ENV NODE_ENV=production
WORKDIR /multiple_socket
COPY . .
RUN npm install
