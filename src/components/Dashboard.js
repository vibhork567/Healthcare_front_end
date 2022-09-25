import {Button,Card,Row,Col,Container} from 'react-bootstrap';
import childService from "../services/child.service";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles.css"
import { useNavigate,useParams } from "react-router";
const Dashboard = () => {
       const handleSearch = id => {
    var input = document.getElementById("searchInput").value;
    console.log('clicked',parseInt(input));

    navigate('/children/search/'+parseInt(input));
  }
    const [len, setLen] =  useState([]);
    const [dislen,setDislen] = useState([]);
     useEffect(() =>{
      init();
   
  }, [])
    const navigate = useNavigate();
    const init = ()=> {
    childService.getAll()
    .then(response => {
      console.log('Printing children data',response.data.length);
      setLen(response.data.length);
     
    })
    .catch(error => {
      console.log('Something went wrong',error);
    })

    childService.getAllDischarged()
    .then(response => {
      console.log('Printing children data',response.data.length);
      setDislen(response.data.length);
     
    })
    .catch(error => {
      console.log('Something went wrong',error);
    })
    
 
  }

 
    return ( 
        <div id="cards">
           <Container>
            <Row md={3}>
                <Col >
                    <Card >
                    <Card.Img variant="top" src="../medical-record.png" />
                    <Card.Body>
                        {/* <Card.Title>Card Title</Card.Title> */}
                        <Card.Text>
                        Number of admitted patients:{len}
                        </Card.Text>
                   
                        <Link to="/children" className="btn btn-primary mb-2">View All</Link>
                    </Card.Body>
                    </Card>
                </Col>
                <Col >
                    <Card >
                    <Card.Img variant="top" src="../discharge.png" />
                    <Card.Body>
                    
                        <Card.Text>
                        Number of discharged Patients:{dislen}
                        </Card.Text>
                        <Link to="/children/discharged" className="btn btn-primary mb-2">View All</Link>
                    </Card.Body>
                    </Card>
                </Col>
                <Col >
                    <Card >
                    <Card.Img variant="top" src="../bed.png" />
                    <Card.Body>
                        <Card.Text>
                        Admit new Patient
                        </Card.Text>
                        <Link to="/add" className="btn btn-primary mb-2">Add</Link>
                    </Card.Body>
                    </Card>
                </Col>
            </Row>
           <Row md={3}>
                <Col >
                    <Card >
                    <Card.Img variant="top" src="../health.png" />
                    <Card.Body>
                        <Card.Text>
                        Search Admitted Patient 
                        </Card.Text>
                        <input type="text" placeholder="samId" id="searchInput" onKeyPress={e => {if (e.key === 'Enter') {handleSearch(e)}}} style={{'marginLeft': 0}}></input>
                    </Card.Body>
                    </Card>
                </Col>
            
           
            </Row>
</Container>
   
        </div>
     );
}
 
export default Dashboard;