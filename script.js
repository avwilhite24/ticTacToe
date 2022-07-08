/*
Idea ---------

function generates blank gameboard
 - counter declared --> determines who's turn (odd/even)
 - event listeners for clicks in cells
   - logic to ensure cell isn't already filled
   - event detected --> player.takeCell(cellID): gameboard cell ID = player.marker
gameBoard Object is modified whenever a user makes a valid input
then, function generates gameBoard from gameBoard Object as an input
whenever user makes a valid input
after generating gameboard, logic function determines if 
someone won or if draw. If true, then generate a popup with button to 
play new game. 
reset gameboard object

How To Use Object To Control Game Flow?
gameFlow
 - start function
    - Call function to generate gameboard. Event Listeners take over
 - reset function
*/


let gameContainer = document.querySelector("#gameContainer");

const gameBoard = (() => {
    let row1 = ['', '', ''];
    let row2 = ['', '', ''];
    let row3 = ['', '', ''];

    let board = [row1, row2, row3];

    return {row1, row2, row3, board};

})();

const player = (name, marker) => {
    const takeCell = (cell) => {
        console.log(`${name} is taking cell ${cell}`)
    }
    return {name, marker, takeCell};
};

function generateBoardUI(board, player1, player2){
    console.log("Generating User Interface");
    console.log(`Board: ${board}`);
    console.log(`Player 1: ${player1.name}, Player 2: ${player2.name}`);
    console.log(`Marker 1: ${player1.marker}, Marker 2: ${player2.marker}`);

    //Begin Generating Front End
     
};


const gameFlow = (() => {
    function start(player1, player2){
        console.log("Starting game");
        generateBoardUI(gameBoard.board, player1, player2);
    }
    return {start};
})();


//Begin The Game
player1 = player("Austin", "x");
player2 = player("Billy", "o");
gameFlow.start(player1, player2);