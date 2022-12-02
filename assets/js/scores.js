var resultsList = document.querySelector('#highscores');
var btnClear = document.querySelector('#clear');

//Add event listeners for the Clear button
btnClear.addEventListener('click', clearBoard);

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