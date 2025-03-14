console.log("hello");
const fs = require('fs');
fs.writeFile('Output.txt',"Write the output testing", (err)=>{
  if(err) throw err;
  else console.log("Successfully");
  console.log(__filename);
})