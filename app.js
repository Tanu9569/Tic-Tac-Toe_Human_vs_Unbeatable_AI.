 let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let signSelection = document.querySelector("#sign-selection");
let chooseXBtn = document.querySelector("#choose-x");
let chooseOBtn = document.querySelector("#choose-o");

let winnerOverlay = document.getElementById("winner-overlay");
let winnerText = document.getElementById("winner-text");
let playAgainBtn = document.getElementById("play-again-btn");

let humanSign = "";
let aiSign = "";
let turnO = true;  // true = O's turn, false = X's turn
let count = 0;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

// Step 1: Human chooses sign
chooseXBtn.addEventListener("click", () => startGame("X"));
chooseOBtn.addEventListener("click", () => startGame("O"));

function startGame(sign) {
  humanSign = sign;
  aiSign = sign === "X" ? "O" : "X";

  turnO = false; // X always starts first

  signSelection.style.display = "none";

  if (aiSign === "X") setTimeout(aiMove, 500);
}

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (
      box.innerText === "" &&
      ((turnO && humanSign === "O") || (!turnO && humanSign === "X"))
    ) {
      box.innerText = humanSign;
      box.disabled = true;
      count++;
      if (checkWinner()) return;
      if (count === 9) return gameDraw();
      turnO = !turnO;
      setTimeout(aiMove, 500);
    }
  });
});

const aiMove = () => {
  let bestScore = -Infinity;
  let moveIndex = -1;

  for (let i = 0; i < boxes.length; i++) {
    if (boxes[i].innerText === "") {
      boxes[i].innerText = aiSign;
      let score = minimax(0, false, -Infinity, Infinity);
      boxes[i].innerText = "";
      if (score > bestScore) {
        bestScore = score;
        moveIndex = i;
      }
    }
  }

  if (moveIndex !== -1) {
    boxes[moveIndex].innerText = aiSign;
    boxes[moveIndex].disabled = true;
    count++;
    if (checkWinner()) return;
    if (count === 9) return gameDraw();
    turnO = !turnO;
  }
};

const minimax = (depth, isMaximizing, alpha, beta) => {
  const winner = evaluateBoard();
  if (winner !== null) {
    if (winner === aiSign) return 10 - depth;
    else if (winner === humanSign) return depth - 10;
    else return 0;
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < boxes.length; i++) {
      if (boxes[i].innerText === "") {
        boxes[i].innerText = aiSign;
        let score = minimax(depth + 1, false, alpha, beta);
        boxes[i].innerText = "";
        bestScore = Math.max(score, bestScore);
        alpha = Math.max(alpha, score);
        if (beta <= alpha) break; // beta cutoff
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < boxes.length; i++) {
      if (boxes[i].innerText === "") {
        boxes[i].innerText = humanSign;
        let score = minimax(depth + 1, true, alpha, beta);
        boxes[i].innerText = "";
        bestScore = Math.min(score, bestScore);
        beta = Math.min(beta, score);
        if (beta <= alpha) break; // alpha cutoff
      }
    }
    return bestScore;
  }
};

const evaluateBoard = () => {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    const valA = boxes[a].innerText;
    const valB = boxes[b].innerText;
    const valC = boxes[c].innerText;

    if (valA && valA === valB && valB === valC) {
      return valA;
    }
  }

  // Check for draw
  if ([...boxes].every((box) => box.innerText !== "")) {
    return "draw";
  }

  return null;
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1 = boxes[pattern[0]].innerText;
    let pos2 = boxes[pattern[1]].innerText;
    let pos3 = boxes[pattern[2]].innerText;

    if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {
      showWinner(pos1, pattern);
      return true;
    }
  }
  return false;
};

const showWinner = (winner, pattern) => {
  // Highlight winning boxes
  pattern.forEach((index) => {
    boxes[index].classList.add("winner");
  });

  disableBoxes();

  // Show full screen congratulation overlay
  winnerText.innerText = `Congratulations! ${winner} wins!`;
  winnerOverlay.classList.remove("hide");
};

const gameDraw = () => {
  msg.innerText = "Game was a draw.";
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const disableBoxes = () => {
  boxes.forEach((box) => (box.disabled = true));
};

const enableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
    box.classList.remove("winner");
  });
  msgContainer.classList.add("hide");
};

const resetGame = () => {
  count = 0;
  turnO = false; // X always starts
  enableBoxes();
  winnerOverlay.classList.add("hide");
  signSelection.style.display = "block"; // show sign selection again
};

resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", () => {
  document.location.reload();
});

// Play again button on overlay
playAgainBtn.addEventListener("click", () => {
  resetGame();
});
