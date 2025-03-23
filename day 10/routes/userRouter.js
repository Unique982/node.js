// core module 
const path = require('path');

// external modules 
const express = require('express');

// Local Modules
const userRouter = express.Router();
const HomeController = require('../controllers/home');

const {registerHome} = require('./hostRouter');


userRouter.get("/",HomeController.getHomesList)



module.exports = userRouter;