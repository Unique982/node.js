// core module 
const path = require('path');
// external modules 
const express = require('express');
const bodyParser = require('body-parser');

// Local Modules
const userRouter = require('./routes/userRouter');
const {hostRouter } = require('./routes/hostRouter');
const rootDir = require('./utils/pathUtils');
const errorsControlls =require('./controllers/errors');

const app = express();
app.use(express.urlencoded({extended:true}));
app.use(userRouter);
app.use("/host",hostRouter);

// set ejs
app.set('view engine','ejs');
app.set('views','views');

// Granting access to public folder
app.use(express.static(path.join(rootDir,'public')));


// adding 404 Page
app.use(errorsControlls.pagenotFound);

 const PORT = 8000;
 app.listen(PORT,()=>{
  console.log(`Server running on address: http://localhost:${PORT}`);
 })