import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [timer, setTimer] = useState({ time: new Date(0,0,0) });
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prevTimer => {
        const newTime = new Date(prevTimer.time || Date.now() + 1000);
        newTime.setSeconds(newTime.getSeconds() + 1);
        return { time: newTime };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <div className='MainContainer'>
        <div className="container">
          <h2>Timer</h2>

          <div className="Timmer">
            <div className="Timmer__display">
              <span className="Timmer__display--number">{new Date(timer.time).toLocaleTimeString()}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
