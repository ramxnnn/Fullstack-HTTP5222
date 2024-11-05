import React, { useState, useEffect } from 'react';

export default function Question() {
  const [category, setCategory] = useState(null);
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    async function fetchQuestion() {
      try {
        const response = await fetch('https://opentdb.com/api.php?amount=10');
        const data = await response.json();
        const questionData = data.results[0];
        setCategory(questionData.category);
        setQuestion(questionData.question);
        setAnswer(questionData.correct_answer);
      } catch (error) {
        console.error("Error fetching question:", error);
      }
    }
    fetchQuestion();
  }, []);

  const revealAnswer = () => {
    setRevealed(true);
  };

  return (
    <div className="question-container">
      <div><strong>Category:</strong> {category}</div>
      <h3>{question}</h3>
      <div>{revealed ? <><strong>Answer:</strong> {answer}</> : ''}</div>
      <button onClick={revealAnswer}>Reveal answer</button>
    </div>
  );
}
