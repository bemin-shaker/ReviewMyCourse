import { React, useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import "./Courses.css";
import Spinner from "./Spinner";

function Courses() {
  const location = useLocation();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const { id, catId } = useParams();
  const { schoolName, categoryName } = location.state || {};

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const apiUrl = process.env.NODE_ENV === 'production'
      ? `https://review-my-course.vercel.app/api/${id}/${catId}`
      : `http://localhost:3000/api/${id}/${catId}`;
    fetch(apiUrl)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setCourses(data);
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
        <div className="courses">
          <h1 className="listTitle">
            <strong>{categoryName} </strong> courses at <strong>{schoolName}</strong>
          </h1>
          <div className="courseComponent">
            {courses &&
              courses.length > 0 &&
              courses.map((course) => {
                return (
                  <Link
                    id="link"
                    to={`/schools/${id}/categories/${catId}/courses/${course.courseId}`}
                    state={{ courseName: course.courseName, categoryName: categoryName, schoolName: schoolName}}
                  >
                    <div className="courseBox" key={course.courseId}>
                      <h1>{course.courseName}</h1>
                      <h4>{course.reviews.length} reviews</h4>
                      {/* <h4>Rating: {course.rating}</h4> */}
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
