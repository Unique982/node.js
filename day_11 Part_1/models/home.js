// core module 
const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/pathUtils');
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
    this.id = Math.random().toString();
    Home.fetchAll((registerHome) =>{
      registerHome.push(this);
      
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
}