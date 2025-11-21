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
    "Frontend development requires creativity and consistent practice to master layouts and user interactions.",
    "To become a great developer, you must break down complex problems into simple and manageable steps.",
  ],
};

let currentSentence = "";
let startTime = null;
let timer = null;

const sentenceDiv = document.getElementById("sentence");
const input = document.getElementById("input");
const difficulty = document.getElementById("difficulty");

const timeSpan = document.getElementById("time");
const wpmSpan = document.getElementById("wpm");
const accuracySpan = document.getElementById("accuracy");

function loadSentence() {
  const arr = sentences[difficulty.value];
  currentSentence = arr[Math.floor(Math.random() * arr.length)];
  sentenceDiv.innerHTML = currentSentence
    .split("")
    .map((c) => `<span>${c}</span>`)
    .join("");

  input.value = "";
  startTime = null;
  clearInterval(timer);

  timeSpan.textContent = "0.0s";
  wpmSpan.textContent = "0";
  accuracySpan.textContent = "0%";
}

function startTimer() {
  startTime = new Date();

  timer = setInterval(() => {
    let elapsed = (new Date() - startTime) / 1000;
    timeSpan.textContent = elapsed.toFixed(1) + "s";
    updateWPM();
    updateAccuracy();
  }, 100);
}

function updateWPM() {
  let elapsed = (new Date() - startTime) / 1000 / 60;
  let words = input.value
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 0).length;
  let wpm = Math.round(words / elapsed) || 0;
  wpmSpan.textContent = wpm;
}

function updateAccuracy() {
  const typed = input.value;
  let correct = 0;
  for (let i = 0; i < typed.length; i++) {
    if (typed[i] === currentSentence[i]) correct++;
  }
  let acc = Math.round((correct / currentSentence.length) * 100);
  accuracySpan.textContent = (acc > 0 ? acc : 0) + "%";
}

input.addEventListener("input", () => {
  if (!startTime) startTimer();

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
    clearInterval(timer);
  }
});

document.getElementById("reset").addEventListener("click", loadSentence);
difficulty.addEventListener("change", loadSentence);

loadSentence();
