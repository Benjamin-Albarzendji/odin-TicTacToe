
const gameBoard = (() => {
    const goal = (string = "Hello") => "fuckyou" + string;

    //Turn counter that is global within the object.
    let turn = 1

    //The logic that handles the interaction with the game
    const GameFieldInteraction = (e) => {
        let box = e.target
        box.removeEventListener("click", GameFieldInteraction)
        box.classList.add("boxAnimated")
        if (turn % 2 == 1) {

            box.innerText = "X"
            box.setAttribute("Value", "X")
        }
        else {
            box.innerHTML = "O"
            box.setAttribute("Value", "O")
        }
        turn++;

        //REMEMBER TO FIX THIS
        test = checkWinner()
    }

    const checkWinner = () => {
        let grid = document.querySelectorAll(".box")

        let checker = ""

        //Checks the rows
        for (let i = 0; i < 9; i++) {
            checker += grid[i].getAttribute("Value")
            if (i === 2 && checker === "XXX" || checker === "OOO") {
                console.log("winner")
                break   
            }
            if (i === 2)  {
                checker = ""
            }
            if (i === 5 && checker === "XXX" || checker === "OOO") {
                console.log("winner")
                break
            }

            if (i === 5) {
                checker = "" 
            }

            else if (i === 8 && checker === "XXX" || checker === "OOO") {
                console.log("winner")
                return restart()

            }
        }

        // for (let i = 0; i < 9; i++) {

        //     console.log(i)
        //     checker += grid[i].getAttribute("Value")
        

        // }





    }


    //Creates the gameboard, self-running function
    const boardCreation = (() => {
        const grid = document.querySelector(".grid")
        for (let i = 1; i < 10; i++) {
            let box = document.createElement("div")
            box.id = `box${i}`
            box.classList = "box"
            grid.appendChild(box)

            //Eventlistener calling another function within this object
            box.addEventListener("click", GameFieldInteraction)
        }
    })

    //Restarts the game 
    const restart = () => {
        const grid = document.querySelectorAll(".box")
        grid.forEach(node => {
            node.remove()
        })
        turn = 1
        boardCreation()
    }

    return { restart: restart, createBoard: boardCreation }
})();

gameBoard.createBoard()




