import React, { useState, useEffect } from 'react';
import './App.css';

const questions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Lisbon"],
    answer: "Paris"
  },
  {
    question: "Who wrote 'To Kill a Mockingbird'?",
    options: ["Harper Lee", "George Orwell", "Mark Twain", "Jane Austen"],
    answer: "Harper Lee"
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    answer: "Mars"
  },
  {
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"],
    answer: "Pacific Ocean"
  },
  {
    question: "What is the square root of 64?",
    options: ["6", "7", "8", "9"],
    answer: "8"
  }
];

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(190); // Timer set to 190 seconds
  const [quizEnded, setQuizEnded] = useState(false);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);

    if (timeLeft === 0) {
      endQuiz();
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    if (!selectedOption) {
      setFeedback('Please select an answer!');
      return;
    }

    const correctAnswer = questions[currentQuestionIndex].answer;
    if (selectedOption === correctAnswer) {
      setScore(prevScore => prevScore + 1);
      setFeedback('Correct!');
    } else {
      setFeedback(`Incorrect! The correct answer is ${correctAnswer}.`);
    }

    setTimeout(() => {
      setFeedback('');
      setSelectedOption(null);

      if (currentQuestionIndex + 1 < questions.length) {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      } else {
        endQuiz();
      }
    }, 1000);
  };

  const endQuiz = () => {
    setQuizEnded(true);
  };

  if (quizEnded || timeLeft === 0) {
    return (
      <div className="quiz-container">
        <h2>Quiz Over!</h2>
        <p>Your final score is: {score} / {questions.length}</p>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <h2>{questions[currentQuestionIndex].question}</h2>
      <div className="options-container">
        {questions[currentQuestionIndex].options.map(option => (
          <button
            key={option}
            className={`option-btn ${selectedOption === option ? 'selected' : ''}`}
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </button>
        ))}
      </div>
      <button onClick={handleSubmit} className="submit-btn">Submit Answer</button>
      <p className="feedback">{feedback}</p>
      <p className="score">Score: {score}</p>
      <p className="timer">Time Left: {timeLeft}s</p>
    </div>
  );
}

export default App;

