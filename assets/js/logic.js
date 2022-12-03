const audioCorrect = new Audio("assets/sfx/correct.wav");
const audioWrong = new Audio("assets/sfx/incorrect.wav");
var questionToShow = 0;
var timeLeft = 0;
var timeInterval = null;
var correctAnswers = 0;
var wrongAnswers = 0;


// Get references to the elements on the page
var startBtn = document.querySelector('#start');
var questionTitle = document.querySelector('#question-title');
var questionChoices = document.querySelector('#choices');
var timer = document.querySelector('#time');
var questionSection = document.querySelector('#questions');  
var startSection = document.querySelector('#start-screen');
var endSection = document.querySelector('#end-screen');
var finalScore = document.querySelector('#final-score');
var submitBtn = document.querySelector('#submit');
var initialsTxt = document.querySelector('#initials');


//Create new elements for the questions
var btn1 = document.createElement('button');
var btn2 = document.createElement('button');
var btn3 = document.createElement('button');
var btn4 = document.createElement('button');
var txt = document.createElement('p');

btn1.setAttribute ("id", "btn1");
btn2.setAttribute ("id", "btn2");
btn3.setAttribute ("id", "btn3");
btn4.setAttribute ("id", "btn4");

questionChoices.appendChild(btn1);
questionChoices.appendChild(btn2);
questionChoices.appendChild(btn3);
questionChoices.appendChild(btn4);
questionChoices.appendChild(txt);

//Add event listeners for all buttons
btn1.addEventListener('click', processAnswer);
btn2.addEventListener('click', processAnswer);
btn3.addEventListener('click', processAnswer);
btn4.addEventListener('click', processAnswer);
submitBtn.addEventListener('click', showHighScores);
startBtn.addEventListener('click', showQuestions);

//Check if high scores object already exist in local storage, if not then create it
var highScoresStorage = localStorage.getItem('quizz_high_scores');
if (highScoresStorage == null) {
    //create storage
    localStorage.setItem('quizz_high_scores', JSON.stringify([{hs:'start'}]));
}


function showQuestions() {
    // hide start section
    startSection.className = 'hide';

    //Show the Questions section
    questionSection.className = 'quizz';

    //Start Timer
    countdown();

    //Show first question
    showQuestion();
}

function showQuestion () {
    txt.innerText = '';
    var question = questions [questionToShow];
    questionTitle.innerText = question.question;
    btn1.innerText = "1. " + question.answer1;
    btn2.innerText = "2. " + question.answer2;
    btn3.innerText = "3. " + question.answer3;
    btn4.innerText = "4. " + question.answer4;
}

function processAnswer() {
    var source = event.target.id
    var answerPressed = 0;
    
    switch(source) {
        case "btn1":
            answerPressed = 1;
            break;
        case "btn2":
            answerPressed = 2;
            break;
        case "btn3":
            answerPressed = 3;
            break;
        case "btn4":
            answerPressed = 4;
            break;
    }

    var question = questions [questionToShow];
   
    if (answerPressed == question.correct) {
        txt.innerText = 'Correct';
        audioCorrect.play();
        correctAnswers++;
    } else {
        txt.innerText = 'Wrong';
        //Reduce available time for wrong answers
        timeLeft = timeLeft - 10;
        audioWrong.play();
        wrongAnswers++;
    }
    setTimeout(() => {  
        questionToShow++;
        if (questionToShow <= questions.length-1) {
            showQuestion();
        } else {
            clearInterval(timeInterval);
            showEnd();
        }
    }, 800);
}

function countdown() {
    timeLeft = questions.length * 10;
  
    timeInterval = setInterval(function () {

      timer.innerText = timeLeft;
      timeLeft--;
      if (timeLeft < 0) {
        
        //timer.innerText = "";
        clearInterval(timeInterval);
        txt.innerText = 'Time is up';
        endSection.children[0].innerText = 'Time is up';
        showEnd();
      }
    }, 1000);
  }

  function showEnd(){
    // hide question section
    questionSection.className = 'hide';
    
    //Show the End Screen section and print results
    endSection.className = 'quizz';
    finalScore.innerText = timer.innerText;
    //`${correctAnswers} correct and ${wrongAnswers} wrong answers`;
    
  }

  function showHighScores () {
    
    if (initialsTxt.value.length > 0 && initialsTxt.value.length <= 3){
        var hsArr = JSON.parse(localStorage.getItem('quizz_high_scores'));
        var obj = {initials: initialsTxt.value, result : timer.innerText}
        hsArr.push(obj);

        // Sort the results in descending order
        hsArr.sort((s1, s2) => {
            return s2.result - s1.result;
        });

        localStorage.setItem('quizz_high_scores', JSON.stringify(hsArr));
        location.href = 'highscores.html';
    } else {
        alert('You need to provide your initials!');
    }
  }

