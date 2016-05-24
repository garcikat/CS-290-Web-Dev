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
  
 	//If there is no session, go to the main page.
	if(!req.session.name){
		res.render('login-view', context);
		return;
	}
	
	context.name = req.session.name;
	context.toDoCount = req.session.toDo.length || 0;
	//context.toDo = req.session.toDo || [];
	console.log(context.toDo);
	
	var context.toDo = {};
	var cityTemps = [];
 for( item in req.session.toDo){
  request('http://api.openweathermap.org/data/2.5/weather?q='+item.city+ '&units=imperial&appid=53eff64734ffc4266254f842592e4939', function(err, response, body){
    if(!err && response.statusCode < 400){
		var something = JSON.parse(body);
		cityTemps.push(something.main.temp);
		
		//console.log(body);
		//item.temp = something.main.temp;

    } else {
      if(response){
        console.log(response.statusCode);
      }
      next(err);
    }
  });
  }
  
 	//create toDo list
	context.toDo = {};
	for (var i in session.toDo.lenth){
		if(cityTemps[i] >= session.toDo[i].min){
			var color = true;
		}
		else{
			var color = false;
		}
		context.toDo.push({"name":session.toDo[i].name, "city":session.toDo[i].city, "min": session.toDO[i].min, "color":color, "id":session.toDO[i].id });
	}
  
 	res.render('todoList-view',context);
});

app.post('/',function(req,res,next){
  var context = {};
  

  //started account
  if(req.body['New List']){
    req.session.name = req.body.name;
    req.session.toDo = [];
    req.session.curId = 0;
  }

  //If there is no session, go to the main page.
  if(!req.session.name){
    res.render('login-view', context);
    return;
  }

  
  if(req.body['Add Item']){
    req.session.toDo.push({"name":req.body.name, "city":req.body.city, "min":req.body.min, "temp": 0, "id":req.session.curId});
    req.session.curId++;
  }

  if(req.body['Done']){
    req.session.toDo = req.session.toDo.filter(function(e){
      return e.id != req.body.id;
    })
  }
  
  //create a second list with all current temps in cities
  var cityTemps = [];
  
  for( item in req.session.toDo){
  request('http://api.openweathermap.org/data/2.5/weather?q='+item.city+'&units=imperial&appid=53eff64734ffc4266254f842592e4939', 
  function(err, response, body){
    if(!err && response.statusCode < 400){
		var whatever = JSON.parse(body);
		cityTemps.push(whatever.main.temp);
		
		//console.log(body);
		//item.temp = whatever.main.temp;
		//res.render('todoList-view',context);
    } 
	else {
      if(response){
        console.log(response.statusCode);
		}
      next(err);
    }
  });
  }
 
	//create toDo list
	context.toDo = {};
	for (var i in session.toDo.lenth){
		if(cityTemps[i] >= session.toDo[i].min){
			var color = true;
		}
		else{
			var color = false;
		}
		context.toDo.push({"name":session.toDo[i].name, "city":session.toDo[i].city, "min": session.toDO[i].min, "color":color, "id":session.toDO[i].id });
	}
  
    context.name = req.session.name;
	context.toDoCount = req.session.toDo.length;
	//context.toDo = req.session.toDo;
	console.log(context.toDo);
	res.render('todoList-view',context);
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