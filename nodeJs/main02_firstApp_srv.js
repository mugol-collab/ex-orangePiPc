var http = require("http");     //import require module 

http.createServer(function (request, response)
{
    // Send the HTTP header 
    // HTTP Status: 200 : OK
    // Content Type: text/plain
    response.writeHead(200, {'Content-Type': 'text/plain'});

    // send the response body as "Hello From OrangePi!!!"
    response.end('Hello From OrangePi!!!');
}).listen(8081);

// Console will print the message
console.log('Server running at http://192.168.0.23:8081/');