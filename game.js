const boxes = document.querySelectorAll(".box");
const score = document.querySelector("#score");
const timer = document.querySelector("#timer");
const startButton = document.querySelector(".btn");

let result = 0;
let time = 0;

let hitPosition;
let countDownTimer;
let moleTimer;

startButton.addEventListener('click', startGame);

function startGame() {
    if (time <= 0) {
        startButton.textContent = "";
        time = 60;
        countDownTimer = setInterval(updateTimer, 1000);
        moleTimer = setInterval(randomBox, 500);    
    }
}

boxes.forEach(box => {
    box.addEventListener("mousedown", () => {
        if (time > 0) {
            if (box.id == hitPosition) {
                result++;
                score.textContent = result;
                box.classList.add("mole-down");
                playAudio("moledown");
                hitPosition = null;
            } else {
                result--;
                score.textContent = result;
            }
        }
    })
})

function randomBox() {
    boxes.forEach(box => {
        box.classList.remove("mole-down");
        box.classList.remove("mole-up");
    });

    let randomBox = boxes[Math.floor(Math.random() * 9)];
    randomBox.classList.add("mole-up");
    playAudio("moleup");
    hitPosition = randomBox.id;
}

function updateTimer() {
    if (time > 0) {
        time--;
        timer.textContent = "Time:" + time;
    } else {
        clearInterval(countDownTimer);
        clearInterval(moleTimer);
        timer.textContent = "Time Up!";
        startButton.textContent = "Play Again";
    }
}

function playAudio(name) {
    var audio = new Audio('audio/' + name + '.mp3');
    audio.play();
}