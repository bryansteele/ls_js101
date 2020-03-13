const MESSAGES = require('./rps_msgs.json');
const READLINE = require('readline-sync');
const WINNING_MATCH = 5;
const VALID_USER_CHOICES = [
  'r',
  'p',
  's',
  'k',
  'l'
]
const VALID_CHOICES = [
  'rock',
  'paper',
  'scissors',
  'spock',
  'lizard'
];
const WINNING_VARIATIONS = {
  rock: ['scissors', 'lizard'],
  paper: ['rock', 'spock'],
  scissors: ['paper', 'lizard'],
  spock: ['rock', 'scissors'],
  lizard: ['paper', 'spock']
};

function prompt(message) {
  console.log(`=> ${message}`);
}

function instructionalGreetingPrompt() {
  console.clear();
  prompt(MESSAGES['welcome']);
  prompt(MESSAGES['instructions']);
}

function invalidEnterKey(key) {
  return key.charCodeAt('\n');
}

function promptUserToBegin() {
  let isEnter = READLINE.question();

  while (invalidEnterKey(isEnter)) {
    prompt(MESSAGES['invalidEnterKey']);
    isEnter = READLINE.question();
  }
}

function invalidPlayerChoice(choice) {
  return !Object.keys(VALID_CHOICES).includes(choice);
}

function retrievePlayerChoice() {
  prompt(MESSAGES['playerChoice']);
  let playChoice = READLINE.question();

  while (invalidPlayerChoice(playChoice)) {
    prompt(MESSAGES['invalidChoice']);
    playChoice = READLINE.question();
  }

  playChoice = VALID_CHOICES[playChoice];
  return playChoice;
}

function retrieveComputerChoice() {
  let randomIndex = Math.floor(Math.random() *
                    Object.values(VALID_CHOICES).length);
  let compChoice = Object.values(VALID_CHOICES)[randomIndex];
  return compChoice;
}

function displayChoices(playerPix, computerPix) {
  console.clear();
  prompt(`You Chose: ${playerPix.toUpperCase()}...\n=>  I Chose : ${computerPix.toUpperCase()}\n`);
}

function validateWinnerOfRound(player, computer) {
  return WINNING_VARIATIONS[player].includes(computer);
}

function displayWinnerOfRound(player, computer) {
  if (validateWinnerOfRound(player, computer)) {
    prompt(MESSAGES[player + computer]);
    prompt(MESSAGES['winner']);
  } else if (validateWinnerOfRound(computer, player)) {
    prompt(MESSAGES[computer + player]);
    prompt(MESSAGES['looser']);
  } else {
    prompt(MESSAGES['tie']);
  }
}

function incrementScore(player, computer, scores) {
  if (validateWinnerOfRound(player, computer)) {
    scores.player += 1;
  } else if (validateWinnerOfRound(computer, player)) {
    scores.computer += 1;
  }

  return scores;
}

  function displayIncrementalScores(incScores) {
    prompt(`Your Score: ${incScores.player}  My Score: ${incScores.computer}\n\n=> Lets keep going!`);
  }

  function establishGrandWinner(scores) {
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
    prompt(`You...${score.player}  Me...${score.computer}\n\n`);

    if (winner === true) {
      prompt(MESSAGES['playerWon']);
    } else {
      prompt(MESSAGES['computerWon']);
    }
  }

  function gameOver(score) {
    return score.player === WINNING_MATCH || score.computer === WINNING_MATCH;
  }

  function retrieveAnotherRound() {
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
  let scoreBoard = { player: 0, computer: 0 };

  while (true) {
    let playerChoice = retrievePlayerChoice();
    let computerChoice = retrieveComputerChoice();

    displayChoices(playerChoice, computerChoice);
    displayWinnerOfRound(playerChoice, computerChoice);

    incrementScore(playerChoice, computerChoice, scoreBoard);
    displayIncrementalScores(scoreBoard);

    if (gameOver(scoreBoard)) break;
  }

  displayGrandWinner(establishGrandWinner(scoreBoard), scoreBoard);

  if (!retrieveAnotherRound()) break;
  console.clear();
}

console.clear();
prompt(MESSAGES['goodbye']);
