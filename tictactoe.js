//Tic Tac Toe by Eric Burton
//****VARIABLE DECLARATIONS***********************************

let limit;
let running = true;
let indices = {};
let player = 'O';
let boardArray = [];
let testSegment = [];  /* board "lanes" are copied here tested to make
                          sure all elements are the same, one at a time*/
//****SETUP NEW BOARD*****************************************
//Start button shows game board and reset button while hiding itself
$('#start-button').click(function() {
  let playerInput = parseInt(document.getElementById("board-size").value);
  console.log(playerInput)
  limit = playerInput;
  indices = {
    end: limit - 1, //all checks
    startDiag: limit - 1, //rising diagonal checks
    start: 0, //rows, columns and falling diagonal checks
    incDiagRising: limit - 1, //increment rising diagonal checks
    incDiagFalling: parseInt(limit) + 1 //increment falling diagonal checks
  };
  
  addSquares(limit);
  
  document.getElementById("start-button").style.display = "none";
  document.getElementById("text-input").style.display = "none";
  document.getElementById("current-player-value").style.display = "block";
  document.getElementById("board").style.display = "block";
  document.getElementById("reset-button").style.display = "inline";
  document.getElementById('player-message-area').innerHTML = "Current Player:";
});

//Reset button shows Start button while hiding game board and reset button
$('#reset-button').click(function() {
  location.reload(); //is this better than manually removing/hiding elements?
});

//Click square to assign 'O' or 'X' to appropriate array index
//then check to see if there is a winner yet
$('#board').on('click', '.square', function() {
  if (running) {
    if(boardArray[this.id] === undefined) {
      boardArray[this.id] = player;
      this.innerHTML = boardArray[this.id];
      if(player == 'O') {
        player = 'X';
      } else if (player == 'X') {
        player = 'O';
      }
      document.getElementById('current-player-value').innerHTML = player;
    }
    //update board array with appropriate character
    //draw character on correct square
    // CHECK THIS WHEN PLAYER PLACES X OR O
    console.log(indices.start + " " + indices.end + " " + limit);
    if(columnCheck(indices.start, indices.end, limit) === true ||
      rowCheck(indices.start, indices.end, limit) === true ||
      diagonalCheck(indices.startDiag, indices.end, indices.end, limit) === true ||
      diagonalCheck(indices.start, indices.end, indices.incDiagFalling, limit) === true )
    {
      console.log("WINNER");
      if(player == 'O') {
        player = 'X';
      } else if (player == 'X') {
        player = 'O';
      }
      document.getElementById('player-message-area').innerHTML = "GAME OVER!";
      document.getElementById('current-player-value').innerHTML = "Player " + player + " Wins!";
      running = false;
    } else {
      console.log("NO WINNER YET");
    }
  }
});

//Click event for square-large DIVs, if they are used.
$('#board').on('click', '.square-large', function() {
  if (running) {
    if(boardArray[this.id] === undefined) {
      boardArray[this.id] = player;
      this.innerHTML = boardArray[this.id];
      if(player == 'O') {
        player = 'X';
      } else if (player == 'X') {
        player = 'O';
      }
      document.getElementById('current-player-value').innerHTML = player;
    }
    //update board array with appropriate character
    //draw character on correct square
    // CHECK THIS WHEN PLAYER PLACES X OR O
    if(columnCheck(indices.start, indices.end, limit) === true ||
      rowCheck(indices.start, indices.end, limit) === true ||
      diagonalCheck(indices.startDiag, indices.end, indices.end, limit) === true ||
      diagonalCheck(indices.start, indices.end, indices.incDiagFalling, limit) === true )
    {
      console.log("WINNER");
      if(player == 'O') {
        player = 'X';
      } else if (player == 'X') {
        player = 'O';
      }
      document.getElementById('player-message-area').innerHTML = "WINNER!";
      document.getElementById('current-player-value').innerHTML = "Player " + player + " Wins!";
      running = false;
    } else {
      console.log("NO WINNER YET");
    }
  }
});

//****FUNCTION DECLARATIONS***********************************

//adds .square  or .square-large elements to DOM, in grid layout
function addSquares(numberOfSquares) {
  if (numberOfSquares > 4) { //If game board is larger than 4 X 4
    //hard code width of #board element based on size of squares used.
    //size of squares used is based on number of squares on board, which
    //is defined by the user.
    let boardWidthInPixels = (102 * numberOfSquares); //100px width + 1 px borders (left and right)
    $("#board").width(boardWidthInPixels + "px");

    let tempId = 0;
    for(let p = 0; p < numberOfSquares; p += 1) {
      for(let i = 0; i < numberOfSquares; i += 1) {
        $('#board').append('<div class="square"></div>');
      }
      $('#board').append('<div class="clear"></div>');
    }
    //below is used assign ids and then to check the
    //individual ids for each square element that
    //addSquares just created.
    $('.square').each(function() {
      $(this).attr('id', tempId);
      tempId += 1;
    });

  } if (numberOfSquares <= 4) { //If game board is smaller than 5 X 5
    let boardWidthInPixels = (154 * numberOfSquares); //150px width + 2 px borders (left and right)
    $("#board").width(boardWidthInPixels + "px");

    let tempId = 0;
    for(let p = 0; p < numberOfSquares; p += 1) {
      for(let i = 0; i < numberOfSquares; i += 1) {
        $('#board').append('<div class="square-large"></div>');
      }
      $('#board').append('<div class="clear"></div>');
    }
    //below is used assign ids and then to check the
    //individual ids for each square-large element that
    //addSquares just created.
    $('.square-large').each(function() {
      $(this).attr('id', tempId);
      tempId += 1;
    });
  }  
}

// CHECK EACH ELEMENT AGAINST THE FIRST ELEMENT
function isMatching(testElement) {
  if(testSegment[0] !== undefined) {
    return testElement == testSegment[0];
  }
}

// COLUMN CHECK
function columnCheck(beginningIndex, endingIndex, columnHeight) {
  for(let columnIndex = beginningIndex; columnIndex <= endingIndex; columnIndex += 1) {
    let boardIndex = columnIndex;
    for(let testIndex = beginningIndex; testIndex <= endingIndex; testIndex += 1) {
      testSegment[testIndex] = boardArray[boardIndex];
      boardIndex += columnHeight;
    }   
    if(testSegment.length == columnHeight) {
      if(testSegment.every(isMatching)) {
        return true;
      }
    }
  } return false;
}

// ROW CHECK
function rowCheck(beginningIndex, endingIndex, rowLength) {
  let boardIndex = 0;
  for(let rowIndex = 0; rowIndex <= endingIndex; rowIndex += 1) {
    for(let testIndex = beginningIndex; testIndex <= endingIndex; testIndex += 1) {
      testSegment[testIndex] = boardArray[boardIndex];
      boardIndex += 1;
    }
    if(testSegment.length == rowLength) {
      if(testSegment.every(isMatching)) {
        return true;
      }
    }
  } return false;
}

// DIAGONAL CHECK
function diagonalCheck(beginningIndex, endingIndex, incremental, diagonalLength) {
  let testIndex = 0;
  for(let boardIndex = beginningIndex; testIndex <= endingIndex; boardIndex += incremental) {
    testSegment[testIndex] = boardArray[boardIndex];
    testIndex += 1;
  }
  if(testSegment.length == diagonalLength) {
    if(testSegment.every(isMatching)) {
      return true;
    }
  } return false;
}
