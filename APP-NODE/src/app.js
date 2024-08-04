const path = require("path")
require("dotenv").config({path:path.resolve(__dirname,"../../.env")})
const server = require("./server");

const Server = new server();

Server.listen();


module.exports = Server.app;