
var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red","blue","green","yellow"];
function nextSequence(){
    
    
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    userClickedPattern = [];
        
}



$(".btn").click(function(){
    $("#" + $(this).attr("id")).fadeOut();
    $("#" + $(this).attr("id")).fadeIn();
    var userChosenColour = $(this).attr("id");
    playSound(userChosenColour);
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    if(currLevel<=level){

        checkAnswer(currLevel);
    }
    
});

function playSound(x){
    switch(x){
        case "red": 
            var redSound = new Audio("sounds/red.mp3");
            redSound.play();
            break;

        case "blue":
            var blueSound = new Audio("sounds/blue.mp3");
            blueSound.play();
            break;
        
        case "green":
            var greenSound = new Audio("sounds/green.mp3");
            greenSound.play();
            break;
        
        case "yellow":
            var yellowSound = new Audio("sounds/yellow.mp3");
            yellowSound.play();
            break;
    }
}
function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    },100);
    
  }
  var level = 1;
  var started = false;
  $(document).keypress(function(){
    if (started === false) {
        $("h1").text("Level " + level);
        nextSequence();
    }
    started = true;
  });
  var currLevel=1;
  function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel-1]===gamePattern[currentLevel-1]){
        
        currLevel++;
        if(currLevel>level){
            currLevel=1;
            setTimeout(function(){
                $("h1").text("Level " + ++level);
                nextSequence()
            },1000);
        }
        
    }
    else{
        $("h1").text("Game-over! Press any key to restart.");
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");},200);
        started = false;
        level=1;
        currLevel=1;
        gamePattern=[];
        
    }
    
    
  }