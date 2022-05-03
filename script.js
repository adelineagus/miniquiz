var timerElement=document.querySelector(".timer-countdown");

var timer;
var timerCount=50;
var correctAmount=0;
var questionNum=0;

var welcomeContainer=document.getElementById('welcome-page')
var startContainer=document.getElementById('start');
var quizContainer=document.getElementById('quiz');
var questionContainer=document.getElementById('question');
var choicesContainer=document.getElementById('choices');
var statementContainer=document.getElementById('statement');
var resultspageContainer=document.getElementById('results-page');
var resultsContainer=document.getElementById('results');
var initialsInput= document.getElementById('initials-input');
var initialsForm= document.getElementById('initials-form');
initialsForm.style.display='none';
var userInitials=[];
var scorepageContainer=document.getElementById('score-page');
var scoreContainer= document.getElementById('score');
var playButton=document.getElementById('play-again');


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

startContainer.addEventListener('click',function(){
    timerStart();
    quizContent(questions,questionNum);
})

choicesContainer.addEventListener('click',function(event,userChoice){
    var userChoice=event.target;
    storeAnswer(userChoice);
    questionNum++;
    clearButtons();
    
    if(questionNum<questions.length){
        quizContent();
    } else {
        clearInterval(timer);
        resultsSection();
    }
})

initialsForm.addEventListener("submit", function(event){
    event.preventDefault();
    scoreGenerator(scoreContainer);
})

playButton.addEventListener('click', function(){
    reset();
})


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
    if (userChoice.getAttribute('answer')===questions[questionNum].correctAnswer){
        statementContainer.innerHTML="True!";
        correctAmount++;
    } else {
        statementContainer.innerHTML="False!";
        timerCount=timerCount-5;
    }
}

function clearButtons(){
    while(choicesContainer.firstChild){
        choicesContainer.removeChild(choicesContainer.lastChild);
    }
}


function resultsSection(){
    quizContainer.style.display='none';
    resultspageContainer.style.display='inline-block';
    resultsContainer.innerHTML= "Correct Amount : " + correctAmount;
}

function scoreGenerator(scoreContainer){
    resultspageContainer.style.display='none';
    scorepageContainer.style.display='inline-block';
    scoreContainer.innerHTML="";
    var initials= initialsInput.value.trim();
    var initialsScore= initials + " - " + ((correctAmount).toString());
    userInitials.push(initialsScore);
    for(var i=0; i<userInitials.length;i++){
        var li= document.createElement("li");
        li.textContent=userInitials[i];
        scoreContainer.appendChild(li);
    }
    initialsInput.value="";
}

function reset(){
    timer;
    timerCount=50;
    correctAmount=0;
    questionNum=0;
    scorepageContainer.style.display='none';
    welcomeContainer.style.display='inline-block';
}





