const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const port = 4000;
const server = http.createServer(express);
const websoc = new WebSocket.Server({ server })

websoc.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
    websoc.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    })
  })
})

server.listen(port, function() {
  console.log(`Server is listening on ${port}!`)
})

