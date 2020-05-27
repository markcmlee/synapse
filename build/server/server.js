"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var express = require("express");
var WebSocket = require("ws");
var http = require("http");
var enableWs = require("express-ws");
var synapse = require("./synapse/synapse");
var PORT = 3000;
var app = express();
var wss = new WebSocket.Server({ port: 3000, path: "/socket" });
wss.on("connection", function connection(ws) {
    ws.on("message", function incoming(message) {
        console.log("received: %s", message);
        ws.send(message);
    });
});
// express.static("src");
app.use(express.json());
app.use("/api", synapse(path.resolve(__dirname, "./resources")));
app.get("/", function (req, res) {
    // res.send("hello world");
    res.sendFile(path.resolve(__dirname, "../src/index.html"));
});
app.use(function (err, req, res, next) { return res.status(err.status).send(err.serialize()); });
app.listen(PORT, function () { return console.log("listening on port " + PORT); });
module.exports = app;
