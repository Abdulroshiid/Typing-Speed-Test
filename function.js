const sentences = {
  short: [
    "Time waits for no one.",
    "Coding is fun.",
    "Practice makes perfect.",
    "Never stop learning.",
  ],
  medium: [
    "JavaScript is a versatile programming language used everywhere.",
    "The quick brown fox jumps over the lazy dog.",
    "Typing speed improves with consistent daily practice.",
  ],
  long: [
    "Frontend development requires creativity, problem solving, and consistent practice to master concepts such as layouts, animations, and user interactions.",
    "To become a great developer, one must learn to break down problems into smaller parts and handle each step with patience and precision.",
  ],
};

let currentSentence = "";
let startTime = null;
let timerRunning = false;

const sentenceDiv = document.getElementById("sentence");
const input = document.getElementById("input");
const statsDiv = document.getElementById("stats");
const difficulty = document.getElementById("difficulty");

function loadSentence() {
  const level = difficulty.value;
  const arr = sentences[level];
  currentSentence = arr[Math.floor(Math.random() * arr.length)];
  sentenceDiv.innerHTML = currentSentence
    .split("")
    .map((c) => `<span>${c}</span>`)
    .join("");
  input.value = "";
  statsDiv.innerHTML = "";
  startTime = null;
  timerRunning = false;
}

function calculateWPM(timeTaken) {
  const words = currentSentence.split(" ").length;
  return Math.round((words / timeTaken) * 60);
}

function calculateAccuracy() {
  const typed = input.value;
  let correct = 0;
  for (let i = 0; i < typed.length; i++) {
    if (typed[i] === currentSentence[i]) correct++;
  }
  return Math.round((correct / currentSentence.length) * 100);
}

input.addEventListener("input", () => {
  if (!timerRunning) {
    startTime = new Date();
    timerRunning = true;
  }

  const typed = input.value;
  const spans = sentenceDiv.querySelectorAll("span");

  spans.forEach((span, i) => {
    const char = typed[i];
    if (char == null) {
      span.classList.remove("correct", "incorrect");
    } else if (char === span.innerText) {
      span.classList.add("correct");
      span.classList.remove("incorrect");
    } else {
      span.classList.add("incorrect");
    }
  });

  if (typed === currentSentence) {
    let timeTaken = (new Date() - startTime) / 1000;
    let wpm = calculateWPM(timeTaken);
    let accuracy = calculateAccuracy();

    statsDiv.innerHTML = `
                <p><strong>Time:</strong> ${timeTaken.toFixed(1)}s</p>
                <p><strong>WPM:</strong> ${wpm}</p>
                <p><strong>Accuracy:</strong> ${accuracy}%</p>
            `;
  }
});

document.getElementById("reset").addEventListener("click", loadSentence);
difficulty.addEventListener("change", loadSentence);

loadSentence();
