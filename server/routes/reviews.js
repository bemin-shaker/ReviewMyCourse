const express = require("express");
const router = express.Router();
const reviews = require("../data/reviews");

//get all the schools
router.get("/", async (req, res) => {
  const schools = await reviews.getAllSchools();

  try {
    res.json(schools);
  } catch (e) {
    res.status(500).send();
  }
});

//get all categories within a school
router.get("/:school", async (req, res) => {
  const schoolId = req.params.school;
  const categories = await reviews.getCategoriesBySchoolId(schoolId);

  try {
    res.json(categories);
  } catch (e) {
    res.status(500).send();
  }
});

//get all courses within a category within a school
router.get("/:school/:category", async (req, res) => {
  const schoolId = req.params.school;
  const categoryId = req.params.category;
  const courses = await reviews.getCoursesByCategoryId(schoolId, categoryId);
  try {
    res.json(courses);
  } catch (e) {
    res.status(500).send();
  }
});

//get all reviews within a course within a category within a school

router.get("/:school/:category/:course", async (req, res) => {
  const schoolId = req.params.school;
  const categoryId = req.params.category;
  const courseId = req.params.course;
  const reviewsData = await reviews.getReviewsByCourseId(
    schoolId,
    categoryId,
    courseId
  );
  try {
    res.json(reviewsData);
  } catch (e) {
    res.status(500).send();
  }
});

//add a new school given its name
router.post("/", async (req, res) => {
  const schoolName = req.body.schoolName;
  const schoolId = req.body.schoolId;
  const newSchool = await reviews.addSchool(schoolName, schoolId);
  try {
    res.json(newSchool);
  } catch (e) {
    res.status(500).send();
  }
});

//add a review to course
router.post("/schools/:schoolId/categories/:categoryId/courses/:courseId/reviews", async (req, res) => {
  const { schoolId, categoryId, courseId } = req.params;
  const { semesterTaken, body, professorName } = req.body;

  if (!semesterTaken || !body || !professorName) {
    return res.status(400).json({ error: "Missing required review fields" });
  }

  const review = { semesterTaken, body, professorName };

  try {
    await reviews.addReviewToCourse(schoolId, categoryId, courseId, review);
    res.status(200).json({ message: "Review added successfully" });
  } catch (e) {
    res.status(500).json({ error: e.toString() });
  }
});


module.exports = router;
