import "./App.css";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/Home";
import Categories from "./components/Categories";
import Courses from "./components/Courses";
import CourseReviews from "./components/CourseReviews";
import Schools from "./components/Schools";
import Profile from "./components/Profile";
import ReviewForm from "./components/ReviewForm";
import SignUp from "./components/Signup";
import Login from "./components/Login";
import Navbar from "./components/Navbar";

function AppContent() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/schools" element={<Schools />} />
        <Route path="/schools/:id" element={<Categories />} />
        <Route path="/schools/:id/categories/:catId" element={<Courses />} />
        <Route path="/schools/:id/categories/:catId/courses/:courseId" element={<CourseReviews />} />
        <Route path="/schools/:id/categories/:catId/courses/:courseId/review" element={<ReviewForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <div className="App">
      <HashRouter>
        <AppContent />
      </HashRouter>
    </div>
  );
}

export default App;
