import React, { useState, useEffect } from 'react';
import './Calculator.css'; // Ensure this file exists and is properly linked

const keys = [
  '9', '8', '7', '/',
  '6', '5', '4', '*',
  '3', '2', '1', '-',
  '.', '0', '+', '=', 'C' // Added 'C' for Clear button
];

function Calculator() {
  const [input, setInput] = useState('');
  const [operator, setOperator] = useState(null);
  const [prevInput, setPrevInput] = useState('');
  const [result, setResult] = useState('');
  const [isResult, setIsResult] = useState(false);

  const handleButtonClick = (key) => {
    if (key === 'C') {
      // Clear button clicked
      setInput('');
      setPrevInput('');
      setOperator(null);
      setResult('');
      setIsResult(false);
    } else if (['+', '-', '*', '/'].includes(key)) {
      // When an operator is clicked
      if (input) {
        setPrevInput(input);
        setInput('');
        setOperator(key);
        setIsResult(false);
      }
    } else if (key === '=') {
      // When equals is clicked
      if (input && prevInput && operator) {
        calculateResult();
      }
    } else {
      // When a number or dot is clicked
      if (isResult) {
        // Prevent adding numbers after a result is shown
        setInput(key);
        setIsResult(false);
      } else {
        setInput(input + key);
      }
    }
  };

  const calculateResult = () => {
    try {
      const evalResult = eval(`${prevInput} ${operator} ${input}`);
      setResult(evalResult);
      setIsResult(true);
    } catch (error) {
      setResult('Error');
      setIsResult(true);
    }
  };

  useEffect(() => {
    if (result !== '') {
      setInput(result.toString());
    }
  }, [result]);

  return (
    <div className="calculator">
      <div className="display">{input || '0'}</div>
      <div className="keys">
        {keys.map((key) => (
          <button key={key} onClick={() => handleButtonClick(key)}>
            {key}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Calculator;