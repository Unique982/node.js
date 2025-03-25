

// external modules 
const express = require('express');

// Local Modules
const hostRouter = express.Router();
const HomeController = require('../controllers/homeController');



hostRouter.get("/add_home",HomeController.getaddHome);
 // define constant value 
const registerHome =[];

hostRouter.post("/add_home",HomeController.postaddHome);


module.exports = hostRouter;
