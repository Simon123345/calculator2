import { useState } from 'react';
import './App.css';

function CalcDisplay({ dispValue }) {
  return (
    <div className="Display">
      {dispValue}
    </div>
  );
}

function CalcButton({ buttonLabel, onClick }) {
  return (
    <button className="Button" onClick={() => onClick(buttonLabel)}>
      {buttonLabel}
    </button>
  );
}

function App() {
  const [disp, setDisp] = useState(0);
  const [operand1, setOperand1] = useState(null);
  const [operand2, setOperand2] = useState(null);
  const [operation, setOperation] = useState(null);

  const buttonClickHandler = (value) => {

    // NAME
    if (value === 'NAME') {
      setDisp('Simon Bondoc');
      return;
    }

    // CLEAR
    if (value === 'C') {
      setDisp(0);
      setOperand1(null);
      setOperand2(null);
      setOperation(null);
      return;
    }

    // NUMBER
    if (typeof value === 'number') {
      if (operation === null) {
        setDisp(disp === 0 ? value : Number(String(disp) + value));
      } else {
        setDisp(operand2 === null ? value : Number(String(operand2) + value));
        setOperand2(
          operand2 === null ? value : Number(String(operand2) + value)
        );
      }
      return;
    }

    // OPERATION
    if (['+', '-', '*', '/'].includes(value)) {
      setOperand1(Number(disp));
      setOperation(value);
      setOperand2(null);
      setDisp(value);
      return;
    }

    // EQUALS
    if (value === '=') {
      if (operand1 === null || operation === null) {
        return;
      }

      const secondOperand = operand2 !== null ? operand2 : Number(disp);
      let result;

      if (operation === '+') {
        result = operand1 + secondOperand;
      } else if (operation === '-') {
        result = operand1 - secondOperand;
      } else if (operation === '*') {
        result = operand1 * secondOperand;
      } else if (operation === '/') {
        result = secondOperand === 0 ? 'Error' : operand1 / secondOperand;
      }

      setDisp(result);
      setOperand2(secondOperand);
    }
  };

  return (
    <div className="App">
      <div className="Header">
        Calculator of Simon Bondoc - WMD3A
      </div>

      <div className="Calculator">

        <CalcDisplay dispValue={disp} />

        <div className="Keypad">
          <CalcButton buttonLabel={7} onClick={buttonClickHandler} />
          <CalcButton buttonLabel={8} onClick={buttonClickHandler} />
          <CalcButton buttonLabel={9} onClick={buttonClickHandler} />
          <CalcButton buttonLabel={'/'} onClick={buttonClickHandler} />

          <CalcButton buttonLabel={4} onClick={buttonClickHandler} />
          <CalcButton buttonLabel={5} onClick={buttonClickHandler} />
          <CalcButton buttonLabel={6} onClick={buttonClickHandler} />
          <CalcButton buttonLabel={'*'} onClick={buttonClickHandler} />

          <CalcButton buttonLabel={1} onClick={buttonClickHandler} />
          <CalcButton buttonLabel={2} onClick={buttonClickHandler} />
          <CalcButton buttonLabel={3} onClick={buttonClickHandler} />
          <CalcButton buttonLabel={'-'} onClick={buttonClickHandler} />

          <CalcButton buttonLabel={'C'} onClick={buttonClickHandler} />
          <CalcButton buttonLabel={0} onClick={buttonClickHandler} />
          <CalcButton buttonLabel={'='} onClick={buttonClickHandler} />
          <CalcButton buttonLabel={'+'} onClick={buttonClickHandler} />
        </div>

        {/* LOWER PART OF CALCULATOR */}
        <div className="CalculatorBottom">
          <button
            className="NameButton"
            onClick={() => buttonClickHandler('NAME')}
          >
            Bondoc
          </button>
        </div>

      </div>
    </div>
  );
}

export default App;