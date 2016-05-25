var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main-layout'});

var bodyParser = require('body-parser');

var session = require('express-session');

var request = require('request');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({secret:'charliewhisky'}));

app.engine('handlebars', handlebars.engine); //dont need to write home.handlebars
app.set('view engine', 'handlebars');
app.set('port', 3000);


app.get('/',function(req,res,next){
  var context = {};
  request('http://api.openweathermap.org/data/2.5/weather?q=corvallis,or&units=imperial&appid=53eff64734ffc4266254f842592e4939', function(err, response, body){
    if(!err && response.statusCode < 400){
		var something = JSON.parse(body);
		//console.log(res);
		console.log(body);
		context.temp = something.main.temp;
      res.render('home',context);
    } else {
      if(response){
        console.log(response.statusCode);
      }
      next(err);
    }
  });
});

app.post('/',function(req,res,next){
  var context = {};
  request('http://api.openweathermap.org/data/2.5/weather?q=corvallis,or&units=imperial&appid=53eff64734ffc4266254f842592e4939', function(err, response, body){
    if(!err && response.statusCode < 400){
		var whatever = JSON.parse(body);
		//console.log(res);
		console.log(body);
		context.temp = whatever.main.temp;
      res.render('home',context);
    } else {
      if(response){
        console.log(response.statusCode);
      }
      next(err);
    }
  });
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});