// Global Game State
let array = [
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
];

let currentPlayer = 1;
let currentPlayerName = "Player One";
let playerOne = "Player One";
let playerTwo = "Player Two";
let playerOneColor = "red";
let playerTwoColor = "yellow";
let currentColor = playerOneColor;
let isGameOver = false; // Variable to track if the game is over

// Toggle player after each move
function togglePlayer() {
    if (currentPlayer === 1) {
        currentPlayer = 2;
        currentPlayerName = playerTwo;
        currentColor = playerTwoColor;
    } else {
        currentPlayer = 1;
        currentPlayerName = playerOne;
        currentColor = playerOneColor;
    }
}

// Handle the player's move
function onClick(event) {
    if (isGameOver) return; // If the game is over, prevent further moves
    
    const slot = event.target;
    const columnIndex = parseInt(slot.dataset.column);
    const column = array.map((row) => row[columnIndex]);
    
    const rowIndex = column.lastIndexOf(null); // Find the next available row in the column

    if (rowIndex === -1) return; // If the column is full, do nothing

    // Update the array with the player's move
    array[rowIndex][columnIndex] = currentPlayer;

    // Update the DOM with the player's disc
    const targetSlot = document.querySelector(
        `.slot[data-column="${columnIndex}"][data-row="${rowIndex}"]`
    );
    targetSlot.classList.add(currentColor); // Add the color class to the slot

    // Check if there is a winner
    if (checkWinner()) {
        document.querySelector("h3").textContent = `${currentPlayerName} wins!`;
        isGameOver = true;
        return;
    }

    // Toggle the player for the next turn
    togglePlayer();
}

// Check for winner in all directions
function checkWinner() {
    // Loop through the entire board
    for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 7; col++) {
            const player = array[row][col];
            if (player === null) continue; // Skip empty cells

            // Horizontal check
            if (col + 3 < 7 && player === array[row][col + 1] && player === array[row][col + 2] && player === array[row][col + 3]) {
                return true; // Player wins horizontally
            }

            // Vertical check
            if (row + 3 < 6 && player === array[row + 1][col] && player === array[row + 2][col] && player === array[row + 3][col]) {
                return true; // Player wins vertically
            }

            // Bottom-left to top-right diagonal check
            if (row + 3 < 6 && col + 3 < 7 && player === array[row + 1][col + 1] && player === array[row + 2][col + 2] && player === array[row + 3][col + 3]) {
                return true; // Player wins diagonally (bottom-left to top-right)
            }

            // Top-left to bottom-right diagonal check
            if (row - 3 >= 0 && col + 3 < 7 && player === array[row - 1][col + 1] && player === array[row - 2][col + 2] && player === array[row - 3][col + 3]) {
                return true; // Player wins diagonally (top-left to bottom-right)
            }
        }
    }
    return false; // No winner found
}

// Reset the game
function resetGame() {
    array = [
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
    ];
    isGameOver = false;
    currentPlayer = 1;
    currentPlayerName = playerOne;
    currentColor = playerOneColor;
    document.querySelector("h3").textContent = `Player One's Turn (Red)`;
    document.querySelectorAll(".slot").forEach(slot => slot.classList.remove("redDisc", "yellowDisc"));
}

// Create the game board and reset button
const createConnect4Board = () => {
    const gameBoard = document.getElementById("container");

    const board = document.createElement("div");
    board.classList.add("board");
    gameBoard.appendChild(board);

    for (let i = 0; i < 42; i++) {
        const slot = document.createElement("div");
        slot.classList.add("slot");
        slot.id = (i % 7) + "-" + Math.floor(i / 7);
        slot.dataset.column = i % 7;
        slot.dataset.row = Math.floor(i / 7);
        board.appendChild(slot);
    }

    const resetButton = document.createElement("button");
    resetButton.innerHTML = "Reset Game";
    resetButton.classList.add("reset_button");
    resetButton.addEventListener("click", resetGame);

    const status = document.createElement("h3");
    gameBoard.appendChild(status);
    gameBoard.appendChild(resetButton);
};

document.addEventListener("DOMContentLoaded", () => {
    createConnect4Board();
    document.querySelectorAll(".slot").forEach((slot) => {
        slot.addEventListener("click", onClick);
    });
});
