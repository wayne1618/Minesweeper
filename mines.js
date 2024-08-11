var field;
var mineField;
var gameOver = false;

var goal;

const difficulties = ["Easy", "Intermediate", "Hard"];
const diffs = ["beginner", "intermediate", "expert"];

var difficulty = 1;

const width = [8, 16, 30];
const height = [8, 16, 16];
const totalMines = [10, 40, 99];

const value = ["","1","2","3","4","5","6","7","8"];

window.onload = function () {
	setGame();
}

function setGame () {
	goal = width[difficulty] * height[difficulty] - totalMines[difficulty];
	gameOver = false;
	/*field =    [[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
				[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
				[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
				[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
				[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
				[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
				[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
				[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
				[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
				[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
				[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
				[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
				[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
				[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
				[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
				[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']];
				
	mineField =[['1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1'],
				['1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1'],
				['1', '1', '1', '1', '1', '1', '1', '1', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
				[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
				[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
				[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
				[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
				[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
				[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
				[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
				[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
				[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
				[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
				[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
				[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
				[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']];*/
		
	field = new Array(height[difficulty]);
	mineField = new Array (height[difficulty]);
	for (let i = 0; i < height[difficulty]; i++) {
		field[i] = new Array(width[difficulty]).fill(' ');
		mineField[i] = new Array(width[difficulty]).fill(' ');
	}
	for (let i = 0 ; i < totalMines[difficulty]; i++)
		mineField[Math.floor(i / width[difficulty])][i % width[difficulty]] = '1';
				
	/*field = [
		[' ',' ', ' ',' ',' ',' ', ' ',' '],
		[' ',' ', ' ',' ',' ',' ', ' ',' '],
		[' ',' ', ' ',' ',' ',' ', ' ',' '],
		[' ',' ', ' ',' ',' ',' ', ' ',' '],
		[' ',' ', ' ',' ',' ',' ', ' ',' '],
		[' ',' ', ' ',' ',' ',' ', ' ',' '],
		[' ',' ', ' ',' ',' ',' ', ' ',' '],
		[' ',' ', ' ',' ',' ',' ', ' ',' ']];
		
	mineField = [
		[' ',' ', ' ',' ',' ',' ', ' ',' '],
		[' ','1', ' ',' ',' ',' ', ' ',' '],
		[' ',' ', ' ',' ',' ',' ', ' ',' '],
		[' ',' ', ' ',' ',' ','1', ' ',' '],
		[' ',' ', '1',' ',' ',' ', ' ',' '],
		[' ',' ', ' ',' ',' ',' ', ' ',' '],
		[' ',' ', ' ',' ',' ',' ', ' ',' '],
		[' ',' ', ' ',' ',' ',' ', ' ',' ']];*/
				
	shuffleMines();
	
	for (let r = 0 ; r < height[difficulty]; r++) {
		for (let c = 0 ; c < width[difficulty]; c++) {
			//<div id="0-0"></div>
			let tile = document.createElement("div");
			tile.id = r.toString() + "-" + c.toString();
			tile.classList.add("tile");
			tile.classList.add("unchecked");
			tile.addEventListener("click", checkTile);
			document.getElementById("field").append(tile);
		}
	}
	
	let diffButtons = document.getElementsByClassName("difficulty");
	
	for (let e = 0; e < diffButtons.length; e++)
		diffButtons[e].addEventListener("click", setDiff);
}

function setDiff () {
	difficulty = difficulties.indexOf(this.id);
	document.getElementById("field").setAttribute("class", diffs[difficulty]);
	var tiles = document.getElementsByClassName("tile");
	while(tiles.length > 0)
		tiles [0].remove();
	document.getElementsByTagName("h1").innerText = difficulty;
	setGame();
}

function checkTile () {
	
	if (gameOver) {
		return;
	}
	
	let coords = this.id.split("-");
	let r = parseInt (coords[0]);
	let c = parseInt (coords[1]);
	
	if (field[r][c] == 'x')
		return;
	
	goal--;
	
	if (mineField [r][c] != '1'){
		field[r][c] = 'x';
		this.classList.add("checked");
		this.innerText = value[checkMines(r, c)];
		if (checkMines(r,c)==0)	
			for (let i = Math.max (0, r - 1); i < Math.min (height[difficulty], r + 2); i++)
				for (let j = Math.max (0, c - 1); j < Math.min (width[difficulty], c + 2); j++)
					document.getElementById(i+"-"+j).click();
	}
	else {
		for (let r = 0; r < height[difficulty];  r ++) 
			for (let c = 0; c < width[difficulty];  c ++)
				if (mineField[r][c]=='1')
					document.getElementById(r + "-" + c).innerText = '\u263C';
		if(confirm("You lost!"))
			setGame();
		else
			gameOver = true;
	}
	
	if (goal == 0) {
		gameOver = true;
		alert("You have won!");
	}
}

function checkMines (r, c) {
	let numMines = 0;
	for (let i = Math.max (0, r - 1); i < Math.min (height[difficulty], r + 2); i++)
		for (let j = Math.max (0, c - 1); j < Math.min (width[difficulty], c + 2); j++)
			if (mineField[i][j] == '1')
				numMines++;
	return numMines;
}
	
function shuffleMines () {
	for (let i = 0 ; i < 5; i++)
		for(let j = 0; j < height[difficulty] * width[difficulty]; j++){
			let r = Math.floor(Math.random() * (height[difficulty] * width[difficulty]));
			let temp = mineField[Math.floor(r / width[difficulty])][r % width[difficulty]];
			mineField[Math.floor(r / width[difficulty])][r % width[difficulty]] = mineField[Math.floor(j / width[difficulty])][j % width[difficulty]];
			mineField[Math.floor(j / width[difficulty])][j % width[difficulty]] = temp;
		}
}
