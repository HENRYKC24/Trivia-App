const LOAD_QUESTIONS = 'trivia_app/LOAD_QUESTIONS';
const ADD_CHOICE = 'trivia_app/ADD_CHOICE';
const COMPUTE_RESULT = 'trivia_app/COMPUTE_RESULT';
const START_OVER = 'trivia_app/START_OVER';
const HANDLE_ERROR = 'trivia_app/HANDLE_ERROR';

// Create actions
export const loadQuestions = (payload) => ({ type: LOAD_QUESTIONS, payload });

export const addChoice = (payload) => ({ type: ADD_CHOICE, payload });

export const computeResult = (payload) => ({ type: COMPUTE_RESULT, payload });

export const startOver = () => ({ type: START_OVER });

export const handleError = (payload) => ({ type: HANDLE_ERROR, payload });

const initialState = {
  questions: [],
  answers: [],
  choices: [],
  result: [],
  errorMessage: '',
};

// Define reducer
const quizReducer = (state = initialState, action = {}) => {
  const { payload, type } = action;
  switch (type) {
    case LOAD_QUESTIONS: {
      const { questions, answers } = payload;
      return {
        ...state,
        questions,
        answers,
        errorMessage: '',
      };
    }
    case ADD_CHOICE:
      return {
        ...state,
        choices: [...state.choices, payload],
      };
    case COMPUTE_RESULT: {
      const { answers, choices } = state;
      return {
        ...state,
        result: choices.map((choice, index) => choice === answers[index]),
      };
    }
    case START_OVER:
      return {
        ...state,
        choices: [],
      };
    case HANDLE_ERROR:
      return {
        ...state,
        errorMessage: payload,
      };
    default:
      return state;
  }
};

export const getQuestionsFromServer = () => async (dispatch) => {
  const url = 'https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean';
  try {
    const result = await fetch(url);
    const data = await result.json();
    const { results } = data;
    const answers = results.map((result) => result.correct_answer === 'True');

    dispatch(loadQuestions({
      questions: results,
      answers,
    }));
  } catch (err) {
    dispatch(handleError(err.message));
  }
};

export default quizReducer;
