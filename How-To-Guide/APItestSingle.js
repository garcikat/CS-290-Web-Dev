document.addEventListener('DOMContentLoaded', bindButtons);

function bindButtons(){
	document.getElementById('reqSubmit').addEventListener('click', function(event){
		var inputQuery = document.getElementById('query').value;
		var req = new XMLHttpRequest();
		req.open("GET", "http://www.anapioficeandfire.com/api/" + inputQuery, false);
		req.addEventListener('load',function(){
			var response = JSON.parse(req.responseText);
			console.log(response);
			var aliasesList = "";
			for (var i in response.aliases){
				aliasesList += response.aliases[i] + ", ";
			}
			var allegiancesList = "";
			for (var j in response.allegiances){
				var req2 = new XMLHttpRequest();
				req2.open("GET", response.allegiances[j], false);
				req2.send(null);
				var response2 = JSON.parse(req2.responseText);
				
				allegiancesList += response2.name + ", ";
			}
			document.getElementById('name').textContent = response.name;
			document.getElementById('culture').textContent = response.culture;
			document.getElementById('born').textContent = response.born;
			document.getElementById('aliases').textContent = aliasesList;
			document.getElementById('allegiances').textContent = allegiancesList;
		});
		req.send(null);
		event.preventDefault();
	});
}