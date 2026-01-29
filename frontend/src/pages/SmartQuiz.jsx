import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SmartQuiz = () => {
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState({
    homeType: "",
    timeAvailability: "",
    experience: "",
    kidsElderly: "",
    activityLevel: ""
  });

  const handleChange = (e) => {
    setQuiz({ ...quiz, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await axios.post(
      "http://localhost:5173/api/quiz/submit",
      quiz
    );

    navigate("/recommended-pets", { state: res.data });
  };

  return (
    <div className="container mt-5">
      <h3>Smart Pet Matching Quiz</h3>

      <form onSubmit={handleSubmit}>
        <select name="homeType" onChange={handleChange} required>
          <option value="">Home Type</option>
          <option value="flat">Flat</option>
          <option value="house">House</option>
        </select>

        <select name="timeAvailability" onChange={handleChange} required>
          <option value="">Time Availability</option>
          <option value="low">Low</option>
          <option value="high">High</option>
        </select>

        <select name="experience" onChange={handleChange} required>
          <option value="">Pet Experience</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>

        <select name="kidsElderly" onChange={handleChange} required>
          <option value="">Kids / Elderly</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>

        <select name="activityLevel" onChange={handleChange} required>
          <option value="">Activity Level</option>
          <option value="low">Low</option>
          <option value="high">High</option>
        </select>

        <button type="submit">Get Recommended Pets</button>
      </form>
    </div>
  );
};

export default SmartQuiz;
