import { useState } from 'react';
import './App.css';

export default function App() {

  const [timer, setTimer] = useState(25 * 60);

  const formatTime = (time) => {
    let minutes = Math.floor(time/60);
    let seconds = time % 60;

    return (
      (minutes < 10 ? "0" + minutes : minutes) + 
      ":" +
      (seconds < 10 ? "0" + seconds : seconds) 
    );
  };

  return (
    <div className="App">
      <h1>BreakTime</h1>
      <Label title={"Break Length"}></Label>
      <Label title={"Session Length"}></Label>
      <br/>
      <div id='timer'>
        <h2 id='timer-label'>Session</h2>
        <p id='time-left'>{formatTime(timer)}</p>
      </div>
      <div id='timer-control'>
        <button id='start_stop'>Play/pause</button>
        <button id='reset'>reset</button>
      </div>
    </div>
  );
}

function Label({ title, changeTime, type, time, formatTime }) {
  return (
    <div id='break-label'>
        <h3 id='break-length'>{title}</h3>
        <div className='buttons'>
          <button className='waves-effect waves-teal btn-small btn-flat'>
            <i className="material-icons">
              arrow_downwards
            </i>
          </button>
          <h3>5</h3>
          <button className='waves-effect waves-teal btn-small btn-flat'>
            <i className="material-icons">
              arrow_upwards
            </i>
          </button>
        </div>
      </div>
  )
}