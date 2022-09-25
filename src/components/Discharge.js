import childService from "../services/child.service";
import { useNavigate,useParams } from "react-router";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";

import {Button,Card,Row,Col,Container} from 'react-bootstrap';
const Discharge = () => {
    const {samId} = useParams();
    const [dischargeAt, setDischargeAt]=useState('');
    const [outcome, setOutcome]=useState('');
    const [treatmentProtocol, setTreatmentProtocol]=useState('');
    const [weight, setWeight]=useState('');
    const [admission_admission_id, setAdmissionId]=useState('');
    const [aww_aww_id, setAww]=useState('');


    const navigate = useNavigate();



    const dischargeChild = (e) =>{
       e.preventDefault();

       const dischargeSummary = {dischargeAt,outcome,treatmentProtocol,weight};
        console.log('discharge is ',dischargeSummary);
       childService.discharge(dischargeSummary)
            .then(response => {
                console.log('Child Discharged',response.data);
                navigate('/children/createfollowup');
            })
            .catch(error => {
                console.log('This is',dischargeSummary);
                console.log('Something went wrong',error);
            })
    }



    return ( 
     <div className="container">
            <h3>Discharge child</h3>
            <hr/>
            <form>
                
               <Row>
                    <Col>
                         <label>Discharge Date</label>
                    <DatePicker placeholderText="DD/MM/YY" selected={dischargeAt} onChange={dischargeAt => setDischargeAt(dischargeAt)} id="dischargeAt" value={dischargeAt}/>
              
            
                    </Col>
                    <Col>
                       <label>Treatment Protocol</label>
                    <input type="text" className="form-control col-4"   id="treatmentProtocol" value={treatmentProtocol} onChange={(e)=>setTreatmentProtocol(e.target.value)}  placeholder="Enter Treatment protocol"/>
             
                    </Col>
                    <Col>
                    <label>Current Weight</label>
                     <input type="text" className="form-control col-4"   id="weight" value={weight} onChange={(e)=>setWeight(e.target.value)}  placeholder="Enter Weight"/>
             

                    </Col>
                    <Col>
                    <label>Outcome</label>
                    <input type="text" className="form-control col-4"   id="outcome" value={outcome} onChange={(e)=>setOutcome(e.target.value)}  placeholder="Enter Outcome"/>
                
                    </Col>

               </Row>
        
              <div>
                  <Link to="/children">
                    <button className="btn btn-primary" onClick={(e) => dischargeChild(e)}>Discharge</button>
                </Link>
                    {/*onclick -> anonymous function and savechild takes event e*/}
                </div>
            </form>
                
        </div>
    );
}
 
export default Discharge;