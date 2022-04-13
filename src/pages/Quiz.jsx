import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import parse from 'html-react-parser';
import { addChoice } from '../redux/quiz';
import styles from './quiz.module.css';

const Quiz = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state);

  const [questionNumber, setQuestionNumber] = useState(0);

  const { questions, errorMessage } = data;

  const { category, question } = questions[questionNumber];

  const handleChoice = (choice) => {
    dispatch(addChoice(choice));
    if (questionNumber === 9) {
      return navigate('/result');
    }
    return setQuestionNumber((prev) => prev + 1);
  };

  const {
    containerStyle,
    categoryStyle,
    bodyStyle,
    questionStyle,
    btnContainerStyle,
    btnStyle,
    questionNumberStyle,
  } = styles;

  return (
    <>
      {!errorMessage ? (
        <div className={containerStyle}>
          <h1 className={categoryStyle}>{category}</h1>
          <div className={bodyStyle}>
            <p className={questionStyle}>{parse(question)}</p>
            <div className={btnContainerStyle}>
              <button
                className={btnStyle}
                onClick={() => handleChoice(false)}
                type="button"
              >
                False
              </button>
              <button
                className={btnStyle}
                onClick={() => handleChoice(true)}
                type="button"
              >
                True
              </button>
            </div>
          </div>
          <p className={questionNumberStyle}>
            Question
            {' '}
            {questionNumber + 1}
            {' '}
            of 10
          </p>
        </div>
      ) : (
        <div>{errorMessage}</div>
      )}
    </>
  );
};

export default Quiz;
