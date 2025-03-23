// core module 
const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/pathUtils');
let registerHome =[];

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
      registerHome.push(this);
      const house_data = path.join(rootDir,'data','house_data_store.json');
      fs.writeFile(house_data,JSON.stringify(registerHome), err=> {
       console.log(err)
      });
    });
  
  }
  static fetchAll(callback){
    const house_data = path.join(rootDir,'data','house_data_store.json');
    const fileCotext = fs.readFile(house_data,(err,data) =>{
      
      callback(!err ? JSON.parse(data) :[])
    
    })
   
  }
}