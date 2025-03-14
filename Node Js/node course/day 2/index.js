
const http = require('http');
const server = http.createServer((req,res)=>{
  // Understand Request
  console.log(req.url, req.method, req.headers); //request url, request method, request headers
  process.exit(); // stop Event loop
});
const port = 8000;
server.listen(port,()=>{
console.log(`Server running address an:http://localhost:${port}`);
});