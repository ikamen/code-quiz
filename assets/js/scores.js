var resultsList = document.querySelector('#highscores');
var btnClear = document.querySelector('#clear');

//Add event listeners for the Clear button
btnClear.addEventListener('click', clearBoard);

//Check if high scores object already exist in local storage, if not then create it
var highScoresStorage = localStorage.getItem('quizz_high_scores');
if (highScoresStorage == null) {
  //create storage
  localStorage.setItem('quizz_high_scores', JSON.stringify(['high scores']));
}

function loadHighScores() {
    var hs1 = document.createElement('li');
    var hs2 = document.createElement('li');

    hs1.innerText = "Vrabcho the greatest";
    hs2.innerText = "Vrabcho the bestest";

    resultsList.appendChild(hs1);
    resultsList.appendChild(hs2);
  }

  function clearBoard() {
    console.log('clear')
  }