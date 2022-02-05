const http = require("http");
const sstatic = require("node-static");
const fileServer = new sstatic.Server();

const app = http.createServer((request, response) => {
  fileServer.serve(request, response);
});
const io = require("socket.io").listen(app, { log: false });

app.listen(8081);

io.sockets.on("connection", (socket) => {
  let id = socket.id;

  socket.on("goal", (data) => {
    data.id = id;
    socket.broadcast.emit("goal", data);
  });

  socket.on("collision", (data) => {
    data.id = id;
    socket.broadcast.emit("collision", data);
  });

  socket.on("striker", (data) => {
    data.id = id;
    socket.broadcast.emit("striker", data);
  });

  socket.on("disconnect", () => {
    socket.broadcast.emit("clientdisconnect", id);
  });
});
