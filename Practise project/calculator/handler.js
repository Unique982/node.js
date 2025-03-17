const { sumHandler }= require('./sum')
const requestHanlder = (req, res) => {
  console.log(req.url, req.method);
  if (req.url === "/") {
    res.setHeader("Content-Text", "text/html");
    res.write(`<html>
      <head>
      <title>Calculator </title>
      </head>
      <body>
      <h1> Welcome to Home</h1>
      <a href="/calculator">Calculator</a> 
      </body></html>
      `);
      return res.end();
  }
  else if(req.url.toLowerCase()==='/calculator'){
    res.setHeader('Context-Text','text/html');
    res.write(`<html>
      <head><title> Calculator Page</title>
      </head>
      <body>
      <h1> Calculator </h1>
      <form action="/calculator-result" method="POST">
    
      <div><label>Num 1</label>
      <input type="text" name="num1" placeholder="Enter Your Num1!"></div>

        <div><label>Num 2</label>
      <input type="number" name="num2" placeholder="Enter Your Num2!"></div>
      <div>
      <button type='submit' name='submit'>Sum</button>
      </div>
      </form>
      </body></html>
      `);
      return res.end();
  }
  else if(req.url.toLowerCase() === '/calculator-result' && req.method ==='POST'){
    return sumHandler(req,res);
  }
  res.setHeader("Content-Text", "text/html");
  res.write(`<html>
    <head>
    <title>Not Found Page </title>
    </head>
    <body>
    <h1> 404 Not Found Page</h1>
    <a href="/">Go To home</a> 
    </body></html>
    `);
    return res.end();
};
exports.requestHanlder = requestHanlder;
