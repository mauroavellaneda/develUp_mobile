const http = require('http');
const mockserver = require('mockserver');
let sockets = {}, nextSocketId = 0;


const mockServer = {
  open(port) {
    let server = http.createServer(mockserver('./e2e/mocks')).listen(port);
    server.on('connection', (socket) => {
      let socketId = nextSocketId++;
      sockets[socketId] = socket;
      socket.on('close', () => {
        delete sockets[socketId];
      });
      socket.setTimeout(4000);
    });
    return server
  },

  close(server) {
    server.close();
    for (var socketId in sockets) {
      sockets[socketId].destroy();
    }
    return null
  }
}

exports.mockServer = mockServer