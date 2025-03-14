
// create a simple node server
const http = require('http');
 const server =http.createServer((req,res) => {
  console.log(req);
  process.exit();// stops event loop
 })
// create port 
const port = 8888;
server.listen(port,()=>{
  console.log(`Server running on address:http://localhost:${port}`);
})
function add(){
  return a + b;
}
function sub (){
  return a - b
}

 module.exports={add,sub};
