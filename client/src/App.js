import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Categories from "./components/Categories";
import Courses from "./components/Courses";
import CourseReviews from "./components/CourseReviews";
import Schools from "./components/Schools";
import Profile from "./components/Profile";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div>
      <HashRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/schools" element={<Schools />} />
          <Route path="/schools/:id" element={<Categories />} />
          <Route
            path={"/schools/:id/categories/:catId"}
            element={<Courses />}
          />
          <Route
            path="/schools/:id/categories/:catId/courses/:courseId"
            element={<CourseReviews />}
          />
          <Route
            path="/profile"
            element={<Profile />}
          />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
