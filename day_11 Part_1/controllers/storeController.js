// add models
const Home = require('../models/home');
const Favourites = require('../models/favourites');
// get add home
exports.getIndex =(req,res,next)=>{
  Home.fetchAll((registerHome) => 
   res.render('store/home-list',{registerHome:registerHome, pageTitle:'home'})
 );
 }

// list home
exports.getHomesList =(req,res,next)=>{
 Home.fetchAll((registerHome) => 
  res.render('store/home-list',{registerHome:registerHome, pageTitle:'home'})
);
}

// booking gets
exports.getBooking =(req,res,next)=>{
  Home.fetchAll((registerHome) => 
   res.render('store/booking',{registerHome:registerHome, pageTitle:'Booking Page'})
 );
 }
// getFavouriteList
exports.getFavouriteList =(req,res,next)=>{
  Favourites.getFavourites(favourites => {
    Home.fetchAll((registerHome) => {
      const favouritesHome = registerHome.filter(home => favourites.includes(home.id));
      res.render('store/favourites-list',{favouritesHome:favouritesHome, pageTitle:'Favourites Page'})
   } );
  });
  }
  
 // postAddToFavourites
 exports.postAddToFavourites =  (req,res,next)=>{
  Favourites.addFavourites(req.body.id,err=>{
    if(err){
    console.log("Error while marking favourites",err);  
 }
 res.redirect("/favourites");
})
  
}
 //Home Details
 // booking gets
exports.getHomeDetails =(req,res,next)=>{
  const homeId = req.params.homeId;
  console.log("At Home Details:",homeId);
  Home.findById(homeId, home =>{
    if(!home){
      console.log("Home id is not found");
      res.redirect('/');
    }
    else{
    console.log("Home Details Found",home);
    res.render('store/home-details',
      {home:home,pageTitle:'Home Datails Page'}
    );
  }
  });
  

 }

