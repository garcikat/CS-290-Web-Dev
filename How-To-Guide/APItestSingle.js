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
			for (var i in response[0].aliases){
				aliasesList += response[0].aliases[i] + ", ";
			}
			document.getElementById('name').textContent = response[0].name;
			document.getElementById('culture').textContent = response[0].culture;
			document.getElementById('born').textContent = response[0].born;
			document.getElementById('aliases').textContent = aliasesList;
		});
		req.send(null);
		event.preventDefault();
	});
}