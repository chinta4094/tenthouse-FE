import { useEffect, useState } from "react";
import Loading from "./Loading";


export default function Timer() {


    const [time, setTime] = useState('00:00:00');

    useEffect(() => {
        const timerInterval = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
        }, 1 * 1000)
        return (() => {
            clearInterval(timerInterval)
        })
    }, [time])

    return (
        <div className='timer'>
            <div className='timer-container'>
                <div className='timer-content'>
                    { time === '00:00:00' ? <Loading /> : <p>{time}</p>}
                </div>
            </div>
        </div>
    );
}