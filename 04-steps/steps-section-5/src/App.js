import React from "react";

const messages = [
  "Learn React",
  "Apply for jobs",
  "Invest your new income"
];

export default function App() {
  const [step, setStep] = React.useState(1);
  const [isOpen, setIsOpen] = React.useState(true);

  function handlePrevious() {
    if (step > 1) { setStep(() => step - 1) }
  }

  function handleNext() {
    if (step < 3) { setStep(() => step + 1) }
  }


  return (
    <>
      <button className="close" onClick={() => setIsOpen(!isOpen)}>&times;</button>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? "active" : ""}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}>3</div>
          </div>
          <StepMessage currStep={step}>{messages[step - 1]}</StepMessage>
          <div className="buttons">
            <Button
              bgColor="#7950f2"
              textColor="#fff"
              onClick={handlePrevious}
            ><span>"👍"</span>Previous</Button>

            <Button
              bgColor="#7950f2"
              textColor="#fff"
              onClick={handleNext}
            >Next<span>"👍"</span></Button>
          </div>
        </div >
      )
      }
    </>

  );
}

function StepMessage({ currStep, children }) {
  return (
    <p className="message">
      <h3>Step {currStep}:</h3>
      {children}
    </p>
  )
}

function Button({ textColor, bgColor, onClick, children }) {
  return (
    <button
      style={{ backgroundColor: bgColor, color: textColor }}
      onClick={onClick}
    >{children}</button>
  )
}