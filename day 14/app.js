// core module 
const path = require('path');
// external modules 
const express = require('express');
const bodyParser = require('body-parser');

// Local Modules
const storeRouter = require('./routes/storeRouter');
const hostRouter  = require('./routes/hostRouter');
const rootDir = require('./utils/pathUtils');
const errorsControlls =require('./controllers/errors');

const { default: mongoose } = require('mongoose');

const app = express();
app.use(express.urlencoded({extended:true}));
app.use(storeRouter);
app.use("/host",hostRouter);

// set ejs
app.set('view engine','ejs');
app.set('views','views');

// Granting access to public folder
app.use(express.static(path.join(rootDir,'public')));


// adding 404 Page
app.use(errorsControlls.pagenotFound);

 const PORT = 5000;
const MONGO_URL = "mongodb+srv://root:root@meroproject.ezmub1g.mongodb.net/airbnd?retryWrites=true&w=majority&appName=MeroProject";
mongoose.connect(MONGO_URL).then(() =>{
  console.log("Connetced to Mongo");
  app.listen(PORT,()=>{
    console.log(`Server running on address: http://localhost:${PORT}`);
   });

}).catch(err =>{
  console.log('error While connecting to mongoose',err);

});

