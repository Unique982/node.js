 const http = require('http');
  const server = http.createServer((req,res)=>{
    console.log(req.url,req.method,req.headers);

    // Sending Response
    res.setHeaderheaders('Content-Text','text/html');
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