require('./calculator_msgs.json');

const MESSAGES = require('./calculator_msgs.json');
const READLINE = require('readline-sync');
let language = 'en';

function messages(message, lang = 'en') {
  return MESSAGES[lang][message];
}

function prompt(message) {
  console.log(`=> ${message}`);
}

function changeLanguage(langNum) {
  if (langNum === '2') {
    language = 'ru';
  } else {
    langNum = '1';
  }

  return langNum;
}

function retrieveLanguage() {
  let langAnswer;
  while (true) {
    langAnswer = READLINE.question();
    if (['1', '2'].includes(langAnswer)) {
      break;
    } else {
      prompt(messages('validLanguage', language));
      prompt(messages('validLanguage', "ru"));
    }
  }

  changeLanguage(langAnswer);
}

function invalidNumber(number) {
  return number.trimStart() === '' || Number.isNaN(Number(number));
}

let number1;
function retrieveNumber1() {
  while (true) {
    console.clear();
    prompt(messages('firstNumber', language));
    number1 = READLINE.question();

    if (invalidNumber(number1)) {
      prompt(messages('invalidNumber', language));
    } else {
      break;
    }
  }

  return number1.toLocaleLowerCase();
}

let number2;
function retrieveNumber2() {
  while (true) {
    prompt(messages('secondNumber', language));
    number2 = READLINE.question();

    if (invalidNumber(number2)) {
      prompt(messages('invalidNumber', language));
    } else {
      break;
    }
  }

  return number2.toLocaleLowerCase();
}

function invalidOperator(operator) {
  return !['1', '2', '3', '4'].includes(operator);
}

let operation;
function retrieveOperator() {
  while (true) {
    prompt(messages('operatorPrompt', language));
    operation = READLINE.question();

    if (invalidOperator(operation)) {
      prompt(messages('invalidOperator', language));
    } else {
      break;
    }
  }

  return operation;
}

// let checkZero;
// function checkZeroDivisor(num2, op) {
//   if (/^0*$/.test(num2) && op === '4') {
//     prompt(messages('invalidDivision', language));
//     checkZero = true;
//   } else {
//     checkZero = false;
//   }
//   return checkZero;
// }

function performCalculation(num1, num2, operator) {
  switch (operator) {
    case '1':
      result = num1 + num2;
      break;
    case '2':
      result = num1 - num2;
      break;
    case '3':
      result = num1 * num2;
      break;
    case '4':
      result = num1 / num2;
      break;
  }

  return result;
}

function displayResults(result) {
  prompt(messages('results', language) + result + "\n");
}

function retrievePlayAgainAnswer() {
  let playAgainAnswer
  while (true) {
    playAgainAnswer = READLINE.question().toLocaleLowerCase();
    if (['n', 'no'].includes(playAgainAnswer)) {
      break;
    } else if (['y', 'yes'].includes(playAgainAnswer)) {
      console.clear();
      break;
    } else {
      prompt(messages('invalidAnswer', language));
    }
  }

  return playAgainAnswer;
}

function newCalc(answer) {
  return ['n', 'no'].includes(answer);
}

// START
console.clear();
prompt(messages('welcome1',  language));
prompt(messages('welcome1',  'ru'));

retrieveLanguage();

// MAIN LOOP
while (true) {
  retrieveNumber1();
  retrieveNumber2();
  retrieveOperator();
  // checkZeroDivisor(number2, operation);
  performCalculation(number1, number2, operation);
  displayResults(result);

  prompt(messages('anotherCalculation', language));
  let anotherCalculation = retrievePlayAgainAnswer();
  if (newCalc(anotherCalculation)) break;
}

console.clear();
prompt(messages('goodbye1', language));
prompt(messages('goodbye2', language));