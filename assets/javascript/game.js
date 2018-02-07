// Variables

	// Array with all word possibilities
	var lotrWords = ['gandalf', 'aragorn', 'gollum', 'frodo', 'ring', 'samwise', 'pippin', 'meriadoc', 'bilbo', 'legolas', 'gimli'];
	// Empty variable to store the current random word to be guessed as a string.
	var currentRandomWord = "";
	// Empty variable to hold the actual letters in the currentRandomWord
	var currentWordLetters = [];
	// Variable that holds the number of blanks "_" in the currentRandomWord
	var blanks = 0;
	// Empty array to store the answer as it displays for the user
	var answerDisplay = [];
	// Empty array to hold all the wrong guesses
	var wrongGuesses = [];

	// stats variables
	var wins = 0;
	var losses = 0;
    var remainingGuesses = 10;
    
    // set original image to the one ring.
    $('#images').html('<img src="assets/images/oneRing.png">');
    

// Functions

	//Create a function that starts a new game
	function newGame () {

		//Select a random word from the array
		currentRandomWord = lotrWords[Math.floor(Math.random() * lotrWords.length)];
			console.log("The current word chosen is: " + currentRandomWord);

		//break the current random word apart into individual letters.
		currentWordLetters = currentRandomWord.split("");
			console.log("The current word's letters are: " + currentWordLetters);

		//Grab the current word and get the number of letters in it
		blanks = currentWordLetters.length;
			console.log("The number of letters in the current word is: " + blanks);

		//Reset game variables needed to be cleared before each new game starts
		remainingGuesses = 10;
		wrongGuesses = [];
		answerDisplay = [];

		//Add the correct number of blanks to the answerDisplay that corresponds with the length of the currentRandomWord
		for (i = 0; i < blanks; i++) {
			answerDisplay.push("_");
			console.log(answerDisplay);
		}

		//Change HTML elements to display current information
		document.getElementById("randomWord").innerHTML = answerDisplay.join(" ");
		document.getElementById("remGuesses").innerHTML = "Guesses Remaining: " + " " + remainingGuesses;
		document.getElementById("wins").innerHTML = "Wins: " + " " + wins;
		document.getElementById("losses").innerHTML = "Losses: " + " " + losses;

	}

	function checkLtrs(letter) {

		//Check if the letter pressed is an actual letter
		if (event.keyCode >= 65 && event.keyCode <= 90) { //If the letter pressed IS part of the alphabet, then run the comparison:

					//Check if the letter guessed is one of the letters in the word
					var correctLetter = false;

					for ( var i = 0; i < blanks; i++) {
						if(currentRandomWord[i] === letter) {
							correctLetter = true;
						}
					}

					//Check where the correct letter is located in the word, then add to html
					if(correctLetter) {
						for ( var i = 0; i < blanks; i++) {
							if(currentRandomWord[i] === letter) {
								answerDisplay[i] = letter;
							}
						}
					}

					//If the letter guessed is wrong
					else {
						var alreadyGuessed = false;
						for (var i = 0; i < wrongGuesses.length; i++) {
							if(wrongGuesses[i] === letter)
							alreadyGuessed = true;
						}
						//if the letter has not been guessed, add letter to wrongGuesses array and
						// subtract one from remaining guesses.
						if(!alreadyGuessed) {
							wrongGuesses.push(letter);
							remainingGuesses--;
						}
					}

					//testing via console
					console.log(answerDisplay);
					
		} else { //If user input is not a letter from the alphabet
			// Alert the user
			alert("Please select a letter from the Alphabet (from a to z)");
		}
	}

	function roundComplete() {
		console.log("Win count: " + wins +  " | Loss Count: " + losses + " | Guesses Left: " + remainingGuesses)

        //Update HTML with Game Stats
        $('#remGuesses').text("Guesses Remaining: " + " " + remainingGuesses);
        $('#randomWord').text(answerDisplay.join(" "));        
        $('#guessedLetters').text("Letters Guessed: " + wrongGuesses.join(" "));

		//Check if the user won
		if (currentWordLetters.toString() == answerDisplay.toString()) {
			wins++;
            changeImage();
            $("#winLoseMessage").text("You Win!");
			// alert("GOOD JOB! You guessed '" + currentRandomWord + "' correctly. Try another round?");
            console.log("YOU WIN!");

			// Update the wins in the HTML
			document.getElementById("wins").innerHTML = "Wins: " + " " + wins;

			//Start New Game and clear letters already guessed
			newGame();
			document.getElementById("guessedLetters").innerHTML = "Letters Guessed:" + " " + " ";

		} else if (remainingGuesses == 0) { //Check if user lost
            losses++;
            $('#images').html('<img src="assets/images/oneRing.png">');
            $("#winLoseMessage").text("You lose! The answer was " + currentRandomWord + "." );
			console.log("You Lost!");

			// Update the losses in the HTML doc
			document.getElementById("losses").innerHTML = "Losses: " + " " + losses;

			//Start New Game
			newGame();
			document.getElementById("guessedLetters").innerHTML = "Letters Guessed:" + " " + " ";

		}
    }
        // function to change image to current word if user guesses correctly.
    function changeImage(){
        if (currentRandomWord === "gandalf") {
            $('#images').html('<img src="assets/images/gandalf.jpg">');
        }
        if (currentRandomWord === "aragorn") {
            $('#images').html('<img src="assets/images/aragorn.jpg">');
        }
        if (currentRandomWord === "gollum") {
            $('#images').html('<img src="assets/images/gollum.png">');
        }
        if (currentRandomWord === "frodo") {
            $('#images').html('<img src="assets/images/frodo.jpg">');
        }
        if (currentRandomWord === "ring") {
            $('#images').html('<img src="assets/images/theRing.png">');
        }
        if (currentRandomWord === "samwise") {
            $('#images').html('<img src="assets/images/samwise.jpg">');
        }
        if (currentRandomWord === "pippin") {
            $('#images').html('<img src="assets/images/pippin.jpg">');
        }
        if (currentRandomWord === "meriadoc") {
            $('#images').html('<img src="assets/images/meriadoc.png">');
        }
        if (currentRandomWord === "bilbo") {
            $('#images').html('<img src="assets/images/bilbo.jpg">');
        }
        if (currentRandomWord === "legolas") {
            $('#images').html('<img src="assets/images/legolas.png">');
        }
        if (currentRandomWord === "gimli") {
            $('#images').html('<img src="assets/images/gimli.png">');
        }
    }

// Main Game

	//Call function to start the game for the first time
	newGame();

	//Get input from user. Keys being pressed.
	document.onkeyup = function(event) {
		//Create a variable to hold all the letters that have been guessed
		var ltrsGuessed = String.fromCharCode(event.keyCode).toLowerCase();
			console.log("You Guessed the letter: " + ltrsGuessed);

		//Run the check letters function
		checkLtrs(ltrsGuessed);
        roundComplete();
	}