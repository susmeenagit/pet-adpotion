import React, { useState, useEffect } from 'react';
import { getActiveQuizzes, getQuizForUser, checkUserAttempt, submitQuizResponse } from '../api/quizApi';
import '../styles/Quiz.css';

const Quiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [quizContent, setQuizContent] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch active quizzes
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        setLoading(true);
        const data = await getActiveQuizzes();
        setQuizzes(data.quizzes || []);
      } catch (err) {
        setError('Failed to load quizzes');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  // Load specific quiz
  const handleSelectQuiz = async (quizId) => {
    try {
      setLoading(true);
      setError('');
      
      // Check if user already attempted
      const attemptData = await checkUserAttempt(quizId);
      if (attemptData.hasAttempted) {
        setError('You have already completed this quiz.');
        return;
      }

      // Load quiz content
      const data = await getQuizForUser(quizId);
      setSelectedQuiz(quizId);
      setQuizContent(data.quiz);
      setAnswers({});
      setSubmitted(false);
      setResult(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load quiz');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Handle answer selection
  const handleSelectAnswer = (questionId, optionId) => {
    setAnswers({
      ...answers,
      [questionId]: optionId,
    });
  };

  // Submit quiz
  const handleSubmitQuiz = async () => {
    try {
      // Validate all questions answered
      if (Object.keys(answers).length !== quizContent.questions.length) {
        setError('Please answer all questions before submitting.');
        return;
      }

      setLoading(true);
      setError('');

      // Prepare answers in required format
      const formattedAnswers = quizContent.questions.map((question) => ({
        questionId: question.id,
        selectedOptionId: answers[question.id],
      }));

      const response = await submitQuizResponse(selectedQuiz, formattedAnswers);
      
      setResult(response);
      setSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to submit quiz');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Back to quiz selection
  const handleBackToQuizzes = () => {
    setSelectedQuiz(null);
    setQuizContent(null);
    setAnswers({});
    setSubmitted(false);
    setResult(null);
    setError('');
  };

  if (loading && !quizContent) {
    return <div className="quiz-container"><p>Loading...</p></div>;
  }

  if (quizContent && !submitted) {
    return (
      <div className="quiz-container">
        <button className="back-btn" onClick={handleBackToQuizzes}>← Back</button>
        
        <div className="quiz-header">
          <h1>{quizContent.title}</h1>
          {quizContent.description && <p className="description">{quizContent.description}</p>}
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="questions-container">
          {quizContent.questions.map((question, index) => (
            <div key={question.id} className="question-card">
              <h3>Question {index + 1}</h3>
              <p className="question-text">{question.question}</p>
              
              <div className="options">
                {question.options.map((option) => (
                  <label key={option.id} className="option-label">
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      value={option.id}
                      checked={answers[question.id] === option.id}
                      onChange={() => handleSelectAnswer(question.id, option.id)}
                    />
                    <span className="option-text">{option.optionText}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button
          className="submit-btn"
          onClick={handleSubmitQuiz}
          disabled={loading || Object.keys(answers).length !== quizContent.questions.length}
        >
          {loading ? 'Submitting...' : 'Submit Quiz'}
        </button>
      </div>
    );
  }

  if (submitted && result) {
    return (
      <div className="quiz-container">
        <div className="result-card">
          <h1>Quiz Completed!</h1>
          <div className="score-display">
            <div className="score-circle">
              <span className="percentage">{result.percentage}%</span>
              <span className="text">Score</span>
            </div>
          </div>
          
          <div className="score-details">
            <p>You answered <strong>{result.score} out of {result.totalQuestions}</strong> questions correctly.</p>
            <p>Your response has been recorded and sent for admin verification.</p>
            <p>You will receive a decision shortly.</p>
          </div>

          <button className="back-btn" onClick={handleBackToQuizzes}>
            Back to Quizzes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h1>Pet Adoption Questionnaire</h1>
        <p>Answer these questions to help us understand if you're a suitable pet owner.</p>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="quizzes-list">
        {quizzes.length === 0 ? (
          <p className="no-quizzes">No quizzes available at the moment.</p>
        ) : (
          quizzes.map((quiz) => (
            <div key={quiz.id} className="quiz-card">
              <h3>{quiz.title}</h3>
              {quiz.description && <p>{quiz.description}</p>}
              <p className="question-count">{quiz.questions?.length || 0} Questions</p>
              <button
                className="take-quiz-btn"
                onClick={() => handleSelectQuiz(quiz.id)}
                disabled={loading}
              >
                Take Quiz
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Quiz;
