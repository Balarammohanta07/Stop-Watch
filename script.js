let startTime,
  updatedTime,
  difference,
  savedTime = 0,
  tInterval;
let running = false;
let lapCounter = 0;

const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const resetButton = document.getElementById("reset");
const lapButton = document.getElementById("lap");
const display = document.getElementById("display");
const lapTimes = document.getElementById("lap-times");

startButton.onclick = startTimer;
pauseButton.onclick = pauseTimer;
resetButton.onclick = resetTimer;
lapButton.onclick = recordLap;

function startTimer() {
  if (!running) {
    startTime = new Date().getTime() - savedTime;
    tInterval = setInterval(updateTime, 1);
    running = true;
  }
}

function pauseTimer() {
  if (running) {
    clearInterval(tInterval);
    savedTime = difference;
    running = false;
  }
}

function resetTimer() {
  clearInterval(tInterval);
  running = false;
  display.innerHTML = "00:00:00.000";
  lapTimes.innerHTML = "";
  savedTime = 0;
  lapCounter = 0;
}

function updateTime() {
  updatedTime = new Date().getTime();
  difference = updatedTime - startTime;

  let hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((difference % (1000 * 60)) / 1000);
  let milliseconds = Math.floor(difference % 1000);

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  milliseconds =
    milliseconds < 10
      ? "00" + milliseconds
      : milliseconds < 100
      ? "0" + milliseconds
      : milliseconds;

  display.innerHTML =
    hours + ":" + minutes + ":" + seconds + "." + milliseconds;
}

function recordLap() {
  if (running) {
    lapCounter++;
    let lapTime = document.createElement("div");
    lapTime.innerHTML = `Lap ${lapCounter}: ${display.innerHTML}`;
    lapTimes.appendChild(lapTime);
  }
}
