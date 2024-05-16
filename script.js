"use strict";
//setup variables
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const diceEl = document.querySelector(".dice");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const btnNew = document.querySelector(".btn--new");

let currentScore0El = document.querySelector("#current--0");
let currentScore1El = document.querySelector("#current--1");
let activePlayer;
let currentScore = 0;
let isPlaying = true;
const scores = [0, 0];

//starting point
const newGame = function () {
  isPlaying = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore = 0;
  currentScore0El = 0;
  currentScore1El = 0;
  player0El.classList.add(".player--active");
  diceEl.classList.add("hidden");
  for (let score of scores) {
    score = 0;
  }
};

newGame();

//change player
const changePlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

//generate dice roll
const roll = function () {
  if (isPlaying) {
    //generate random number
    let dice = Math.trunc(Math.random() * 6 + 1);

    //display number
    if (diceEl.classList.contains("hidden")) {
      diceEl.classList.remove("hidden");
    }
    diceEl.src = `images/dice-${dice}.png`;

    //process number
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      changePlayer();
    }
  }
};

//Making the hold button
const hold = function () {
  if (isPlaying) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(".player--winner");
      // document
      //   .querySelector(`.player--${activePlayer}`)
      //   .classList.remove(".player--active");
      console.log("game over");
      isPlaying = false;
    } else {
      changePlayer();
    }
  }
};

btnHold.addEventListener("click", hold);
btnRoll.addEventListener("click", roll);
btnNew.addEventListener("click", newGame);
