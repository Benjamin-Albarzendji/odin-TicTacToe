const gameBoard = (() => {
  //Turn counter that is global within the object.
  let turn = 1;
  const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  //The logic that handles the interaction with the game
  const GameFieldInteraction = (e) => {
    let box = e.target;
    box.removeEventListener("click", GameFieldInteraction);
    box.classList.add("boxAnimated");
    if (turn % 2 === 1) {
      box.innerText = "X";
      box.classList.add("X");
    } else {
      box.innerHTML = "O";
      box.classList.add("O");
    }
    turn++;

    //Checks if there is a winner
    winner = checkWinner();
    if (winner === true) {
      return endGame(false);
    } else if (turn > 9 && winner === false) {
      return endGame(true);
    }
  };

  //Checkes the winner of the game
  const checkWinner = () => {
    let grid = document.querySelectorAll(".box");
    return winCombos.some((combination) => {
      return combination.every((index) => {
        if (turn % 2 === 0) {
          return grid[index].classList.contains("X");
        } else {
          return grid[index].classList.contains("O");
        }
      });
    });
  };
  //Creates the gameboard, self-running function
  const boardCreation = () => {
    const grid = document.querySelector(".grid");
    for (let i = 1; i < 10; i++) {
      let box = document.createElement("div");
      box.id = `box${i}`;
      box.classList = "box";
      grid.appendChild(box);

      //Eventlistener calling another function within this object
      box.addEventListener("click", GameFieldInteraction);
    }

    //Creates the restart button for the gameboard
    let restartButton = document.createElement("button");
    restartButton.classList.add("restartButton");
    restartButton.innerText = "Restart Game";
    restartButton.addEventListener("click", restart);
    document.body.appendChild(restartButton);
  };

  //End game function
  const endGame = (draw) => {
    let winner = "";
    let winnerText = document.createElement("div");
    if (turn % 2 === 0) {
      winner = "X";
    }

    if (turn % 2 === 1) {
      winner = "O";
    }

    if (draw === true) {
      winner = "draw";
    }

    // End game interface
    let endGameInterface = document.querySelector(".endGameInterface");
    endGameInterface.classList.add("show");
    oldRestartButton = document.querySelector("button");
    oldRestartButton.classList.add("hide");
    grid = document.querySelector(".grid");
    grid.classList.add("hide");

    //Winner text
    if (winner === "draw") {
      winnerText.innerText = `It's a draw!`;
    } else winnerText.innerText = `Winner is ${winner}!`;
    endGameInterface.appendChild(winnerText);

    //EndGame Button
    let restartButton = document.createElement("button");
    restartButton.classList.add("endGameButton");
    restartButton.innerText = "Play Again!";
    restartButton.addEventListener("click", () => {
      winnerText.remove();
      restartButton.remove();
      endGameInterface.classList.remove("show");
      grid.classList.remove("hide");
      restart();
    });
    endGameInterface.appendChild(restartButton);
  };
  //Restarts the game
  const restart = (e) => {
    //Removes the restart button
    let restartButton = document.querySelector(".restartButton");
    restartButton.remove();
    //Gets all the game boxes
    const grid = document.querySelectorAll(".box");
    grid.forEach((node) => {
      node.remove();
    });
    //Sets turn to 1
    turn = 1;
    //Creates new board
    boardCreation();
  };

  return { restart: restart, createBoard: boardCreation };
})();

gameBoard.createBoard();
