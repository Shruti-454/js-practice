let userScore = 0;
let computerScore = 0;

const userScore_span = document.getElementById("user-score");
const computerScore_span = document.getElementById("computer-score");
const result_p = document.getElementById("result");

const rock_btn = document.getElementById("rock");
const paper_btn = document.getElementById("paper");
const scissors_btn = document.getElementById("scissors");

function getComputerChoice() {
    const choices = ["rock", "paper", "scissors"];
    return choices[Math.floor(Math.random() * 3)];
}

function win(user, comp) {
    userScore++;
    userScore_span.textContent = userScore;
    result_p.textContent = `${user} beats ${comp}. You win! 🎉`;
}

function lose(user, comp) {
    computerScore++;
    computerScore_span.textContent = computerScore;
    result_p.textContent = `${comp} beats ${user}. You lose! 😢`;
}

function draw(user, comp) {
    result_p.textContent = `${user} equals ${comp}. It's a draw! 🤝`;
}

function game(userChoice) {
    const computerChoice = getComputerChoice();
    if (userChoice === computerChoice) {
        draw(userChoice, computerChoice);
    } else if (
        (userChoice === "rock" && computerChoice === "scissors") ||
        (userChoice === "paper" && computerChoice === "rock") ||
        (userChoice === "scissors" && computerChoice === "paper")
    ) {
        win(userChoice, computerChoice);
    } else {
        lose(userChoice, computerChoice);
    }
}

rock_btn.addEventListener("click", () => game("rock"));
paper_btn.addEventListener("click", () => game("paper"));
scissors_btn.addEventListener("click", () => game("scissors"));
