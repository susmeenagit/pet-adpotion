import React, { useState, useEffect } from 'react';
import { getQuizResponsesForVerification, verifyQuizResponse } from '../api/quizApi';
import '../styles/QuizVerificationStyles.css';

const QuizVerification = () => {
  const [responses, setResponses] = useState([]);
  const [selectedResponse, setSelectedResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [verificationNotes, setVerificationNotes] = useState('');

  useEffect(() => {
    loadResponses();
  }, []);

  const loadResponses = async () => {
    try {
      setLoading(true);
      const data = await getQuizResponsesForVerification();
      setResponses(data.responses || []);
    } catch (err) {
      setError('Failed to load responses');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (responseId, status) => {
    try {
      setLoading(true);
      await verifyQuizResponse(responseId, {
        status,
        adminNotes: verificationNotes,
      });
      setSuccess(`Response marked as ${status}`);
      setSelectedResponse(null);
      setVerificationNotes('');
      loadResponses();
    } catch (err) {
      setError('Failed to verify response');
    } finally {
      setLoading(false);
    }
  };

  const filteredResponses = responses.filter((response) => {
    if (filterStatus === 'all') return true;
    return response.status === filterStatus;
  });

  if (selectedResponse) {
    const response = responses.find((r) => r.id === selectedResponse.id);
    
    return (
      <div className="verification-container">
        <button className="back-btn" onClick={() => setSelectedResponse(null)}>
          ← Back
        </button>

        <div className="verification-detail">
          <div className="user-info">
            <h2>{response.user.name}</h2>
            <p className="email">{response.user.email}</p>
            <p className="quiz-name">Quiz: {response.quiz.title}</p>
          </div>

          <div className="response-details">
            <div className="score-info">
              <h3>Score</h3>
              <div className="score">
                <span className="number">{response.score}/{response.totalQuestions}</span>
                <span className="percentage">
                  {Math.round((response.score / response.totalQuestions) * 100)}%
                </span>
              </div>
            </div>

            <div className="submission-date">
              <h3>Submitted</h3>
              <p>{new Date(response.createdAt).toLocaleString()}</p>
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <div className="answers-section">
            <h3>User Answers</h3>
            <div className="answers-list">
              {response.answers?.map((answer, index) => {
                const question = response.quiz.questions?.find(
                  (q) => q.id === answer.question.id
                );
                return (
                  <div
                    key={answer.id}
                    className={`answer-item ${answer.isCorrect ? 'correct' : 'incorrect'}`}
                  >
                    <div className="answer-header">
                      <span className="question-num">Q{index + 1}</span>
                      <span className={`result ${answer.isCorrect ? 'correct' : 'incorrect'}`}>
                        {answer.isCorrect ? '✓ Correct' : '✗ Incorrect'}
                      </span>
                    </div>
                    <p className="question-text">{answer.question.question}</p>
                    <div className="answer-info">
                      {question?.options?.map((option) => (
                        <div
                          key={option.id}
                          className={`option ${
                            answer.selectedOptionId === option.id ? 'selected' : ''
                          } ${option.isCorrect ? 'correct-answer' : ''}`}
                        >
                          <span className="option-text">{option.optionText}</span>
                          {answer.selectedOptionId === option.id && (
                            <span className="user-selected">User selected</span>
                          )}
                          {option.isCorrect && !answer.isCorrect && (
                            <span className="correct-answer-label">Correct answer</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="verification-section">
            <h3>Verification Decision</h3>
            <textarea
              placeholder="Add verification notes (optional)..."
              value={verificationNotes}
              onChange={(e) => setVerificationNotes(e.target.value)}
              rows="4"
            ></textarea>
            <div className="verification-actions">
              <button
                className="approve-btn"
                onClick={() => handleVerify(response.id, 'Verified')}
                disabled={loading}
              >
                {loading ? 'Processing...' : '✓ Approve'}
              </button>
              <button
                className="reject-btn"
                onClick={() => handleVerify(response.id, 'Rejected')}
                disabled={loading}
              >
                {loading ? 'Processing...' : '✗ Reject'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="verification-container">
      <div className="verification-header">
        <h1>Quiz Response Verification</h1>
        <div className="filter-controls">
          <label>Filter by Status:</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Responses</option>
            <option value="Completed">Completed</option>
            <option value="Verified">Verified</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      {loading && <p className="loading">Loading responses...</p>}

      <div className="responses-table">
        {filteredResponses.length === 0 ? (
          <p className="no-data">No responses to verify.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>User Name</th>
                <th>User Email</th>
                <th>Quiz</th>
                <th>Score</th>
                <th>Status</th>
                <th>Submitted</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredResponses.map((response) => (
                <tr key={response.id}>
                  <td>{response.user.name}</td>
                  <td>{response.user.email}</td>
                  <td>{response.quiz.title}</td>
                  <td>
                    <strong>
                      {response.score}/{response.totalQuestions}
                    </strong>
                  </td>
                  <td>
                    <span
                      className={`status-badge ${response.status.toLowerCase()}`}
                    >
                      {response.status}
                    </span>
                  </td>
                  <td>{new Date(response.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button
                      className="view-btn"
                      onClick={() => setSelectedResponse(response)}
                    >
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default QuizVerification;
