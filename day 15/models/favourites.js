
const mongoose = require('mongoose');
const favouritesSchema = new mongoose.Schema({
  houseId:{
    type:mongoose.Schema.Types.ObjectId,// second table second collection  id
    ref: 'Home',
    required:true,
    unique:true,
  }
});

 module.exports = mongoose.model('favourite',favouritesSchema);
