const MESSAGES = require('./rps_msgs.json');
const READLINE = require('readline-sync');
const WINNING_MATCH = 5;
const VALID_USER_CHOICES = [
  'r',
  'p',
  's',
  'l',
  'k'
];
const VALID_CHOICES = [
  'rock',
  'paper',
  'scissors',
  'lizard',
  'spock'
];
const WIN_VARIATIONS = {
  rock: ['scissors', 'lizard'],
  paper: ['rock', 'spock'],
  scissors: ['paper', 'lizard'],
  lizard: ['paper', 'spock'],
  spock: ['rock', 'scissors']
};

let prompt = (message) => console.log(`=> ${message}`);

function instructionalGreetingPrompt() {
  console.clear();
  prompt(MESSAGES['welcome']);
  prompt(MESSAGES['instructions']);
}

let invalidEnterKey = (key) => key.charCodeAt('\n');

function promptUserToBegin() {
  let isEnter = READLINE.question();

  while (invalidEnterKey(isEnter)) {
    prompt(MESSAGES['invalidEnterKey']);
    isEnter = READLINE.question();
  }
}

let initializeScore = () => ({ player: 0, computer: 0 });

let invalidPlayerChoice = (choice) => !VALID_USER_CHOICES.includes(choice);

function retrievePlayerChoice() {
  prompt(MESSAGES['playerChoice']);
  let playChoice = READLINE.question().toLowerCase();

  while (invalidPlayerChoice(playChoice)) {
    prompt(MESSAGES['invalidChoice']);
    playChoice = READLINE.question().toLowerCase();
  }

  return convertUserChoiceToValidChoice(playChoice);
}

function convertUserChoiceToValidChoice(choice) {
  switch (choice) {
    case 'r':
      choice = 'rock';
      break;
    case 'p':
      choice = 'paper';
      break;
    case 's':
      choice = 'scissors';
      break;
      case 'l':
        choice = 'lizard';
        break;
    case 'k':
      choice = 'spock';
      break;
  }
  return choice;
}

function retrieveComputerChoice() {
  let randomIndex = Math.floor(Math.random() * VALID_CHOICES.length);
  let compChoice = String(VALID_CHOICES[randomIndex]);
  return compChoice;
}

function displayChoices(playerPix, computerPix) {
  console.clear();
  prompt(`You Chose: ${playerPix.toUpperCase()}...\n=>  I Chose : ${computerPix.toUpperCase()}\n`);
}

let hasPlayerWonRound = (play, comp) => WIN_VARIATIONS[play].includes(comp);

let hasCompWonRound = (play, comp) => WIN_VARIATIONS[play].includes(comp);

function displayWinnerOfRound(player, computer) {
  if (hasPlayerWonRound(player, computer)) {
    prompt(MESSAGES[player + computer]);
    prompt(MESSAGES['winner']);
  } else if (hasCompWonRound(computer, player)) {
    prompt(MESSAGES[computer + player]);
    prompt(MESSAGES['looser']);
  } else {
    prompt(MESSAGES['tie']);
  }
}

function incrementScore(player, computer, scores) {
  if (hasPlayerWonRound(player, computer)) {
    scores.player += 1;
  } else if (hasCompWonRound(computer, player)) {
    scores.computer += 1;
  }

  return scores;
}

  function displayIncrementalScores(incScores) {
    prompt(`YOU: ${incScores.player}  ME: ${incScores.computer}\n\n=> Lets keep going!`);
  }

  function isGrandWinner(scores) {
    let winner;
    if (scores.player === 5 && scores.computer !== 5) {
      winner = true;
    } else if (scores.computer === 5 && scores.player !== 5) {
      winner = false;
    }

    return winner;
  }

  function displayGrandWinner(winner, score) {
    console.clear();
    prompt(MESSAGES['gameOver']);
    prompt(`Your Score: ${score.player}  My Score: ${score.computer}\n\n`);

    if (winner === true) {
      prompt(MESSAGES['playerWon']);
    } else {
      prompt(MESSAGES['computerWon']);
    }
  }

  let isGameOver = (score) => score.player === WINNING_MATCH ||
                            score.computer === WINNING_MATCH;

  function isAnotherRound() {
    prompt(MESSAGES['anotherRound']);
    let isYes = READLINE.question().toLowerCase();
    return isYes.includes('y');
  }

// START
instructionalGreetingPrompt();
promptUserToBegin();
console.clear();

// MAIN LOOP
while (true) {
  let scoreBoard = initializeScore();
  do {
    let playerChoice = retrievePlayerChoice();
    let computerChoice = retrieveComputerChoice();

    displayChoices(playerChoice, computerChoice);
    displayWinnerOfRound(playerChoice, computerChoice);

    incrementScore(playerChoice, computerChoice, scoreBoard);
    displayIncrementalScores(scoreBoard);

  } while (!isGameOver(scoreBoard));

  displayGrandWinner(isGrandWinner(scoreBoard), scoreBoard);

  if (!isAnotherRound()) break;
  console.clear();
}

console.clear();
prompt(MESSAGES['goodbye']);