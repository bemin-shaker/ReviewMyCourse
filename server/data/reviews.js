const mongoCollections = require("../config/mongoCollections");
const schools = mongoCollections.schools;
let { ObjectId } = require("mongodb");

//get all the schools
async function getAllSchools() {
  const schoolCollection = await schools();
  const schoolList = await schoolCollection.find({}).toArray();
  return schoolList;
}

//get all categories within a school
async function getCategoriesBySchoolId(id) {
  const schoolCollection = await schools();
  const school = await schoolCollection.findOne({ schoolId: id });
  const categories = school.categories;
  return categories;
}

//get all courses within a category within a school
async function getCoursesByCategoryId(schoolId, categoryId) {
  const schoolCollection = await schools();
  const school = await schoolCollection.findOne({ schoolId: schoolId });
  const categories = school.categories;
  const category = categories.find((category) => {
    return category.categoryId === categoryId;
  });
  const courses = category.courses;

  return courses;
}

//get all reviews within a course within a category within a school
async function getReviewsByCourseId(schoolId, categoryId, courseId) {
  const schoolCollection = await schools();
  const school = await schoolCollection.findOne({ schoolId: schoolId });
  const categories = school.categories;
  const category = categories.find((category) => {
    return category.categoryId === categoryId;
  });
  const course = category.courses.find((course) => {
    return course.courseId === courseId;
  });
  return {reviews: course.reviews, courseName: course.courseName};
}

//add a new school
async function addSchool(schoolName, schoolId) {
  const schoolCollection = await schools();
  const newSchool = {
    schoolName: schoolName,
    categories: [],
    schoolId: schoolId,
  };
  const insertInfo = await schoolCollection.insertOne(newSchool);
  if (insertInfo.insertedCount === 0) throw "Could not add school";
  const newId = insertInfo.insertedId;
  const school = await getSchoolById(newId);
  return school;
}

//get a school by id
async function getSchoolById(id) {
  const schoolCollection = await schools();
  const school = await schoolCollection.findOne({ _id: new ObjectId(id) });
  if (!school) throw "School not found";
  return school;
}

//add a new category to a school

//add a course to a school given

//add a review to a course
async function addReviewToCourse(schoolId, categoryId, courseId, review) {
  const schoolCollection = await schools();

  const updateResult = await schoolCollection.updateOne(
    {
      schoolId: schoolId,
      "categories.categoryId": categoryId,
      "categories.courses.courseId": courseId
    },
    {
      $push: {
        "categories.$[cat].courses.$[course].reviews": review
      }
    },
    {
      arrayFilters: [
        { "cat.categoryId": categoryId },
        { "course.courseId": courseId }
      ]
    }
  );

  if (updateResult.modifiedCount === 0) {
    throw `Could not add review to course '${courseId}' in category '${categoryId}' at school '${schoolId}'`;
  }

  return { success: true };
}


module.exports = {
  getAllSchools,
  getCategoriesBySchoolId,
  getCoursesByCategoryId,
  getReviewsByCourseId,
  addSchool,
  addReviewToCourse
};
