// core module 
const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/pathUtils');

const Favourites_data = path.join(rootDir,'data','favourites_data.json');


 module.exports = class Favourites {
   static addFavourites(homeId,callback){
    Favourites.getFavourites((favourites) =>{
      if(favourites.includes(homeId)){
      callback("Home Already in Favorites");
    } else{
      favourites.push(homeId);
          fs.writeFile(Favourites_data,JSON.stringify(favourites),callback);
      }
  });
   }
   static getFavourites(callback){
    fs.readFile(Favourites_data,(err,data) =>{
      callback(!err ? JSON.parse(data) :[])
    });

   }
 }