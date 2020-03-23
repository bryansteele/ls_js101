// for (let i = 0; i < 100; i += 1) {
//   if (i % 2 !== 0) console.log(i);
// }

let getString = require('readline-sync');

let lowNumber = +getString.question('Enter the low number: ');
let highNumber = +getString.question('Enter the high Number: ');

let i = lowNumber;

while (i < highNumber) {
  if (i % 2 !== 0) console.log(i);
  i += 1;
}