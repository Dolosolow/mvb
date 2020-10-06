const moment = require('moment');

const sortScreenTime = screenTimes => {
  let newArray = screenTimes;

  newArray = newArray.map(screen => {
    screen.times.sort((a, b) => {
      return moment(a.time, 'hh:mm').hour() - moment(b.time, 'hh:mm').hour();
    });

    const hasVariation = screen.times.findIndex(startTime => startTime.time !== '12:00' );

    if(hasVariation !== -1) {
      while(screen.times[screen.times.length - 1].time === '12:00') {
        screen.times.unshift(screen.times.pop());
      }
    }

    return screen;
  });

  return newArray;
}

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

module.exports = {
  sortScreenTime,
  startTimer,
  stopTimer
}