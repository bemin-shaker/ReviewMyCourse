const { addSchool, getAllSchools } = require("./data/reviews");

async function main() {
  //   await addSchool("Stevens Institute of Technology");
  //   await addSchool("New York University");
  //   await addSchool("Rutgers University");
  //   await addSchool("Princeton University");
  //   await addSchool("Harvard University");
  //   await addSchool("Massachusetts Institute of Technology");
  console.log(await getAllSchools());
}

main();
