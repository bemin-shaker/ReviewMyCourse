import React, {useEffect, useState} from "react";
import { db } from "../firebase";
import { Link } from "react-router-dom"; 
import "./Categories.css"
import Navbar from "../Navbar";
import { useParams } from "react-router-dom";


const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = React.useState(true);

  const {id} = useParams()

  useEffect(() => {
    let data = []
    db.collection("Schools").doc(id).collection("Categories").get().then((snapshot) => (
      snapshot.forEach((doc) => (
        data.push({
          id: doc.id,
          name: doc.data().name,
        })
      ))
    ))
    setCategories(data);
    setTimeout(() => {
    }, 8000000);
    setLoading(false);
    console.log(id, categories);

  }, [])

  if (loading) {
    return (
      <div>
        <h1>Loading..</h1>
      </div>
    );
  } else {

    return(
   
      <div>
        <Navbar />
        <div className="categories">
        <h1 className="listTitle">Choose course category from {id}</h1>
        <div className="categoryComponent">
          {categories && categories.length > 0 && categories.map((category) => {
            return (
              <Link id="link" to={`/schools/${id}/categories/${category.id}`}>
                  <div className="categoryBox" key={category.id}>
                    <h1 >{category.name}</h1>
                  </div>
                </Link>
                )
                })}
          </div>
      </div>
      </div>
      
      );
    }
  }
    
    
  


  

export default Categories;