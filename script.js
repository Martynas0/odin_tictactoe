const game = (function(){

    let controller = 1;
    
    let player1;
    let player2;
    
    const registerPlayers = () => {
        const form = document.querySelector("form");
        
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            player1 = createPlayer(e.target[0].value, 1);
            player2 = createPlayer(e.target[1].value, 2);
            form.style.display = "none";
            start();
        })

    }

    const start = () => {
        
        const interfaceContainer = document.querySelector(".interface-container");
        interfaceContainer.style.display = "flex";
        const interface = document.querySelector(".interface");
        interface.addEventListener("click", tileChosen);


        display.message(player1.getName() + " is starting...");
        controller = 1;
        board.resetBoard();
        display.render();

    }

    const tileChosen = (e) => {

        const index = e.target.dataset.index;
        console.log(index);
        console.log(player1.getName())
        
        if (controller === 0) {
            display.message("Game is over.");
        }
        else if (board.getTile(index) === " ") {

            board.markTile(index, controller);
            display.render();    
            performChecks(controller);
            console.log(controller);

        }
        else {
            display.message("Tile is already marked !");
        }  

    }

    const getController = () => {
        return controller;
    }

    const getPlayer1 = () => {
        return player1;
    }

    const getPlayer2 = () => {
        return player2;
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
            
                if (controller === 1) {
                    display.message(player1.getName() + " has won the Game !#$@!");
                }
                else if (controller === 2) {
                    display.message(player2.getName() + " has won the Game !#$@!");
                }
                controller = 0;
                
                // Further code for winning here <<<<<

        } 
        else if (!board.getTiles().includes(" ")) {   // Check for draw

            controller = 0;
            display.message("It's a DRAW...");

        }
        else {
            controller = controller === 1? 2 : 1;
            display.message();
        }
    }

    

    return {registerPlayers, getController, getPlayer1, getPlayer2};

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
            tiles.push(" ");
        }
    }

    return {getTile, getTiles, resetBoard, markTile};

})();





const display = (function(){

    const message = (msg) => {
        const heading = document.querySelector("#heading");

        if (msg || game.getController() === 0) {
            heading.textContent = msg;
        }
        else if (game.getController() === 1) {
            heading.textContent = game.getPlayer1().getName() + " is choosing...";
        }
        else if (game.getController() === 2) {
            heading.textContent = game.getPlayer2().getName() + " is choosing...";
        }
    }

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

    return {render, message};

})();




function createPlayer(name, playerId) {
    
    const myName = name

    const getName = () => {
        return myName;
    }

    return {getName};

}

game.registerPlayers();

