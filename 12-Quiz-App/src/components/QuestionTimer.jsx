import { useEffect, useState } from "react";


export default function QuestionTimer({timeout, onTimeout, mode }) {
    const [remainingTime, setRemainingTime] = useState(timeout);

    useEffect(() => {
        console.log('Setting Timeout');
        const timer = setTimeout(onTimeout, timeout);

        return () => {
            clearTimeout(timer);
        }
    }, [timeout, onTimeout]);

    useEffect(() => {
        console.log('Setting interval');
        const interval = setInterval(() => {
            setRemainingTime(preRemainingTime => preRemainingTime - 100);
        }, 100);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return <progress id="question-time" max={timeout} value={remainingTime} className={mode} />
}