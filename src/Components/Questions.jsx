// src/components/Question.js
import React from 'react';
import Options from './Options';
// import './Question.css';

const Question = ({ question, options, selectedOption, handleOptionClick }) => {
  return (
    <div className="question-container">
      <h2>{question}</h2>
      <div className="options-container">
        {options.map((option, index) => (
          <Options
            key={index}
            option={option}
            isSelected={selectedOption === option}
            handleOptionClick={handleOptionClick}
          />
        ))}
      </div>
    </div>
  );
};

export default Question;
