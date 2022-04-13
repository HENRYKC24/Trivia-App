import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import parse from 'html-react-parser';
import { startOver } from '../redux/quiz';
import styles from './result.module.css';

const Result = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { choices, questions, answers } = useSelector((state) => state);
  const result = choices.filter(
    (each, index) => each === answers[index],
  ).length;

  const playAgain = () => {
    dispatch(startOver());
    return navigate('/quiz');
  };

  const {
    containerStyle,
    youScoredStyle,
    scoreStyle,
    choicesContainerStyle,
    choiceStyle,
    signStyle,
    questionStyle,
    playAgainBtnStyle,
  } = styles;

  return (
    <div className={containerStyle}>
      <p className={youScoredStyle}>You scored</p>
      <p className={scoreStyle}>
        {result}
        {' '}
        /
        {' '}
        10
      </p>
      <ul className={choicesContainerStyle}>
        {questions.map((singleQuestion, index) => {
          const { question } = singleQuestion;
          return (
            <li className={choiceStyle} key={Math.random()}>
              <span className={signStyle}>
                {choices[index] === answers[index] ? '+' : '-'}
              </span>
              <span className={questionStyle}>{parse(question)}</span>
            </li>
          );
        })}
      </ul>
      <button className={playAgainBtnStyle} onClick={playAgain} type="button">
        PLAY AGAIN?
      </button>
    </div>
  );
};

export default Result;
