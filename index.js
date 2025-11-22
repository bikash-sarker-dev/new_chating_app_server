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
  console.log("socket connection: ", socket);
  socket.on("join_room", (room) => {
    socket.join(room);
    console.log(room, socket.id);
  });
});

server.listen("4000", () => {
  console.log("server is running port : 4000");
});
