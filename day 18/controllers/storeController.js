// add models
const Home = require('../models/home');
const User = require("../models/user");



// get add home
exports.getIndex =(req,res,next)=>{
  console.log('Session value',req.session);
  Home.find().then(registerHome =>{
   res.render('store/index',{registerHome:registerHome, pageTitle:'Home',isLoggedIn:req.isLoggedIn,user: req.session.user})
  });
 }

// list home
exports.getHomesList =(req,res,next)=>{
  Home.find().then(registerHome =>{
  res.render('store/home-list',{registerHome:registerHome, pageTitle:'Home List',isLoggedIn:req.isLoggedIn,user: req.session.user})
});
}

// booking gets
exports.getBooking =(req,res,next)=>{
  Home.find((registerHome) => {
   res.render('store/booking',{registerHome:registerHome, pageTitle:'Booking Page',isLoggedIn:req.isLoggedIn,user: req.session.user})
});
 }
// getFavouriteList
exports.getFavouriteList = async (req,res,next)=>{
const userId =req.session.user._id;
const user = await User.findById(userId).populate('favourites');

res.render('store/favourites-list',{favouritesHomes:user.favourites, pageTitle:'Favourites Page',isLoggedIn:req.isLoggedIn,user: req.session.user

});
  }
  
 // postAddToFavourites
 exports.postAddToFavourites =  async(req,res,next)=>{
  const homeId = req.body.id;
  const userId =req.session.user._id;
  const user =await User.findById(userId);
  if(!user.favourites.includes(homeId)){
    user.favourites.push(homeId);
    await user.save();
  }
  return res.redirect("/favourites");
}
  
 
// remove favouites
exports.postDeleteFromFavourites =async(req,res,next)=>{
  const homeId = req.params.homeId;
  const userId =req.session.user._id;
  const user =await User.findById(userId);
  if(user.favourites.includes(homeId)){
    user.favourites = user.favourites.filter(fav => fav != homeId);
    await user.save();
  }
 res.redirect("/favourites");
     }

 //Home Details
 // booking gets
exports.getHomeDetails =(req,res,next)=>{
  const homeId = req.params.homeId;
  Home.findById(homeId).then(home=>{
    
    if(!home){
      console.log("Home id is not found");
      res.redirect('/');
    }
    else{
    console.log("Home Details Found",home);
    res.render('store/home-details',
      {home:home,pageTitle:'Home Datails Page',isLoggedIn:req.isLoggedIn,user: req.session.user}
    );
  }
  });
  

 }

