require('./calculator_msgs.json');

const MESSAGES = require('./calculator_msgs.json');
const READLINE = require('readline-sync');
let language = 'en';

function messages(message, lang='en') {
  return MESSAGES[lang][message];
}

function prompt(message) {
  console.log(`=> ${message}`);
}

function changeLanguage(langNum) {
  langNum === '2' ? language = 'ru' : false
}

function retrieveLanguage() {
  let langAnswer;
  while(true) {
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

// MAIN LOOP*******************************************************
while (true) {
  // ASK FOR TWO NUMBERS
  prompt(messages('firstNumber', language));
  let number1 = READLINE.question();

  while (invalidNumber(number1)) {
    prompt(messages('validNumber', language));
    number1 = READLINE.question();
  }

  prompt(messages('secondNumber', language));
  let number2 = READLINE.question();

  while (invalidNumber(number2)) {
    prompt(messages('validNumber', language));
    number2 = READLINE.question();
  }

  // ASK FOR OPERATION
  prompt(messages('operatorPrompt', language));
  let operation = READLINE.question();

  while (!['1', '2', '3', '4'].includes(operation)) {
    prompt(messages('validOperator', language));
    operation = READLINE.question();
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
  
  prompt(messages('results', language) + output);

  // ASK USER TO PERFORM ANOTHER CALCULATION
  prompt(messages('anotherCalculation', language));
  let anotherCalculation = retrievePlayAgainAnswer();
  if (newCalc(anotherCalculation)) break;
}

console.clear();
prompt(messages('goodbye1', language));
prompt(messages('goodbye2', language));