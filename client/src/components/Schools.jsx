import { React, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./Schools.css";
import Spinner from "./Spinner";

function Schools() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch("http://localhost:3000/api/")
      .then(response => {
        return response.json()
      })
      .then(data => {
        console.log(data);
        setCourses(data);
        setTimeout(function () {
          setLoading(false);
        }, 2000);
      })
  }

  console.log(courses);

  if (loading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  } else {
    return (
      <div>
        <div className="schools">
          <h1 className="listTitle">Choose one of the available schools</h1>
          <div className="categoryComponent">
          {courses &&
              courses.length > 0 && courses !== undefined &&
              courses.map((course) => {
                return (
                  <Link id="link" key={course.id} to={`/schools/${course.id}`}>
                    <div className="categoryBox" key={course.id}>
                      <div>
                        <h1 >{course.schoolName}</h1>
                      </div>
                    </div>  
                  </Link>
                );
              })}
          </div>
       </div>
      </div>
    )
  }
}


export default Schools;