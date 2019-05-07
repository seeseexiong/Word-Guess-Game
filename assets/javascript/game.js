//create data holder or variables
var wordList = [
    "wolf", 
    "moose", "cougar", "coyote", "bison", "bear", "beaver", "raccoon",
    "pronghorn", "eagle", "bobcat", "reindeer", "opossum", "alligator", 
    "gopher", "deer", "chipmunk", "wolverine", "ocelot", "fox", "squirrel", "owl"];
var chosenWord = "";
//seperate the word into letters and store it here
var lettersInChosenWord = [];
//number of blanks or the length of the chosenWord
var numBlanks = 0;
var blanksAndSuccesses = [];
var wrongGuesses = [];

//game counters
var winCounter = 0;
var lossCounter = 0;
var numGuesses = 9;

// FUNCTIONS ======================================
//when the button on DOM is click, it trigers the game to start
function startGame() {
    //default these data...
    numGuesses = 9;
    blanksAndSuccesses = [];
    wrongGuesses = [];  

    //computer randomly select a word from the wordList
    chosenWord = wordList[Math.floor(Math.random()*wordList.length)];
    console.log(chosenWord);

    //the chosenWord is seperated into individual letters and stored in the variable 
    lettersInChosenWord = chosenWord.split("");
    console.log(lettersInChosenWord);

    //numBlanks is the length of chosenWord - need this so we can know how many blank lines to show
    numBlanks = chosenWord.length;

    //display blank lines according to appropriate letters
    for (var i = 0; i<numBlanks; i++) {
        blanksAndSuccesses.push("_");
    }

    //display the blanks at the beginning of each round
    document.getElementById("word-text").innerHTML = blanksAndSuccesses.join(" ");
    
    //clear the wrong guesses from the previous round
    document.getElementById("letterAG-text").innerHTML = wrongGuesses;
    
    //reset guessleft to 9
    document.getElementById("guessL-text").innerHTML = numGuesses;
};

//function checks for correct letter
//it's where we will do all of the comparisons for matches
//again, it's not being called here. It's just being made for future use
function checkLetters(letter) {
    //This boolen will be toggled based on whether or not a user letter is found anywhere in the word
    var letterInWord = false;  

    //Check if a letter exists inside the array at all.
    for (var i = 0; i<numBlanks; i++) {
        if (chosenWord[i] === letter) {
            //if the letter exists then toggle this boolen to true.
            letterInWord = true;
        }
    }

    //check if they already guessed that letter
    alreadyGuessed(letter);

    //if the letter exists somewhere in the word, then figure out exactly where (which indices)
    if (letterInWord) {
        //loop through the word.
        for (var j = 0; j < numBlanks; j++) {
            //populate the blanksAndSuccesses with every instance of the letter
            if (chosenWord[j] === letter) {
                //here we set the specific space in blanks and letter equal to the letter when there is a match
                blanksAndSuccesses[j] = letter;
                console.log(blanksAndSuccesses[j]);
            }
        }
    }
    //if the letter doesn't exist at all..
    else {
        wrongGuesses.push(letter);
        numGuesses--;
    }
    
    //update correct guesses
    document.getElementById("guessL-text").innerHTML = numGuesses;
    //update correct letters on blank lines
    document.getElementById("word-text").innerHTML = blanksAndSuccesses.join(" ");
    //update wrong guesses
    document.getElementById("letterAG-text").innerHTML = wrongGuesses.join(", ");
};

//check letters that was already guessed
function alreadyGuessed(guessedLetter) {
    //enable a toggle variable so we can print wrong guess only one time
    existingLetter = false;
    
    //FOR LOOP to check in chosenWord
        //if letter matches an index of chosenWord then letter will become true
    for ( i=0; i<wrongGuesses.length; i++ ) {
        if ( guessedLetter === wrongGuesses[i]) {
            existingLetter = true;
            console.log(guessedLetter + " is true");
        } 
    };

    if (existingLetter) {
        alert("You already guessed that letter")
    };

};


//roundComplete() function
//Here we will have all of the code that needs to be run after each guess is made
function roundComplete() {
    //First, log an initial status update in the console telling us how many wins, losses, and guesses are left.
    console.log("WinCount: " + winCounter + " | LossCount: " + lossCounter + " | NumGuesses: " + numBlanks);

    //if we have gotton all the letters to match the solution..
    if (lettersInChosenWord.toString() === blanksAndSuccesses.toString()) {
        //NEW 3/29/19
        document.getElementById('word-text').innerHTML = lettersInChosenWord.join(" ");
        winCounter++;
        // alert("You Win!");
        document.getElementById("win-text").innerHTML = winCounter;
        startGame();
    }
    //if we run out of guesses
    else if (numGuesses === 0) {
        lossCounter++;
        alert("You lose");

        document.getElementById("loss-text").innerHTML = lossCounter;
        startGame();
    }
}
//MAIN PROCESS Starts =======================================

document.onkeyup = function(event) {
    var keyPressed = String.fromCharCode(event.which).toLowerCase();
    //runs the code to check for correctness
    checkLetters(keyPressed);
    roundComplete();

}

