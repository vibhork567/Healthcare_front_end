import { useEffect, useState } from "react";
import childService from "../services/child.service";
import { useNavigate,useParams } from "react-router";
import {Button,Card,Row,Col,Container} from 'react-bootstrap';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles.css"
import DatePicker from "react-datepicker";

import 'react-datepicker/dist/react-datepicker.css';

const CreateFollowUp = () => {
 
  
    const [createdAt, setCreatedAt]=useState('');
    const [followup1Date, setFollowup1Date]=useState('');
    const [followup2Date, setFollowup2Date]=useState('');
    const [followup3Date, setFollowup3Date]=useState('');
    const [followup4Date, setFollowup4Date]=useState('');
    const [isAttempted, setIsAttempted]=useState('');
   
    //react hook used to navigate back to child list 
    //page once form is submitted
    const navigate = useNavigate();
    
    const saveFollowup = (e) => {
        e.preventDefault();
        //this is because we dont want to reload the page after submitting form 
        var fal = false;
        //samId is getting passed from useParams() hook
        const followup1 = {createdAt,followup1Date,fal,};
        const followup2 = {createdAt,followup2Date,fal,};
        const followup3 = {createdAt,followup3Date,fal};
        const followup4 = {createdAt,followup4Date,fal};
    
        
        childService.createfollowup(followup1)
        .then(response => {
        
        console.log('Child data added successfully', response.data);
    
        })
        .catch(error =>{
        console.log('Something rr went wrong',  error);
        });

        
        
        childService.createfollowup(followup2)
        .then(response => {
        
        console.log('Child data added successfully', response.data);
        
        })
        .catch(error =>{
        console.log('Something rr went wrong',  error);
        });

                
        
        
        
        childService.createfollowup(followup3)
        .then(response => {
        
        console.log('Child data added successfully', response.data);
        
        })
        .catch(error =>{
        console.log('Something rr went wrong',  error);
        });

                
        
        
        
        childService.createfollowup(followup4)
        .then(response => {
        
        console.log('Child data added successfully', response.data);
        navigate('/children');
        })
        .catch(error =>{
        console.log('Something rr went wrong',  error);
        });
    }
    

    return (  
        <div className="childrenlist" >
            <h3>Create Follow Up</h3>
            <hr/>
            <Container>
            <form>
            
            <Row>
                <Col>
                <label>Follow Up created at: </label> 
                    <DatePicker placeholderText="DD/MM/YY" selected={createdAt} onChange={date => setCreatedAt(date)} id="createdAt" value={setCreatedAt}/>
                </Col>
            </Row>
            <Row>
                <Row>
                <Col>
                <label>Follow Up 1 </label> 
                    <DatePicker placeholderText="DD/MM/YY" selected={followup1Date} onChange={date => setFollowup1Date(date)} id="createdAt" value={followup1Date}/>
                </Col>
                  <Col>
                <label>Follow Up 2</label> 
                    <DatePicker placeholderText="DD/MM/YY" selected={followup2Date} onChange={date => setFollowup2Date(date)} id="createdAt" value={followup2Date}/>
                </Col>
                </Row>
                  
                
             <Row>
                <Col>
                <label>Follow Up 3</label> 
                    <DatePicker placeholderText="DD/MM/YY" selected={followup3Date} onChange={date => setFollowup3Date(date)} id="createdAt" value={followup3Date}/>
                </Col>
                
              <Col>
                <label>Follow Up 4</label> 
                    <DatePicker placeholderText="DD/MM/YY" selected={followup4Date} onChange={date => setFollowup4Date(date)} id="createdAt" value={followup4Date}/>
                </Col>
            </Row>
            </Row>

   
                    <Link to="/children">
                    <button className="btn btn-primary" onClick={(e) => saveFollowup(e)}>Save</button>
                    </Link>
                    {/*onclick -> anonymous function and savechild takes event e*/}
              

            </form>
            </Container>
           

        </div>
    );
}
 
export default CreateFollowUp;