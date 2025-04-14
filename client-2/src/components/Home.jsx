import "./Home.css";
import schoolVector from "../assets/school.jpg";

const Home = () => {
    return (
     
        <>    
            <div className="home">
                <h1>ReviewMyCourse</h1>
                <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}> 
                 
                    <div><img src={schoolVector} alt="Logo" style={{height: '28vw'}} /></div>
                    <div style={{marginLeft: 30}}> 
                        <h1>Review the course, <br></br> not the professor.</h1>  
                    </div>
                </div>
            </div>
        </>
     
    );
    }
export default Home;
