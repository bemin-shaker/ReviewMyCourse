import "./App.css";
import { HashRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
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

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("user"); // check if logged in
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function AppContent() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        {/* Public routes */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

        {/* Protected routes */}
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/schools" element={<PrivateRoute><Schools /></PrivateRoute>} />
        <Route path="/schools/:id" element={<PrivateRoute><Categories /></PrivateRoute>} />
        <Route path="/schools/:id/categories/:catId" element={<PrivateRoute><Courses /></PrivateRoute>} />
        <Route path="/schools/:id/categories/:catId/courses/:courseId" element={<PrivateRoute><CourseReviews /></PrivateRoute>} />
        <Route path="/schools/:id/categories/:catId/courses/:courseId/review" element={<PrivateRoute><ReviewForm /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
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
