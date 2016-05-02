function createTable(){
	var newTable = document.createElement("table");

	newTable.appendChild(tableHeader());
	newTable.appendChild(tableBody());

	body.appendChild(newTable);
}

function tableHeader(){
	var header = document.createElement("thead");
	var newRow = document.createElement("tr");
	//add cells to row
	for( var i = 1; i < 5; i++){
		var text = "Header" + i;
		newRow.appendChild(addCell(text, true));
	}	
	//add row to table header
	header.appendChild(newRow);
	return header;
}

function tableBody(){
	var body = document.createElement("tbody");
	for( var i = 1; i < 5; i++){
		var newRow = document.createElement("tr");
		for( var j = 1; j < 5; j++){
			var cellText = j.toString() + " , " + i.toString();
			var newCell = addCell( cellText, false);
			newCell.className = j.toString();
			newRow.appendChild(newCell);
		}
		body.appendChild(newRow);
	}
	return body;
}

function addCell(text, header){
	if(header){
		var cell = document.createElement("th");
		cell.className = "headerCell";
	}
	else{
		var cell = document.createElement("td");
	}
	cell.textContent = text;
	cell.style.border = "thin solid black";

	return cell;
}

function addButtons(){
	var upButton = document.createElement("button");
	upButton.textContent = "UP";
	upButton.addEventListener("click", moveUp);
	upButton.id = "up";
	body.appendChild(upButton);
	
	var downButton = document.createElement("button");
	downButton.textContent = "DOWN";
	downButton.id = "down";
	downButton.addEventListener("click", moveDown);
	body.appendChild(downButton);
	
	var leftButton = document.createElement("button");
	leftButton.textContent = "Left";
	leftButton.id = "left";
	leftButton.addEventListener("click", moveLeft);
	body.appendChild(leftButton);
	
	var rightButton = document.createElement("button");
	rightButton.textContent = "Right";
	rightButton.id = "right";
	rightButton.addEventListener("click", moveRight);
	body.appendChild(rightButton);
	
	var markButton = document.createElement("button");
	markButton.textContent = "Mark Cell";
	markButton.id = "mark";
	markButton.addEventListener("click", markCell);
	body.appendChild(markButton);
}

function markCell(){
	currentCell.style.backgroundColor = "yellow";
}

function selectCell(){
	if(currentCell.className != null || currentCell.className != "headerCell"){
		currentCell.style.borderWidth = "thick";
		var colNum = currentCell.className;
		console.log(colNum);
	}
}

function moveRight(){
	if(currentCell.nextElementSibling.className != "headerCell" ||
	currentCell.nextElementSibling.className != null){
		currentCell.style.borderWidth = "thin";
		currentCell = currentCell.nextElementSibling;
		selectCell();
	}
}

function moveLeft(){
	if(currentCell.previousElementSibling.className != "headerCell" ||
	currentCell.previousElementSibling.className != null){	
		currentCell.style.borderWidth = "thin";
		currentCell = currentCell.previousElementSibling;
		selectCell();
	}
}

function moveDown(){
	var downCell = currentCell.parentNode;//tr
	downCell = downCell.nextElementSibling;//next tr down
	downCell = downCell.firstElementChild;//first td
	for(var j = 1; j < currentCell.className; j++){
		downCell = downCell.nextElementSibling;
	}		
	if(downCell.className != "headerCell" || downCell.className != null){
		currentCell.style.borderWidth = "thin";
		currentCell = downCell;
		selectCell();
	}
}	

function moveUp(){
	var upCell = currentCell.parentNode;//tr
	upCell = upCell.previousElementSibling;//next tr up
	upCell = upCell.firstElementChild;//first td
	for(var j = 1; j < currentCell.className; j++){
		upCell = upCell.nextElementSibling;
	}		
	if(upCell.className != "headerCell" || upCell.className != null){
		currentCell.style.borderWidth = "thin";
		currentCell = upCell;
		selectCell();
	}	
}
//set up table and buttons
var body = document.body;
createTable();
addButtons();

//set the current cell
var currentCell = body.firstElementChild; //script
currentCell = currentCell.nextElementSibling;//table
currentCell = currentCell.lastElementChild; //tbody
currentCell = currentCell.firstElementChild;//tr
currentCell = currentCell.firstElementChild;//td
selectCell();