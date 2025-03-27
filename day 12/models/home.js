// core module 
const db = require('../utils/databaseutils');
module.exports  = class Home{
  constructor(house_name,price,location, rating,imageUrl,description, id){
    this.houseName = house_name;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.imageUrl = imageUrl;
    this.description = description;
    this.id = id;
  }
  save(){
   return  db.execute(`INSERT INTO homes (house_name,price,description,imageUrl,localtion,rating)VALUES('${this.houseName}',${this.price},'${this.description}','${this.imageUrl}','${this.location}',${this.rating})`);
    
  }
  static fetchAll(){
     return db.execute("SELECT * FROM homes")
    //  .then(result =>{
    //   console.log("Getting from DB",result);
    // })
    // .catch(err =>{
    //   console.log("Error while reading home records",err);
    // })
  }
  static findById(homeId){
    return db.execute("SELECT *  FROM homes WHERE id =?",[homeId]);

    
  }
  static deleteById(homeId){
    return db.execute("DELETE FROM homes WHERE id= ?",[homeId]);

   
  }
}