import React, { useState, useEffect } from 'react';
import './pomodoro.css';

function PomodoroTimer() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isOnBreak, setIsOnBreak] = useState(false);
  const [workTime, setWorkTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          // Timer is done, switch to break or work
          if (isOnBreak) {
            setMinutes(workTime);
            setSeconds(0);
          } else {
            setMinutes(breakTime);
            setSeconds(0);
          }
          setIsOnBreak(!isOnBreak);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning, minutes, seconds, isOnBreak, workTime, breakTime]);

  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsOnBreak(false);
    setMinutes(workTime);
    setSeconds(0);
  };

  return (
    <div className='pomodoro'>
      <h1 className='timetitle'>{isOnBreak ? 'Break' : 'Work'}</h1>
      <p className='timer'>
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </p>
      <button className="start-pause" onClick={handleStartPause}>{isRunning ? 'Pause' : 'Start'}</button>
      <button className="reset" onClick={handleReset}>Reset</button>
      <div className='timersettings'>
      <span className='worktimer'><label className='worktimer'>Work Time (minutes):</label></span>
        <input className='timercontainorwork'
          type="number"
          value={workTime}
          onChange={(e) => setWorkTime(parseInt(e.target.value, 10))}
        />
      </div>
      <div className='timersettings'>
        <span className='breaktimer'><label>Break Time (minutes):</label></span>
        <input className='timercontainorbreak'
          type="number"
          value={breakTime}
          onChange={(e) => setBreakTime(parseInt(e.target.value, 10))}
        />
      </div>
    </div>
  );
}

export default PomodoroTimer;

