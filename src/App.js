import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";

import Categories from "./Categories";
import Courses from "./Courses";
import CourseReviews from "./CourseReviews";

function App() {
  return (
    <div>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Categories />} />
          <Route path={"/categories/:id"} element={<Courses />} />
          <Route path="/categories/:id/:courseid" element={<CourseReviews />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
