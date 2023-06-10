import { useState } from 'react';
import Label from './components/Label';
import './App.css';

export default function App() {

  const [timer, setTimer] = useState(25 * 60);
  const [breakTime, setBreakTime] = useState(5 * 60);
  const [sessionTime, setSessionTime] = useState(25 * 60);
  const [timerOn, setTimerOn] = useState(false);

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

  }

  const resetTime = () => {
    setTimer(25 * 60);
    setBreakTime(5 * 60);
    setSessionTime(25 * 60);
  }

  return (
    <div className="App center-align">
      <h1>BreakTime</h1>
      <div className="dual-container">
        <Label 
          title={"Break Length"}
          changeTime={changeTime}
          type={"break"}
          time={breakTime}
          formatTime={formatTime}
        ></Label>
        <Label 
          title={"Session Length"}
          changeTime={changeTime}
          type={"session"}
          time={sessionTime}
          formatTime={formatTime}
        ></Label>
      </div>
      
      <div id='timer'>
        <h2 id='timer-label'>Session</h2>
        <p id='time-left'>{formatTime(timer)}</p>
      </div>
      <div id='timer-control'>
        {/* <button id='start_stop'>Play/pause</button>
        <button id='reset'>reset</button> */}
        <button className="btn-small blue lighten-2" onClick={controlTime}>
          {timerOn ? (
            <i className="material-icons">pause_circle_filled</i>
          ) : (
            <i className="material-icons">play_circle_filled</i>
          )}
        </button>
        <button className="btn-small blue lighten-2" onClick={resetTime}>
          <i className="material-icons">autorenew</i>
        </button>
      </div>
    </div>
  );
}