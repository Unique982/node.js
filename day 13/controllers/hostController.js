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
  Home.findById(homeId).then(home =>{
    
    if(!home){
      console.log("Home id is not found");
      return res.redirect('host/host-home-list');
    } 
    console.log(homeId,editing,home);
    res.render('host/edit-home',{pageTitle:"Edit Home",editing:editing,home:home})
  })
};

// post add home
exports.postaddHome =(req,res,next)=>{
  
  const {house_name,price,location,rating,imageUrl,description}=req.body
 const home = new Home(house_name,price,location,rating,imageUrl,description);
 home.save().then(()=>{
  console.log("home Saved Successfully");
});
res.redirect("/host/host-home-list");
 
}
// update home
exports.postEditHomes = (req,res,next)=>{
  const {id,house_name,price,location,rating,imageUrl,description}=req.body
 const home = new Home(house_name,price,location,rating,imageUrl,description,id);
 home.save().then(result =>{
  console.log("Update Home ",result);
 });
  res.render('host/host-home-list',{ registerHome: [] });
};
// delete Home
exports.postDeleteHomes = (req,res,next)=>{
  const homeId = req.params.homeId;
  Home.deleteById(homeId).then(()=>{
    res.redirect('/host/host-home-list');
  }).catch(err=>{
    console.log('Error while deleting',err);
  })
}


// list home
exports.getHomesList =(req,res,next)=>{
  Home.fetchAll().then(registerHome =>{
  res.render('store/home-list',{registerHome:registerHome, pageTitle:' Host home'})
});
}
// // host Home -list
exports.getHostHomes =(req,res,next)=>{
  Home.fetchAll().then(registerHome =>{
   res.render('host/host-home-list',{registerHome:registerHome, pageTitle:'Host Home Page'})
});
 }


