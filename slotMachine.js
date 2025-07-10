//1. deposit some money
//2. Determine number of lines to bet on
//3. Collect a bet amount
//4. Spin the slot machine
//5. check if the user won
//6. give the user their winnings
//7. play again

// function deposit() {
    
// }

// const prompt = require("prompt-sync")()

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
  "A": 2,
  "B": 4,
  "C": 6,
  "D": 8,
};

const SYMBOL_VALUES = {
  "A": 5,
  "B": 4,
  "C": 3,
  "D": 2,
};

let balance = 0;
let lines = 0;
let bet = 0;

// Spin the reels
function spin() {
  const symbols = [];
  for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
    for (let i = 0; i < count; i++) {
      symbols.push(symbol);
    }
  }

  const reels = [[], [], []];
  for (let i = 0; i < COLS; i++) {
    const reelSymbols = [...symbols];
    for (let j = 0; j < ROWS; j++) {
      const randomIndex = Math.floor(Math.random() * reelSymbols.length);
      const selectedSymbol = reelSymbols[randomIndex];
      reels[i].push(selectedSymbol);
      reelSymbols.splice(randomIndex, 1);
    }
  }
  return reels;
}

// Transpose reels to rows for win checking
function transpose(reels) {
  const rows = [];
  for (let i = 0; i < ROWS; i++) {
    rows.push([]);
    for (let j = 0; j < COLS; j++) {
      rows[i].push(reels[j][i]);
    }
  }
  return rows;
}

// Calculate winnings
function getWinnings(rows, bet, lines) {
  let winnings = 0;
  for (let row = 0; row < lines; row++) {
    const symbols = rows[row];
    let allSame = true;
    for (const symbol of symbols) {
      if (symbol !== symbols[0]) {
        allSame = false;
        break;
      }
    }
    if (allSame) {
      winnings += bet * SYMBOL_VALUES[symbols[0]];
    }
  }
  return winnings;
}

// Display reels visually
function displayReels(reels) {
  const reelsContainer = document.getElementById("reels");
  reelsContainer.innerHTML = "";
  reels.forEach((reel) => {
    const reelDiv = document.createElement("div");
    reelDiv.className = "reel";
    reel.forEach((symbol) => {
      const symbolDiv = document.createElement("div");
      symbolDiv.className = "symbol";
      symbolDiv.textContent = symbol;
      reelDiv.appendChild(symbolDiv);
    });
    reelsContainer.appendChild(reelDiv);
  });
}

// Handle deposit
function handleDeposit() {
  const depositInput = document.getElementById("deposit-amount");
  const amount = parseFloat(depositInput.value);
  if (isNaN(amount) || amount <= 0) {
    alert("Please enter a valid deposit amount.");
    return;
  }
  balance = amount;
  updateBalanceDisplay();
  document.getElementById("deposit-section").style.display = "none";
  document.getElementById("game-section").style.display = "block";
}

// Update balance display
function updateBalanceDisplay() {
  document.getElementById("balance").textContent = balance.toFixed(2);
}

// Handle spin
function handleSpin() {
  const linesInput = document.getElementById("lines");
  const betInput = document.getElementById("bet");
  lines = parseInt(linesInput.value);
  bet = parseFloat(betInput.value);

  if (isNaN(lines) || lines < 1 || lines > 3) {
    alert("Please enter a valid number of lines (1-3).");
    return;
  }

  if (isNaN(bet) || bet <= 0 || bet * lines > balance) {
    alert("Invalid bet amount.");
    return;
  }

  balance -= bet * lines;
  updateBalanceDisplay();

  const reels = spin();
  displayReels(reels);

  const rows = transpose(reels);
  const winnings = getWinnings(rows, bet, lines);
  balance += winnings;
  updateBalanceDisplay();

  document.getElementById("winnings").textContent = `You won $${winnings.toFixed(2)}`;

  if (balance <= 0) {
    alert("You ran out of money!");
    document.getElementById("play-again").style.display = "inline-block";
  } else {
    document.getElementById("play-again").style.display = "inline-block";
  }
}

// Reset game
function resetGame() {
  balance = 0;
  lines = 0;
  bet = 0;
  document.getElementById("deposit-section").style.display = "block";
  document.getElementById("game-section").style.display = "none";
  document.getElementById("reels").innerHTML = "";
  document.getElementById("winnings").textContent = "";
  document.getElementById("balance").textContent = "0";
}






