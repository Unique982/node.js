// add models
const Home = require('../models/home');
const fs = require('fs');
// get add home
exports.getaddHome = (req,res,next)=>{

  res.render('host/edit-home',{pageTitle:"Add Home",isLoggedIn:req.isLoggedIn, editing:false,user: req.session.user})
};
// edit Homes
exports.getEditHomes=(req,res,next)=>{
  const homeId = req.params.homeId;
  const editing = req.query.editing ==='true';
  Home.findById(homeId).then(home =>{
    
    if(!home){
      console.log("Home id is not found");
      return res.redirect('/host/host-home-list');
    } 
    console.log(homeId,editing,home);
    res.render('host/edit-home',{pageTitle:"Edit Home",editing:editing,
      isLoggedIn:req.isLoggedIn,home:home,user: req.session.user})
  })
};

// post add home
exports.postaddHome =(req,res,next)=>{
  
  const {houseName,price,location,rating,description}=req.body;
  console.log(houseName,price,location,rating,description);
  console.log(req.file);
  if(!req.file){
    return res.status(422).send("No Image provided");
  }
  const photoUrl = req.file.path;
 const home = new Home({houseName,price,location,rating,photoUrl,description});
 home.save().then(()=>{
  console.log("home Saved Successfully");
});
res.redirect("/host/host-home-list");

}
// update home
exports.postEditHomes = (req,res,next)=>{
  const {id,houseName,price,location,rating,description}=req.body;
  
  Home.findById(id)
.then((home)=>{
  home.houseName = houseName;
  home.price = price;
  home.location = location;
  home.rating = rating;
 
  home.description = description;
if(res.file ){
  fs.unlink(home.photoUrl,(err)=>{
    if(err){
      console.log("Error while deleting file",err);
    }
  });
  home.photoUrl = req.file.path;
  
}


  home.save().then(result =>{
    console.log("Update Home ",result);
   }).catch(err =>{
    console.log("Error while updating",err);
   });
   res.redirect('/host/host-home-list');
}).catch(err =>{
  console.log("Error while finding home",err);
});
};
// delete Home
exports.postDeleteHomes = (req,res,next)=>{
  const homeId = req.params.homeId;
  Home.findByIdAndDelete(homeId).then(()=>{
    res.redirect('/host/host-home-list');
  }).catch(err=>{
    console.log('Error while deleting',err);
  })
}


// list home
exports.getHomesList =(req,res,next)=>{
  Home.find().then(registerHome =>{
  res.render('store/home-list',{registerHome:registerHome, pageTitle:' Host home',isLoggedIn:req.isLoggedIn,user: req.session.user})
});
}
// // host Home -list
exports.getHostHomes =(req,res,next)=>{
  Home.find().then(registerHome =>{
   res.render('host/host-home-list',{registerHome:registerHome, pageTitle:'Host Home Page',isLoggedIn:req.isLoggedIn,user: req.session.user})
});
 }


