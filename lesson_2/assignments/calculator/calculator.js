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
    console.clear();
  } else {
    langNum = '1';
    console.clear();
  }

  return langNum;
}

function retrieveLanguage() {
  let langAnswer = READLINE.question();

  while (true) {
    if (['1', '2'].includes(langAnswer)) {
      break;
    } else {
      prompt(messages('validLanguage', language));
      prompt(messages('validLanguage', "ru"));
      langAnswer = READLINE.question();
    }
  }

  changeLanguage(langAnswer);
}

function invalidNumber(number) {
  return number.trimStart() === '' || Number.isNaN(Number(number));
}

function retrieveNumber(numRequested) {
  prompt(messages(numRequested, language));
  let number = READLINE.question();

  while (invalidNumber(number)) {
    prompt(messages('invalidNumber', language));
    number = READLINE.question();
  }

  return number;
}

function invalidOperator(operator) {
  return !['1', '2', '3', '4'].includes(operator);
}

function retrieveOperator() {
  prompt(messages('operatorPrompt', language));
  let operator = READLINE.question();
  
  while (true) {
    if (invalidOperator(operator)) {
      prompt(messages('invalidOperator', language));
      operator = READLINE.question();
    } else {
      break;
    }
  }

  return operator;
}

function checkZeroDivisor(num2, op) {
  let checkZero = false;

  if (/^0*$/.test(num2) && op === '4') {
    console.clear();
    prompt(messages('invalidDivision', language));
    checkZero = true;
  }

  return checkZero;
}

function performCalculation(num1, num2, operator) {
  let result;
  switch (operator) {
    case '1':
      result = Number(num1) + Number(num2);
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

function displayResults(calcultaedResults) {
  prompt(messages('results', language) + calcultaedResults + "\n");
}

function retrievePlayAgainAnswer() {
  prompt(messages('anotherCalculation', language));
  let isYes = READLINE.question().toLowerCase();
  return isYes.includes('y');
}

// START
console.clear();
prompt(messages('welcome1',  language));
prompt(messages('welcome1',  'ru'));

retrieveLanguage();

// MAIN LOOP
while (true) {
  let number1 = retrieveNumber('firstNumber');
  let number2 = retrieveNumber('secondNumber');

  let operation = retrieveOperator();

  checkZeroDivisor(number2, operation);

  let results = performCalculation(number1, number2, operation);
  displayResults(results);

  if (!retrievePlayAgainAnswer()) break;
}

console.clear();
prompt(messages('goodbye', language));