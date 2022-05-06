//stating variables
var viewScores=document.getElementById('view-scores');
var timerElement=document.querySelector(".timer-countdown");
var timer;
var timerCount=50;
var correctAmount=0;
var questionNum=0;
var questions=[
    {
        question: "What does Sayonara mean?",
        answers: ['Hello','Goodbye','Thankyou'],
        correctAnswer: 'Goodbye'
    },

    {
        question: "What was the first soft drink taken into space?",
        answers: ['Coca-Cola','Pepsi','Fanta'],
        correctAnswer: 'Coca-Cola'
    },

    {
        question: "How many hearts does an octopus have?",
        answers: ['2','3','4'],
        correctAnswer: '3'
    },

    {
        question: "What percentage of water does a watermelon have?",
        answers: ['92%','95%','99%'],
        correctAnswer: '92%'
    },

    {
        question: "What is the rarest M&M color?",
        answers: ['Red','Green','Brown'],
        correctAnswer: 'Brown'
    },

    {
        question: "What is the hottest planet in the solar system?",
        answers: ['Mercury','Mars','Venus'],
        correctAnswer: 'Venus'
    },

    {
        question: "What country has the most natural lakes?",
        answers: ['Canada','United States','China'],
        correctAnswer: 'Canada'
    },

    {
        question: "How many bones do we have in an ear?",
        answers: ['0','3','5'],
        correctAnswer: '3'
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
var userinitialsScores=[];
var scorepageContainer=document.getElementById('score-page');
var scoreContainer= document.getElementById('score');
var playButton=document.getElementById('play-game');
var clearButton=document.getElementById('clear-scores');


//stating defaults
resultspageContainer.style.display='none';
scorepageContainer.style.display='none';


//stating all events

//when view scores button is clicked, timer is stopped/cleared, showScores function is called
viewScores.addEventListener('click',function(){
    clearInterval(timer);
    showScores();
})

//when start button is clicked, timerStart and quizContent function is called
startContainer.addEventListener('click',function(){
    timerStart();
    quizContent(questions, questionNum);
})

//when choice button is clicked, user's choice will be recorded in var and used in storeAnswer function, questionNum is add by 1, clearChoice function is called.
choicesContainer.addEventListener('click',function(event,userChoice){
    var userChoice=event.target;
    storeAnswer(userChoice);
    questionNum++;
    clearChoices();
    
    //if question num is less than length of var questions (number of questions in var), quizContent function will be called, 
    if(questionNum<questions.length){
        //setTimeout(quizContent,500)
        quizContent();
    
    } else { // otherwise, resultsSection function will be called
        clearInterval(timer);
        setTimeout(resultsSection,600);
    }
})

// when form is filled out and user clicked enter/submit, scoreGenerator and showScores functions are called
initialsForm.addEventListener("submit", function(event){
    event.preventDefault();
    scoreGenerator();
    showScores();
})

//when play buttonis clicked, reset function is called
playButton.addEventListener('click', function(){
    reset();
})

//when clear button is clicked, clearscorePage and clearScores functions are called
clearButton.addEventListener('click',function(){
    clearscorePage();
    clearScores();
})


//function details

//setting up timer countdown
function timerStart (){
    timer=setInterval(function(){
        timerCount--;
        timerElement.textContent=timerCount;

        //if time reaches zero (or if timer is less than 0),
            //timer will be cleared and timer countdown will show zero, 
            //resultsSection function will be called
        if(timerCount<=0){
            clearInterval(timer);
            timerCount=0;
            timerElement.textContent='0';
            setTimeout(resultsSection,600);
        }
    },1000); //1000 ms= 1 s
}


//displaying quiz page and make welcome page disappear
    //display questions and answer choices on screen
function quizContent(){ 
    welcomeContainer.style.display='none';
    quizContainer.style.display='inline-block';
    questionContainer.innerText=questions[questionNum].question;
    questionContainer.setAttribute('style', 'font-size:50px; padding:20px; text-align:center');
    
    for (var i=0; i<3;i++){
        var choiceButton= document.createElement('button');
        choiceButton.innerText= questions[questionNum].answers[i];
        choiceButton.setAttribute('style', 'background-color: black; color:white; width: 200px; height:50px; font-size: 25px');
        choiceButton.setAttribute("answer", questions[questionNum].answers[i]);
        choicesContainer.appendChild(choiceButton);
    }
}

//checking whether user's choice/answer matches with the correct answer 
function storeAnswer(userChoice){
    statementContainer.style.display='inline-block';

      //display statement: true /false
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

        //timer count will be substracted by 10 whenever userchoice is wrong
        timerCount=timerCount-10;
    }
}

//reset/delete all choices
function clearChoices(){
    while(choicesContainer.firstChild){
        choicesContainer.removeChild(choicesContainer.lastChild);
    }
}

//make quiz page disappear and display result page
    //result page will contain statements on how many correct amount
function resultsSection(){
    quizContainer.style.display='none';
    resultspageContainer.style.display='inline-block';
    resultsContainer.innerHTML= "Correct Amount : " + correctAmount;
    resultsContainer.setAttribute('style', 'font-style: bold; font-size: 25px;')
}

//take initials from user and combine it with his/her scores
    //retrieve past record and store new records
function scoreGenerator(){
    var initials= initialsInput.value.trim();
    var initialsScore= initials + " - " + ((correctAmount).toString());
    getScores();
    userinitialsScores.push(initialsScore);
    storeScores();
    initialsInput.value="";
}

//display score page and make welcome, quiz, and results page disappear
    //show list of scores from current and past record
function showScores(){
    welcomeContainer.style.display='none';
    quizContainer.style.display='none';
    resultspageContainer.style.display='none';
    scorepageContainer.style.display='flex';
    getScores();
    scoreContainer.innerHTML="";
    for(var i=0; i<userinitialsScores.length;i++){
        var li= document.createElement("li");
        li.textContent=userinitialsScores[i];
        scoreContainer.appendChild(li);
    }
}

//retrieve saved/past scores from local storage
function getScores(){
    var storedScores= JSON.parse(localStorage.getItem("scores"));
    if(storedScores !== null){
        userinitialsScores=storedScores;
    }
}

//store initials and scores in local storage
function storeScores(){
    localStorage.setItem("scores", JSON.stringify(userinitialsScores));
}

//reset variables to initial value and display welcome page
function reset(){
    timer;
    timerCount=50;
    correctAmount=0;
    questionNum=0;
    clearChoices();
    scorepageContainer.style.display='none';
    welcomeContainer.style.display='flex';
}

//clear contents on score page
function clearscorePage(){
    while(scoreContainer.firstChild){
        scoreContainer.removeChild(scoreContainer.lastChild);
    }
}

//clear local storage by set initial and scores variable to an empty array and save it to local storage
function clearScores(){
    userinitialsScores=[];
    storeScores();
}




