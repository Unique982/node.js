// add models
const Home = require('../models/home');
// get add home
exports.getaddHome = (req,res,next)=>{

  res.render('host/edit-home',{pageTitle:"Add Home", editing:false,})
};
// edit Homes
exports.getEditHomes=(req,res,next)=>{
  const homeId = req.params.homeId;
  const editing = req.query.editing ==='true';
  Home.findById(homeId,home=>{
    if(!home){
      console.log("home Id is not Found");
      return res.redirect("/host/host-home-list");
    }
    console.log(homeId,editing,home);
    res.render('host/edit-home',{pageTitle:"Edit Home",editing:editing,home:home})
  })
};

// post add home
exports.postaddHome =(req,res,next)=>{
  // console.log('Home registration successfully for :',req.body,req.body.house_name);
  const {house_name,price,location,rating,photo}=req.body
 const home = new Home(house_name,price,location,rating,photo);
 home.save();
  res.render('host/home-list',{pageTitle:'Add Home Sucessfully'})
}
// update home
exports.postEditHomes = (req,res,next)=>{
  const {id,house_name,price,location,rating,photo}=req.body
 const home = new Home(house_name,price,location,rating,photo);
 home.id = id;
 home.save();
  res.redirect('/host/host-home-list');
}
// delete Home
exports.postDeleteHomes = (req,res,next)=>{
  const homeId = req.params.homeId;
  Home.deleteById(homeId,err =>{
    if(err){
      console.log("error While deleting");
    }
    res.redirect('/host/host-home-list');
  })
}


// list home
exports.getHomesList =(req,res,next)=>{
 Home.fetchAll((registerHome) => 
  res.render('store/home-list',{registerHome:registerHome, pageTitle:' Host home'})
);
}
// // host Home -list
exports.getHostHomes =(req,res,next)=>{
  Home.fetchAll((registerHome) => 
   res.render('host/host-home-list',{registerHome:registerHome, pageTitle:'Host Home Page'})
 );
 }


