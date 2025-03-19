
const express = require('express');

const app =express();
app.use((req, res, next)=>{
  console.log("1st Dummy Middleware",req.url,req.method);
  next();
})
app.use((req, res, next)=>{
 console.log("second Dumny Middleware",req.url,req.method);
  next();
});
// app.use((req,res,next)=>{
//   console.log('3rd Middleware');
//   res.send('<h1>Welcone</h1>')
// })
app.get("/",(req, res, next)=>{
  console.log("Handing / Path",req.url, req.method);
  res.send("<h1>Handle path</h1>")
})
app.get("/contact_us",(req, res, next)=>{
  console.log("handling / path using conatct-us",req.url,req.method);
  res.send(`<p>Welcome Contact Us page</p>
    <form action ="/contact_us" method="POST">
    <div> 
    <label>Name:</label>
    <input type="text" name ="name" placeholder="Enter your name">
    </div>
     <div> 
    <label>Email:</label>
    <input type="email" name ="email" placeholder="Enter your email">
    </div>
     <div> 
    <label>Phone:</label>
    <input type="number" name ="phone" placeholder="Enter your phone">
    </div>
     <div> 
    <input type="submit" name ="submit" value="send">
    </div>
    </form>
    `);

});
app.post("/contact_us",(req,res,next)=>{
  console.log("handle post",req.url,req.method);
  res.send("<h1>Thank you! Your form Submit Successfully!</h1>")
})

const PORT = 8000;
app.listen(PORT,()=>{
  console.log(`Server running on address: http://localhost:${PORT}`);
});