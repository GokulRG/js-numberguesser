/*
Game Rules:
- Player must guess a number between a min and max value
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if he loses
- Let the player choose to play again
*/

//Game Values
//Note that you don't have to include a semi-colon everytime when declaring a variable. If you're declaring multiple variables, you can simply use a comma and continue 
//with your variable declarations
let min = 1;
let max = 10;
let winningNum = Math.floor(Math.random()*(max-min+1)+min);
let guessesLeft = 3;

//UI Elements
const game = document.getElementById('game');
const minNum = document.querySelector('.min-num');
const maxNum = document.querySelector('.max-num');
const guessBtn = document.getElementById('guess-btn');
const guessInput = document.getElementById('guess-input');
const messageUI = document.querySelector('.message');

//Assign UI Min and Max Values based on the values stored here
minNum.textContent = min;
maxNum.textContent = max;

//Play Again Event Listener --> Since this play again button is gonna be dynamically generated during the middle of execution, we'd have no way to specify this event in advance, so we have to do event delegation from a parent component because at the time of us defining the click handler such a button doesn't exist
//Click event won't work because it happens so fast that the submit button you clicked previously will still take effect and it will click play again without us realizing.
//So we use mousedown event.
game.addEventListener('mousedown', (event) => {
    if (event.target.className.includes('play-again')) {
        window.location.reload();
    }
});

//Set Message Function which actually sets the message to show on the UI message element
const setMessage = (message, color) => {
    messageUI.textContent = message;
    messageUI.style.color = color;
    console.log(messageUI);
    setTimeout(() => {
        messageUI.textContent = '';
        messageUI.style.color = 'black';
        guessInput.style.borderColor = 'black';
        guessInput.style.backgroundColor = 'white';
    }, 3000);
};

const gameOver = (didWin, message) => {
    //Disable Input
    guessInput.disabled = true;

    //Set color based on win condition
    guessInput.style.borderColor = (didWin) ? 'green' : 'red';
    guessInput.style.backgroundColor = (didWin) ? 'lightgreen' : 'lightcoral';

    //Set Message
    setMessage(message, guessInput.style.borderColor);

    //Play Again
    guessBtn.value = 'Play Again ?';

    //We'll add another class to the button so that we can uniquely identify it and then add a click handler on the same.
    guessBtn.className += ' play-again';
};

//Listen for Guess
guessBtn.addEventListener('click', () => {

    const guessValue = parseInt(guessInput.value);

    //Validate
    if (!guessValue || isNaN(guessValue) || guessValue < min || guessValue > max) {
        setMessage(`Please enter a valid value between ${min} and ${max}`, 'red');
        guessInput.value = '';
        return;
    }

    //Check if it's a winning guess
    if (guessValue === winningNum) {
        //Disable the input to show they have won!
        gameOver(true, `Congratulations !!! You have won! The right guess is ${winningNum}`);
    } else {
        if (guessesLeft > 1) {
            guessesLeft--;

            //Set Border color red!
            guessInput.style.borderColor = 'red';
            guessInput.style.backgroundColor = 'lightcoral';

            console.log(`Pssstt... The right answer is ${winningNum}`);
            guessInput.value = '';
            setMessage(`${guessValue} is Wrong! You have ${guessesLeft} guesses left`, 'red');
        } else {
            gameOver(false, `Sorry, you lost! The correct answer was ${winningNum}`);
        }     
    }
});

