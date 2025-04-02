// core module 
const path = require('path');

// external modules 
const express = require('express');

// Local Modules
const storeRouter = express.Router();
const StoreController = require('../controllers/storeController');

const {registerHome} = require('./hostRouter');


storeRouter.get("/",StoreController.getIndex);

storeRouter.get("/home",StoreController.getHomesList);
storeRouter.get("/booking",StoreController.getBooking);
storeRouter.get("/favourites",StoreController.getFavouriteList);

storeRouter.get("/homes/:homeId",StoreController.getHomeDetails);
storeRouter.post("/favourites",StoreController.postAddToFavourites);
storeRouter.post("/favourites/delete/:homeId",StoreController.postDeleteFromFavourites);


module.exports = storeRouter;