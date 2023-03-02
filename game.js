var button_colours = ["red", "blue", "green", "yellow"];
var game_pattern = [];
var user_pattern = [];
var level = 0;
var started = false;

if (!started) {
  $(document).keydown(next_sequence);
  started = true;
}

/* on button press, perform the necessary checks 
and triggers to continue the game */
$(".btn").click(function (event) {
  var chosen_colour = event.target.id;
  user_pattern.push(chosen_colour); // add pressed colour to user pattern
  play_sound(chosen_colour); // play sound for the pressed button
  animate_press(chosen_colour); // animate the button
  check_answer(user_pattern.length - 1); // check that the users answer was correct
});

/**
 * Gets the next sequence of button presses for the user to copy
 */
function next_sequence() {
  var random = Math.floor(Math.random() * 4);
  var random_colour = button_colours[random];
  game_pattern.push(random_colour);

  setTimeout(function () {
    $("#" + random_colour).fadeOut().fadeIn();
    play_sound(random_colour); // after 100 ms play the next colour
  }, 100);

  $("h1").text("Level " + ++level); // increment level
}

/**
 * Plays an MP3 with the given name
 * 
 * @param {String} name The name of the MP3 file
 */
function play_sound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

/**
 * Plays a pressed animation when the given button is pressed
 * 
 * @param {String} colour The colour of the button that was pressed
 */
function animate_press(colour) {
  $("#" + colour).addClass("pressed");
  setTimeout(function () {
    $("#" + colour).removeClass("pressed"); // remove pressed class after 100ms
  }, 100);
}

/**
 * Checks whether the user has pressed the correct pattern.
 * If they are correct, passes onto the next level, otherwise triggers
 * a game over.
 * 
 * @param {number} current_level The level that the user is currently on
 */
function check_answer(current_level) {

  /* if the user pattern matches the pattern that was 
  played to them, move onto the next level */
  if (game_pattern[current_level] == user_pattern[current_level]) {
    if (current_level + 1 == game_pattern.length) {
      setTimeout(next_sequence, 1000);
      user_pattern = [];
    }
  } else {
    play_sound("wrong");

    $("body").addClass("game-over"); // show game over text
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over, Press Any Key To Restart!");
    start_over(); // start the game again
  }
}

/**
 * Starts the game over again by resetting the game state
 */
function start_over() {
  level = 0;
  game_pattern = [];
  user_pattern = [];
  started = false;
}
