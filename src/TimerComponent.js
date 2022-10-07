import { useState } from 'react';

const TimerComponent = () => {
  const [time, setTime] = useState(0);
  const [intervalId, setIntervalId] = useState(0);
  console.log('TimerComponent');
  function handleStart() {
    let _time = 0;
    const id = setInterval(() => {
      if(_time === 60) {
        _time = 0;
        setTime(0);
      } else {
        setTime(function(count) {
          _time = count + 1;
          return _time;
        });
      }
    }, 1000);

    setIntervalId(id);
  }

  console.log()
  function handleStop() {
    clearInterval(intervalId);
  }
  return (
    <div>
      <h2>{time}</h2>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
    </div>
  );
};

export default TimerComponent;