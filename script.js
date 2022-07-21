'use strict';

//selecting element
//hash is for the selector for the ID
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');
const dice = document.querySelector('.dice');
let scores, currentScore, activePlayer, playing;

// Starting conditions
const begin = function () {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0.textContent = 0;
    current1.textContent = 0;

    dice.classList.add('hidden');
    player0.classList.remove('player--winner');
    player1.classList.remove('player--winner');
    player0.classList.add('player--active');
    player1.classList.remove('player--active');
};
begin();
//hide dice at the beginning of the game
//dot is used for classes

dice.classList.add('hidden');



//access each btn 
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const switchPlayer = function () {
    if (playing === true) {
        //switch to next player and his entire score is resetted
        document.getElementById(`current--${activePlayer}`).textContent = 0;
        activePlayer = activePlayer === 0 ? 1 : 0;
        //reset the currentScore
        currentScore = 0;
        //background change
        player0.classList.toggle('player--active');
        player1.classList.toggle('player--active');
    }

}
//Make the dice roll and come up with a random number
btnRoll.addEventListener('click', function () {
    //1. Generating a random dice roll
    const diceRand = Math.trunc(Math.random() * 6) + 1;

    //2. Display dice
    dice.classList.remove('hidden');
    dice.src = `dice-${diceRand}.png`;
    //console.log(dice);
    //3. Check for rolled 1. If true, switch to next number
    if (dice !== 1) {
        currentScore += diceRand;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
        switchPlayer();
    }
});

btnHold.addEventListener('click', function () {
    //add current score is active player's score
    if (playing == true) {
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        //2. Check if player's score is >=100
        if (scores[activePlayer] >= 100) {
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');

        } else {
            switchPlayer();
        }
    }

});

btnNew.addEventListener('click', begin);
