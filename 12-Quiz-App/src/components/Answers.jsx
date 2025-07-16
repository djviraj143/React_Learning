import { useState, useRef } from "react";


export default function Answers({answers, selectedAnswer, answerState, onSelect}) {
    
    const shuffledAnswers = useRef();

    if(!shuffledAnswers.current) {
        shuffledAnswers.current = [...answers];
        shuffledAnswers.current.sort(() => Math.random() - 0.5 );
    }

    return (
        <ul id="answers">
            {shuffledAnswers.current.map((answer) => {
                const isSelected = selectedAnswer === answer;
                let cssClass = '';
                if(isSelected && answerState === 'answered') {
                    cssClass = 'selected';
                }
                if(isSelected && (answerState === 'wrong' || answerState === 'correct')) {
                    cssClass = answerState;
                }
                return (
                    <li key={answer} className="answer">
                        <button
                            onClick={() => onSelect(answer)}
                            className={cssClass}
                            disabled={answerState !== ''}
                        >
                            {answer}
                        </button>
                    </li>
                );
            })}
        </ul>
    )
}