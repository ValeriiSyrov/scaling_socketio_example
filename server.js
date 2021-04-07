import { createServer } from "http";
import { Server } from "socket.io";
import redis from "redis";

const APPID = process.env.APPID;
const PORT = process.env.PORT;


const subscriber = redis.createClient({
    port      : 6379,              
    host      : 'redis'} );
  
const publisher = redis.createClient({
    port      : 6379,              
    host      : 'redis'} );


subscriber.subscribe("main_chat");

subscriber.on("message", function(channel, message) {
        try{
        console.log(`Server ${APPID} received message in channel ${channel} msg: ${message}`);
        /**
         * with io.emit we send this event to all sockets. To send to certain room
         * use io.to('room_id').emit()
         */
        io.emit('answer', JSON.parse(message))
        }
        catch(ex){
          console.log("ERR::" + ex)
        }
});

const requestListener = async function (req, res) {

    res.writeHead(200);
    res.end('Hello, World! From' + '' + APPID);
  }



const httpServer = createServer(requestListener);
const io = new Server(httpServer, {
      transports: ['websocket']
});


io.on("connection", (socket) => {
    console.log(socket.id)
    console.log('count of clients', io.engine.clientsCount)

    socket.on('message', (data) =>{
        publisher.publish("main_chat", JSON.stringify({text: `I got your message ${data} from client ${socket.id}. Server ${APPID}`}))
    })

});


httpServer.listen(PORT, () => console.log('server starts'));