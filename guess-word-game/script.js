// Word database with hints
const wordDatabase = [
    { word: "javascript", hint: "Programming language for web development" },
    { word: "elephant", hint: "Large land mammal with a trunk" },
    { word: "keyboard", hint: "Computer input device with keys" },
    { word: "mountain", hint: "Natural elevation of the earth's surface" },
    { word: "guitar", hint: "Musical instrument with strings" },
    { word: "pizza", hint: "Popular Italian dish with toppings" },
    { word: "rainbow", hint: "Meteorological phenomenon with colors" }
];

// Game state
let selectedWord = "";
let currentHint = "";
let guessedLetters = [];
let remainingGuesses = 6;
let gameOver = false;

// DOM elements
const wordDisplay = document.getElementById("word-display");
const hintElement = document.getElementById("hint");
const guessesElement = document.getElementById("guesses");
const messageElement = document.getElementById("message");
const keyboard = document.getElementById("keyboard");
const resetButton = document.getElementById("reset");

// Initialize game
function initGame() {
    // Select random word and hint
    const randomEntry = wordDatabase[Math.floor(Math.random() * wordDatabase.length)];
    selectedWord = randomEntry.word.toLowerCase();
    currentHint = randomEntry.hint;
    guessedLetters = [];
    remainingGuesses = 6;
    gameOver = false;
    
    // Display hint and setup game
    hintElement.textContent = `Hint: ${currentHint}`;
    updateWordDisplay();
    updateGuessesDisplay();
    messageElement.textContent = "";
    messageElement.style.color = "";
    createKeyboard();
    
    // Focus on body to enable keyboard input
    document.body.focus();
}

// Update word display with blanks or guessed letters
function updateWordDisplay() {
    wordDisplay.innerHTML = "";
    
    selectedWord.split("").forEach(letter => {
        const charElement = document.createElement("span");
        charElement.className = "blank-char";
        
        if (guessedLetters.includes(letter)) {
            charElement.textContent = letter;
            charElement.style.borderBottom = "none";
        } else {
            charElement.textContent = " ";
        }
        
        wordDisplay.appendChild(charElement);
    });
    
    // Check win condition
    if (!selectedWord.split("").some(letter => !guessedLetters.includes(letter))) {
        gameOver = true;
        messageElement.textContent = "🎉 You won!";
        messageElement.style.color = "green";
        disableKeyboard();
    }
}

// Handle letter guess
function handleGuess(letter) {
    if (gameOver || guessedLetters.includes(letter)) return;
    
    guessedLetters.push(letter);
    const button = document.getElementById(`key-${letter}`);
    if (button) {
        button.disabled = true;
        button.style.background = selectedWord.includes(letter) ? "#a0e0a0" : "#e0a0a0";
    }
    
    if (!selectedWord.includes(letter)) {
        remainingGuesses--;
        updateGuessesDisplay();
        
        if (remainingGuesses <= 0) {
            gameOver = true;
            messageElement.textContent = `Game over! The word was: ${selectedWord}`;
            messageElement.style.color = "red";
            revealWord();
            disableKeyboard();
        }
    }
    
    updateWordDisplay();
}

// Reveal the full word when game is lost
function revealWord() {
    wordDisplay.innerHTML = "";
    selectedWord.split("").forEach(letter => {
        const charElement = document.createElement("span");
        charElement.className = "blank-char";
        charElement.textContent = letter;
        charElement.style.borderBottom = "none";
        wordDisplay.appendChild(charElement);
    });
}

// Keyboard input support
document.addEventListener("keydown", (e) => {
    if (e.key.length === 1 && e.key.match(/[a-z]/i)) {
        handleGuess(e.key.toLowerCase());
    }
});

// Create on-screen keyboard
function createKeyboard() {
    keyboard.innerHTML = "";
    
    "abcdefghijklmnopqrstuvwxyz".split("").forEach(letter => {
        const button = document.createElement("button");
        button.textContent = letter;
        button.className = "key";
        button.id = `key-${letter}`;
        button.addEventListener("click", () => handleGuess(letter));
        keyboard.appendChild(button);
    });
}

// Disable keyboard after game ends
function disableKeyboard() {
    document.querySelectorAll(".key").forEach(button => {
        button.disabled = true;
    });
}

// Update remaining guesses display
function updateGuessesDisplay() {
    guessesElement.textContent = remainingGuesses;
}

// Event listeners
resetButton.addEventListener("click", initGame);

// Start the game when page loads
window.addEventListener("DOMContentLoaded", initGame);