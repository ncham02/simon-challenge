var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var latestGamePattern = gamePattern.length;
var level = 0;
var started = false;
var arrayIndex = 0;
var mistake = false;
var numberOfClicks = 0;

function clear() {
  level = 0;
  started = false;
  arrayIndex = 0;
  gamePattern = []
  userClickedPattern = [];
}

$(document).keydown(function() {
  if (!started) {
    clear();
    $("h1").text("Level " + arrayIndex);
    nextSequence();
    started = true;
  }
});

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  if (arrayIndex == 0) {
    playSound(randomChosenColor);
  } else {
    setTimeout(function(){
      repeatPattern(gamePattern);
    }, 500)
  }
}

// try and figure out how this works (lambda, or closing function)

function repeatPattern(gamePattern) {
  for (var i = 0; i < gamePattern.length; i++) {
    (function (i) {
    setTimeout(function() {
      playSound(gamePattern[i]);
    }, 500 * i);
  })(i);
};
}

// You can restart the game by clicking, fix that

$(".btn").click(function(event) {
  if (started = true) {
    numberOfClicks++;
    var userChosenColor = $(event.target).attr("id");
    if (userClickedPattern.length < gamePattern.length) {
      userClickedPattern.push(userChosenColor);
      animatePress(userChosenColor);
      playSound(userChosenColor);
    };
    if (userClickedPattern.length <= gamePattern.length) {
      if (userClickedPattern[numberOfClicks - 1] == gamePattern[numberOfClicks - 1]) {
        if (userClickedPattern.length == gamePattern.length) {
          success();
        }
      } else {
        fail();
      }
    }
  }
})

function success() {
  console.log(userClickedPattern);
  console.log(gamePattern);
  console.log("Success!")
  arrayIndex++;
  numberOfClicks = 0;
  userClickedPattern = []
  $("h1").text("Level " + arrayIndex);
  nextSequence();

}

function fail() {
  console.log(userClickedPattern);
  console.log(gamePattern);
  console.log("wrong!")
  startOver();
}

function playSound(chosenColor) {
  $("#" + chosenColor).fadeOut(100).fadeIn(100);
  var audio = new Audio("sounds/" + chosenColor + ".mp3");
  audio.play();
}

function nextLevel(){
  if (arrayIndex > 5){
    $("body").css("background-color","green");
  }
}
nextLevel();

function playWrongSound() {
  var audio = new Audio("sounds/wrong.mp3")
  audio.play();
}

function wrongAnimation() {
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function startOver() {
  playWrongSound();
  wrongAnimation();
  $("h1").text("Game Over, Press Any Key to Restart")
  console.log("Game Over...")
  numberOfClicks = 0;
  gamePattern = [];
  userClickedPattern = [];
  started = false;
}
