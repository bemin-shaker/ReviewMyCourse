import { React, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import "./CourseReviews.css";
import { getReviews } from "../Backend/firebase-functions";
import Spinner from "./Spinner";

function CourseReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id, catId, courseId } = useParams();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getReviews(id, catId, courseId);
      setReviews(data);
      setTimeout(function () {
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.log(error);
    }
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
          <h5 className="rating-title">Average Rating:</h5>
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
                    Professor: <strong>{post.professor}</strong>
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
