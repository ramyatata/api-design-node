// TODO: make a new router for the tigers resource
// and make some REST routes for it, exactly like for lions
// make a middleware that just logs the word 'tiger' to the console
// when a request comes in to the server

var express = require('express');
var router = express.Router();
var _ = require('lodash');

var tigers = [{'name': 'chewww', 'id': '1'}];
var id = 0;

var tiger = function(req, res, next){
  var tig = _.find(tigers, {'id': req.params.id});
  req.tiger = tig;
  next();
}

var updateId = function(req, res, next){
  console.log(JSON.stringify(req.body, 2, null));
  id++;
  req.body.id = id.toString();
  console.log(JSON.stringify(req.body));
  next();
}

router.get('/', function(req, res){
  res.json(tigers);
});

router.get('/:id', tiger, function(req, res){
  res.json(req.tiger || {});
});

router.post('/', updateId, function(req, res){
  console.log(JSON.stringify(req.body));
  tigers.push(req.body);
  res.json(req.body);
});

router.put('/:id', function(req, res){
  var ind = _.findIndex(tigers, {'id': req.params.id});
  _.assign(tigers[ind], req.body);
  res.json(tigers[ind]);
});

router.delete('/:id', function(req, res){
  var id = req.params.id;
  console.log('delete id: '+ id);
  var ind = _.findIndex(tigers, {'id': id});
  var tiger = tigers[ind];
  console.log(JSON.stringify(tiger));
  tigers = tigers.splice(ind, 1);
  res.json(tiger);
});

module.exports = router;

