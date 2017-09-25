var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var _ = require('lodash');
//var _ = require('underscore');

//express.statuc is middleware function used to serve the static files in the directory.
//It looks for index.html in root directory to serve on GET to '/'
app.use(express.static('client'));

//body parser makes it possible to post JSON to server
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var lions = [{'name': 'Simba', 'pride': 'Pride cats', 'id': 1, 'gender': 'female', 'age': 2}];
var id = 0;

//routes to paths
app.get('/lions', function (req, res) {
  res.json(lions);
});

app.get('/lions/:id', function(req, res){
  var lion = _.find(lions, {'id': parseInt(req.params.id) });

  res.status(200);
  res.setHeader('Content-Type', 'application/json');
  res.json(lion || {});
});

app.post('/lions', function(req, res){
  id += 1;
  req.body.id = id;
  lions.push(req.body);
  res.json(req.body);
});

app.put('/lions/:id', function(req, res){
  var id = req.body.params.id;
  var index = _.findIndex(lions, { 'id': parseInt(id)});

  if(!lions[index]){
    res.end();
  } else {
    var updatedLion = _.assign(lions[index], req.body);
    res.json(updatedLion);
  }
});

app.delete('/lions/:id', function(req, res){
  var id = req.body.parms.id;
  var index = _.findIndex(lions, { 'id': parseInt(id)});
  var deletedLion = lions[index];
  if(!lions[index]){
    res.end();
  } else {
    lions.splice(index, 1);
    res.json(deletedLion);
  }
});

app.set('port', 3000)
app.listen(3000, function(){
  console.log('listening on port ' + app.get('port'));
});

