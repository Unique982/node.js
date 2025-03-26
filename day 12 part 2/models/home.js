// core module 
const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/pathUtils');
const Favourites = require('./favourites');
let registerHome =[];
const house_data = path.join(rootDir,'data','house_data_store.json');

module.exports  = class Home{
  constructor(house_name,price,location, rating,photo){
    this.houseName = house_name;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photo = photo;
  }
  save(){
    Home.fetchAll((registerHome) =>{
    if(this.id){// editing 
      registerHome = registerHome.map(home =>  home.id ===this.id ? this:home);
    }
    else{ // add home
    this.id = Math.random().toString();
      registerHome.push(this);
    }

      fs.writeFile(house_data,JSON.stringify(registerHome), err=> {
       console.log(err)
      });
    });
  
  }
  static fetchAll(callback){
    const house_data = path.join(rootDir,'data','house_data_store.json');
    const fileCotext = fs.readFile(house_data,(err,data) =>{
      callback(!err ? JSON.parse(data) :[])
    });
  }
  static findById(homeId,callback){
    this.fetchAll(homes =>{
      const homeFound = homes.find(home=>home.id===homeId);
      callback(homeFound);
    })
  }
  static deleteById(homeId,callback){
    this.fetchAll(homes =>{
      homes = homes.filter(home=>home.id!==homeId);
      fs.writeFile(house_data,JSON.stringify(homes), err=>{
        Favourites.deleteById(homeId ,callback);

      })
     
    })
  }
}