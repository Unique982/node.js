const { check, validationResult } = require("express-validator"); 
const User = require('../models/user');
const bcrypt = require('bcryptjs');

exports.getLogin=(req,res,next) => {
  res.render("auth/login",{
    pageTitle:"Login page",
    isLoggedIn:false,
    errorMessages:[],
    oldInput:{email:''},
    user:{},
    
  });
}
   // singup code
   exports.getSignup = (req,res,next) =>{
    res.render("auth/signup",
      {pageTitle:"Singup Page",isLoggedIn:false,
        user:{},
     
      }
    )
  }
  

// singup post 
exports.postSignup = [
  check("firstName")
  .notEmpty()
  .withMessage("Enter Your First Name")
  .trim()
  .isLength({min:3})
  .withMessage("First Name must be at 3 characters long")
  .matches(/^[A-za-z\s]+$/)
  .withMessage("First Name should only alphabets"),
  check("lastName")
  .notEmpty()
  .withMessage("Enter Your First Name")
  .matches(/^[A-za-z\s]+$/)
  .withMessage("First Name should only alphabets"),
  
  check("email")
  .isEmail()
  .withMessage("Please enter a valid email "),
  check("password")
  .notEmpty()
  .withMessage("Enter Your password")
  .isLength({min:8})
  .withMessage("Password must be at 8 characters long")
  .matches(/[a-z]/)
  .withMessage("Passsword must contain at least one lowercase letter")
  .matches(/[A-Z]/)
  .withMessage("Passsword must contain at least one uppercase letter")
  .matches(/[!@#$%^&*(),.?":{}|<>]/)
  .withMessage("passsword must contain at least one special Charater")
  .trim()
  ,
  check("confirm_password")
  .trim()
  .custom((value,{req}) => {
    if(value !== req.body.password){
  throw new Error("Password do not match");
    }
    return true;
  }),
  check("userType")
  .notEmpty()
  .withMessage("Plaese select a userType")
  .isIn(['guest','host'])
  .withMessage("Invalid user Type"),

  check("terms")
  .notEmpty()
  .withMessage("Please accept the terms and condition")
  .custom((value,{req})=>{
    if(value !=="on"){
      throw new Error("Please accept the term and conditions")
    }
    return true;
  }),
// final handler middleware
  (req,res,next) =>{
    const {firstName,lastName,email,password,userType} = req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
   return res.status(422).render('auth/signup',{
    pageTitle:'Signup Page',
    isLoggedIn:false,
    errorMessages:errors.array().map(error =>error.msg),
    oldInput:{
      firstName,
      lastName,
      email,
      password,
      userType
    },
    user:{},
    
   });
    }
    bcrypt.hash(password,12).then(hashedPassword =>{
    const user = new User({firstName,lastName,email,password:hashedPassword,userType});
     return user.save();})
    .then(()=>{
      res.redirect("/login");
    }).catch(err =>{
      return res.status(422).render('auth/signup',{
        pageTitle:'Signup Page',
        isLoggedIn:false,
        errorMessages:[err.message],
        oldInput:{
          firstName,
          lastName,
          email,
          userType
        }
      });
    })
  

}]

  exports.postLogin = async (req,res,next) =>{
    const {email,password} = req.body;
    const user = await User.findOne({email});
    if(!user){
   return res.status(422).render("auth/login",{
    pageTitle:"Login page",
    isLoggedIn:false,
    errorMessages:['User does not exist'],
    oldInput:{email},user:{},
    });
  }
  const isMatch = await bcrypt.compare(password, user.password)
  if(!isMatch){
    return res.status(422).render("auth/login",{
      pageTitle:"Login page",
      isLoggedIn:false,
      errorMessages:['Invalid Credential'],
      oldInput:{email},user:{},
      });
    }
  req.session.isLoggedIn =true;
  req.session.user = user;
  await req.session.save();
  res.redirect("/");
}

  exports.postLogout = (req,res,next) =>{
  req.session.destroy(() =>{
    res.redirect("/login");
  });
  }

 

