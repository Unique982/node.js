// add models
const Home = require('../models/home');
// get add home
exports.getaddHome = (req,res,next)=>{
  res.render('host/add-home',{pageTitle:"Add Home"})
};
// post add home
exports.postaddHome =(req,res,next)=>{
  console.log('Home registration successfully for :',req.body,req.body.house_name);
  const {house_name,price,location,rating,photo}=req.body
 const home = new Home(house_name,price,location,rating,photo);
 home.save();
  res.render('host/home-added',{pageTitle:'Add Home Sucessfully'})
}
// list home
exports.getHomesList =(req,res,next)=>{
 Home.fetchAll((registerHome) => 
  res.render('store/home-list',{registerHome:registerHome, pageTitle:'home'})
);
}

