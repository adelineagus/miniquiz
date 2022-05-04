//stating variables
var viewScores=document.getElementById('view-scores');
var timerElement=document.querySelector(".timer-countdown");
var timer;
var timerCount=10;
var correctAmount=0;
var questionNum=0;
var questions=[
    {
        question: "what's my name?",
        answers: ['Adeline','Adel','Line'],
        correctAnswer: 'Adeline'
    },
    {
        question: "how old is she?",
        answers: ['15','10','25'],
        correctAnswer: '25'
    }
]
var welcomeContainer=document.getElementById('welcome-page')
var startContainer=document.getElementById('start');
var quizContainer=document.getElementById('quiz-page');
var questionContainer=document.getElementById('question');
var choicesContainer=document.getElementById('choices');
var statementContainer=document.getElementById('statement');
var resultspageContainer=document.getElementById('results-page');
var resultsContainer=document.getElementById('results');
var initialsInput= document.getElementById('initials-input');
var initialsForm= document.getElementById('initials-form');
var userInitials=[];
var scorepageContainer=document.getElementById('score-page');
var scoreContainer= document.getElementById('score');
var playButton=document.getElementById('play-again');
var clearButton=document.getElementById('clear-scores');


//stating defaults
resultspageContainer.style.display='none';
scorepageContainer.style.display='none';


//stating all events
viewScores.addEventListener('click',function(){
    clearInterval(timer);
    showScores();
})

startContainer.addEventListener('click',function(){
    timerStart();
    quizContent(questions,questionNum);
})

choicesContainer.addEventListener('click',function(event,userChoice){
    var userChoice=event.target;
    storeAnswer(userChoice);
    questionNum++;
    clearChoices();
    
    if(questionNum<questions.length){
        quizContent();
    } else {
        clearInterval(timer);
        resultsSection();
    }
})

initialsForm.addEventListener("submit", function(event){
    event.preventDefault();
    scoreGenerator();
    showScores();
})

playButton.addEventListener('click', function(){
    reset();
})

clearButton.addEventListener('click',function(){
    clearscorePage();
    clearScores();
})


//function details
function timerStart (){
    timer=setInterval(function(){
        timerCount--;
        timerElement.textContent=timerCount;
        if(timerCount<=0){
            clearInterval(timer);
            timerElement.textContent='0';
            quizContainer.style.display='none';
            resultsSection();
        }
    },1000);
}

function quizContent(){ 
    welcomeContainer.style.display='none';
    quizContainer.style.display='inline-block';
    questionContainer.innerText=questions[questionNum].question;
    for (var i=0; i<3;i++){
        var choiceButton= document.createElement('button');
        choiceButton.innerText= questions[questionNum].answers[i];
        choiceButton.setAttribute("answer", questions[questionNum].answers[i]);
        choicesContainer.appendChild(choiceButton);
    }
}

function storeAnswer(userChoice){
    statementContainer.style.display='block';

    if (userChoice.getAttribute('answer')===questions[questionNum].correctAnswer){
        statementContainer.innerHTML="True!";
        setTimeout(function(){
            statementContainer.style.display='none';
        },500);
        correctAmount++;
    } else {
        statementContainer.innerHTML="False!";
        setTimeout(function(){
            statementContainer.style.display='none';
        },500);
        timerCount=timerCount-5;
    }
}

function clearChoices(){
    while(choicesContainer.firstChild){
        choicesContainer.removeChild(choicesContainer.lastChild);
    }
}

function resultsSection(){
    quizContainer.style.display='none';
    setTimeout(function(){
        resultspageContainer.style.display='inline-block';
    },500)
    resultsContainer.innerHTML= "Correct Amount : " + correctAmount;
}

function scoreGenerator(){
    var initials= initialsInput.value.trim();
    var initialsScore= initials + " - " + ((correctAmount).toString());
    getScores();
    userInitials.push(initialsScore);
    storeScores();
    initialsInput.value="";
}

function showScores(){
    welcomeContainer.style.display='none';
    quizContainer.style.display='none';
    resultspageContainer.style.display='none';
    scorepageContainer.style.display='inline-block';
    getScores();
    scoreContainer.innerHTML="";
    for(var i=0; i<userInitials.length;i++){
        var li= document.createElement("li");
        li.textContent=userInitials[i];
        scoreContainer.appendChild(li);
    }
}

function getScores(){
    var storedScores= JSON.parse(localStorage.getItem("scores"));
    if(storedScores !== null){
        userInitials=storedScores;
    }
}

function storeScores(){
    localStorage.setItem("scores", JSON.stringify(userInitials));
}

function reset(){
    timer;
    timerCount=10;
    correctAmount=0;
    questionNum=0;
    clearChoices();
    scorepageContainer.style.display='none';
    welcomeContainer.style.display='inline-block';
}

function clearscorePage(){
    while(scoreContainer.firstChild){
        scoreContainer.removeChild(scoreContainer.lastChild);
    }
}

function clearScores(){
    userInitials=[];
    storeScores();
}




