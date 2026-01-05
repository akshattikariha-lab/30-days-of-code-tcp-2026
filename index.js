const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");
const board = document.getElementById("board");

let currentPlayer = "X";
let gameActive = true;
let boardState = ["", "", "", "", "", "", "", "", ""];

const winConditions = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

cells.forEach(cell => {
  cell.addEventListener("click", handleClick);
});

restartBtn.addEventListener("click", restartGame);

function handleClick() {
  const index = this.dataset.index;

  if (boardState[index] !== "" || !gameActive) return;

  boardState[index] = currentPlayer;
  this.textContent = currentPlayer;
  this.classList.add(currentPlayer);

  checkResult();
}

function checkResult() {
  let win = false;

  for (let condition of winConditions) {
    const [a, b, c] = condition;

    if (
      boardState[a] &&
      boardState[a] === boardState[b] &&
      boardState[a] === boardState[c]
    ) {
      win = true;
      condition.forEach(i => cells[i].classList.add("win"));
      break;
    }
  }

  if (win) {
    statusText.textContent = `Player ${currentPlayer} Wins!`;
    gameActive = false;
    return;
  }

  if (!boardState.includes("")) {
    statusText.textContent = "It's a Draw!";
    board.classList.add("draw");
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function restartGame() {
  currentPlayer = "X";
  gameActive = true;
  boardState = ["", "", "", "", "", "", "", "", ""];
  statusText.textContent = "Player X's Turn";
  board.classList.remove("draw");

  cells.forEach(cell => {
    cell.textContent = "";
    cell.className = "cell";
  });
}
