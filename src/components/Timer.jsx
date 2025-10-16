import { useState, useEffect } from 'react'

export function Timer() {
    const [timerRunning,setTimerRunning] = useState(false);
    const [timerFinished,setTimerFinished] = useState(false)
    const [secondsLeft,setSecondsLeft] = useState(0);
    const [minutesLeft,setMinutesLeft] = useState(25);

    useEffect(() => {
        if (timerRunning) {
            const intervalID = setInterval(() => {
                if (secondsLeft > 0) {
                    setSecondsLeft((secondsLeft) => secondsLeft -1)
                } else {
                    if (minutesLeft === 0) {
                        clearInterval(intervalID);
                        setTimerRunning(false);
                        setTimerFinished(true);
                    } else {
                        setMinutesLeft((minutesLeft) => minutesLeft - 1)
                        setSecondsLeft(59)
                    }
                }
            }, 1000);
            return () => clearInterval(intervalID)
        }
    }, [timerRunning,minutesLeft,secondsLeft])

    const handleTimerStart = () => {
        if (secondsLeft <= 0 && minutesLeft <= 0) {
            alert('Please set timer to a higher value!')
        }
        setTimerFinished(false);
        setTimerRunning(true)
    }
    const handleTimerRestart = () => {
        setTimerFinished(false)
    }
    const handleIncrement = () => {
        setMinutesLeft((minutesLeft) => minutesLeft + 1)
    }
    const handleDecremement = () => {
        setMinutesLeft((minutesLeft) => minutesLeft - 1)
    }
    const handleTimerInput = (e) => {
        setMinutesLeft(e.target.value)
    }

    return (
        <>
            {!timerFinished ?
                <div className="timer">
                    <div className="timerDisplay">
                        {minutesLeft + ' minutes : ' + secondsLeft + ' seconds'}
                    </div>
                    <div className="timerButtons">
                        <button onClick={handleIncrement}> + </button>
                        <button onClick={handleTimerStart}> Start Timer </button>
                        <button onClick={handleDecremement}> - </button>
                    </div>
                    <div className="timerInput">
                        <input type='number' onChange={(e) => handleTimerInput(e)}/>
                    </div>
                </div>
            : 
                <div className="restartTimer">
                    <h2>Take a quick break before getting back to it! </h2>
                    <button onClick={handleTimerRestart}>Start another Timer</button>
                </div>
            }
        </>
    )
}
export default Timer