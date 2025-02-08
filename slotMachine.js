//1. deposit some money
//2. Determine number of lines to bet on
//3. Collect a bet amount
//4. Spin the slot machine
//5. check if the user won
//6. give the user their winnings
//7. play again

// function deposit() {
    
// }

const prompt = require("prompt-sync")()

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    "A" : 2,
    "B" : 4,
    "C" : 6,
    "D" : 8,
}

const SYMBOL_VALUES = {
    "A" : 5,
    "B" : 4,
    "C" : 3,
    "D" : 2,
}

//1. Deposit some money.
const deposit= () => {
    while (true) {
        const depositAmount = prompt("Enter a deposit amount: ");
        const numberDepositAmount =parseFloat(depositAmount);
    
        if (isNaN(numberDepositAmount) || numberDepositAmount <= 0){
            console.log("Invalid deposit amount, try again.")
        } else{
            return numberDepositAmount;
        }
    }
};

//2. Determine number of lines to bet on
const getNumberOfLnes = () => {
    while (true) {
        const lines = prompt("Enter the numbers of line to bet on (1 -3): ");
        const numberOfLines = parseFloat(lines);
    
        if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3){
            console.log("Invalid number of lines, try again.");
        } else{
            return numberOfLines;
        }
    }
};


//3. Collect a bet amount
const getBet = (balance, lines) => {
    while (true) {
        const bets = prompt ("Enter the Total bet: ");
        const numberBet = parseFloat(bets);

        if (isNaN(numberBet)|| numberBet <= 0 || numberBet > balance / lines) {
            console.log("Invalid Bet, try again");
        } else {
            return numberBet;
        }
        

       
    }
};

//4. Spin the slot machine
const spin = () => {
    const symbols = [];
    for(const [symbol, count] of Object.entries(SYMBOLS_COUNT)){
        for(let i = 0; i < count; i++){
            symbols.push(symbol);
        }
    }
   const reels = [[], [], []];
//    const reels = [];
    for(let i = 0; i < COLS; i ++) {  
        const reelSymbols = [...symbols];
            for(j = 0; j < ROWS; j++) {
                const randomIndex = Math.floor(Math.random() * reelSymbols.length);
                const selectedSymbol = reelSymbols[randomIndex];
                reels[i].push(selectedSymbol);
                reelSymbols.splice(randomIndex, 1);
        }
    }
        return reels
};

const transpose = (reels)  => {
    const rows =[];
    
    for( let i = 0; i < ROWS; i++){
        rows.push([]);
        for(let j = 0; j < COLS; j++){

            rows[i].push(reels[j][i])

        }
    }
    return rows;
};

const printRows = (rows) => {
    for (const row of rows){ 
        let rowString = " ";
        
            for(const [i, symbol] of row.entries()  ){
                rowString += symbol
                if (i != row.length - 1){
                    rowString += " | "
                }
            }
            console.log(rowString);
    }
};

 //get user winnings

 const getWinnings = (rows, bet, lines) => {
    let winnings = 0;
    
    for(let row = 0; row < lines; row++){
        const symbols = rows[row];
        let allSame = true
            for (const symbol of symbols){
                if(symbol != symbols[0]){
                    allSame = false;
                    break;
                };
            };

            if (allSame){
                winnings += bet * SYMBOL_VALUES[symbols[0]]
            }
    };

    return winnings;
 };






// const reels = spin();
// console.log(reels);


const game = () => {
    
        let balance = deposit();                    //1. deposit some money

        while(true){

            const numberOfLines = getNumberOfLnes();    //2. Determine number of lines to bet on
            const numberBet = getBet(balance, numberOfLines);   //3. Collect a bet amount
                balance -= numberBet * numberOfLines ;
            const reels =spin();                                //4. Spin the slot machine
            const rows = transpose(reels);
            printRows(rows);                                    //5. check if the user won
            const winnings = getWinnings(rows, numberBet, numberOfLines);      //6. give the user their winnings
                balance += winnings;
            console.log("You won, $" + winnings.toString());

            if(balance <= 0){
                console.log("You ran out of money!");
                break;
            }
            const playAgain = prompt("Do you want to play again (y/n) ?  ");    //7. play again

                if (playAgain != "y") break;
                
        };

};

game();






