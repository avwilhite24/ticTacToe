let gameContainer = document.querySelector("#gameContainer");

const gameBoard = (() => {

    let board = [['', '', ''],
                ['', '', ''],
                ['', '', '']];

    return {board};

})();

const player = (name, marker) => {
    const takeCell = (cell) => {
        console.log(`${name} is taking cell ${cell}`)
    }
    return {name, marker, takeCell};
};

const gameFlow = (() => {

    function newGame(player1, player2){
        gameContainer.innerHTML = ""; //Resets Board UI
        gameBoard.board =  [['', '', ''],
                            ['', '', ''],
                            ['', '', '']]; //Resets Backend Board
        let board = gameBoard.board;

        console.log("Generating User Interface");

        let counter = 1;

        for (let i = 0; i < board.length; i++){
            for (let j = 0; j < board[i].length; j++){
                let cell = document.createElement('div');
                cell.id = `cell${i}${j}`;
                cell.classList.add('cells');
                if ((i == 0 && j == 1) || (i == 2 && j == 1)){
                    cell.classList.add('tbEdge');
                }
                if ((i == 1 && j == 0) || (i == 1 && j == 2)){
                    cell.classList.add('sideEdge');
                }
                if (i == 1 && j == 1){
                    cell.classList.add('sideEdge');
                    cell.classList.add('tbEdge');
                }
                cell.addEventListener('click', () => {
                    if (cell.hasChildNodes()){
                        console.log("Invalid Input B/C Cell Is Already Filled"); //Logic for if cell is already filled
                    } else {
                        gameFlow.placeMarker(cell.id, counter);
                        counter ++;
                    }
                });
                gameContainer.appendChild(cell);
            }
        }
    };

    function placeMarker(cellID, counter){
        console.log(`Click Detected In Cell ${cellID}`);
        let cellOfInterest = document.querySelector(`#${cellID}`);
        let mark = document.createElement('img');

        //Parsing Cell ID For Row + Column
        let row = cellID.split('').splice(4, 1);
        let column = cellID.split('').splice(5, 1);

        if (counter%2 == 0){
            let playerName = player2.name;
            console.log(`Placing a x in row ${row} and column ${column}`);
            gameBoard.board[row][column] = 'Player 2';
            mark.src = "x.svg";
            checkBoard(gameBoard.board);
        } else {
            let playerName = player1.name;
            console.log(`Placing a o in row ${row} and column ${column}`);
            gameBoard.board[row][column] = 'Player 1';
            mark.src = "circle.svg";
            checkBoard(gameBoard.board);
        }
        cellOfInterest.appendChild(mark);
    }

    function checkBoard(board){
        console.log("Checking Board...");
        console.log(board);

        //Logic To Determine If Someone Wins
        //3 Ways To Win: Rows Line Up (Entire Column), Columns Line Up (Entire Row), Diagonal

        //Loop Through Rows
        for (let i = 0; i < 3; i++){
            let occurence = 0;
            let markOfInterest = board[i][0];
            for (let j = 0; j < 3; j++){
                if (board[i][j] == markOfInterest && markOfInterest != ''){
                    occurence++;
                }
            }

            if (occurence == 3){
                console.log(`WINNER DETECTED Player${markOfInterest}`);
                endGame(markOfInterest);
            }
        }

        //Loop through columns
        for (let i = 0; i < 3; i++){
            let occurence = 0;
            let markOfInterest = board[0][i];
            for (let j = 0; j < 3; j++){
                if (board[j][i] == markOfInterest && markOfInterest != ''){
                    occurence++;
                }
            }

            if (occurence == 3){
                console.log(`WINNER DETECTED Player${markOfInterest}`);
                endGame(markOfInterest);
            }
        }


        //Check Diagonals (Two Cases)
        let diagMark = board[0][0];
        if (diagMark != ""){
            if (board[1][1] == diagMark && board[2][2] == diagMark){
                console.log(`WINNER DETECTED Player ${diagMark}`);
                endGame(diagMark);
            }
        }
        diagMark = board[0][2];
        if (diagMark != ""){
            if (board[1][1] == diagMark && board[2][0] == diagMark){
                console.log(`WINNER DETECTED Player ${diagMark}`);
                endGame(diagMark);
            }
        }

        //Check For Tie
        let blankCounter = 0;
        let parseCounter = 0;
        for (let i = 0; i < 3; i++){
            let markOfInterest = '';
            parseCounter++
            for (let j = 0; j < 3; j++){
                if (board[j][i] == markOfInterest){
                    blankCounter++;
                }
            }

            if (blankCounter == 0 && parseCounter == 3){
                console.log(`Tie Detected`);
                endGame("tie");
            }
        }

    }

    function endGame(winner){
        let endGameContainer = document.createElement('div');
        endGameContainer.id = "endGameContainer";
        document.body.appendChild(endGameContainer);
        endGameHeading = document.createElement('h1');
        if (winner != "tie"){
            endGameHeading.innerText = `${winner} Won!`;
        } else {
            endGameHeading.innerText = "Tie!";
        }
        endGameContainer.appendChild(endGameHeading);
        let playAgainButton = document.createElement('button');
        playAgainButton.innerText = "Play Again";
        endGameContainer.appendChild(playAgainButton);
        playAgainButton.addEventListener('click', () => {
            document.body.removeChild(endGameContainer);
            newGame(player1, player2);
        })
    }

    return {newGame, placeMarker, endGame};
})();


//Begin The Game
player1 = player("Austin", "x");
player2 = player("Billy", "o");
gameFlow.newGame(player1, player2);

