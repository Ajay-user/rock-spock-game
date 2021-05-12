import confetti from "https://cdn.skypack.dev/canvas-confetti";

const playerScoreEl = document.getElementById("playerScore");
const playerChoiceEl = document.getElementById("playerChoice");
const computerScoreEl = document.getElementById("computerScore");
const computerChoiceEl = document.getElementById("computerChoice");

const resultText = document.getElementById("resultText");

const playerRock = document.getElementById("playerRock");
const playerPaper = document.getElementById("playerPaper");
const playerScissors = document.getElementById("playerScissors");
const playerSpock = document.getElementById("playerSpock");
const playerlizard = document.getElementById("playerLizard");

const computerRock = document.getElementById("computerRock");
const computerPaper = document.getElementById("computerPaper");
const computerScissors = document.getElementById("computerScissors");
const computerSpock = document.getElementById("computerSpock");
const computerlizard = document.getElementById("computerLizard");

const allGameIcons = document.querySelectorAll(".far");

// global variables
let playerChoice = "";
let computerChoice = "";
let playerScore = 0;
let computerScore = 0;

// utilty function for winner/losser
const checkGame = (playerChoice, computerChoice) => {
  const game = {
    rock: { name: "Rock", defeats: ["lizard", "scissors"] },
    paper: { name: "Paper", defeats: ["rock", "spock"] },
    scissors: { name: "Scissors", defeats: ["paper", "lizard"] },
    lizard: { name: "Lizard", defeats: ["spock", "paper"] },
    spock: { name: "Spock", defeats: ["rock", "scissors"] },
  };
  if (playerChoice === computerChoice) {
    resultText.textContent = "It's a tie.";
    resultText.style.color = "dodgerblue";
  } else {
    if (game[playerChoice].defeats.indexOf(computerChoice) != -1) {
      confetti();
      resultText.textContent = "You won!";
      resultText.style.color = "green";
      playerScore++;
      playerScoreEl.textContent = `You - ${playerScore}`;
    } else {
      resultText.textContent = "You lost!";
      resultText.style.color = "red";
      computerScore++;
      computerScoreEl.textContent = `PC - ${computerScore}`;
    }
  }
};

// utility fn to get the element
const returnElement = (element, choice) => {
  const player = {
    rock: playerRock,
    paper: playerPaper,
    scissors: playerScissors,
    lizard: playerlizard,
    spock: playerSpock,
  };
  const computer = {
    rock: computerRock,
    paper: computerPaper,
    scissors: computerScissors,
    lizard: computerlizard,
    spock: computerSpock,
  };

  return element === "player"
    ? [playerChoiceEl, player[choice]]
    : [computerChoiceEl, computer[choice]];
};

// reset the classlist -- removes 'selected' class from all action icons
const resetSelection = () => {
  allGameIcons.forEach((icon) => icon.classList.remove("selected"));
};

// reset the game
const resetAll = () => {
  playerScore = 0;
  playerChoice = "";
  playerScoreEl.textContent = `You - ${playerScore}`;
  playerChoiceEl.textContent = playerChoice;
  computerScore = 0;
  computerChoice = "";
  computerScoreEl.textContent = `PC - ${computerScore}`;
  computerChoiceEl.textContent = computerChoice;

  resultText.textContent = "Start playing!";

  resetSelection();
};
window.resetAll = resetAll;

// change the background color of the selection and updates the choice
const activateSelection = (element, choice) => {
  switch (choice) {
    case "rock":
      element[0].textContent = " --- rock";
      element[1].classList.add("selected");
      break;

    case "paper":
      element[0].textContent = " --- paper";
      element[1].classList.add("selected");
      break;

    case "scissors":
      element[0].textContent = " --- scissors";
      element[1].classList.add("selected");
      break;

    case "lizard":
      element[0].textContent = " --- lizard";
      element[1].classList.add("selected");
      break;

    case "spock":
      element[0].textContent = " --- spock";
      element[1].classList.add("selected");
      break;

    default:
      break;
  }
};

// activates computer selection
const computerGameStart = () => {
  const actions = ["rock", "paper", "scissors", "lizard", "spock"];
  const move = Math.round(Math.random() * 10) % 5;
  activateSelection(returnElement("computer", actions[move]), actions[move]);
  computerChoice = actions[move];
};

// triggers when we select an action for the user
const select = (choice) => {
  // reset the selection
  resetSelection();
  // activate user selection
  activateSelection(returnElement("player", choice), choice);
  // computer plays its move
  computerGameStart();
  // update score
  playerChoice = choice;
  checkGame(playerChoice, computerChoice);
};
window.select = select;

// -------------------------
