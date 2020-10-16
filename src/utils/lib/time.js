import moment from 'moment';

export const dateFormat = 'ddd MMM D YYYY hh:mm:ss GMT';

export const sortScreenTime = screenTimes => {
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