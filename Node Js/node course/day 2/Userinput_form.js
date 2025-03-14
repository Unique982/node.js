const http = require("http");
const fs = require('fs');
const server = http.createServer((req, res) => {
  console.log(req.url,req.method,req.headers);
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
  fs.writeFileSync('user.txt','Testing');
  res.statusCode = 302;
  res.setHeader('Location', '/');

}
res.setHeader('Content-Text','text/html');
res.write('<html>');
res.write('<head><title>Sending Response Day4</title></head>');
res.write('<body><h1>Hello World</h1><p>Sending Response Example</p></body>');
res.write('</html>');
res.end();
});

const port = 8800;
server.listen(port, () => {
  console.log(`Server running an address:http://localhost:${port}`);
});
