const sumHandler = (req, res) =>{
  console.log('In Sum Handler',req.url);
  const body = [];
  req.on('data',chunk => body.push(chunk));
  req.on('end',() => {
    const bodyStr= Buffer.concat(body).toString();
    const params = new URLSearchParams(bodyStr);
    const bodyObj = Object.fromEntries(params);
    const result =Number(bodyObj.num1) + Number(bodyObj.num2);
    console.log(result);
    res.setHeader("Content-Text", "text/html");
  res.write(`<html>
    <head>
    <title>Not Found Page </title>
    </head>
    <body>
    <h1>Your Result is ${result} </h1>
    
    </body></html>
    `);
    return res.end();

  });
  
}
exports.sumHandler = sumHandler;
