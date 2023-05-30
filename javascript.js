//javascript.js
var playing = false;
var score;
var action;
var timeremaining;
var correctAnswer;

document.getElementById("startreset").onclick = function(){
    if(playing == true){
        location.reload();
    }else{        
        playing = true;
        score = 0;
        document.getElementById("scorevalue").innerHTML = score;
        show("timeremaining");
        timeremaining = 60;
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;
        hide("gameOver");
        document.getElementById("startreset").innerHTML = "Reset Game";        
        startCountdown();        
        generateQA();
    }
    
}


for(i=1; i<5; i++){
    document.getElementById("box"+i).onclick = function(){
    if(playing == true){
        if(this.innerHTML == correctAnswer){
            
            score++;
            document.getElementById("scorevalue").innerHTML = score;
            hide("wrong");
            show("correct");
            setTimeout(function(){
                hide("correct");   
            }, 1000);
                        
            generateQA();
        }else{
        //wrong answer
            hide("correct");
            show("wrong");
            setTimeout(function(){
                hide("wrong");   
            }, 1000);
        }
    }
}   
}
// start countdown.
function startCountdown(){
    action = setInterval(function(){
        timeremaining -= 1;
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;
        if(timeremaining == 0){
            stopCountdown();
            show("gameOver");
         document.getElementById("gameOver").innerHTML = "<p>Game over!</p><p>Your score is " + score + ".</p>";   
            hide("timeremaining");
            hide("correct");
            hide("wrong");
            playing = false;
            document.getElementById("startreset").innerHTML = "Start Game";
        }
    }, 1000);    
}
// stpo countdown
function stopCountdown(){
    clearInterval(action);   
}
// hide box
function hide(Id){
    document.getElementById(Id).style.display = "none";   
}
//  show box
function show(Id){
    document.getElementById(Id).style.display = "block";   
}
// generate question

function generateQA(){
    var x = 1+ Math.round(9*Math.random());
    var y = 1+ Math.round(9*Math.random());
    correctAnswer = x*y;
    document.getElementById("question").innerHTML = x + "x" + y;
    var correctPosition = 1+ Math.round(3*Math.random());
    document.getElementById("box"+correctPosition).innerHTML = correctAnswer; //fill one box with the correct answer
    
    //fill other boxes with wrong answers
    
    var answers = [correctAnswer];
    
    for(i=1; i<5; i++){
        if(i != correctPosition) {
            var wrongAnswer;
            do{
                wrongAnswer = (1+ Math.round(9*Math.random()))*(1+ Math.round(9*Math.random())); //a wrong answer
            }while(answers.indexOf(wrongAnswer)>-1);
            document.getElementById("box" + i).innerHTML = wrongAnswer;   
            answers.push(wrongAnswer);
        }
    }
}