const MESSAGES = require('./loan_calc_msgs.json');
const READLINE = require('readline-sync');

function prompt(message) {
  console.log(`=> ${message}`);
}

function invalidNumber(numberAmount) {
  return numberAmount.trimStart() === '' ||
          Number.isNaN(Number(numberAmount)) ||
          Number(numberAmount) <= 0;
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

function invalidApr(aprNumber) {
  return aprNumber.trimStart() === '' ||
          Number.isNaN(Number(aprNumber)) ||
          Number(aprNumber) < 0;
}

function retrieveApr() {
  prompt(MESSAGES['aprRequest']);
  let requestedApr = READLINE.question();

  while (invalidApr(requestedApr)) {
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

  return Math.ceil(duration * 2) / 2;
}

function calculatingPayment(amount, apr, months) {
  let payment;

  if  (apr === 0) {
    payment =  amount / months;
  } else {
    let monthlyRate = (apr / 12) / 100;
    payment = amount * (monthlyRate / (1 - Math.pow((1
                      + monthlyRate), (-months))));
  }
  return payment.toFixed(2);
}

function displayResults(payment, duration) {
  console.clear();
  prompt(MESSAGES['results'] + duration +
        ` month/s\n...for a total of $${payment} per month.\n`);
}

function retrieveCalculateAgain() {
  prompt(MESSAGES['anotherCalc']);
  let isYes = READLINE.question().toLowerCase();
  return isYes.includes('y');
}

// START
console.clear();
prompt(MESSAGES['welcome']);

// MAIN LOOP
while (true) {
  let loanAmount = retrieveLoanAmount();
  let apr = retrieveApr();
  let monthlyDuration = retrieveMonthlyLoanDuration();
  let monthlyPayment = calculatingPayment(+loanAmount, +apr, +monthlyDuration);

  displayResults(monthlyPayment, monthlyDuration);

  if (!retrieveCalculateAgain()) break;
}

console.clear();
prompt(MESSAGES['goodbye']);