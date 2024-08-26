// src/components/OptionButton.js
import React from 'react';
// import './OptionButton.css';

const Options = ({ option, isSelected, handleOptionClick }) => {
  return (
    <button
      className={`option-btn ${isSelected ? 'selected' : ''}`}
      onClick={() => handleOptionClick(option)}
    >
      {option}
    </button>
  );
};

export default Options;
