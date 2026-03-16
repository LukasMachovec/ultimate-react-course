function Option({ question, dispatch, answer }) {
    return (
        <div className="options">
            {question.options.map(
                (text, index) =>
                    <button
                        key={index}
                        className={`
                            btn 
                            btn-option 
                            ${index === answer ? "answer" : ""} 
                            ${answer != null && (index === question.correctOption ? "correct" : "wrong")}
                        `}
                        onClick={() => dispatch({ type: 'newAnswer', payload: index })}
                        disabled={answer != null}
                    >
                        {text}
                    </button>
            )
            }
        </div >
    )
}

export default Option
