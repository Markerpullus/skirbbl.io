const http = require("http");
const { Server } = require("socket.io");

const io = new Server(3333, {
  path: "/",
  pingInterval: 10000,
  pingTimeout: 5000,
  cors: {
    origin: "*",
  },
});

let clients = [];

io.on("connect", (socket) => {
  socket.on("name", (name) => {
    clients.push({ name: name, socket: socket });
    console.log(name + " just connected");
  });

  socket.on("message", (msg) => {
    console.log(msg);
    io.emit("message", msg);
  });

  socket.on("disconnect", () => {
    disconnect(socket);
  });
});

function disconnect(socket) {
  for (let i = 0; i < clients.length; i++) {
    if (clients[i].socket == socket) {
      console.log(clients[i].name + " just disconnected");
      io.emit("userDisconnect", clients[i].name);
      clients.splice(i, 1);
      return;
    }
  }
  console.log("client ping");
}
