import { React, useEffect, useState } from "react";
import { db } from "./firebase";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import "./Courses.css";
import Navbar from "./Navbar";

function Courses() {
  const [courses, setCourses] = useState([]);
  const { id } = useParams();

  var docRef = db.collection("Categories").doc(id).collection("Courses");

  useEffect(() => {
    window.scrollTo(0, 0);
    docRef.get().then((snapshot) =>
      snapshot.forEach((doc) => {
        setCourses((courses) => [
          ...courses,
          {
            name: doc.id,
            id: doc.data().ID,
            fullName: doc.data().fullName,
          },
        ]);
      })
    );
  }, []);

  const content = courses.map((post) => (
    <Link id="link" to={`/categories/${id}/${post.id}`}>
      <div className="courseBox" key={post.name}>
        <h3>{post.fullName}</h3>
      </div>
    </Link>
  ));

  return (
    <div>
      <Navbar />
      <div className="courses">
        <h1 className="listTitle">
          <strong>{id} </strong> courses at{" "}
          <strong>Stevens Institute of Technology</strong>
        </h1>
        <div className="courseComponent">{content}</div>
      </div>
    </div>
  );
}

export default Courses;
