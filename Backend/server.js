const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const port = 8000;
const { Server } = require('socket.io');




let server = http.createServer(app);

let io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
    }

});

app.use(express.json)
app.use(cors());

io.on("connection", (socket) => {




    socket.on("join_room", ({ room, name }) => {

        socket.join(room);
        socket.to(room).emit("member_join", { name, id: socket.id })
    })

    socket.on("sendingMessageToRoom", (data) => {
        socket.to(data.roomId).emit("message_responding", data);
    })



    socket.on("disconnect", () => {
        console.log(`User is disconnected which`);
    });
});


//As we cerated the server which we passed to the socket.io and though we have to listen ont he same serevrnot on the app beacuse it will create the new instance
server.listen(port, () => {
    console.log(`The server is started on port ${port}`);


});





