import { React, useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "./CourseReviews.css";
import Spinner from "./Spinner";

function CourseReviews() {
  const location = useLocation();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [averageRating, setAverageRating] = useState(null);
  const { id, catId, courseId } = useParams();

  const { courseName, categoryName, schoolName } = location.state || {};

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const apiUrl = process.env.NODE_ENV === 'production'
    ? `https://review-my-course.vercel.app/api/${id}/${catId}/${courseId}`
    : `http://localhost:3000/api/${id}/${catId}/${courseId}`;
    fetch(apiUrl)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setReviews(data);
        // Calculate average rating
        if (data.reviews && data.reviews.length > 0) {
          const total = data.reviews.reduce(
            (sum, review) => sum + (review.rating || 0),
            0
          );
          const avg = total / data.reviews.length;
          setAverageRating(avg.toFixed(1)); 
        } else {
          setAverageRating(null);
        }
        setTimeout(function () {
          setLoading(false);
        }, 2000);
      });
  };

  if (loading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  } else {
    return (
      <div>
        <div className="courseReviews">
          <h1 className="listTitle">
            <strong>{reviews.courseName}</strong>
          </h1>
          <h4 className="rating-title">Average Rating:</h4>
          <h3 style={{ display: "flex" }}>
            <span className="rating-big">{averageRating}</span>/ 5
          </h3>
          <Link
            state={{ courseName: reviews.courseName }}
            to={`/schools/${id}/categories/${catId}/courses/${courseId}/review`}
          > 
            <button className="rate-btn">Review This Course</button>
          </Link>
          {reviews.reviews &&
            reviews.reviews.length > 0 &&
            reviews.reviews.map((post) => {
              return (
                <div className="review-box" key={post.body}>
                  <div className="review-header">
                    <FaUserCircle size={28} style={{ marginRight: "8px" }} />
                    <span className="user-email">{localStorage.getItem("user")}</span>
                  </div>
                  <h3>{post.body}</h3>
                  <p>
                    Professor: <strong>{post.professorName}</strong>
                  </p>
                  <p>
                    Semester Taken: <strong>{post.semesterTaken}</strong>
                  </p>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

export default CourseReviews;
