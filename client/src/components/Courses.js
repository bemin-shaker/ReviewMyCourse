import { React, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./Courses.css";
import { getCourses } from "../Backend/firebase-functions";
import Spinner from "./Spinner";

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
      setTimeout(function () {
        setLoading(false);
      }, 1500);
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
        <div className="courses">
          <h1 className="listTitle">
            <strong>{catId} </strong> courses at <strong>{id}</strong>
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
