import React, { useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import "./ReviewForm.css";

function ReviewForm({ onSubmit }) {
  const location = useLocation();
  const [professor, setProfessor] = useState("");
  const [semester, setSemester] = useState("");
  const [rating, setRating] = useState(3);
  const [difficulty, setDifficulty] = useState(3);
  const [wouldTakeAgain, setWouldTakeAgain] = useState("");
  const [reviewBody, setReviewBody] = useState("");

  const { courseId } = useParams();
  const { courseName } = location.state || {};

  const handleSubmit = (e) => {
    e.preventDefault();
    const review = {
      professorName: professor,
      semesterTaken: semester,
      rating,
      difficulty,
      wouldTakeAgain,
      body: reviewBody,
    };
    onSubmit(review);
    // Reset form
    setProfessor("");
    setSemester("");
    setRating(3);
    setDifficulty(3);
    setWouldTakeAgain("");
    setReviewBody("");
  };

  return (
    <div className="review-form-container">
      <h1 id="header">{courseName}</h1>
      <h3>Add Your Review</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-card">
          <label>
            Professor Name <span className="required">*</span>
            <input
              type="text"
              value={professor}
              onChange={(e) => setProfessor(e.target.value)}
              required
            />
          </label>
        </div>

        <div className="form-card">
          <label>
            Semester Taken <span className="required">*</span>
            <input
              type="text"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              required
            />
          </label>
        </div>

        <div className="form-card">
          <label>
            Rate your course <span className="required">*</span>
            <input
              type="range"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(parseInt(e.target.value))}
              className="slider"
            />
            <div className="slider-labels">
              <span>1 - Awful</span>
              <span>5 - Awesome</span>
            </div>
          </label>
        </div>

        <div className="form-card">
          <label>
            How difficult was this course? <span className="required">*</span>
            <input
              type="range"
              min="1"
              max="5"
              value={difficulty}
              onChange={(e) => setDifficulty(parseInt(e.target.value))}
              className="slider"
              color="secondary"
            />
            <div className="slider-labels">
              <span>1 - Very Easy</span>
              <span>5 - Very Difficult</span>
            </div>
          </label>
        </div>

        <div className="form-card">
          <label>
            Review Summary <span className="required">*</span>
            <textarea
              value={reviewBody}
              onChange={(e) => setReviewBody(e.target.value)}
              required
            />
          </label>
        </div>

        <button type="submit" className="submit-btn">Submit Review</button>
      </form>
    </div>
  );
}

export default ReviewForm;
