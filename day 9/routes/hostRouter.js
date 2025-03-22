// Core Module
const path = require('path');

// external modules 
const express = require('express');

// Local Modules
const hostRouter = express.Router();
// const rootDir = require('../utils/pathUtils');


hostRouter.get("/add_home",(req,res,next)=>{
  res.render('add-home',{pageTitle:"Add Home"})
})
 // define constant value 
const registerHome =[];

hostRouter.post("/add_home",(req,res,next)=>{
  console.log('Home registration successfully for :',req.body,req.body.house_name);
  registerHome.push({houseName:req.body.house_name});
  res.render('homeadded',{pageTitle:'Add Home Sucessfully'})
})

exports.hostRouter = hostRouter;
exports.registerHome = registerHome;