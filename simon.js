$(document).ready(function(){
  //will count the moves in the game.
  var counter = 0
  //will store the moves
  var array = [];
  //will compare user input to array.
  var userClicks = 0;
  //set game to on.
  var poweredOn = true;
  //checks if strict mode enabled
  var strictMode = true;
  //to see if input is correct, will continue game
  var continueGame = false;
  //audio files
  var audio = new Audio("simonSound1.mp3");
  var userAudio = new Audio("Pickup_Coin6.wav");
  var errorAudio = new Audio("error.wav");


  function playGame(){
    setTimeout(function(){
      if (counter >= 20){
        alert("You win!");
        resetGame();
      } else{
        if (continueGame === false){
          cpuMove();
          increaseCounter();
          cpuMoves();
        }
      }
    },1500);
  }

  //stores the id of the user input
  $(".rectangle").click(function(){
    if(userClicks < array.length && continueGame === true){
      var playerInput = $(this).attr("id");
      if (compareMove(playerInput, userClicks)){
        userAudio.play();
        userClicks++;
        if (userClicks >= array.length){
          continueGame = false;
          userClicks = 0;
          playGame();
        }
      } else {
        $("#displayCounter").text("XX");
        errorAudio.play();
        userClicks = 0;
        setTimeout(function(){
          cpuMoves();
        },1500);
        if (strictMode == true){
          alert("Game Over!");
          continueGame = false;
          resetGame();
        }

      }
    }
  });


  function compareMove(playerInput, userClicks){
    console.log("input is " + playerInput);
    console.log("click " + userClicks);
    var result = false;
    if (playerInput == array[userClicks]){
      console.log("its true!");
      result = true;
    }
    return result;
  }

  //this will iterate through all the current moves so far in the array
  function cpuMoves(){
    continueGame = true;
    for (let i = 0; i < array.length; i++){
      setTimeout(function(){
        console.log("array now is " + array[i])
        $("#"+array[i]).fadeOut(750);
        audio.play();
        $("#"+array[i]).fadeIn(750);
        console.log("array is still "+ array[i]);
        console.log('-----------');
      }, i * 1500)
    }
  }

  //the computer making its random choice then pushing to array
  function cpuMove() {
    var choice = (Math.random() * 3).toFixed();
    array.push(choice);
  }

  //resets the game
  function resetGame(){
    array = [];
    continueGame = false;
    counter = 0;
    userClicks = 0;
    $("#displayCounter").text("--");
    console.log("count is now " + counter);
    console.log("array is now " + array);
  }

  $("#resetButton").click(function(){
    resetGame();
  })

  //starts game if power button is on,
  //otherwise, prompts user to turn it on
  $("#start").click(function(){
    if (poweredOn === true){
      playGame();
    } else {
      alert("Please turn the game on");
    }
  });

  //increases the counter of game
  function increaseCounter(){
    counter++;
    $("#displayCounter").text(counter);
  }

  //will check if the power button is checked or not.
  //if checked, allows game to start
  $("#on").click(function(){
    var button = $(this);

    if (button.data('waschecked') === true){
      button.prop('checked', false);
      button.data('waschecked', false);
      poweredOn = false;
      console.log(poweredOn);
    } else {
      button.data('waschecked', true);
      poweredOn = true;
      console.log(poweredOn);
    }
  });

  $("#strict").click(function(){
    var button = $(this);

    if (button.data('waschecked') === true){
      button.prop('checked', false);
      button.data('waschecked', false);
      strictMode = false;
      console.log(strictMode);
    } else {
      button.data('waschecked', true);
      strictMode = true;
      console.log(strictMode);
    }
  });

})
