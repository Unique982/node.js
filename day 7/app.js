// core module 
const path = require('path');
// external modules 
const express = require('express');

// Local Modules
const userRouter = require('./routes/userRouter');
const hostRouter = require('./routes/hostRouter');
const rootDir = require('./utils/pathUtils');


const app = express();
app.use(express.urlencoded({extended:true}));
app.use(userRouter);
app.use("/host",hostRouter);

// adding 404 Page
app.use((req,res,next)=>{
  res.status(404).sendFile(path.join(rootDir,'views','404.html'));

})


 const PORT = 8800;
 app.listen(PORT,()=>{
  console.log(`Server running on address: http://localhost:${PORT}`);
 })