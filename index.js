const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    method: ["GET", "POST"],
  },
});

app.use(cors());

io.on("connection", (socket) => {
  console.log("socket connection: ");
  socket.on("join_room", (room) => {
    socket.join(room);
    // console.log(room, socket.id);
  });

  //   message send server
  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
    // console.log("send message", data);
  });

  //   typing keep user
  socket.on("typing", ({ username: user, room }) => {
    socket.to(room).emit("typing_user", user);
  });
});

server.listen("4000", () => {
  console.log("server is running port : 4000");
});
