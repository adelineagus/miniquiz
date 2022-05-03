var timerElement=document.querySelector(".timer-countdown");

var timer;
var timerCount=50;
var correctAmount=0;
var questionNum=0;

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
var startContainer=document.getElementById('start');
var quizContainer=document.getElementById('quiz');
var questionContainer=document.getElementById('question');
var choicesContainer=document.getElementById('choices');
var statementContainer=document.getElementById('statement');
var resultsContainer=document.getElementById('results');
var initialsInput= document.getElementById('initials-input');
var initialsForm= document.getElementById('initials-form');
initialsForm.style.display='none';
var userInitials=[];

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

function quizContent(){ 
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

function resultsSection(){
    questionContainer.style.display='none';
    statementContainer.style.display='none';
    resultsContainer.innerHTML= "Correct Amount : " + correctAmount;
    initialsForm.style.display='inline-block'

}

function clearButtons(){
    while(choicesContainer.firstChild){
        choicesContainer.removeChild(choicesContainer.lastChild);
    }
}

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
    var initials= initialsInput.value.trim();
    console.log(initials);
    var initialsScore= initials + " - " + ((correctAmount).toString());
    userInitials.push(initialsScore);

})
/*
submitContainer.addEventListener('click',function(){
    storeAnswer(questions,questionNum, quizContainer);
    if ((storeAnswer(questions,questionNum, quizContainer))===true){
        correctAmount++;
    } else{
        timerCount=timerCount-5;
    }
    
    questionNum++;
    submitContainer.style.display='none';
    
    if(questionNum<questions.length){
        nextContainer.style.display='inline-block';
    } else{
        resultsContainer.style.display='inline-block';
        clearInterval(timer);
    }

})


nextContainer.addEventListener('click', function (){
    quizContent(questions, questionNum, quizContainer);
    nextContainer.style.display='none';
    submitContainer.style.display='inline-block';
})

*/
startContainer.addEventListener('click',function(){
    startContainer.style.display='none';
    timerStart();
    quizContent(questions,questionNum);
})



