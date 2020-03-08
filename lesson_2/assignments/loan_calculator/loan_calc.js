const MESSAGES = require('./loan_calc_msgs.json');
const READLINE = require('readline-sync')

function prompt(message) {
  console.log(`=> ${message}`);
}

function invalidNumber(number) {
  return number.trimStart() === '' || Number.isNaN(Number(number));
}

function retrieveLoanAmount() {
  prompt(MESSAGES['loanAmount']);
  let amount = READLINE.question();
  
  while (invalidNumber(amount)) {
    prompt(MESSAGES['invalidAmount']);
    amount = READLINE.question();
  }

  return amount;
}

function retrieveApr() {
  prompt(MESSAGES['aprRequest']);
  let requestedApr = READLINE.question();

  while (invalidNumber(requestedApr)) {
    prompt(MESSAGES['invalidApr']);
    requestedApr = READLINE.question();
  }

  return requestedApr;
}

function retrieveMonthlyLoanDuration() {
  
}

// START
console.clear();
prompt(MESSAGES['welcome']);

// MAIN LOOP
while (true) {
  let loanAmount = retrieveLoanAmount();
  let apr = retrieveApr();
  let monthlyLoanDuration = retrieveMonthlyLoanDuration();

  console.log('Loan total: ' + loanAmount);
  console.log('APR is: ' + apr);
  console.log('For ' + monthlyLoanDuration + ' months');

  let monthlyPayment = calculatingPayment(loanAmount, apr, monthlyLoanDuration);

  displayResults(monthlyPayment);

  prompt(MESSAGES['anotherCalc']);
  let anotherCalculation = retrieveCalculateAgain();
  if (newCalc(anotherCalculation)) break;
}

console.clear();
prompt(messages['goodbye']);