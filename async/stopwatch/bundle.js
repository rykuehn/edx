document.onreadystatechange = () => {
  if(document.readyState === 'complete') {
    const startStop = document.getElementById('stopwatch__start');
    const reset = document.getElementById('stopwatch__reset');
    const record = document.getElementById('stopwatch__record');
    const timeRecordings = document.getElementById('stopwatch__time-recordings');
    const timeDisplay = document.getElementById('stopwatch__time-display');
    let time = 0.00;
    let addTime;
    let timerActive = false;

    const startTimer = () => {
      addTime = setInterval(() => {
        time += 0.01;
        timeDisplay.innerHTML = formatTime();
      }, 10);
    }

    const pauseTimer = () => {
      clearInterval(addTime);
    }

    const resetTimer = () => {
      clearInterval(addTime);
      timeDisplay.innerHTML = 0;
      time = 0.00;
    }

    const recordTime = () => {
      const newTime = document.createElement('li');
      newTime.innerHTML = formatTime();
      timeRecordings.appendChild(newTime);
    }

    const formatTime = () => {
      return time.toFixed(2);
    }

    startStop.addEventListener('click', function() {
      timerActive = !timerActive;
      if(timerActive) {
        startTimer();
      } else {
        pauseTimer();
      }
    });

    reset.addEventListener('click', resetTimer);
    record.addEventListener('click', recordTime);

    document.addEventListener('keypress', function(e) {
      const key = event.key;
      if (key === 's') {
        timerActive = !timerActive;
        if(timerActive) {
          startTimer();
        } else {
          pauseTimer();
        }
       } else if (key === 's' && timerActive === true) {
        pauseTimer();
      } else if (key === 't') {
        recordTime();
      } else if(key === 'r') {
        resetTimer();
      }
    })
  };
};

