import React, { useState, useEffect } from 'react';
import App from './App';
import './timer.css';

const Timer = () => {
    const [userSeconds, setUserSeconds] = useState(0);
    const [userMinutes, setUserMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [startBtn, setStartBtn] = useState("Start");
    const[startClicked,setSartClicked]=useState(0);
    var timer;

        useEffect(() => {
            if(startClicked==1){
                timer = setInterval(() => {
                    setSeconds(seconds + 1);
                    if(minutes==userMinutes && seconds==userSeconds){
                        
                        playSong();
                        setSeconds(0);
                        setMinutes(0);
                        setSartClicked(0);
                        setStartBtn("Start");
                        return () => clearInterval(timer);
                    }
                    if (seconds == 59) {
                        setMinutes(minutes + 1);
                        setSeconds(0);
                    }
                }, 1000)
                return () => clearInterval(timer);
            }
        });

    const playSong=()=>{
        const audioEl = document.getElementsByClassName("audio-element")[0]
        audioEl.play();
    }
    const Start=()=>{
        if(startClicked==0){
            setStartBtn("Restart");
            setSartClicked(1);
        }
        else{
            
            restart();
        }
    }

    const restart = () => {
        setSeconds(0);
        setMinutes(0);
    }
    const stop = () => {
        clearInterval(timer);
    }
    return (
        <div className='timer'>
            <div className='container'>
                <div className='timer_container'>
                    <h1>Timer</h1>
                    <input className='inputTimer1' type="number" name="minutes" placeholder='minutes' onChange={(e) => setUserMinutes(e.target.value)} />
                    <input className='inputTimer2' type="number" name="seconds" placeholder='seconds' onChange={(e) => setUserSeconds(e.target.value)} />
                    <h1>{minutes < 10 ? "0" + minutes : minutes}:{seconds < 10 ? "0" + seconds : seconds}</h1>
                    <div style={{ display: 'flex' }}>
                        <button className='restart' onClick={Start}>{startBtn}</button>
                        <button className='stop' onClick={stop}>Stop</button>
                    </div>

                </div>
            </div>
            <audio className="audio-element">
          <source src="https://samplelib.com/lib/preview/mp3/sample-6s.mp3"></source>
        </audio>
        </div>
    )
}
export default Timer;