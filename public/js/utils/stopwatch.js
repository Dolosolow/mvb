
const startTimer = (startTime, cb) => {
  let timer = setInterval(() => {
   let sec = Math.floor(startTime % 60);
   let min = Math.floor((startTime / 60) % 60);
  
    if(startTime !== -1) {
      cb(`${min}:${sec < 10 ? '0' : ''}${sec}`);
      --startTime;
    } else {
      stopTimer(timer);
    }
  }, 1000);
}

const stopTimer = timer => {
  clearInterval(timer);
}

export { startTimer, stopTimer };