import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getQuestionsFromServer } from '../redux/quiz';
import styles from './home.module.css';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getQuestionsFromServer());
  }, []);

  const {
    containerStyle,
    welcomeContainerStyle,
    welcomeToStyle,
    challengeStyle,
    introStyle,
    youCanStyle,
    beginBtnStyle,
  } = styles;

  return (
    <div className={containerStyle}>
      <div className={welcomeContainerStyle}>
        <h2 className={welcomeToStyle}>Welcome to the</h2>
        <h2 className={challengeStyle}>Trivia Challenge!</h2>
      </div>
      <p className={introStyle}>
        You will be presented with 10 True or False questions.
      </p>
      <p className={youCanStyle}>Can you score 100%?</p>
      <button
        className={beginBtnStyle}
        onClick={() => navigate('/quiz', { replace: true })}
        type="button"
      >
        BEGIN
      </button>
    </div>
  );
};

export default Home;
