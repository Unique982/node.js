// core module 
const path = require('path');

// external modules 
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const multer = require('multer');
const { default: mongoose } = require('mongoose');
const MongoDBStore = require('connect-mongodb-session')(session);
const MONGO_URL = "mongodb+srv://root:root@meroproject.ezmub1g.mongodb.net/airbnd?retryWrites=true&w=majority&appName=MeroProject";


// Local Modules
const storeRouter = require('./routes/storeRouter');
const hostRouter  = require('./routes/hostRouter');
const authRouter = require('./routes/authRouter');
const rootDir = require('./utils/pathUtils');
const errorsControlls =require('./controllers/errors');


const app = express();
// set ejs
app.set('view engine','ejs');
app.set('views','views');

 const randomString = (length) =>{
  const characters = 'abcdefghijklmnopqrstuvwxyz';
  let result = '';
  for(let i=0; i<length;i++){
    result += characters.charAt(Math.floor(Math.random() *characters.length));
  }
  return result;
 }
const store = new MongoDBStore({
  uri:MONGO_URL,
  collection:'session'
});
const storage = multer.diskStorage({
  destination:(req,file,cb) =>{
    cb(null,"uploads/");
  },
  filename:(req,file,cb) =>{
    cb(null, randomString(10)+ '-' + file.originalname);
  }
});
const fileFliter =(req,file,cb)=>{
  if(file.minetype==='image/png' || fileminetype==='image/jpeg'|| file.minetype==='image/jpg'){
    cb(null,true);
  }
  else{
    cb(null, false);
  }
}
const multerOption = {
  storage,fileFliter

};

app.use(express.urlencoded({extended:true}));
app.use(multer(multerOption).single('photoUrl'));
app.use(express.static(path.join(rootDir,'public')));
app.use('/uploads',express.static(path.join(rootDir,"uploads")));
app.use('/host/uploads',express.static(path.join(rootDir,"uploads")));
app.use('/homes/uploads',express.static(path.join(rootDir,"uploads")));

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

