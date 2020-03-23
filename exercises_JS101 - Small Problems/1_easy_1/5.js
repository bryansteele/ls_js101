const RLSYNC = require('readline-sync');

let billAmount = +RLSYNC.question('What is the amount of your bill? $');
let tipPercent = +RLSYNC.question('What percent(%) do you want to leave for the tip? ');

let tipAmount = (tipPercent / 100) *billAmount;
let total = billAmount + tipAmount;

console.log(`=> Bill Subtotal: $${billAmount}\n=> Tip Percentage(%): ${tipPercent}%\n=> Tip Amount: $${tipAmount}\n=> Total: $${total}`);