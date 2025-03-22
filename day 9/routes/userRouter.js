// core module 
const path = require('path');

// external modules 
const express = require('express');

// Local Modules
const userRouter = express.Router();

const {registerHome} = require('./hostRouter');


userRouter.get("/",(req,res,next)=>{
  console.log(registerHome);
  res.render('home',{registerHome:registerHome, pageTitle:'home'});

})


module.exports = userRouter;