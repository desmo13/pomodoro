import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [timer, setTimer] = useState({ time:{ seconds: 0, minutes: 25, hours: 0 } });
  const [started, setStarted] = useState(false);
  const [numberPomodoro, setNumberPomodoro] = useState({
    pomodoro25Min: 0,
    pomodoro5Min: 0,
    pomodoro15Min: 0,
  });
  const [actualPomodoro, setActualPomodoro] = useState('25min');
  useEffect(() => {
        console.log(actualPomodoro)
        console.log(numberPomodoro)
        console.log(timer)
        if(!started) return;
    const interval = setInterval(() => {
      if(timer.time.seconds === 0 && timer.time.minutes === 0){
        setActualPomodoro(prevPomodoro => {
          if(prevPomodoro === '25min'){
            setStarted(false);
            setTimer({ time: { seconds: 0, minutes: 5, hours: 0 } });
            return '5min';
          }
          if(prevPomodoro === '5min'){
            setStarted(false);
            setTimer({ time: { seconds: 0, minutes: 15, hours: 0 } });
            return '15min';
          }
          setStarted(false);
          setTimer({ time: { seconds: 0, minutes: 25, hours: 0 } });
          return '25min';
        });
      }
      console.log(actualPomodoro)
      setTimer(prevTimer => {
        if(prevTimer.time.seconds <1){
          return { time: { seconds: 59, minutes: prevTimer.time.minutes - 1, hours: prevTimer.time.hours } }
        }
          return { time: { seconds: Number(prevTimer.time.seconds) - 1, minutes: prevTimer.time.minutes, hours: prevTimer.time.hours } }

       
      });

      
    }, 1000);
    return () => clearInterval(interval);
  }, [started,numberPomodoro,actualPomodoro,timer]);
  return (
    <>
      <div className='MainContainer'>
        <div className="container">
          <h2>Timer</h2>
        
          <div className="Timmer">
            
            <div className="Timmer__display">
               <div className={`spinner ${started ? '' : 'hidden'}`}></div>
              <span className="Timmer__display--number">{`${timer.time.minutes}:${timer.time.seconds}`}</span>
            </div>
            <button onClick={() => setStarted(!started)}>
              {started ? 'Stop' : 'Start'}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
