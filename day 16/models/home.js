const {ObjectId }=require('mongodb');
const mongoose = require('mongoose');


/**
 * 


    // method 
    save()
    static findById(homeId)
    static deleteById(homeId)
    static find()
 */

   const homeSchema = mongoose.Schema({
    houseName: {type:String, required:true},
    price :{type:Number, required:true},
    location:{type:String, required:true},
    rating:{type:Number, required:true},
    photoUrl: String,
    description: String

   });

   // pre hook
//   homeSchema.pre('findOneAndDelete', async function (next) {
//    console.log('Came to pre hook while deleting a home');
//    const homeId = this.getQuery()._id;
//    await favourite.deleteMany({houseId:homeId});
//    next();
   
//   })
   module.exports = mongoose.model('Home',homeSchema);