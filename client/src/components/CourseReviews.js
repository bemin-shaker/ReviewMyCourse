import { React, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./CourseReviews.css";
import Spinner from "./Spinner";

function CourseReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id, catId, courseId } = useParams();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch(`http://localhost:3000/api/${id}/${catId}/${courseId}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
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
            <strong>{courseId} </strong> in the <strong>{catId}</strong>{" "}
            department at <strong>{id}</strong>
          </h1>
          <h4 className="rating-title">Average Rating:</h4>
          <h3 style={{ display: "flex" }}>
            <span className="rating-big">2.9</span>/ 5
          </h3>
          <button className="rate-btn"> Rate {courseId}</button>
          {reviews &&
            reviews.length > 0 &&
            reviews.map((post) => {
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
