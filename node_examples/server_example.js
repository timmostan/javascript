var server = require("http").createServer();
//Create a Server instance
server.on("request", (request, response) => {
  var body = [];
  //Attach listeners to the request event of the server object
  request.on("data", chunk => {
    //Parse request body in chanks
    body.push(chunk);
  });
  request
    .on("end", () => {
      //Parse request body - concat all chunks in the end
      let bodyString = body.concat().toString();
      //Sending Response to the client - response back with same text what client sent in request
      response.end(bodyString);
    })
    //request error listener
    .on("error", () => {
      response.statusCode = 400;
      response.end();
    });
  //response error listener
  response.on("error", err => {
    console.err(err);
  });
});
server.listen(8008, () => {
  console.log("Server listening at 8008");
});

//Run after starting: curl -d “Hello World” -H “Content-Type: text” -X POST http://localhost:8008