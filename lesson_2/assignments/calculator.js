const readline = require('readline-sync');

function prompt(message) {
  console.log(`=> ${message}`);
}

function invalidNumber(number) {
  return number.trimStart() === '' || Number.isNaN(Number(number));
}

function retrieveAnswer() {
  while (true) {
    answer = readline.question().toLocaleLowerCase();
    if (['n', 'no'].includes(answer)) {
      break;
    } else if (['y', 'yes'].includes(answer)) {
      console.clear();
      break;
    } else {
    prompt('Invalid entry! Please enter Y/N');
    }
  }
  return answer;
}

function newCalc(answer) {
  return ['n', 'no'].includes(answer);
}

// START
console.clear();
prompt('Welcome to Calculator!');

// MAIN LOOP
while (true) {
  // ASK FOR TWO NUMBERS
  prompt("What's the first number?");
  let number1 = readline.question();

  while (invalidNumber(number1)) {
    prompt ("Hmm...that doesn't look like a valid number.");
    number1 = readline.question();
  }

  prompt("What's the second number?");
  let number2 = readline.question();

  while (invalidNumber(number2)) {
    prompt ("Hmm...that doesn't look like a valid number.");
    number2 = readline.question();
  }

  // ASK FOR OPERATION
  prompt('What operation would you like to perform?\n1) Add 2) Subtract 3) Multiply 4) Divide');
  let operation = readline.question();

  while (!['1', '2', '3', '4'].includes(operation)) {
    prompt('Must choose 1, 2, 3 or 4');
    operation = readline.question();
  }

  // PERFORM OPERATION AND DISPLAY RESULTS
  let output;
  switch (operation) {
    case '1':
      output = Number(number1) + Number(number2);
      break;
    case '2':
      output = Number(number1) - Number(number2);
      break;
    case '3':
      output = Number(number1) * Number(number2);
      break;
    case '4':
      output = Number(number1) / Number(number2);
      break;
  }

  prompt(`The result is: ${output}`);

  // ASK USER TO PERFORM ANOTHER CALCULATION
  prompt("Do you want to perform another calculation? (Y/N)");
  let anotherCalculation = retrieveAnswer();
  if (newCalc(anotherCalculation)) break;
}

console.clear();
prompt('Goodbye');