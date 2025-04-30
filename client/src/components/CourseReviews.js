import { React, useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import "./CourseReviews.css";
import Spinner from "./Spinner";

function CourseReviews() {
  const location = useLocation();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
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
            <span className="rating-big">2.9</span>/ 5
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
