const RLSYNC = require('readline-sync');

let int = +RLSYNC.question('=> Please enter an integer greater than 0: ');
let operation = RLSYNC.question('\n=> Enter "s" to compute the sum, or "p" to compute the product: ').toLowerCase();

let arr = [];

for (let i = 1; i <= int; i += 1) {
  arr.push(i);
  }

let sum;
let product;

if (operation === 's') {
  sum = arr.reduce((acc, num) => acc + num, 0);
  console.log(`\n=> The sum of the integers between 1 and ${int} is: ${sum}`);
} else {
  product = arr.reduce((acc, num) => acc * num, 1);
  console.log(`\n=> The product of the integers between 1 and ${int} is: ${product}`);
}