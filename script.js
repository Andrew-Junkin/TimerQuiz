// Gathering HTML elements for manipulation
var quizContent = document.getElementById("quiz");
var quizResults = document.getElementById("result");
var scoreFinal = document.getElementById("finalScore");
var endGame = document.getElementById("gameover");
var questions = document.getElementById("questions");
var timer = document.getElementById("timer");
var startBtn = document.getElementById("startbtn");
var beginQuiz = document.getElementById("startpage");
var highScores = document.getElementById("highScores");
var highscoreDiv = document.getElementById("high-scorePage");
var highScoreName = document.getElementById("initials");
var highscoreDisplayName = document.getElementById("highscore-initials");
var endBtn= document.getElementById("endGameBtns");
var submitScoreBtn = document.getElementById("submitScore");
var highscoreDisplayScore = document.getElementById("highscore-score");
var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("d");

// Quiz question object
var quizQuestions = [{
    question: "How do you write 'Hello World' in an alert box?",
    choiceA: "msg('Hello World')",
    choiceB: "arrayList(0)",
    choiceC: "arrayList.length=0",
    choiceD: "arrayList.len(0)",
    correctAnswer: "c"},
  {
    question: "What function to add an element at the begining of an array and one at the end?",
    choiceA: "push,unshift",
    choiceB: "Display Object Management",
    choiceC: "Digital Ordinance Model",
    choiceD: "Desktop Oriented Mode",
    correctAnswer: "a"},
   {
    question: "What will this output? var a = [1, 2, 3]; console.log(a[6]);",
    choiceA: "undefined",
    choiceB: "0",
    choiceC: "Prints northing",
    choiceD: "Syntax error",
    correctAnswer: "a"},
    {
    question: "What HTML tags are JavaScript code wrapped in?",
    choiceA: "&lt;div&gt;",
    choiceB: "&lt;link&gt;",
    choiceC: "&lt;head&gt;",
    choiceD: "&lt;script&gt;",
    correctAnswer: "d"},
    {
    question: "What would be the result of 3+2+'7'?",
    choiceA: "327",
    choiceB: "12",
    choiceC: "14",
    choiceD: "57",
    correctAnswer: "d"},  
    {
    question: "What would following code return? console.log(typeof typeof 1);",
    choiceA: "string",
    choiceB: "number",
    choiceC: "Syntax error",
    choiceD: "undefined",
    correctAnswer: "a"},
    {
    question: "Which software company developed JavaScript?",
    choiceA: "Mozilla",
    choiceB: "Netscape",
    choiceC: "Sun Microsystems",
    choiceD: "oracle",
    correctAnswer: "b"},
        
];

// Other global variables
var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;
var timeLeft = 61;
var timerInterval;
var score = 0;
var correct;

// This function cycles through the object array 
function generateQuizQuestion(){
    endGame.style.display = "none";
    if (currentQuestionIndex === finalQuestionIndex){
        return showScore();
    } 
    var currentQuestion = quizQuestions[currentQuestionIndex];
    questions.innerHTML = "<p>" + currentQuestion.question + "</p>";
    buttonA.innerHTML = currentQuestion.choiceA;
    buttonB.innerHTML = currentQuestion.choiceB;
    buttonC.innerHTML = currentQuestion.choiceC;
    buttonD.innerHTML = currentQuestion.choiceD;
};

// Start Quiz function starts the TimeRanges and hides the buttons
function startQuiz(){
    endGame.style.display = "none";
    beginQuiz.style.display = "none";
    generateQuizQuestion();

    //Timer
    timerInterval = setInterval(function() {
        timeLeft--;
        timer.textContent = "Time left: " + timeLeft;
    
        if(timeLeft === 0) {
          clearInterval(timerInterval);
          showScore();
        }
      }, 1000);
    quizContent.style.display = "block";
}
// This function is the end page screen that displays your score after either completeing the quiz or upon timer run out
function showScore(){
    quizContent.style.display = "none"
    endGame.style.display = "flex";
    clearInterval(timerInterval);
    highScoreName.value = "";
    scoreFinal.innerHTML = "You got " + score + " out of " + quizQuestions.length + " correct!";
}


submitScoreBtn.addEventListener("click", function highscore(){
    
    
    if(highScoreName.value === "") {
        alert("Initials cannot be blank");
        return false;
    }else{
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var currentUser = highScoreName.value.trim();
        var currentHighscore = {
            name : currentUser,
            score : score
        };
    
        endGame.style.display = "none";
        highScores.style.display = "flex";
        highscoreDiv.style.display = "block";
        endGameBtns.style.display = "flex";
        
        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        generateHighscores();

    }
    
});


function generateHighscores(){
    highscoreDisplayName.innerHTML = "";
    highscoreDisplayScore.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i=0; i<highscores.length; i++){
        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        highscoreDisplayName.appendChild(newNameSpan);
        highscoreDisplayScore.appendChild(newScoreSpan);
    }
}


function showHighscore(){
    beginQuiz.style.display = "none"
    endGame.style.display = "none";
    highScores.style.display = "flex";
    highscoreDiv.style.display = "block";
    endGameBtns.style.display = "flex";

    generateHighscores();
}


function clearScore(){
    window.localStorage.clear();
    highscoreDisplayName.textContent = "";
    highscoreDisplayScore.textContent = "";
}


function replayQuiz(){
    highScores.style.display = "none";
    endGame.style.display = "none";
    beginQuiz.style.display = "flex";
    timeLeft = 76;
    score = 0;
    currentQuestionIndex = 0;
}


function checkAnswer(answer){
    correct = quizQuestions[currentQuestionIndex].correctAnswer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex){
        score++;
        alert("That Is Correct!");
        currentQuestionIndex++;
        generateQuizQuestion();
        
    }else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex){
        alert("That Is Incorrect.")
        currentQuestionIndex++;
        generateQuizQuestion();
        
    }else{
        showScore();
    }
}


startBtn.addEventListener("click",startQuiz);