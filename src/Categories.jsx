import React from "react";
import { db } from "./firebase";
import { Link } from "react-router-dom"; 
import "./Categories.css"
import Navbar from "./Navbar";

// db.collection("Categories")
//   .get()
//   .then((querySnapshot) => {
//     querySnapshot.forEach((doc) => {
//       console.log(doc.id);
//     });
//   });


class Categories extends React.Component {

  constructor(props){
    super(props);
  
    this.state = {
      projects: []
    }
  }
  
  componentDidMount = () => {
    window.scrollTo(0, 0);
      db.collection("Categories").get().then((snapshot) => (

          snapshot.forEach((doc) => (
              this.setState((prevState) => ({
                  projects: [...prevState.projects, {
                      ID: doc.data().ID,
                    
                  }]
              }))
          ))
      ))
      
  }
  
  render() {
    let displayProjects = this.state.projects.map((p) => (
      <Link id="link" to={`/categories/${p.ID}`}>
      <div className="categoryBox" key={p.ID}>
             
              <div>
                  <h1 >{p.ID}</h1>
              </div>
            
     
      </div>  </Link>))
  
    return(
      <div>
        <Navbar />
        <div className="categories">
       
         <h1 className="listTitle">
         Choose course category from 
          <strong> Stevens Institute of Technology</strong>
        </h1>
        <div className="categoryComponent">
          {displayProjects}
        </div>
      </div>
      </div>
      
      );
    }
    
    
  }


  

export default Categories;