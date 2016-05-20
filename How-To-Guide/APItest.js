document.addEventListener('DOMContentLoaded', bindButtons);

function bindButtons(){
	document.getElementById('reqSubmit').addEventListener('click', function(event){
		var reqChar = document.getElementById('query').value;
		var req = new XMLHttpRequest();
		req.open("GET", "http://www.anapioficeandfire.com/api/characters?culture=" + reqChar + "&pageSize=50", true);
		req.addEventListener('load',function(){
			if(req.status >= 200 && req.status < 400){
				console.log(JSON.parse(req.responseText));
				var response = JSON.parse(req.responseText);
				var resultList = "";
				for (var obj in response)
				{
					resultList += "<li>" + response[obj].name + "</li>" + "<br>";
				}
				document.getElementById('results').innerHTML = resultList;
				//document.getElementById('name').textContent = response[0].name;
				//document.getElementById('gender').textContent = response[0].gender;
				//document.getElementById('born').textContent = response[0].born;
				//document.getElementById('died').textContent = response[0].died;
				//document.getElementById('culture').textContent = response[0].culture;
			}
			else{
				console.log("Error in network request: " + request.statusText);
			}
		});
		req.send(null);
		event.preventDefault();
	});
}