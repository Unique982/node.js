const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const MONGO_URL = "mongodb+srv://root:root@meroproject.ezmub1g.mongodb.net/?retryWrites=true&w=majority&appName=MeroProject";

 let _db ;
const mongoConnect = (callback) =>{
  MongoClient.connect(MONGO_URL).then(client =>{
    callback();
    _db= client.db('airbnd');
  }).catch(err =>{
    console.log('Error while connecting to Mongo',err);
  });
}
const getDB = () =>{
  if(!_db){
    throw new Error("Mongo not conntected");
  }
  return _db;
}

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;