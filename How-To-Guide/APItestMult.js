document.addEventListener('DOMContentLoaded', bindButtons);

function bindButtons(){
	document.getElementById('reqSubmit').addEventListener('click', function(event){
		var inputQuery = document.getElementById('query').value;
		var req = new XMLHttpRequest();
		req.open("GET", "http://www.anapioficeandfire.com/api/" + inputQuery, true);
		req.addEventListener('load',function(){
			var response = JSON.parse(req.responseText);
			console.log(response);
			var resultList = "";
			for (var obj in response){
				resultList += "<li>" +  response[obj].name + "<br>" +
							"culture: " + response[obj].culture + "<br>" +
							"born: " + response[obj].born + "<br>" +
							"died: " + response[obj].died + "<br>" +
							"aliases: ";// + "<ul>";		
				for (var i in response[obj].aliases){
					resultList += response[obj].aliases[i] + ", ";
				}
				resultList += "</li><br>";
			}
			document.getElementById('result').innerHTML = resultList;
		});
		req.send(null);
		event.preventDefault();
	});
}