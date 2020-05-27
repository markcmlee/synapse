export {};
const path = require("path");
const express = require("express");
const WebSocket = require("ws");
const synapse = require("./synapse/synapse");

const PORT = 3000;
const app = express();

const wss = new WebSocket.Server({ port: 3001 });

wss.on("connection", function connection(ws) {
  ws.on("message", function incoming(message) {
    console.log("received: %s", message);
    ws.send(message);
  });
});

app.use(express.json());

app.use("/api", synapse(path.resolve(__dirname, "./resources")));

app.get("/", (req, res) => {
  // res.send("hello world");
  res.sendFile(path.resolve(__dirname, "../src/index.html"));
});

app.use((err, req, res, next) => res.status(err.status).send(err.serialize()));

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
module.exports = app;
