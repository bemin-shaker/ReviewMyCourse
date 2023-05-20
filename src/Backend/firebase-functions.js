import { db } from "./firebase";

// get all categories in the school subcollection
export const getCategories = async (school) => {
  const categories = await db
    .collection("Schools")
    .doc(school)
    .collection("Categories")
    .get();
  return categories.docs.map((doc) => doc.data());
};

//get all courses in the category subcollection
export const getCourses = async (school, category) => {
  const courses = await db
    .collection("Schools")
    .doc(school)
    .collection("Categories")
    .doc(category)
    .collection("Courses")
    .get();
  return courses.docs.map((doc) => doc.data());
};
