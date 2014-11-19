var express = require('express');
var app = express();
var hbs = require('hbs');
//var hbs = require('handlebars');
var request = require('request');
var http = require('http');
var path = require('path');
var route = require('./routes/route');


app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  //app.set('view engine', 'jade');
  //app.engine('html', require('ejs').renderFile);
  app.use('/', express.static(__dirname + '/public'));
  /* from original start */
  app.engine('html', hbs.__express);
  //app.engine('html', hbs.engine);
  /* from original end */
  //app.use(express.favicon());
  app.use(express.favicon(__dirname + '/public/img/favicon.ico'));
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

//app.get('/charts/pie/:datetime/:day', route.charts_pie);

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', route.index);

app.post('/power', route.power);
app.post('/divide', route.divide);
app.post('/multiply', route.multiply);
app.post('/minus', route.minus);
app.post('/plus', route.plus);
//app.post('/power', route.power);

//app.listen(3000);
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
