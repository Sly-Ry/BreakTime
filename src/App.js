import { useEffect, useState } from 'react';
import ding from './assets/breakTimeRingDingDong.mp3'
import './App.css';

export default function App() {

  // new code 
  const [sessionTime, setSessionTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [counter, setCounter] = useState(1500);
  const [timerOn, setTimerOn] = useState('paused');
  const [currentSession, setCurrentSession] = useState('Session');
  const [breakAudio, setBreakAudio] = useState(
    new Audio(ding)
  );

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

  useEffect(() => {
    let playAudio = () => {
      breakAudio.currentTime = 17.2;
      breakAudio.play();
      setTimeout(() => {
        breakAudio.pause();
        breakAudio.currentTime = 0;
      }, 15505);
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

  // old code

  // const [timer, setTimer] = useState(1);
  // // const [breakTime, setBreakTime] = useState(3);
  // // const [sessionTime, setSessionTime] = useState(5);
  // // const [timerOn, setTimerOn] = useState(false);
  // const [onBreak, setOnBreak] = useState(false);
  // // const [breakAudio, setBreakAudio] = useState(
  // //   new Audio(ding)
  // // );


  // // const playBreakAudio = () => {
  // //   breakAudio.currentTime = 17.2;
  // //   breakAudio.play();
  // //   setTimeout(() => {
  // //     breakAudio.pause();
  // //     breakAudio.currentTime = 0;
  // //   }, 15505);
  // // }

  // // Time Formatting Function
  // const formatTime = (time) => {
  //   let minutes = Math.floor(time / 60);
  //   let seconds = time % 60;

  //   return (
  //     (minutes < 10 ? "0" + minutes : minutes) + 
  //     ":" +
  //     (seconds < 10 ? "0" + seconds : seconds) 
  //   );
  // };

  // // Session/Break Switch Function
  // const switchTime = (amount, type) => {
  //   if (type == "break"){
  //     if (breakTime <= 60 && amount < 0){
  //       return;
  //     }
  //     setBreakTime((prev) => prev + amount);
  //   }
  //   else {
  //     if (sessionTime <= 60 && amount < 0){
  //       return;
  //     }
  //     setSessionTime((prev) => prev + amount);
  //     if (!timerOn){
  //       setTimer(sessionTime + amount)
  //     }
  //   };
  // };

  // // Time Control Function
  // const controlTime = () => {
  //   let second = 1000;
  //   let date = new Date().getTime();
  //   let nextDate = new Date().getTime() + second;
  //   let onBreakTime = onBreak;
  //   console.log(onBreakTime);

  //   if (!timerOn) {
  //     let interval = setInterval(() => {
  //       date = new Date().getTime();
  //       if (date > nextDate){
  //         setTimer((prev) => {
  //           if (prev <= 0 && !onBreakTime){
  //             // playBreakAudio();
              
  //             setOnBreak(onBreak);
  //             onBreakTime = true;
              
  //             console.log(onBreakTime);

  //             return breakTime;
  //           }
  //           else if (prev <= 0 && onBreakTime){
  //             // playBreakAudio();
              
  //             setOnBreak(!onBreak);
  //             onBreakTime=false;

  //             console.log(onBreak);
  //             console.log(onBreakTime);

  //             return sessionTime;
  //           }
            
  //           console.log(onBreakTime);
  //           return prev - 1;
  //         });

  //         nextDate += second;
  //       }
  //     }, 30);

  //     localStorage.clear();
  //     localStorage.setItem("interval-id", interval);
  //   }
   

  //   if (timerOn) {
  //     clearInterval(localStorage.getItem("interval-id"));
  //   }
  //   setTimerOn(!timerOn);
  // };

  // Reset Function
  // const resetTime = () => {
  //   setTimer(25 * 60);
  //   setBreakTime(5 * 60);
  //   setSessionTime(25 * 60);
  // };

  return (
    <div className="App center-align">
      <h1>BreakTime</h1>
      <div id='timer'>
        {currentSession === "Break" && <p>{currentSession}</p>}
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
      <div id='break-label'>
        <h3 id='break-length'>Break Length</h3>
        <div className='buttons'>
          <button 
            className='
              btn-floating 
              btn-flat 
              btn-small 
              waves-effect 
              waves-red
            '
            onClick={() => breakTime !== 1
              ? setBreakTime(breakTime - 1)
              : setBreakTime(breakTime)
            }
          >
          <i className="material-icons red-text text-darken-4">
            arrow_downward
          </i>
          </button>
          <h3>{breakTime}</h3>
          <button 
          className='
              btn-floating 
              btn-flat 
              btn-small 
              waves-effect 
              waves-green
          '
          onClick={() => setBreakTime(breakTime + 1)}
          >
          <i className="material-icons green-text text-darken-4">
              arrow_upward
          </i>
          </button>
      </div>
        </div>

      <div id='break-label'>
            <h3 id='break-length'>Session Length</h3>
            <div className='buttons'>
                <button 
                className='
                    btn-floating 
                    btn-flat 
                    btn-small 
                    waves-effect 
                    waves-red
                '
                onClick={() => sessionTime !== 1
                ? setSessionTime(sessionTime - 1)
                : setSessionTime(sessionTime)}
                >
                <i className="material-icons red-text text-darken-4">
                    arrow_downward
                </i>
                </button>
                <h3>{sessionTime}</h3>
                <button 
                className='
                    btn-floating 
                    btn-flat 
                    btn-small 
                    waves-effect 
                    waves-green
                '
                onClick={() => setSessionTime(sessionTime + 1)
            }
                >
                <i className="material-icons green-text text-darken-4">
                    arrow_upward
                </i>
                </button>
            </div>
        </div>
        {/* <Label 
          title={"Session Length"}
          setBreakTimer={setSessionTime}
          type={"session"}
          breakTime={sessionTime}
        ></Label>
        <Label 
          title={"Break Length"}
          setBreakTimer={setBreakTime}
          type={"break"}
          breakTime={breakTime}
        ></Label>
         */}
      </div>
    </div>
  );
}