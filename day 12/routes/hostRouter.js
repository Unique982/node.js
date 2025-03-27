

// external modules 
const express = require('express');

// Local Modules
const hostRouter = express.Router();
const HomeController = require('../controllers/hostController');



hostRouter.get("/add_home",HomeController.getaddHome);
 // define constant value 
const registerHome =[];

hostRouter.post("/add_home",HomeController.postaddHome);
hostRouter.get("/host-home-list",HomeController.getHostHomes);
hostRouter.get("/edit-home/:homeId",HomeController.getEditHomes);
hostRouter.post("/edit-home",HomeController.postEditHomes);
hostRouter.post("/delete-home/:homeId",HomeController.postDeleteHomes);


module.exports = hostRouter;
