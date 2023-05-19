import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Categories from "./components/Categories";
import Courses from "./Courses";
import CourseReviews from "./CourseReviews";
import Schools from "./components/Schools";
function App() {
  return (
    <div>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/schools" element={<Schools />} />
          <Route path="/schools/:id" element={<Categories />} />
          <Route
            path={"/schools/:id/categories/:catId"}
            element={<Courses />}
          />
          <Route path="/categories/:id/:courseid" element={<CourseReviews />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
