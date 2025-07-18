// export default function ResultModel({ref, result, targetTime}) {
//     useImperativeHandle(ref);
//     return (
//         <dialog ref={ref} className="result-modal">
//             <h2>You {result}</h2>
//             <p>Your target time was <strong>{targetTime} seconds.</strong></p>
//             <p>You stopped the timer with <strong>{targetTime} seconds.</strong></p>
//             <form method="dialog">
//                 <button>Close</button>
//             </form>
//         </dialog>
//     );
// }


import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from 'react-dom';


const ResultModel = forwardRef(function ResultModel({targetTime, remainingTime, onReset}, ref) {
    const dialog = useRef();
    const userLost = remainingTime <= 0;
    const updatedRemainingTime = (remainingTime / 1000).toFixed(2);
    const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100); 

    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal();
            }
        }
    });
    return createPortal(
        <dialog ref={dialog} className="result-modal" onClose={onReset}>
            {userLost && <h2>You Lost</h2>}
            {!userLost && <h2>Your score: {score}</h2>}
            <p>Your target time was <strong>{targetTime} seconds.</strong></p>
            <p>You stopped the timer with <strong>{updatedRemainingTime} seconds left.</strong></p>
            <form method="dialog" onSubmit={onReset}>
                <button>Close</button>
            </form>
        </dialog>,
        document.getElementById('modal')
    );
});

export default ResultModel;