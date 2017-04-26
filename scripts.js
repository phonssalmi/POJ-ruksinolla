var boardW = 32;
var boardH = 32;
var boardRef = {};
var winner = -1;

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
		boardRef[i] = {};

		for(var j = 0; j < boardW; j++) {
			var tempE = $('<button id="b' + (i * boardH + j) + '" value="' + (i * boardH + j) + '" class="box"></button>');
			$('.box-row')[i].append(tempE[0]);

			boardRef[i][j] = -1;
		}

	}

	$('.box').click(clicked);

}

function clicked(evn) {
	if(winner === -1 && $(this).html() === '') {
		$(this).html(players[inTurn].letter);

		var _x = this.value % 32;
		var _y = (this.value - _x) / 32;
		boardRef[_y][_x] = inTurn;

		winner = checkForWin();
		if(winner != -1) alert(players[winner].name + ' won');
		else nextPlayer();
		
	}

}

function nextPlayer() {
	inTurn++;
	if(inTurn == players.length) inTurn = 0;
}


function checkForWin() {
	var r = 0;
	var c = {};
	var d1 = {};
	var d2 = {};

	for(var y = 0; y < boardH; y++) {
		for(var x = 0; x < boardW; x++) {
			if(boardRef[y][x] !== -1) {
				if(r !== 0 && boardRef[y][x - 1] === boardRef[y][x]) r++;
				else r = 1;

				console.log(y, x, r);

				if(r === 5) return boardRef[y][x];

				if(c[x] !== 0 && y !== 0 && boardRef[y - 1][x] === boardRef[y][x]) c[x]++;
				else c[x] = 1;

				console.log(y, x, c);

				if(c[x] === 5) return boardRef[y][x];

				var diagPos = (boardH - 1) - y + x;
				if(d1[diagPos] !== 0 && x !== 0 && y !== 0 && boardRef[y - 1][x - 1] === boardRef[y][x]) d1[diagPos]++;
				else d1[diagPos] = 1;

				console.log(y, x, diagPos, d1);

				if(d1[diagPos] === 5) return boardRef[y][x];

				if(d2[y + x] !== 0 && x !== (boardW - 1) && y !== 0 && boardRef[y - 1][x + 1] === boardRef[y][x]) d2[y + x]++;
				else d2[y + x] = 1;

				console.log(y, x, y + x, d2);

				if(d2[y + x] === 5) return boardRef[y][x];
			}

		}

	}

	/*for(var x = 0; x < boardW; x++) {
		for(var y = 0; y < boardH; y++) {
			if(boardRef[y][x] !== -1) {
				if(c !== 0) {
					if(boardRef[y - 1][x] === boardRef[y][x]) c++;
					else c = 1;
				} else {
					c++;
				}

				if(c === 5) return boardRef[y][x];
			}
		}
	}*/

	return -1;

}