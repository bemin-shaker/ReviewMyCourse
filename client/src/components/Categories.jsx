import React, {useEffect, useState} from "react";
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
    const apiUrl = process.env.NODE_ENV === 'production'
      ? `https://review-my-course.vercel.app/api/${id}`
      : `http://localhost:3000/api/${id}`;
    fetch(apiUrl)
      .then(response => {
        return response.json()
      })
      .then(data => {
        console.log(data);
        setCategories(data);
        setTimeout(function () {
          setLoading(false);
        }, 2000);
      })
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
              <Link id="link" to={`/schools/${id}/categories/${category.categoryId}`}>
                  <div className="categoryBox" key={category.categoryId}>
                    <h1>{category.categoryName}</h1>
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