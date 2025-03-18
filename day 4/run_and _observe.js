const http = require('http');
const fs = require('fs');

 console.log('1. Start of scrip');

 // Synchronous (blocking) operation 
 console.log('2. Reading file synchronous');
 const dataSync = fs.readFileSync('user-info.txt','utf8');
 console.log('3. Synchronous read complete'); 

 // Asynchronous (non-blocking) operatio
 console.log('4. Reading file asynchronous');
 fs.readFile('user_info.txt','utf8',(err, dataAsync)=>{
  if(err) throw err;
  console.log('6. Asynchronous read complete');
 });
 console.log('5. End of script');

  const PORT = 8800;
  server.listen(PORT, ()=> {
    console.log(`Server running on address: http://localhost:${PORT}`);
  })