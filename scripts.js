var boardW = 32;
var boardH = 32;
var boardRef = {};

$(document).ready(initBoard);

var players = [
	{
		name: 'player1',
		letter: 'X'
	},
	{
		name: 'player2',
		letter: 'O'
	}
];

var inTurn = 0;

function initBoard() {
	var cont = $('#main_container');
	
	for(var i = 0; i < boardH; i++) {
		cont.append('<div class="box-row"></div>');
		board[i] = {};

		for(var j = 0; j < boardW; j++) {
			var tempE = $('<button id="b' + (i * boardH + j) + '" class="box"></button>');
			$('.box-row')[i].append(tempE[0]);

			boardRef[i][j] = -1;
		}

	}

	$('.box').click(clicked);

}

function clicked(evn) {
	if($(this).html() === '') {
		$(this).html(players[inTurn].letter);
		nextPlayer();
	}

}

function nextPlayer() {
	inTurn++;
	if(inTurn == players.length) inTurn = 0;
}


function checkForWin() {
	var r = {};
	var c = {};
	var d = {};

	for(var y = 0; y < boardH; y++) {
		for(var x = 0; x < boardW; x++) {
			if(boardRef[])

		}

	}

}