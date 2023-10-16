// Отримуємо посилання на елементи сторінки
const value = document.querySelector("#value");
const input = document.querySelector("#customRange1");
const audio = new Audio("../audio/metronome-85688.wav"); 
const startStopButton = document.getElementById("play_button");

let isPlaying = false;
let intervalId;

// Встановлюємо початкове значення value як значення input
value.value = input.value;

// Обробник події для введення значення темпу вручну
value.addEventListener("keyup", (event) => {
    input.value = parseInt(value.value)
    if (value.value > 300) {
        input.value = 300
        value.value = 300
    } 
});

// Обробник події для руху повзунка і синхронізації з елементом value
input.addEventListener("input", (event) => {
  value.value = event.target.value;
});

// Функція для включення / вимкнення метроному
function toggleMetronome() {
    audio.play();
  if (isPlaying) {
    clearInterval(intervalId);
    startStopButton.innerHTML = 'Старт';
    isPlaying = false;
  } else {
    startStopButton.innerHTML = 'Стоп'
    const tempo = parseInt(value.value);
    if (isNaN(tempo) || tempo <= 0) {
      alert("Будь ласка, введіть дійсний темп.");
      return;
    }

    isPlaying = true;
    intervalId = setInterval(() => {
      audio.play();
    }, 60000 / tempo);
  }
}

startStopButton.addEventListener("click", toggleMetronome);
