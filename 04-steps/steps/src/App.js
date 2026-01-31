import React from "react";

const messages = [
  "Learn React",
  "Apply for jobs",
  "Invest your new income"
];

export default function App() {
  const [step, setStep] = React.useState(1);
  const [isOpen, setIsOpen] = React.useState(true);

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
          <p className="message">Step {step}: {messages[step - 1]}</p>
          <div className="buttons">
            <button style={{ backgroundColor: "#7950f2", color: "#fff" }} onClick={() => step > 1 && setStep(step - 1)}>Previous</button>
            <button style={{ backgroundColor: "#7950f2", color: "#fff" }} onClick={() => step < 3 && setStep(step + 1)} >Next</button>
          </div>
        </div >
      )}
    </>

  );
}