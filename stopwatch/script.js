const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');

let startTime = 0;     
let elapsed = 0;       
let timerInterval = null;
let isRunning = false;

function pad(n){ return String(n).padStart(2,'0'); }

function updateDisplay(ms){
  ms = ms || 0;
  const totalSeconds = Math.floor(ms / 1000);
  const seconds = totalSeconds % 60;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const minutes = totalMinutes % 60;
  const hours = Math.floor(totalMinutes / 60);
  const centiseconds = Math.floor((ms % 1000) / 10); 
  display.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(centiseconds)}`;
}

function startTimer(){
  if(isRunning) return;
  isRunning = true;
  startBtn.disabled = true;
  startBtn.textContent = 'Running';
  startTime = Date.now() - elapsed;
  timerInterval = setInterval(() => {
    elapsed = Date.now() - startTime;
    updateDisplay(elapsed);
  }, 100);
}

function pauseTimer(){
  if(!isRunning) return;
  isRunning = false;
  startBtn.disabled = false;
  startBtn.textContent = 'Start';
  clearInterval(timerInterval);
  elapsed = Date.now() - startTime;
  updateDisplay(elapsed);
}

function resetTimer(){
  isRunning = false;
  clearInterval(timerInterval);
  startTime = 0;
  elapsed = 0;
  startBtn.disabled = false;
  startBtn.textContent = 'Start';
  updateDisplay(0);
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

updateDisplay(0);