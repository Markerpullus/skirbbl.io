const http = require("http")
const { Server } = require("socket.io")

const io = new Server(3333, {
  path: "/",
  pingInterval: 10000,
  pingTimeout: 5000,
  cors: {
    origin: '*',
  }
});

let clients = []

io.on("connect", socket => {
  socket.on("name", name => {
    clients.push({ name: name, socket: socket })
    console.log(name + ' just connected')
  })

  socket.on("message", msg => {
    console.log(msg)
    io.emit("message", msg)
  })

  socket.on("disconnect", () => {
    for (let client in clients) {
      if (client.socket == socket) {
        console.log(client.name + "just disconnected")
      }
    }
  })
})