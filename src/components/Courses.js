import { React, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import "./Courses.css";
import { getCourses } from "../Backend/firebase-functions";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const { id, catId } = useParams();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getCourses(id, catId);
      setCourses(data);
      setLoading(false);
      console.log("hi", data);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <div>
        <div className="courses">
          <h1 className="listTitle">
            <strong>{catId} </strong> courses at{" "}
            <strong>Stevens Institute of Technology</strong>
          </h1>
          <div className="courseComponent">
            {courses &&
              courses.length > 0 &&
              courses.map((course) => {
                return (
                  <Link
                    id="link"
                    to={`/schools/${id}/categories/${catId}/courses/${course.id}`}
                  >
                    <div className="courseBox" key={course.id}>
                      <h1>{course.name}</h1>
                      <h4>Rating: {course.rating}</h4>
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>
      </div>
    );
  }
}

export default Courses;
