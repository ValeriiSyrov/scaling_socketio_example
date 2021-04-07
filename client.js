import { io } from "socket.io-client";
import { createServer } from "http";
const PORT = process.env.PORT;



const socket = io('http://localhost:3005', {
  transports: [ "websocket" ]
});


socket.on("connect", () => {
    console.log(socket.id); 

  socket.on("answer", (data) => {
    console.log(data.text);
  });

  const requestListener = async function (req, res) {
    socket.emit("message", `My message ${socket.id}    `);
    res.end('Sent the message')
  }
  
  
  
  const httpServer = createServer(requestListener);

  httpServer.listen(PORT, () => console.log('server client starts'));

  });