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

//get all courses within a category within a school

//get all reviews within a course within a category within a school

module.exports = router;
