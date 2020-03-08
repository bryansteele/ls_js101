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

function retrieveNumber(numRequested) {
  console.clear();
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
  let operator;
  while (true) {
    prompt(messages('operatorPrompt', language));
    operator = READLINE.question();

    if (invalidOperator(operator)) {
      prompt(messages('invalidOperator', language));
    } else {
      break;
    }
  }

  return operator;
}

function checkZeroDivisor(num2, op) {
  let checkZero;
  checkZero = false;
  
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

function displayResults(calcultaedResults) {
  prompt(messages('results', language) + calcultaedResults + "\n");
}

function retrievePlayAgainAnswer() {
  let playAgainAnswer;
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
  let number1 = retrieveNumber('firstNumber');
  let number2 = retrieveNumber('secondNumber');

  let operation = retrieveOperator();

  checkZeroDivisor(number2, operation);

  let results = performCalculation(number1, number2, operation);
  displayResults(results);

  prompt(messages('anotherCalculation', language));
  let anotherCalculation = retrievePlayAgainAnswer();
  if (newCalc(anotherCalculation)) break;
}

console.clear();
prompt(messages('goodbye', language));