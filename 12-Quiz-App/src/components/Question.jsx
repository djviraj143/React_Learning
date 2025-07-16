import QuestionTimer from "./QuestionTimer";
import Answers from "./Answers";
import { useState } from "react";
import QUESTIONS from "../questions";

export default function Questions({
    index,
    onSelectAnswer,
    onSkipAnswer,
}) {

    const [answer, setAnswer] = useState({
        selectedAnswer: '',
        isCorrect: null
    });

    let timer = 10000;

    if(answer.selectedAnswer) {
        timer = 1000;
    }

    if(answer.isCorrect) {
        timer = 2000;
    }


    function handleSelectAnswer(answer) {
        setAnswer({
            selectedAnswer: answer,
            isCorrect: null
        });

        setTimeout(() => {
            setAnswer({
                selectedAnswer: answer,
                isCorrect: QUESTIONS[index].answers[0] === answer
            })

            setTimeout(() => {
                onSelectAnswer(answer);
            }, 2000);
        }, 1000);
    }

    let answerState = '';

    if(answer.selectedAnswer && answer.isCorrect != null) {
        answerState = answer.isCorrect ? 'correct' : 'wrong';
    } else if(answer.selectedAnswer) {
        answerState = 'answered';
    }

    return (
        <div id="questions">
            <QuestionTimer
                key={timer}
                timeout={timer}
                onTimeout={answer.selectedAnswer === '' ? onSkipAnswer : null}
                mode={answerState}
            />
            <h2>{QUESTIONS[index]?.text}</h2>
            <Answers
                answers={QUESTIONS[index]?.answers}
                selectedAnswer={answer.selectedAnswer}
                answerState={answerState}
                onSelect={handleSelectAnswer}
            />
            {/* <ul id="answers">
                {shuffledAnswers.current.map((answer) => {
                    const isSelected = userAnswers[userAnswers.length - 1] === answer;
                    let cssClass = '';
                    if(isSelected && answerState === 'answered') {
                        cssClass = 'selected';
                    }
                    if(isSelected && (answerState === 'wrong' || answerState === 'correct')) {
                        cssClass = answerState;
                    }
                    return (
                        <li key={answer} className="answer">
                            <button onClick={() => handleSelectAnswer(answer)} className={cssClass}>
                                {answer}
                            </button>
                        </li>
                    );
                })}
            </ul> */}
        </div>
    )
}