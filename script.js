var timerElement=document.querySelector(".timer-countdown");

var timer;
var timerCount=10;

function timerStart (){
    timer=setInterval(function(){
        timerCount--;
        timerElement.textContent=timerCount;
        if(timerCount===0){
            clearInterval(timer);
        }
    },1000);
}

var quizContainer=document.getElementById('quiz');
var resultContainer=document.getElementById('#results');
var submitContainer= document.getElementById('#submit');

submitContainer.addEventListener('click', quizGame);
var questions=[
    {
        Question: "what's my name?",
        Answers: {
            A: "Adeline",
            B: "Adel",
            C: "Line"
        },
        correctAnswer: "C"
    },
]

function quizGame(){
    
}

timerStart();