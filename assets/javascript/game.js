//create data holder or variables
var wordList = ["wolf", "moose", "cougar", "coyote", "bison", "bear", "beaver", "raccoon",
    "pronghorn", "eagle", "bobcat", "reindeer", "opossum", "alligator", 
    "gopher", "deer", "chipmunk", "wolverine", "ocelot", "fox", "boreal", "owl"];
var chosenWord = "";
var lettersInChosenWord = [];
var numBlanks = 0;
var blanksAndSuccesses = [];
var wrongGuesses = [];

//game counters
var winCounter = 0;
var lossCounter = 0;
var numGuesses = 9;

// FUNCTIONS ======================================
//default when game start
function startGame() {
    numGuesses = 9;
    chosenWord = wordList[Math.floor(Math.random()*wordList.length)];
    lettersInChosenWord = chosenWord.split("");
    console.log(chosenWord + ": " + lettersInChosenWord);
    numBlanks = lettersInChosenWord.length;

    blanksAndSuccesses = [];
    wrongGuesses = [];  

    //print blank lines according to appropriate letters
    for (var i = 0; i<numBlanks; i++) {
        blanksAndSuccesses.push("_");
    }

    document.getElementById("word-text").innerHTML = blanksAndSuccesses.join(" ");
    document.getElementById("letterAG-text").innerHTML = wrongGuesses;
    document.getElementById("guessL-text").innerHTML = numGuesses;
}

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
    //if the letter exists somewhere in the word, then figure out exactly where (which indices)
    if (letterInWord) {
        //loop through the word.
        for (var j = 0; j < numBlanks; j++) {
            //populate the blanksAndSuccesses with every instance of the letter
            if (chosenWord[j] === letter) {
                //here we set the specific space in blanks and letter equal to the letter when there is a match
                blanksAndSuccesses[j] = letter;
                console.log(letter);
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
    document.getElementById("letterAG-text").innerHTML = wrongGuesses.join(" ");
}

//roundComplete() function
//Here we will have all of the code that needs to be run after each guess is made
function roundComplete() {
    //First, log an initial status update in the console telling us how many wins, losses, and guesses are left.
    console.log("WinCount: " + winCounter + " | LossCount: " + lossCounter + " | NumGuesses: " + numBlanks);

    //if we have gotton all the letters to match the solution..
    if (lettersInChosenWord.toString() === blanksAndSuccesses.toString()) {
        winCounter++;
        alert("You Win!");
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
startGame();

document.onkeyup = function(event) {
    var keyPressed = String.fromCharCode(event.which).toLowerCase();
    //runs the code to check for correctness
    checkLetters(keyPressed);
    roundComplete();

}

