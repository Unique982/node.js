const http = require('http');
const { requestHanlder } = require('./handler');
const server = http.createServer(requestHanlder);

const PORT = 8800;
server.listen(PORT, ()  => {
  console.log(`Server ruuing on http://localhost:${PORT}`);
});