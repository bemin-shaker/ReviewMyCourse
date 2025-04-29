import "./Home.css";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import schoolVector from "../assets/school1.png";

const Home = () => {
    return (
     
        <>    
            <div className="home">                
                <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}> 
                    <div><img src={schoolVector} alt="Logo" style={{height: '32vw'}} /></div>
                    <div style={{marginLeft: 30}}> 
                        <h1>Review the course, <br></br> not the professor.</h1>  
                    </div>
                </div>
                <Link to="/schools" className="go-to-schools-btn">
                        Go to Schools <FaArrowRight />
                </Link>
            </div>
        </>
     
    );
    }
export default Home;
