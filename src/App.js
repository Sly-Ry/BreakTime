import { useState } from 'react';
import Label from './components/Label';
import ding from './assets/breakTimeRingDingDong.mp3'
import './App.css';

export default function App() {

  
  const [timer, setTimer] = useState(1);
  const [breakTime, setBreakTime] = useState(3);
  const [sessionTime, setSessionTime] = useState(5);
  const [timerOn, setTimerOn] = useState(false);
  const [onBreak, setOnBreak] = useState(false);
  const [breakAudio, setBreakAudio] = useState(
    new Audio(ding)
  );
  const [active, setActive] = useState(false);

  const playBreakAudio = () => {
    breakAudio.currentTime = 17.2;
    breakAudio.play();
    setTimeout(() => {
      breakAudio.pause();
      breakAudio.currentTime = 0;
    }, 15505);
  }

  const formatTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;

    return (
      (minutes < 10 ? "0" + minutes : minutes) + 
      ":" +
      (seconds < 10 ? "0" + seconds : seconds) 
    );
  };

  const changeTime = (amount, type) => {
    if (type === "break"){
      if (breakTime <= 60 && amount < 0){
        return;
      }
      setBreakTime((prev) => prev + amount);
    }
    else {
      if (breakTime <= 60 && amount < 0){
        return;
      }
      setSessionTime(prev => prev + amount);
      if (!timerOn){
        setTimer(sessionTime + amount)
      }
    };
  }; 

  const controlTime = () => {
    let second = 1000;
    let date = new Date().getTime();
    let nextDate = new Date().getTime() + second;
    let onBreakTime = onBreak;
    if (!timerOn) {
      let interval = setInterval(() => {
        date = new Date().getTime();
        if (date > nextDate) {
          setTimer((prev) => {
            if (prev <= 0 && !onBreakTime){
              setActive(true);
              playBreakAudio();
              onBreakTime = true;
              setOnBreak(true);
              return breakTime;
            }
            else if (prev <= 0 && onBreakTime){
              setActive(false);
              playBreakAudio();
              onBreakTime = false;
              setOnBreak(false);
              return sessionTime;
            }

            return prev - 1;
          });

          nextDate += second;
        }
      }, [30]);

      localStorage.clear();
      localStorage.setItem("interval-id", interval);
    }

    if (timerOn) {
      clearInterval(localStorage.getItem("interval-id"));
    }
    setTimerOn(!timerOn);
  }

  const resetTime = () => {
    setActive(false);
    setTimer(25 * 60);
    setBreakTime(5 * 60);
    setSessionTime(25 * 60);
  }

  return (
    <div className="App center-align">
      <h1>BreakTime</h1>
      <div id='timer'>
        {active && <p>On Break</p>}
        <h1 id='time-left'>{formatTime(timer)}</h1>
      </div>
      <div id='timer-control'>
        <button 
          className='
            btn-floating 
            btn-flat 
            btn-large 
            waves-effect 
            waves-light
          ' 
          onClick={controlTime}>
          {timerOn ? (
            <i className="material-icons blue-text text-darken-4">pause_circle_filled</i>
          ) : (
            <i className="material-icons blue-text text-darken-4">play_circle_filled</i>
          )}
        </button>
        <button 
          className='
            btn-floating 
            btn-flat 
            btn-large
            waves-effect 
            waves-light
          ' 
          onClick={resetTime}>
          <i className="material-icons blue-text text-darken-4">autorenew</i>
        </button>
      </div>
      <div className="dual-container">
        <Label 
          title={"Session Length"}
          changeTime={changeTime}
          type={"session"}
          time={sessionTime}
          formatTime={formatTime}
        ></Label>
        <Label 
          title={"Break Length"}
          changeTime={changeTime}
          type={"break"}
          time={breakTime}
          formatTime={formatTime}
        ></Label>
      </div>
    </div>
  );
}