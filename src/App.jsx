import { useEffect, useReducer, useState } from 'react'
import './App.css'
import { useNotification } from './hooks/useNotification'
import { List } from './Componentes/List/List'
import { Form } from './Componentes/Form/Form'

const getNextMode = (state) => {
  if (state.mode === '25min') {
    return '5min'
  } else if (state.mode === '5min' && state.count25 < 4) {
    return '25min'
  } else if (state.mode === '15min') {
    return '25min'
  }else if (state.mode === '5min' && state.count25 > 3) {
    return '15min'
  }
}

const getNextSeconds = (state) => {
  if (state.mode === '25min' && state.count25 < 4) {
    return 25 * 60
  } else if (state.mode === '5min') {
    return 5 * 60
  } else if (state.mode === '15min') {
    return 15 * 60
  }else if (state.mode === '25min' && state.count25 === 4) {
    return 15 * 60
  }
}
const getNextCount25 = (state) => {
  if (state.mode === '25min' && state.count25 < 4) {
    return state.count25 + 1
  } else if (state.mode === '5min') {
    return state.count25
  } else if (state.mode === '15min') {
    return 0
  } else if (state.mode === '25min' && state.count25 === 4) {
    return 0
  }

}
function reducer(state, action) {
  switch (action.type) {
    case 'TICK':
      if (state.secondsLeft > 0) {
        return { ...state, secondsLeft: state.secondsLeft - 1 }
      }
      break;
    case 'START':
      return { ...state, running: true }

    case 'STOP':
      return { ...state, running: false }
    case 'COMPLETE': {
      const nextMode = getNextMode(state)
      const nextSeconds = getNextSeconds({ ...state, mode: nextMode })
      const nextCount25 = getNextCount25(state)
      return { ...state, mode: nextMode, secondsLeft: nextSeconds, running: false, count25: nextCount25 }
    }

    

    default:
      return state
  }
}
function App() {
  const [state, dispatch] = useReducer(reducer, { secondsLeft: 25*60, running: false, mode: '25min', count25: 0 })
  const [task, setTask] = useState([])
  const { supported, permission, canNotify, requestPermission, notify } = useNotification()
  console.log(task)
  useEffect(() => {
    
    if (!supported) return
    if (permission === 'default') {
      requestPermission()
    }
    if (permission === 'granted') {
      if(!canNotify) return
      notify({
        title: 'Pomodoro',
        body: state.mode === '25min' ? 'Time to focus!' : state.mode === '5min' ? 'Take a short break!' : 'Take a long break!',
        icon: '/icon.png'
      })
    }
  }, [state.mode, permission, supported])
  useEffect(() => {
    if (!state.running) return
    console.log(state)
    const interval = setInterval(() => {
      if (state.secondsLeft === 0) {
        dispatch({ type: 'COMPLETE' })
        return
      }
      dispatch({ type: 'TICK' })
      

    }, 1000)
    return () => clearInterval(interval)
  }, [state])
  return (
    <>
      <div className='MainContainer'>
        <div className="container">
          <h2>Timer</h2>

          <div className="Timmer">

            <div className="Timmer__display">
              <div className={`spinner ${state.running ? '' : 'hidden'}`}></div>
              <span className="Timmer__display--number">{`${String(Math.floor(state.secondsLeft / 60)).padStart(2, '0')}:${String(state.secondsLeft % 60).padStart(2, '0')}`}</span>
            </div>
            <button onClick={() => dispatch({ type: state.running ? 'STOP' : 'START' })}>
              {state.running ? 'Stop' : 'Start'}
            </button>
            
          </div>
          <List data={task} />
          <Form onSubmit={(task) => setTask((prev) => [...prev, task])} />
        </div>
      </div>
    </>
  )
}

export default App
