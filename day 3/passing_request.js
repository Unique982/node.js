
const fs = require('fs');
const userRequestHandler = (req, res) => {
  console.log(req.url,req.method);
if (req.url === '/') {
  res.setHeader('Content-Text', 'text/html');
  res.write('<html>');
  res.write('<head><title>Form </title></head>');
  res.write('<body>');
  res.write('<h1>Login page</h1>');
  res.write('<form action="/submit-det" method="POST">');
  res.write('<label>Name:</label>');
  res.write('<input type="text" name="username" placeholder="Enter Your Username"><br>' );
  res.write('<label>Password:</label>');
  res.write('<input type="password" name="password" placeholder="Enter Your Password"><br>');
  res.write('<button type="submit" name="submit">Login</button>')
  res.write('</form></body>');
  res.write('</html>');
  return res.end();
}  else if(req.url.toLowerCase()==="/submit-det" && req.method=="POST"){
  const body = []; 
  req.on("data",chunk =>{
    console.log(chunk);
    body.push(chunk);
  });
  req.on("end",() =>{
    const fullbody =Buffer.concat(body).toString();
    console.log(fullbody);
    const params = new URLSearchParams(fullbody);
    const bodyobject = Object.fromEntries(params);
    console.log(bodyobject);
    
  fs.writeFileSync('user.txt',JSON.stringify(bodyobject));

  });


  res.statusCode = 302;
  res.setHeader('Location', '/');

}
res.setHeader('Content-Text','text/html');
res.write('<html>');
res.write('<head><title>Sending Response Day4</title></head>');
res.write('<body><h1>Hello World</h1><p>Sending Response Example</p></body>');
res.write('</html>');
res.end();
};

module.exports=userRequestHandler;
