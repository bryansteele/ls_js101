require('./calculator_msgs.json')

const MESSAGES = require('./calculator_msgs.json');
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
      prompt(MESSAGES['invalidAnswer']);
    }
  }
  return answer;
}

function newCalc(answer) {
  return ['n', 'no'].includes(answer);
}

// START
console.clear();
prompt(MESSAGES['welcome1']);

// MAIN LOOP*******************************************************
while (true) {
  // ASK FOR TWO NUMBERS
  prompt(MESSAGES['firstNumber']);
  let number1 = readline.question();

  while (invalidNumber(number1)) {
    prompt(MESSAGES['validNumber']);
    number1 = readline.question();
  }

  prompt(MESSAGES['secondNumber']);
  let number2 = readline.question();

  while (invalidNumber(number2)) {
    prompt(MESSAGES['validNumber']);
    number2 = readline.question();
  }

  // ASK FOR OPERATION
  prompt(MESSAGES['operatorPrompt']);
  let operation = readline.question();

  while (!['1', '2', '3', '4'].includes(operation)) {
    prompt(MESSAGES['validOperator']);
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
  
  prompt(MESSAGES['results'] + output);

  // ASK USER TO PERFORM ANOTHER CALCULATION
  prompt(MESSAGES['anotherCalculation']);
  let anotherCalculation = retrieveAnswer();
  if (newCalc(anotherCalculation)) break;
}

console.clear();
prompt(MESSAGES['goodbye1']);
prompt(MESSAGES['goodbye2']);