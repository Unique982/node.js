const { getDB } = require("../utils/databaseutils");

module.exports = class Favourites {
  constructor(houseId) {
    this.houseId = houseId;
  }
  save() {
    const db = getDB();
    return db.collection("favourites").findOne({houseId: this.houseId}).then(existingFav =>{
    if(!existingFav){
      return db.collection("favourites").insertOne(this);
    }
    return Promise.resolve();
  });
  }

  // get fav
  static getFavourites() {
    const db = getDB();
    return db.collection("favourites").find().toArray();
  }
  // removing fav
  static deleteById(delHomeId) {
    const db = getDB();
    return db.collection("favourites").deleteOne({ 
      houseId: delHomeId});
  }
};
