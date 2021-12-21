let isStart = false;
let [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
let int = null;

let splitedAndPauseRecord = [];
let stopWatchTime = 0;

const timerDisplay = document.getElementById("timer");
const startButton = document.getElementById("btn1");
const splitButton = document.getElementById("btn2");
const resetButton = document.getElementById("btn3");
const splitTitle = document.getElementById("split-title");
const table = document.getElementById("tableData");

const startTimer = () => {
  if (isStart) {
    isStart = false;
    clearInterval(int);
    let getCurrentTime = timerDisplay.innerText;
    createTable("Pause", getCurrentTime);
    startButton.innerText = "Start";
    splitButton.disabled = true;
    resetButton.disabled = false;
    splitButton.className = "button2";
    resetButton.className = "button3Active";
    startButton.className = "button1";
  } else {
    isStart = true;
    startButton.innerText = "Pause";
    startButton.className = "pauseBtn";
    splitButton.className = "button2Active";
    resetButton.className = "button3";

    splitButton.disabled = false;
    resetButton.disabled = true;

    if (int !== null) {
      clearInterval(int);
    }
    int = setInterval(displayTimer, 10);
  }
};

const displayTimer = () => {
  milliseconds += 10;

  if (milliseconds == 1000) {
    milliseconds = 0;
    seconds++;

    if (seconds == 60) {
      seconds = 0;
      minutes++;

      if (minutes == 60) {
        minutes = 0;
        hours++;
      }
    }
  }

  let h = hours < 10 ? "0"   + hours   : hours;
  let m = minutes < 10 ? "0" + minutes : minutes;
  let s = seconds < 10 ? "0" + seconds : seconds;
  let ms =
    milliseconds < 10
      ? "00" + milliseconds
      : milliseconds < 100
      ? "0" + milliseconds
      : milliseconds;
  timerDisplay.innerHTML = `${h}:${m}:${s}.${ms}`;
  stopWatchTime = timerDisplay.innerHTML;
};

const resetTimer = () => {
  if (startButton) startButton.className = "button1";
  startButton.innerHTML = "Start";
  if (splitButton) splitButton.className = "button2";
  timerDisplay.innerHTML = "00:00:00.000";
  if (resetButton) resetButton.className = "button3Active";

  clearInterval(int);
  [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
  timerDisplay.innerHTML = "00:00:00.000";
  splitTitle.innerText = "Split Time";
  table.innerHTML = "";
  splitedAndPauseRecord = [];
};

const splitTime = () => {
  const splitedTime = timer.innerHTML;
  splitTitle.innerHTML = splitedTime;
  let getCurrentTime = timerDisplay.innerText;
  createTable("Split", getCurrentTime);
};

const createTable = (lapType, stopWatchTime) => {
  splitedAndPauseRecord.push({
    srNo: splitedAndPauseRecord.length + 1,
    type: lapType,
    time: stopWatchTime,
  });
  let lastLap = splitedAndPauseRecord[splitedAndPauseRecord.length - 1];
  table.innerHTML += `
        <table>
          <tr>
            <td>#${lastLap.srNo}</td>
            <td class=${lastLap.type}>${lastLap.time}</td>
            <td >${lastLap.type}</td>
          <tr>
        </table>
    `;
};

startButton.addEventListener("click", startTimer);
resetButton.addEventListener("click", resetTimer);
splitButton.addEventListener("click", splitTime);
