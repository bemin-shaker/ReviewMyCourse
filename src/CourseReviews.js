import { React, useEffect, useState } from "react";
import { db } from "./firebase";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import "./CourseReviews.css";
import Navbar from "./Navbar";

function CourseReviews() {
  const [courses, setCourses] = useState([]);
  const { id, courseid } = useParams();

  var docRef = db
    .collection("Categories")
    .doc(id)
    .collection("Courses")
    .doc(courseid)
    .collection("Reviews");

  useEffect(() => {
    docRef.get().then((snapshot) =>
      snapshot.forEach((doc) => {
        setCourses((courses) => [
          ...courses,
          {
            name: doc.id,
            message: doc.data().Message,
            professor: doc.data().Professor,
            difficulty: doc.data().difficulty,
          },
        ]);
      })
    );
  }, []);

  console.log(courses);

  const content = courses.map((post) => (
    <div className="review-box" key={post.name}>
      <h3>{post.name}</h3>
      <p>
        Professor: <strong>{post.professor}</strong>
      </p>
      <p>{post.message}</p>
    </div>
  ));

  return (
    <div>
      <Navbar />
      <div className="courseReviews">
        <h1>{courseid}</h1>
        {content}
      </div>
    </div>
  );
}

export default CourseReviews;
