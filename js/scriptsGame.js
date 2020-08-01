window.onload = initialize;

function initialize() {
	var buttonDifficultyEasy = document.getElementById("button-easy");
	buttonDifficultyEasy.addEventListener("click", changeDifficultyToEasy);
	var buttonDifficultyHard = document.getElementById("button-hard");
	buttonDifficultyHard.addEventListener("click", changeDifficultyToHard);
	var buttonX = document.getElementById("button-X");
	buttonX.addEventListener("click", changeSignToX);
	var buttonO = document.getElementById("button-O");
	buttonO.addEventListener("click", changeSignToO);
	var creditsButton = document.getElementById("credits-button");
	creditsButton.addEventListener("click", credits);
	var replayButton = document.getElementById("replayButton");
	replayButton.addEventListener("click", startGame);
	document.getElementById("button-easy").onmouseover = function () { mouseOver() }
	document.getElementById("button-easy").onmouseout = function () { mouseOut() }
	document.getElementById("button-hard").onmouseover = function () { mouseOver2() }
	document.getElementById("button-hard").onmouseout = function () { mouseOut2() }
	document.getElementById("button-O").onmouseover = function () { mouseOver3() }
	document.getElementById("button-O").onmouseout = function () { mouseOut3() }
	document.getElementById("button-X").onmouseover = function () { mouseOver4() }
	document.getElementById("button-X").onmouseout = function () { mouseOut4() }
	document.getElementById("button-O").style.color = "Red";
	document.getElementById("button-easy").style.color = "Red";
}

function handleEnter(e){
    var keycode = (e.keyCode ? e.keyCode : e.which);
    if (keycode == '32') {
        startGame();
    }
}

var estoyEncimaDeLaDificultad = false;
function mouseOver() {
	document.getElementById("button-easy").style.color = "pink";
}

function mouseOut() {
	if (difficulty == easy) {
		document.getElementById("button-easy").style.color = "red";
	} else {
		document.getElementById("button-easy").style.color = "black";
	}
}

function mouseOver2() {
	document.getElementById("button-hard").style.color = "pink";
}

function mouseOut2() {
	if (difficulty == hard) {
		document.getElementById("button-hard").style.color = "red";
	} else {
		document.getElementById("button-hard").style.color = "black";
	}
}

function mouseOver3() {
	document.getElementById("button-O").style.color = "pink";
}

function mouseOut3() {
	if (huPlayer == 'O') {
		document.getElementById("button-O").style.color = "red";
	} else {
		document.getElementById("button-O").style.color = "black";
	}
}

function mouseOver4() {
	document.getElementById("button-X").style.color = "pink";
}

function mouseOut4() {
	if (huPlayer == 'X') {
		document.getElementById("button-X").style.color = "red";
	} else {
		document.getElementById("button-X").style.color = "black";
	}
}

var origBoard;
var huPlayer = 'O';
var aiPlayer = 'X';
function changeSignToX() {
	huPlayer = "X";
	aiPlayer = "O";
	document.getElementById("button-X").style.color = "Red";
	document.getElementById("button-O").style.color = "Black";
	startGame();
}
function changeSignToO() {
	huPlayer = "O";
	aiPlayer = "X";
	document.getElementById("button-X").style.color = "Black";
	document.getElementById("button-O").style.color = "Red";
	startGame();
}
function credits() {
	window.alert("Juego creado por: David Orive");
}
const winCombos = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[6, 4, 2]
]

var difficulty = easy;

function changeDifficultyToEasy() {
	difficulty = easy;
	document.getElementById("button-easy").style.color = "Red";
	document.getElementById("button-hard").style.color = "Black";
	startGame();
}

function changeDifficultyToHard() {
	difficulty = hard;
	document.getElementById("button-hard").style.color = "Red";
	document.getElementById("button-easy").style.color = "Black";
	startGame();
}

const cells = document.querySelectorAll('.cell');
startGame();

function startGame() {
	document.querySelector(".endgame").style.display = "none";
	origBoard = Array.from(Array(9).keys());
	for (var i = 0; i < cells.length; i++) {
		cells[i].innerText = '';
		cells[i].style.removeProperty('background-color');
		cells[i].addEventListener('click', turnClick, false);
	}
}

function turnClick(square) {
	if (typeof origBoard[square.target.id] == 'number') {
		turn(square.target.id, huPlayer)
		if (!checkWin(origBoard, huPlayer) && !checkTie()) turn(difficulty(), aiPlayer);
	}
}

function turn(squareId, player) {
	origBoard[squareId] = player;
	document.getElementById(squareId).innerText = player;
	let gameWon = checkWin(origBoard, player)
	if (gameWon) gameOver(gameWon)
}

function checkWin(board, player) {
	let plays = board.reduce((a, e, i) =>
		(e === player) ? a.concat(i) : a, []);
	let gameWon = null;
	for (let [index, win] of winCombos.entries()) {
		if (win.every(elem => plays.indexOf(elem) > -1)) {
			gameWon = { index: index, player: player };
			break;
		}
	}
	return gameWon;
}

function gameOver(gameWon) {
	for (let index of winCombos[gameWon.index]) {
		document.getElementById(index).style.backgroundColor =
			gameWon.player == huPlayer ? "blue" : "red";
	}
	for (var i = 0; i < cells.length; i++) {
		cells[i].removeEventListener('click', turnClick, false);
	}
	declareWinner(gameWon.player == huPlayer ? "Has ganado." : "Has perdido.")
}

function declareWinner(who) {
	document.querySelector(".endgame").style.display = "block";
	document.querySelector(".endgame .text").innerText = who;
}

function emptySquares() {
	return origBoard.filter(s => typeof s == 'number');
}

function easy() {
	return emptySquares()[0];
}

function hard() {
	return minimax(origBoard, aiPlayer).index;
}

function checkTie() {
	if (emptySquares().length == 0) {
		for (var i = 0; i < cells.length; i++) {
			cells[i].style.backgroundColor = "green";
			cells[i].removeEventListener('click', turnClick, false);
		}
		declareWinner("¡Empate!")
		return true;
	}
	return false;
}

function minimax(newBoard, player) {
	var availSpots = emptySquares();

	if (checkWin(newBoard, huPlayer)) {
		return { score: -10 };
	} else if (checkWin(newBoard, aiPlayer)) {
		return { score: 10 };
	} else if (availSpots.length === 0) {
		return { score: 0 };
	}
	var moves = [];
	for (var i = 0; i < availSpots.length; i++) {
		var move = {};
		move.index = newBoard[availSpots[i]];
		newBoard[availSpots[i]] = player;

		if (player == aiPlayer) {
			var result = minimax(newBoard, huPlayer);
			move.score = result.score;
		} else {
			var result = minimax(newBoard, aiPlayer);
			move.score = result.score;
		}

		newBoard[availSpots[i]] = move.index;

		moves.push(move);
	}

	var bestMove;
	if (player === aiPlayer) {
		var bestScore = -10000;
		for (var i = 0; i < moves.length; i++) {
			if (moves[i].score > bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	} else {
		var bestScore = 10000;
		for (var i = 0; i < moves.length; i++) {
			if (moves[i].score < bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	}

	return moves[bestMove];
}