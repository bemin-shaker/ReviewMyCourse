import React from "react";
import "./Profile.css";
import { FaUserCircle } from "react-icons/fa";

function Profile() {
    // const user = JSON.parse(localStorage.getItem("user"));

    const savedCourses = [
        {
            id: "1",
            name: "SSW215 Introduction to Software Engineering",
        },
        {
            id: "2",
            name: "PEP151 Introduction to Astronomy",
        }
    ];

    const userReviews = [
        {
            restroomName: "CS545 Human-Computer Interaction",
            comment: "Great course!",
            rating: 5
        },
        {
            restroomName: "HSS 200 Introduction to Systems Thinking",
            comment: "Lots of quizzes. Overall, good class.",
            rating: 4
        }
    ];

    return (
        <div className="profile-page">
            <h1>Profile Settings</h1>
            <div className="profile-container">
                <div className="profile-left">
                    <div className="user-info-card">
                    <FaUserCircle className="user-avatar" />
                        <h1>John Smith</h1>
                        <p>🌟 Member since 2024</p>
                        <h4>Your Preferences:</h4>
                        
                    </div>
                </div>

                <div className="profile-right">
                    <section className="profile-section">
                        <h3>Past Comments</h3>
                        {userReviews.length > 0 ? (
                            <ul className="profile-list">
                                {userReviews.map((review, index) => (
                                    <li key={index} className="profile-card">
                                        <strong>{review.restroomName}</strong>
                                        <p>{review.comment}</p>
                                        <p>Rating: {review.rating} ⭐</p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No reviews yet.</p>
                        )}
                    </section>

                    <section className="profile-section">
                        <h3>Saved Courses</h3>
                        {savedCourses.length > 0 ? (
                            <ul className="profile-list">
                                {savedCourses.map((restroom) => (
                                    <li key={restroom.id} className="profile-card">
                                        <strong>{restroom.name}</strong>
                                        <p>{restroom.address}</p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>You haven’t saved any restrooms yet.</p>
                        )}
                    </section>
                </div>
            </div>
        </div>
    );
}

export default Profile;
