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
var resultContainer=document.getElementById('results');
var nextContainer= document.getElementById('next');
var submitContainer=document.getElementById('submit');

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
]

function quizContent(questions, quizContainer){
    var output=[];
    var answers;

    for (var i=0; i<questions.length;i++){
        answers=[];
        for(letter in questions[i].answers){
            answers.push(
                '<label><input type= "radio" name= "question' + i + '"value= "' + letter +'">' + letter + ':'+ questions[i].answers[letter]+'</label>'
            );
        }
        console.log(answers);
        output.push(
            '<div class = "question">'+ questions[i].question +'</div>'
            +
            '<div class= "answers">' + answers.join('') +'</div>'
        );
        console.log(output);
    }

    quizContainer.innerHTML=output.join('');
    console.log(quizContainer);
}

//submitContainer.addEventListener('click', quizContent);
//timerStart();

nextContainer.addEventListener('click', function (){
    quizContent(questions,quizContainer);
    timerStart();
}
)

//quizContent(questions, quizContainer);