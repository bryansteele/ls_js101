const MESSAGES = require('./loan_calc_msgs.json');
const READLINE = require('readline-sync')

function prompt(message) {
  console.log(`=> ${message}`);
}

// function invalidNumber(number) {
//   return number.trimStart() === '' || Number.isNaN(Number(number)) || Number(number) < 0;
// }

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
  prompt(MESSAGES['durationInMonths']);
  let duration = READLINE.question();

  while (invalidNumber(duration)) {
    prompt(MESSAGES['invalidDuration']);
    duration = READLINE.question();
  }

  return duration;
}

function calculatingPayment(amount, apr, months) {
  let monthlyInterestRate = (apr / 12) / 100;
  let payment = amount * (monthlyInterestRate / (1 - Math.pow((1 
                        + monthlyInterestRate), (-months))));
  
  return payment.toFixed(2);
}

function displayResults(payment) {
  console.clear();
  prompt(MESSAGES['results'] + payment);
}

function retrieveCalculateAgain() {
  prompt(MESSAGES['anotherCalc']);
  let calculateAgainAnswer = READLINE.question().toLowerCase();
  
  while (true) {
    if (['n', 'no'].includes(calculateAgainAnswer)) {
      break;
    } else if (['y', 'yes'].includes(calculateAgainAnswer)) {
      console.clear();
      break;
    } else {
      prompt(MESSAGES['invalidAnswer']);
      calculateAgainAnswer = READLINE.question().toLowerCase();
    }
  }

  return calculateAgainAnswer;
}

function exitCalculator(answer) {
  return (['no', 'n'].includes(answer));
}

// START
console.clear();
prompt(MESSAGES['welcome']);

// MAIN LOOP
while (true) {
  let loanAmount = retrieveLoanAmount();
  let apr = retrieveApr();
  let monthlyLoanDuration = retrieveMonthlyLoanDuration();
  let monthlyPayment = calculatingPayment(loanAmount, apr, monthlyLoanDuration);

  displayResults(monthlyPayment);

  let anotherCalculation = retrieveCalculateAgain();
  if (exitCalculator(anotherCalculation)) break;
}

console.clear();
prompt(MESSAGES['goodbye']);