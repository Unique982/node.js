 const http = require('http');
  const server = http.createServer((req,res)=>{
    console.log(req.url,req.method,req.headers);
    if(req.url==='/'){
    res.setHeader('Content-Text','text/html');
    res.write('<html>');
    res.write('<head><title>Sending Response Day4</title></head>');
    res.write('<body><h1>Hello World</h1><p>Sending Response Example</p></body>');
    res.write('</html>');
    return res.end();
      }
      else if(req.url==='/admin'){
        res.setHeader('Content-Text','text/html');
    res.write('<html>');
    res.write('<head><title>Admin </title></head>');
    res.write('<body><h1>Hello Admin</h1><p>email:testingadmin111@gmail.copm</p></body>');
    res.write('</html>');
    return res.end();
      }
     

    // Sending Response
    res.setHeader('Content-Text','text/html');
    res.write('<html>');
    res.write('<head><title>Sending Response Day4</title></head>');
    res.write('<body><h1>Hello World</h1><p>Sending Response Example</p></body>');
    res.write('</html>');
    res.end();
  });
   
  const port = 8800;
  server.listen(port,()=>{
  console.log(`Server running an address:http://localhost:${port}`);
  });