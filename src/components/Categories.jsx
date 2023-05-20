import React, {useEffect, useState} from "react";
import { getCategories } from "../Backend/firebase-functions";
import { Link } from "react-router-dom"; 
import "./Categories.css"
import Navbar from "../Navbar";
import { useParams } from "react-router-dom";


const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = React.useState(true);

  const {id} = useParams()

  useEffect(() => {
   fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getCategories(id);
      setCategories(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(categories)
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