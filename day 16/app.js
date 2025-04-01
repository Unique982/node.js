// core module 
const path = require('path');
// external modules 
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const MONGO_URL = "mongodb+srv://root:root@meroproject.ezmub1g.mongodb.net/airbnd?retryWrites=true&w=majority&appName=MeroProject";


// Local Modules
const storeRouter = require('./routes/storeRouter');
const hostRouter  = require('./routes/hostRouter');
const authRouter = require('./routes/authRouter');
const rootDir = require('./utils/pathUtils');
const errorsControlls =require('./controllers/errors');
const { default: mongoose } = require('mongoose');

const app = express();
// set ejs
app.set('view engine','ejs');
app.set('views','views');

const store = new MongoDBStore({
  uri:MONGO_URL,
  collection:'session'
});

app.use(express.urlencoded({extended:true}));
app.use(session({
  secret:"Testing Session",
  resave:false,
  saveUninitialized:false,
  store
}));
app.use((req,res,next)=>{

  req.isLoggedIn = req.session.isLoggedIn;
  next();
});
app.use(storeRouter);
app.use(authRouter);
app.use("/host",(req,res,next)=>{
  if(req.isLoggedIn){
    next();
  }else{
  res.redirect("/login");
  }
});
app.use("/host",hostRouter);

// adding 404 Page
app.use(errorsControlls.pagenotFound);

 const PORT = 5000;

mongoose.connect(MONGO_URL).then(() =>{
  console.log("Connetced to Mongo");
  app.listen(PORT,()=>{
    console.log(`Server running on address: http://localhost:${PORT}`);
   });

}).catch(err =>{
  console.log('error While connecting to mongoose',err);

});

