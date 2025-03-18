console.log('1. Start of Script');

// Microtask queue (promise)
Promise.resolve().then(() => console.log('2.Microtask 1'));

// Timer Queue
setTimeout(()=> console.log('3. Timer 1'),0);

// I/O queue
const fs = require('fs');
fs.readFile('user_info_2.txt',() => console.log('4. I/O operation'));

// Check Queue 
setImmediate(() => console.log('5. Immediate 1'));
// close Queue 
process.on('exit',(code) =>{
  console.log('6. exit event');
});
 console.log('7. End of Script');

