import { useRef, useState } from "react";
import ResultModel from "./ResultModel";

export default function TimerChallenge({ title, targetTime }) {
    // let timer;
    const timer = useRef();
    const dialog = useRef();

    // const [timerExpired, setTimerExpired] = useState(false);
    // const [timerStarted, setTimerStarted] = useState(false);

    const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);
    const timerActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

    if(timeRemaining <= 0) {
        clearInterval(timer.current);
        // setTimeRemaining(targetTime * 1000);
        dialog.current.open();
    }

    function handleRestTime() {
        setTimeRemaining(targetTime * 1000);
    }

    function handleStart() {
        timer.current = setInterval(() => {
            setTimeRemaining(previousRemaining => previousRemaining - 10);
        }, 10);
    }

    function handleStop() {
        dialog.current.open();
        clearInterval(timer.current);
    }

    // function handleStart() {
    //     timer.current = setTimeout(() => {
    //         setTimerExpired(true);
    //         dialog.current.open();
    //     }, targetTime * 1000);
    //     setTimerStarted(true);
    // }

    // function handleStop() {
    //     clearTimeout(timer.current);
    // }

    return(
        <>
            <ResultModel ref={dialog} targetTime={targetTime} remainingTime={timeRemaining} onReset={handleRestTime} />
            <section className="challenge">
                <h2>{title}</h2>
                {/* {timerActive && <p>You Lost!</p>} */}
                <p className="challenge-time">
                    {targetTime} second {targetTime > 1 ? 's' : ''}
                </p>
                <p>
                    <button onClick={timerActive ? handleStop : handleStart}>
                        {timerActive ? 'Stop' : 'Start'} Challenge
                    </button>
                </p>
                <p className={timerActive ? 'active' : undefined}>
                    {timerActive ?  'Time is running...' : 'Timer Inactive'}
                </p>
            </section>
        </>
    );
}