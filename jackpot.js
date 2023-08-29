const prompt  = require("prompt-sync")();




const ROWS = 3;
const COLS = 3;

const SYMBOL_COUNT = {
    "A" : 2,
    "B" : 4,
    "C" : 6,
    "D" : 8
}

const SYMBOL_VALUES = {
    "A" : 5,
    "B" : 4,
    "C" : 3,
    "D" : 2
}



const spin = () =>{
    const symbols = [];
    for(const[symbol,count] of Object.entries(SYMBOL_COUNT)){
        for(let i  = 0; i < count; i++){
            symbols.push(symbol);
        }
    }
    
    const reels = [];

    for(let i = 0 ;i<COLS;i++){
        reels.push([]);
        const reelSymbols = [...symbols]
        for(let j=0;j<ROWS;j++){
            const randomindex = Math.floor(Math.random() * reelSymbols.length);
            const selectedsymbols = reelSymbols[randomindex];
            reels[i].push(selectedsymbols);
            reelSymbols.splice(randomindex,1);
        }
    }
    return reels;
}

const deposit = () =>{

    while(true){
    const depositamount = prompt("Enter a Deposit amount: ");
    const numberdeposit = parseFloat(depositamount);
    
    if(isNaN(numberdeposit) || numberdeposit<=0 ){
        console.log("Invalid Deposit amount, Try Again");
    }
    else{
        return numberdeposit;
    }

}
}

const lines = () =>{
    while(true){
    const noflines = prompt("Enter number of lines (1-3) : ");
    const numberlines = parseInt(noflines);
    
    if(isNaN(numberlines) || numberlines > 3 || numberlines<=0 ){
        console.log("Invalid Number of Lines, Try Again");
    }
    else{
        return numberlines;
    }

}
}

const getbet = (balance, numberoflines) =>{
    while(true){
    const bet = prompt("Enter the bet amount: ");
    const numberbet = parseInt(bet);
    
    if(isNaN(numberbet) || numberbet <= 0 || numberbet >= balance / numberoflines ){
        console.log("Invalid bet amount, Try Again");
    }
    else{
        return numberbet;
    }

}
}

const transpose = (reels) =>{
    const rows = [];
    for (let i = 0;i<ROWS;i++){
        rows.push([]);
        for(let j = 0;j<COLS;j++){
            rows[i].push(reels[j][i]);
        }
    }
    return rows;


}

const printRows = (r) =>{
    for(const row of r){
        let rowString = ""
        for(const[i, symbol] of row.entries()){
            rowString += symbol;
            if(i!= row.length -1){
                rowString += " | "
            }
        }
       
        console.log(rowString);
    }

}

const getwinnings = (rows, bet, lines) =>{
        let winnings = 0;
        for(let row = 0; row< lines;row++){
            const symbols = rows[row];
            let allsame = true; 
            for(const symbol of symbols){
                if(symbol != symbols[0]){
                    allsame = false;
                    break;
                }
            }

            if(allsame){
                winnings += bet * SYMBOL_VALUES[symbols[0]];
            }
        }
        return winnings;
        
}


const game = () =>{

let balance = deposit();
while(true){
    console.log("You have a balance of $"+ balance);
    const numberoflines = lines();
    const bet = getbet(balance, numberoflines);
    balance -= bet * numberoflines;
    const reels = spin();
    const r = transpose(reels);
    const winnings = getwinnings(r, bet, numberoflines);
    balance += winnings;
    printRows(r);
    console.log("You won, $"+ winnings.toString());

    if(balance <=0){
        console.log("You ran out of money");
        break;
    }

    const playagain = prompt("do you want to play again? (Y/N)");

    if(playagain != 'y'){
        break;
    }
}

}

game();



