

const express = require('express');
const app =express();

app.use((req, res, next)=>{
  console.log("First Middleware", req.url,req.method);
  next();
})
app.use((req, res, next)=>{
  console.log("Second Middleware", req.url,req.method);
 res.send("Welcome to Admin dashboard");
})



const port = 8800;
app.listen(port,()=>{
  console.log(`Server running on address: http://localhost:${port}`);

});