var boardW = 32;
var boardH = 32;
var boardRef = {};
var winner = -1;
var cookieSettings = { expires: 2, path: 'poj' };

$(document).ready(initGame);

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

function initGame() {
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
	
	var newGameButton = $('<button id="newgame" class="ui-button"></button>');
	newGameButton.html('New game');
	newGameButton.click(newGame);
	
	var saveGameButton = $('<button id="savegame" class="ui-button"></button>');
	saveGameButton.html('Save game');
	saveGameButton.click(saveGame);
	
	var loadGameButton = $('<button id="loadgame" class="ui-button"></button>');
	loadGameButton.html('Load game');
	loadGameButton.click(loadGame);
	
	cont.append(newGameButton);
	cont.append(saveGameButton);
	cont.append(loadGameButton);
	
	$('.box').click(clicked);

}

function clicked(evn) {
	if(winner === -1 && $(this).html() === '') {
		$(this).html(players[inTurn].letter);

		var _x = this.value % boardW;
		var _y = (this.value - _x) / boardH;
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

	return -1;
}


function newGame() {
	for(var y = 0; y < boardH; y++) {
		for(var x = 0; x < boardW; x++) {
			boardRef[y][x] = -1;
		}
	}
	
	$('.box').html('');
	winner = -1;
	inTurn = 0;
}

function saveGame() {
	var boardPacket = packageBoard(boardRef);
	
	Cookies.set('inTurn', inTurn, cookieSettings);
	Cookies.set('w', boardW, cookieSettings);
	Cookies.set('h', boardH, cookieSettings);
	Cookies.set('board', boardPacket, cookieSettings);
	console.log(Cookies.get('inTurn', cookieSettings));
}

function loadGame() {
	if(Cookies.get('board', cookieSettings)) {
		boardW = Cookies.get('w', cookieSettings);
		boardH = Cookies.get('h', cookieSettings);
		inTurn = Cookies.get('inTurn', cookieSettings);
		
		boardRef = unpackBoard(boardW, boardH, Cookies.get('board', cookieSettings));
		
		for(var y = 0; y < boardH; y++) {
			for(var x = 0; x < boardW; x++) {
				if(boardRef[y][x] !== -1) {
					$('#b' + (y * boardW + x)).html(players[boardRef[y][x]].letter);
				}
				
			}
		}
	}
}


function packageBoard(_board) {
	var pck = '';
	for(var y = 0; y < boardH; y++) {
		for(var x = 0; x < boardW; x++) {
			pck += (_board[y][x] + 1);
		}
	}
	
	return pck;
}

function unpackBoard(_boardW, _boardH, str) {
	var _board = {};
	var _x = 0;
	var _y = 0;
	
	for(var i = 0; i < str.length; i++) {
		_x = i % _boardW;
		_y = (i - _x) / _boardH;
		if(!_board[_y]) _board[_y] = {};
		
		_board[_y][_x] = parseInt(str.charAt(i)) - 1;
	}
	
	return _board;
}