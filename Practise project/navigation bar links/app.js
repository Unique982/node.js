const http = require("http");
const server = http.createServer((req, res) => {
  console.log(req.url, req.method);
  if(req.url.toLowerCase() ==='/home'){
    res.write(`<h1>Welecome To Home page</h1>`)
    return res.end();
  }else if(req.url.toLowerCase()==='/about'){
    res.write(`<h1>Welecome To About page</h1>`)
    return res.end();
  }else if(req.url.toLowerCase()==='/service'){
    res.write(`<h1>Welecome To Service page</h1>`)
    return res.end();
  }
  else if(req.url.toLowerCase()==='/project'){
    res.write(`<h1>Welecome To Project page</h1>`)
    return res.end();
  }
  else if(req.url.toLowerCase()==='/skill'){
    res.write(`<h1>Welecome To Skill page</h1>`)
    return res.end();
  }
  else if(req.url.toLowerCase()==='/blog'){
    res.write(`<h1>Welecome To Blog page</h1>`)
    return res.end();
  }else if(req.url.toLowerCase()==='/contact-us'){
    res.write(`<h1>Welecome To Contact page</h1>`)
    return res.end();
  }
  res.write(`<html>
    <head><title>Nav Bar </title>
    </head>
    <body>
    <nav>
    <ul>   
    <li><a href="/home">Home</a></li>
    <li><a href="/about">About us</a></li>
    <li><a href="/service">Service</a></li>
    <li><a href="/project">My Project</a></li>
    <li><a href="/skill">Skill</a></li>
    <li><a href="/blog">Blog</a></li> 
    <li><a href="/contact-us">Contact Us</a></li>
    </nav> 
    </body>
    </html>
    `);
    res.end();
});
const port = 8800;
server.listen(port, () => {
  console.log(`server running on address :http://localhost:${port}`);
});
