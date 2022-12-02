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
    var hsArr = JSON.parse(localStorage.getItem('quizz_high_scores'));

    for (var i = 1; i < hsArr.length; i++) {
      var li = document.createElement('li');
      li.innerText = hsArr[i];
      resultsList.appendChild(li);
    }
}

function clearBoard() {
  localStorage.setItem('quizz_high_scores', JSON.stringify(['high scores']));
  location.href = 'highscores.html';
}