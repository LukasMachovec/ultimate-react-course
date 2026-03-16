import { useEffect, useReducer } from "react";
import Header from "./Header"
import Main from "./Main"
import Loader from "./Loader"
import Error from "./Error"
import StartScreen from "./StartScreen";
import Question from "./Question";

const initState = {
  questions: [],

  // loading, error, ready, active, finished
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
}

function reducer(state, action) {
  switch (action.type) {
    case 'dataRecieved':
      return {
        ...state,
        questions: action.payload,
        status: 'ready'
      }

    case 'dataFailed':
      return {
        ...state,
        status: 'error',
      }

    case 'start':
      return {
        ...state,
        status: 'active'
      }

    case 'newAnswer':
      const currQuestion = state.questions[state.index];
      const isCorrect = action.payload === currQuestion.correctOption;
      return {
        ...state,
        answer: action.payload,
        points: isCorrect ? state.points + currQuestion.points : state.points,
      }

    case 'nextQuestion':
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      }

    default:
      throw new Error("Action unknown");
  }
}

export default function App() {
  const [{ questions, status, index, answer }, dispatch] = useReducer(reducer, initState);



  useEffect(function () {
    fetch("http://localhost:9000/questions")
      .then(res => res.json())
      .then(data => dispatch({ type: 'dataRecieved', payload: data }))
      .catch(err => dispatch({ type: 'dataFailed' }));
  }, []);

  return (
    <div className="app">
      <Header />

      <Main>
        {status === 'isLoading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && <StartScreen questionsCount={questions.length} dispatch={dispatch} />}
        {status === 'active' && <Question question={questions[index]} dispatch={dispatch} answer={answer} />}
      </Main>
    </div>
  );
}

