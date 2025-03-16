const http = require('http');
const requestHandler = require('./passing_request');
const server = http.createServer(requestHandler);

const port = 8800;
server.listen(port, () => {
  console.log(`Server running an address:http://localhost:${port}`);
});