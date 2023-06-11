import React, {useEffect, useState} from "react";
import { getCategories } from "../Backend/firebase-functions";
import { Link } from "react-router-dom"; 
import "./Categories.css"
import { useParams } from "react-router-dom";
import Spinner from "./Spinner";

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
      setTimeout(function() {
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  } else {

    return(
   
      <div>
        <div className="categories">
        <h1 className="listTitle">Choose course department from <strong>{id}</strong></h1>
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