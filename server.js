const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const port = 80;
const { Server } = require("socket.io");
var fs = require('fs');
let io = null;
app.use(express.static('public'));
server.listen(port, () => {
    console.log(`listening on *:${port}`);
});
io = new Server(server);
var dir = './serverFiles';
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}