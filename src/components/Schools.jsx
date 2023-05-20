import React from "react";
import { db } from "../Backend/firebase";
import { Link } from "react-router-dom"; 
import "./Schools.css"

class Schools extends React.Component {

  constructor(props){
    super(props);
  
    this.state = {
      projects: []
    }
  }
  
  componentDidMount = () => {
    window.scrollTo(0, 0);
      db.collection("Schools").get().then((snapshot) => (

          snapshot.forEach((doc) => (
              this.setState((prevState) => ({
                  projects: [...prevState.projects, 
                    {
                        id: doc.id,
                        name: doc.data().name,
                    
                  }]
              }))
          ))
      ))
      
  }
  
  render() {
    let displayProjects = this.state.projects.map((p) => (
      <Link id="link" to={`/schools/${p.id}`}>
      <div className="categoryBox" key={p.id}>
             
              <div>
                  <h1 >{p.name}</h1>
              </div>
            
     
      </div>  </Link>))
  
    return(
      <div>
        <div className="schools">
       
         <h1 className="listTitle">
         Choose one of the available schools
        </h1>
        <div className="categoryComponent">
          {displayProjects}
        </div>
      </div>
      </div>
      
      );
    }
    
    
  }


  

export default Schools;