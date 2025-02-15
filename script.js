const game = (function(){

    let controller = 1;

    const start = () => {
        console.log("Welcome to a brand new game ! Player 1 is starting...");
        controller = 1;
        board.resetBoard();
        board.displayTiles();
    }

    const tileChosen = (index, playerId) => {

        if (controller === 0) {

            console.log("Game is over.");
            console.log("Please restart the game to play again.");

        }
        else if (controller !== playerId) {

            console.log("It is not your turn to choose !");

        }
        else if (board.getTile(index) === "_") {

            board.markTile(index, playerId);
            board.displayTiles();
            controller = playerId === 1? 2 : 1;
            performChecks(playerId);

        }
        else {

            console.log("Tile is already marked !!!");

        }  

    }

    // ----- private methods

    const performChecks = (playerId) => {

        const m = playerId === 1 ? "X" : "O";
        const gt = board.getTile;

        // Check for win
        if (gt(0) === m && gt(1) === m && gt(2) === m ||  // Horizontal win
            gt(3) === m && gt(4) === m && gt(5) === m ||  
            gt(6) === m && gt(7) === m && gt(8) === m ||
            gt(0) === m && gt(3) === m && gt(6) === m ||  // Vertical win
            gt(1) === m && gt(4) === m && gt(7) === m ||
            gt(2) === m && gt(5) === m && gt(8) === m ||
            gt(0) === m && gt(4) === m && gt(8) === m ||  // Diagonal win
            gt(2) === m && gt(4) === m && gt(6) === m ) {  
            
                console.log(`Player ${playerId} has won the Game !#$@!`);
                controller = 0;
                // Further code for winning here <<<<<

        } 
        else if (!board.getTiles().includes("_")) {   // Check for draw

            console.log("It's a DRAW...");
            controller = 0;

        }
    }


    return {tileChosen, start};

})();




const board = (function(){

    const tiles = [];

    const getTiles = () => {
        return tiles;
    }

    const getTile = (index) => {
        return tiles[index];
    }

    const markTile = (index, playerId) => {
        const mark = playerId === 1 ? "X" : "O";
        tiles[index] = mark;
    }

    const resetBoard = () => {
        while(tiles.length > 0) {
            tiles.pop();
        }
        while(tiles.length < 9) {
            tiles.push("_");
        }
    }

    const displayTiles = () => {
        console.log("  ");
        console.log(tiles[0], tiles[1], tiles[2]);
        console.log(tiles[3], tiles[4], tiles[5]);
        console.log(tiles[6], tiles[7], tiles[8]);


    }

    return {getTile, getTiles, resetBoard, displayTiles, markTile};

})();





const display = (function(){

    const render = () => {
        const nodeList = board.getTiles().map((item, index) => {
            
            const tile = document.createElement("p");
            tile.classList.add("tile");
            tile.textContent = item;
            tile.dataset.index = index;
            return tile;

        })
        

        const interface = document.querySelector(".interface");
        const existingTiles = document.querySelectorAll(".interface > p.tile");
        existingTiles.forEach((item) => { item.remove() });
        
        nodeList.forEach((item) => { interface.appendChild(item) })
        
    }

    return {render};

})();




function createPlayer(name, playerId) {
    
    const getName = () => {
        return name;
    }

    const chooseTile = (index) => {
        game.tileChosen(index, playerId);
    }

    return {getName, chooseTile};

}

const player1 = createPlayer("Marty", 1);
const player2 = createPlayer("Clark", 2);
game.start();
display.render();
