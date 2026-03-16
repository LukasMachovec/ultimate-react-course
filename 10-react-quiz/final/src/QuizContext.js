import { createContext, useContext, useReducer } from "react";

const QuizContext = createContext();


const SECS_PER_QUESTION = 30;

const initialState = {
    questions: [],

    // 'loading', 'error', 'ready', 'active', 'finished'
    status: "loading",
    index: 0,
    answer: null,
    points: 0,
    highscore: 0,
    secondsRemaining: null,
};

function reducer(state, action) {
    switch (action.type) {
        case "dataReceived":
            return {
                ...state,
                questions: action.payload,
                status: "ready",
            };
        case "dataFailed":
            return {
                ...state,
                status: "error",
            };
        case "start":
            return {
                ...state,
                status: "active",
                secondsRemaining: state.questions.length * SECS_PER_QUESTION,
            };
        case "newAnswer":
            const question = state.questions.at(state.index);

            return {
                ...state,
                answer: action.payload,
                points:
                    action.payload === question.correctOption
                        ? state.points + question.points
                        : state.points,
            };
        case "nextQuestion":
            return { ...state, index: state.index + 1, answer: null };
        case "finish":
            return {
                ...state,
                status: "finished",
                highscore:
                    state.points > state.highscore ? state.points : state.highscore,
            };
        case "restart":
            return { ...initialState, questions: state.questions, status: "ready" };

        case "tick":
            return {
                ...state,
                secondsRemaining: state.secondsRemaining - 1,
                status: state.secondsRemaining === 0 ? "finished" : state.status,
            };

        default:
            throw new Error("Action unkonwn");
    }
}


function QuizProvider({ children }) {
    const [{ questions, status, index, answer, points, highscore, secondsRemaining }, dispatch] = useReducer(reducer, initialState);

    const numQuestions = questions.length;
    const maxPossiblePoints = questions.reduce((prev, cur) => prev + cur.points, 0);

    function fetchData(url) {
        fetch(url)
            .then((res) => res.json())
            .then((data) => dispatch({ type: "dataReceived", payload: data }))
            .catch((err) => dispatch({ type: "dataFailed" }));
    }

    const startQuiz = () => dispatch({ type: "start" });
    const newAnswer = (index) => dispatch({ type: "newAnswer", payload: index });
    const tick = () => dispatch({ type: "tick" });
    const nextQuestion = () => dispatch({ type: "nextQuestion" });
    const finish = () => dispatch({ type: "finish" });
    const restart = () => dispatch({ type: "restart" });

    return (<QuizContext.Provider value={{
        questions: questions,
        status: status,
        index: index,
        answer: answer,
        points: points,
        highscore: highscore,
        secondsRemaining: secondsRemaining,
        fetchData: fetchData,
        startQuiz: startQuiz,
        question: questions[index],
        numQuestions: numQuestions,
        maxPossiblePoints: maxPossiblePoints,
        newAnswer: newAnswer,
        tick: tick,
        nextQuestion: nextQuestion,
        finish: finish,
        restart: restart,
    }}
    >
        {children}
    </QuizContext.Provider >)
}

function useQuiz() {
    const context = useContext(QuizContext);
    if (context === undefined) throw new Error("useQuiz must be used within a QuizProvider");
    return context;
}

export { useQuiz, QuizProvider }