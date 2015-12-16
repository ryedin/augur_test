var express = require('express'),
  app = express(),
  uuid = require('node-uuid');

//naive in-memory cache of tagged browsers
var browsers = {};

//simple static middleware handlers for public and bower_components
app.use('/', express.static('public'));
app.use('/bower_components', express.static('bower_components'));

//dynamic route handler for the tag.js asset
app.get('/tag.js', function(req, res) {

  //no need to validate the value; presence of this header is enough to know the browser has already received a tag
  if (req.headers['if-modified-since']) {
    //tell the browser to use the cached file (thus satisfying the requirement of tagging the browser without relying on cookies)
    return res.status(304).end();
  }

  //make sure the browser sends an 'if-modified-since' header next time
  res.set({
    'Cache-Control': 'public, max-age=0',
    'Last-Modified': new Date(),

    //for posterity
    'Content-Type': 'application/javascript'
  });

  //generate a new id and respond with a naive/simplistic js file that simply sets a global
  var id = uuid.v4();
  res.status(200).send('var tag = "' + id + '";');
});

//dynamic route for naive cache-based browser tracking metrics
app.get('/report/:tag', function(req, res) {
  var tag = req.params.tag;

  if (typeof browsers[tag] === 'undefined') {
    browsers[tag] = 1;
  } else {
    browsers[tag]++;
  }

  //log visits (i.e. send to back end analytics server, etc...)
  console.log('browser %s has visited %s times', tag, browsers[tag]);
});

var server = app.listen(3000, function() {
  console.log('app listening on port 3000');
});