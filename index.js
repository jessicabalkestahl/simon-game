const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;

$(".btn").click(function() {
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
  
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
  });

$(document).keypress(function() {
    if (!started) {
        
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });


  function nextSequence() {

    userClickedPattern = [];
    
    level++;
    $("#level-title").text("Level " + level);
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
  };

  function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
  };

  function checkAnswer (currentLevel) {

    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length) {
          setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    }
    else {
      let audio = new Audio ("sounds/wrong.mp3");
      audio.play();

      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over")
      }, 200);

      $("h1").text("Game Over, Press Any Key to Restart");

      startOver();
    };
  };

  function startOver () {

    level = 0;
    gamePattern = [];
    started = false;
  }

function playSound (name) {
    switch (name) {
        case "red":
            let red = new Audio("sounds/red.mp3");
            red.play();    
            break;

        case "blue":
            let blue = new Audio("sounds/blue.mp3");
            blue.play();
            break;

        case "green":
            let green = new Audio("sounds/green.mp3");
            green.play(); 
            break;

        case "yellow":
            let yellow = new Audio("sounds/yellow.mp3");
            yellow.play();
            break;  

        default: let wrong = new Audio("sounds/wrong.mp3");
                 wrong.play();

}};






