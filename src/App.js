import { useEffect, useState } from 'react';
import ding from './assets/breakTimeRingDingDong.mp3'
import './App.css';

export default function App() {

  // States List
  const [sessionTime, setSessionTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [counter, setCounter] = useState(1500);
  const [timerOn, setTimerOn] = useState('paused');
  const [currentSession, setCurrentSession] = useState('Session');
  const [breakAudio, setBreakAudio] = useState(
    new Audio(ding)
  );

  // Formulars
  let minutes = 
    Math.floor(counter / 60)
    .toString()
    .padStart(2, "0")
  ;
  
  let seconds = 
    (counter - minutes * 60)
    .toString()
    .padStart(2, "0")
  ;

  // State Effects
  useEffect(() => {
    if (timerOn === "paused"){
      return;
    }
    const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);

    return () => clearInterval(timer);
  }, [counter, timerOn]);

  useEffect(() => {
    setCounter(sessionTime * 60);
  }, [sessionTime])

  useEffect(() => {
    let playAudio = () => {
      breakAudio.currentTime = 17.2;
      breakAudio.play();
      setTimeout(() => {
        breakAudio.pause();
        breakAudio.currentTime = 0;
      }, 4000);
    };

    if (counter === 0 && currentSession === 'Session'){
      playAudio();
      setCurrentSession("Break")
      setCounter(breakTime * 60);
      setTimerOn("started");
      return;
    }
    if (counter === 0 && currentSession === "Break"){
      playAudio();
      setCurrentSession("Session")
      setCounter(sessionTime * 60);
      setTimerOn("started");
      return;
    }
  }, [sessionTime, breakTime, counter, currentSession])

  // Le Reset
  const resetTime = () => {
    setTimerOn("paused");
    
    if (currentSession === "Session") {
      setCounter(1500);
      setSessionTime(25);
    }
    else if (currentSession === "Break") {
      setCounter(1500);
      setBreakTime(5)
    }
  };

  // Application
  return (
    <div className="App center-align">
      <h1>BreakTime</h1>
      <div id='timer'>
        {currentSession === "Break" && <p>On Break</p>}
        <h1 id='time-left'>{minutes}:{seconds}</h1>
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
          onClick={() => setTimerOn("started")}>
          <i className="material-icons blue-text text-darken-4">play_circle_filled</i>
        </button>
        <button 
          className='
            btn-floating 
            btn-flat 
            btn-large
            waves-effect 
            waves-light
          ' 
          onClick={() => setTimerOn("paused")}>
          <i className="material-icons blue-text text-darken-4">pause_circle_filled</i>
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
          setTime={setSessionTime}
          time={sessionTime}
        />
        <Label 
          title={"Break Length"}
          setTime={setBreakTime}
          time={breakTime}
        />
      </div>
    </div>
  );
}

function Label({ title, setTime, time, }) {
  return (
    <div id='break-label'>
      <h2 id='break-length'>{title}</h2>
      <div className='buttons'>
        <button 
          className='
            btn-floating 
            btn-flat 
            btn-small 
            waves-effect 
            waves-red
          '
          onClick={() => time !== 1
          ? setTime(time - 1)
          : setTime(time)}
        >
          <i className="material-icons red-text text-darken-4">
              arrow_downward
          </i>
        </button>
        <h3>{time}</h3>
        <button 
          className='
            btn-floating 
            btn-flat 
            btn-small 
            waves-effect 
            waves-green
          '
          onClick={() => setTime(time + 1)}
        >
          <i className="material-icons green-text text-darken-4">
            arrow_upward
          </i>
        </button>
      </div>
    </div>
  )
}