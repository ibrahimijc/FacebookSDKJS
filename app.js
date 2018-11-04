const express = require('express');
var https = require('https');

var app = express();

app.set("view engine", "ejs");
app.use("/assets", express.static("assets"));

app.get('/',function(req,res){
//res.send("this is the contact page");
res.render('FB');
});


// https.createServer(app)
//   .listen(3000, function () {
//     console.log('Example app listening on port 3000! Go to https://localhost:3000/')
//   })
  



app.listen(3000);
console.log("listening at 3000");
