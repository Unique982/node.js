// add models
const Home = require('../models/home');
const Favourites = require('../models/favourites');
// get add home
exports.getIndex =(req,res,next)=>{
  Home.fetchAll().then(([registerHome]) =>{
   res.render('store/index',{registerHome:registerHome, pageTitle:'Home'})
  });
 }

// list home
exports.getHomesList =(req,res,next)=>{
  Home.fetchAll().then(([registerHome]) =>{
  res.render('store/home-list',{registerHome:registerHome, pageTitle:'Home List'})
});
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
    Home.fetchAll().then(([registerHome]) =>{
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
  
// remove favouites
exports.postDeleteFromFavourites =(req,res,next)=>{
  const homeId = req.params.homeId;
  Favourites.deleteById(homeId ,err=>{
    if(err){
    console.log("Error while revoming favourites",err);  
 }
 res.redirect("/favourites");
})
}

 //Home Details
 // booking gets
exports.getHomeDetails =(req,res,next)=>{
  const homeId = req.params.homeId;
  Home.findById(homeId).then(([homes]) =>{
    const home  = homes[0];
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

