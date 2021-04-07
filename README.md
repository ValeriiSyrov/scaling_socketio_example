# Scaling socketio example


This project represents next schema

![image](https://user-images.githubusercontent.com/43002892/113931452-2481bd80-97fb-11eb-84c8-e38365ac91a1.png)

So without redis by default a client connects to one server and interacts only with it. So if another client connects to another server it means that these two clients can't communicate with each other because servers are independent. So to share events between different servers we've added a redis as pub-sub mechanism.

NGINX in our case is a load balancer

## Running the project

- run docker-compose up
- run a client with command PORT={any port} node client
- open your browser and make a get reuest (localhost:{your port})
- create as much clients as you wish
- check your terminal 
- notice that we use APPID varibale to define what server was connected  
