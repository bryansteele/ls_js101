const MESSAGES = require('./rps_msgs.json');
const READLINE = require('readline-sync');
const WINNING_MATCH = 5;
const VALID_CHOICES = {
  r: 'rock',
  p: 'paper',
  s: 'scissors',
  k: 'spock',
  l: 'lizard'
}
const WINNING_VARIATIONS = {
  rock: ['scissors', 'lizard'],
  paper: ['rock', 'spock'],
  scissors: ['paper', 'lizard'],
  spock: ['rock', 'scissors'],
  lizard: ['paper', 'spock']
}

function prompt(message) {
  console.log(`=> ${message}`);
}

function instructionalGreetingPrompt() {
  console.clear();
  prompt(MESSAGES['welcome']);
  prompt(MESSAGES['instructions']);
}

function invalidEnterKey(key) {
  return key < 18;
}

function promptUserToBegin() {
  let age = READLINE.question();

  while (invalidEnterKey(age)) {
    prompt(MESSAGES['invalidEnterKey']);
    age = READLINE.question();
  }
}

function invalidPlayerChoice(choice) {
  !Object.keys(VALID_CHOICES).includes(choice)
}

function retrievePlayerChoice() {
  prompt(MESSAGES['playerChoice']);
  playerChoice = READLINE.question();

    while (invalidPlayerChoice(playerChoice)) {
      prompt(MESSAGES['invalidChoice']);
      playerChoice = READLINE.question();
    }

    return playerChoice;
}

function retrieveComputerChoice() {
  let randomIndex = Math.floor(Math.random() * Object.keys(VALID_CHOICES).length);
  return computerChoice = Object.keys(VALID_CHOICES)[randomIndex];
}

function displayChoices(playerPix, computerPix) {
  console.clear();
  prompt(`You Chose: ${playerPix.toUpperCase()}...\n=> I Chose: ${computerPix.toUpperCase()}\n`);
}

// function displayWinner(choice, computerChoice) {
//   

//   if ((choice === 'rock' && computerChoice === 'scissors') ||
//       (choice === 'paper' && computerChoice === 'rock') ||
//       (choice === 'scissors' && computerChoice === 'paper')) {
//     prompt('You Win!');
//   } else if ((choice === 'rock' && computerChoice === 'paper') ||
//             (choice === 'paper' && computerChoice === 'scissors') ||
//             (choice === 'scissors' && computerChoice === 'rock')) {
//     prompt('Computer Wins!');
//   } else {
//     prompt("It's a tie!");
//   }
// }

// START
instructionalGreetingPrompt();
promptUserToBegin();
console.clear();

// MAIN LOOP
while (true) {
  scores = { player: 0, computer: 0 };

  while (true) {
    let playerChoice = retrievePlayerChoice();
    let computerChoice = retrieveComputerChoice();

    displayChoices(playerChoice, computerChoice);




    // displayWinner(choice, computerChoice);

    // prompt('Do you want to play again? (y/n):');
    // let answer = READLINE.question().toLowerCase();
    // while (answer[0] !== 'n' && answer[0] !== 'y') {
    //   prompt('Please enter "y" or "n".');
    //   answer = READLINE.question().toLowerCase();
    // }

    // if (answer[0] !== 'y') break;
  }
}
