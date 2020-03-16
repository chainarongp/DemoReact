const express = require('express');
const app = express();
app.use(express.json());
var fs = require('fs');
var url = require('url');
var path = require('path');
app.use(express.static("public"));

app.use("/public", express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.send('<h1>Hello Fucking World</h1>');

    app.post('/', function(request, response){
      console.log(request.body);      // your JSON
      response.send(request.body);    // echo the result back
    });

});

app.get('/index', (req, res) => {
fs.readFile("Index.html", function(err, data) {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end("404 Not Found");
    } 
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
 
  });
  //res.send(/index.html);
});

app.get('/api/movies', (req, res) => {
  var movies= []; 
  var i;
  
  for (i = 0; i < 10; i++) {
            movies.push({ id: i, name: 'abc'+i, type:"series", isPublished:false });
    }
     res.send(movies);
});

app.get('/mqtt', (req, res) => {
   
  var mqtt = require('mqtt')
  var client  = mqtt.connect('mqtt://test.mosquitto.org')
 
client.on('connect', function () {
  client.subscribe('presence', function (err) {
    if (!err) {
      client.publish('presence', 'Hello mqtt')
    }
  })
})
 
client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
  client.end()
})
});

app.get('/Vue', (req, res) => {
fs.readFile("Layout.html", function(err, data) {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end("404 Not Found");
    } 
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
  //res.send(/index.html);
});

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port${port}...`) );

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
