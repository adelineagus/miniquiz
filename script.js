var timerElement=document.querySelector(".timer-countdown");

var timer;
var timerCount=10;
var correctAmount=0;
var questionNum=0;

function timerStart (){
    timer=setInterval(function(){
        timerCount--;
        timerElement.textContent=timerCount;
        if(timerCount<=0){
            clearInterval(timer);
            quizContainer.style.display='none';
            resultsContainer.style.display='inline-block';
        }
    },1000);
}
var startContainer=document.getElementById('start');
var quizContainer=document.getElementById('quiz');
var nextContainer= document.getElementById('next');
var submitContainer=document.getElementById('submit');
var resultsContainer=document.getElementById('results');
var showResults=document.getElementById('show-results');
nextContainer.style.display='none';
submitContainer.style.display='none';
resultsContainer.style.display='none';

var questions=[
    {
        question: "what's my name?",
        answers: {
            a: 'Adeline',
            b: 'Adel',
            c: 'Line'
        },
        correctAnswer: 'a'
    },
    {
        question: "how old is she?",
        answers: {
            a: '15',
            b: '10',
            c: '25',
        }, 
        correctAnswer: 'c'
    }
]

function quizContent(questions,questionNum, quizContainer){
    var output=[];
    var answers=[];

    for(letter in questions[questionNum].answers){
        answers.push(
            '<label><input type= "radio" name= "question' + questionNum + '"value= "' + letter +'">' + letter + ':'+ questions[questionNum].answers[letter]+'</label>'
        );
    }
    console.log(answers);
    output.push(
        '<div class = "question">'+ questions[questionNum].question +'</div>'
        +
        '<div class= "answers">' + answers.join('') +'</div>'
    );
    console.log(output);
    //}

    quizContainer.innerHTML=output.join('');
    console.log(quizContainer);
}

function storeAnswer(questions,questionNum, quizContainer){
    var userChoice=quizContainer.querySelector('input[name=question' + questionNum + ']:checked').value;
    if(userChoice===questions[questionNum].correctAnswer){
        return true;
    }else{
        return false;
    }
    
}

function resultsSection(correctAmount){
    quizContainer.innerHTML= "Correct Amount : " + correctAmount;
}

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
    }

})

resultsContainer.addEventListener('click',function(){
    resultsSection(correctAmount);
})

nextContainer.addEventListener('click', function (){
    quizContent(questions, questionNum, quizContainer);
    nextContainer.style.display='none';
    submitContainer.style.display='inline-block';
})


//submitContainer.addEventListener('click', quizContent);
//timerStart();
startContainer.addEventListener('click',function(){
    startContainer.style.display='none';
    timerStart();
    

    quizContent(questions,questionNum,quizContainer);
    submitContainer.style.display='inline-block';   
})



//quizContent(questions, quizContainer);