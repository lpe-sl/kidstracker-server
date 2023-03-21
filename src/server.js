const net = require("net");
const { processMessage } = require("./messageProcessor");
const rateLimit = require("../config/rateLimit");

const server = net.createServer((socket) => {
  console.log("Client connected on", socket.remotePort);
  rateLimit(socket); // Apply rate limiting

  socket.on("data", (data) => {
    const message = data.toString();
    processMessage(message);
  });

  socket.on("end", () => {
    console.log("Client disconnected");
  });

  socket.on("error", (err) => {
    console.error(`Error: ${err.message}`);
  });
});

const port = process.env.PORT || 9000;
const host = "0.0.0.0";

server.listen(port, host, () => {
  console.log(`Server listening on ${host}:${port}`);
});
