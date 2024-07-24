import React, { useState, useEffect } from 'react';
import './quiz.css';
import { data } from '../../data';

export default function Quiz() {

  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(data[index]);
  const [isLastPage, setIsLastPage] = useState(false);
  const [score, setScore] = useState(0);
  const [lock, setLock] = useState(false);

  useEffect(() => {
    setQuestion(data[index]);
  }, [index]);

  function nextQuestion() {
    setLock(false);
    if (index < data.length - 1) {
      setIndex(index + 1);
      resetOptions();
    } else {
      setIsLastPage(true);
    }
  }

  function resetOptions() {
    const options = document.querySelectorAll('.quiz ul li');
    options.forEach(option => {
      option.classList.remove('correct');
      option.classList.remove('incorrect');
    });
  }

  function checkAnswer(e, ans) {
    if (!lock) {
      if (ans === question.ans) {
        setScore(score + 1);
        e.target.classList.add('correct');
      } else {
        e.target.classList.add('incorrect');
        const correctOption = document.querySelector(`.quiz ul li:nth-child(${question.ans})`);
        correctOption.classList.add('correct');
      }
      setLock(true);
    }
  }

  if (isLastPage) {
    return (
      <h2>Congrats, Test Complete. Score: {score}</h2>
    );
  }

  return (
    <div className='quiz'>
      <h1>Kod Quiz</h1>
      <h3>{question.question}</h3>
      <ul>
        <li onClick={(e) => checkAnswer(e, '1')}>{question.Option1}</li>
        <li onClick={(e) => checkAnswer(e, '2')}>{question.Option2}</li>
        <li onClick={(e) => checkAnswer(e, '3')}>{question.Option3}</li>
        <li onClick={(e) => checkAnswer(e, '4')}>{question.Option4}</li>
      </ul>
      <button onClick={nextQuestion}>NEXT</button>
      <div>Question: {index + 1} of {data.length}</div>
    </div>
  );
}
