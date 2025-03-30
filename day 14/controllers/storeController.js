// add models
const Home = require('../models/home');
const Favourites = require('../models/favourites');


// get add home
exports.getIndex =(req,res,next)=>{
  Home.find().then(registerHome =>{
   res.render('store/index',{registerHome:registerHome, pageTitle:'Home'})
  });
 }

// list home
exports.getHomesList =(req,res,next)=>{
  Home.find().then(registerHome =>{
  res.render('store/home-list',{registerHome:registerHome, pageTitle:'Home List'})
});
}

// booking gets
exports.getBooking =(req,res,next)=>{
  Home.find((registerHome) => 
   res.render('store/booking',{registerHome:registerHome, pageTitle:'Booking Page'})
 );
 }
// getFavouriteList
exports.getFavouriteList =(req,res,next)=>{
  
  Favourites.find().populate('houseId')
  .then((favourites) => {
    const favouritesHome = favourites.map((fav) => fav.houseId);

      res.render('store/favourites-list',{favouritesHome:favouritesHome, pageTitle:'Favourites Page'});
   });

  }
  
 // postAddToFavourites
 exports.postAddToFavourites =  (req,res,next)=>{
  const homeId = req.body.id
Favourites.findOne({houseId:homeId}).then(Fav=>{
  if(Fav){
    console.log('Already fav marked');
    return res.redirect("/favourites");
  }
  else{
const fav = new Favourites({houseId:homeId});
  fav.save().then((result) =>{
  console.log("Added fav Succ",result);
  return res.redirect("/favourites");
  });
} 

  }).catch(err =>{
    console.log("Error while marking favourites",err); 
  });
}
  
 
// remove favouites
exports.postDeleteFromFavourites =(req,res,next)=>{
  const homeId = req.params.homeId;
  Favourites.findOneAndDelete(homeId).then(result =>{
    console.log('Fav Delete',result);
      }).catch(err =>{
        console.log("Error while removing favourites",err);  
      }).finally(()=>{
        res.redirect("/favourites");
      })
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
      {home:home,pageTitle:'Home Datails Page'}
    );
  }
  });
  

 }

