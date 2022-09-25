import { useEffect, useState } from "react";
import childService from "../services/child.service";
import { useNavigate,useParams } from "react-router";
import {Button,Card,Row,Col,Container} from 'react-bootstrap';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles.css"
import DatePicker from "react-datepicker";

import 'react-datepicker/dist/react-datepicker.css';

const AddChild = () => {
    const [uhid, setUhid]=useState('');
    const [rchId, setRchid]=useState('');
    const [name, setName]=useState('');
    const [age, setAge]=useState('');
    // const [dob, setDob]=useState('');
    const [dob, setDob]=useState(null);
    const [gender, setGender]=useState('');
    const [address, setAddress]=useState('');
    const [contactNumber, setContact]=useState('');
    const [relationshipDetails, setRelationshipDetails]=useState('');
    const [caste, setCaste]=useState('');
    const [religion, setReligion]=useState('');
    const [bpl, setBpl]=useState('');
    const [height, setHeight]=useState('');
    const [weight, setWeight]=useState('');
    const [muac, setMuac] = useState();
    const [growthStatus, setGrowthStatus]=useState('');
    const [otherSymptoms, setOtherSymptoms]=useState('');
    const [selectDate,setSelectedDate] = useState(null);

    const {samId} = useParams();

    //react hook used to navigate back to child list 
    //page once form is submitted
    const navigate = useNavigate();
    
    
    const saveChild = (e) => {
        e.preventDefault();
        //this is because we dont want to reload the page after submitting form 
        
        //samId is getting passed from useParams() hook
        const child = {samId,uhid,rchId,name,age,dob,gender,address,contactNumber,relationshipDetails,caste,religion,bpl,height,weight,muac,growthStatus,otherSymptoms};
    
        if(samId){
            //update row
            
            childService.update(child)
            .then(response => {

                console.log('Child data updated',response.data);
                navigate('/children');
            })
            .catch(error => {
                console.log('Something went wrong',error);
            })
        }else {
            //create new row
            
            childService.create(child)
            .then(response => {
                //send sms
                childService.sendsms(response.data)
                .then(response => {

                console.log('SMS sent',response.data);
                })
                .catch(error => {
                console.log('Something went wrong',error);
                })


                
                console.log('Child data added successfully', response.data);
                
                navigate('/children');
                //this hook is to navigate back to list after form submission
            })
            .catch(error =>{
                console.log('Something rr went wrong',  error);
            });
        }
       
    }
    

    //useEffect to populate the form when click on update
    useEffect(() =>{
        if(samId){
            childService.get(samId)
                .then(child =>{
                    setUhid(child.data.uhid);
                    setRchid(child.data.rchId);
                    setName(child.data.name);
                    setAge(child.data.age);
                    setDob(child.data.dob);
                    setGender(child.data.gender);
                    setAddress(child.data.address);
                    setContact(child.data.contactNumber);
                    setRelationshipDetails(child.data.relationshipDetails);
                    setCaste(child.data.caste);
                    setReligion(child.data.religion);
                    setBpl(child.data.bpl);
                    setHeight(child.data.height);
                    setWeight(child.data.weight);
                    setMuac(child.data.muac);
                    setGrowthStatus(child.data.growthStatus);
                    setOtherSymptoms(child.data.otherSymptoms);
                })
                .catch(error=>{
                    console.log('Something went wrong', error); 
                })
        }
    },[]);

    return (  
        <div className="childrenlist" >
            <h3>Add new child</h3>
            <hr/>
            <Container>
            <form>
                <Row>
                    <Col>
                    <label>Enter UHID</label>
                    <input type="text" className="form-control col-4" id="uhid" value={uhid} onChange={(e)=>setUhid(e.target.value)} placeholder="UhId"/>
                    </Col>
              
                    <Col>
                    <label>Enter RCH ID</label>
                    <input type="text" className="form-control col-4" id="rchId" value={rchId} onChange={(e)=>setRchid(e.target.value)} placeholder="RchId"/>
                    </Col>

                </Row>
                <Row>
                    <Col>
                        <label>Enter Name</label>            
                    <input type="text" className="form-control col-4" id="name" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Name"/>
                </Col>
                    <Col>      
                        <label>Enter Age</label>
                            <input type="text" className="form-control col-4" id="age" value={age} onChange={(e)=>setAge(e.target.value)} placeholder="Enter Age"/>
                       
                    </Col>
                    <Col>
                       <label>Gender</label>
                        {/* <input type="text" className="form-control col-4" id="gender" value={gender} onChange={(e)=>setGender(e.target.value)} placeholder="Enter Gender"/> */}
                        <input type="radio" name="gender" onChange={(e)=>setGender('Male')} placeholder="Enter Gender"/><label>Male</label>
                        <input type="radio" name="gender" onChange={(e)=>setGender('Female')} placeholder="Enter Gender"/><label>Female</label>
                        <input type="radio" name="gender" onChange={(e)=>setGender('Others')} placeholder="Enter Gender"/><label>Others</label>
                        
                    </Col>
                    <Col>
                       <label>Enter Date of Birth</label>
                    {/* <input type="text" className="form-control col-4" id="dob" value={dob} onChange={(e)=>setDob(e.target.value)} placeholder="Enter Date of Birth"/> */}
                    <DatePicker placeholderText="DD/MM/YY" selected={dob} onChange={date => setDob(date)} id="dob" value={dob}/>
                    
                    
            </Col>
                </Row>

                <Row>
                    <Col>
                            <label>Relationship Details</label>         
                    <input type="text" className="form-control col-4" id="relationshipdetails" value={relationshipDetails} onChange={(e)=>setRelationshipDetails(e.target.value)} placeholder="Enter Relationship Details"/>
                </Col>
                    <Col>
                          <label>Caste</label>          
                    <input type="text" className="form-control col-4" id="caste" value={caste} onChange={(e)=>setCaste(e.target.value)} placeholder="Enter Caste"/>
               </Col>
                    <Col>
                        <label>Religion</label> 
                        <input type="text" className="form-control col-4" id="religion" value={religion} onChange={(e)=>setReligion(e.target.value)} placeholder="Enter Religion"/>
                        
                    </Col>
                    
                </Row>

                <Row>
                    <Col>
                                    <label>Enter Address for correspondence</label> 
                    <input type="text" className="form-control col-4" id="address" value={address} onChange={(e)=>setAddress(e.target.value)} placeholder="Enter Address"/>
               
                    </Col>
                    <Col>
                         <label>Contact</label> 
                    <input type="text" className="form-control col-4" id="contact" value={contactNumber} onChange={(e)=>setContact(e.target.value)} placeholder="Enter Contact"/>
                

                    </Col>
                </Row>
            <Row>
                <Col>
                    <label>BPL</label> 
                    <input type="text" className="form-control col-4" id="bpl" value={bpl} onChange={(e)=>setBpl(e.target.value)} placeholder="y/n"/>
              
                </Col>
                 <Col>
                  <label>Height</label> 
                    <input type="text" className="form-control col-4" id="height" value={height} onChange={(e)=>setHeight(e.target.value)} placeholder="Enter Height(cm)"/>
                
                </Col>
                 <Col>
             <label> Weight</label> 
                    <input type="text" className="form-control col-4" id="weight" value={weight} onChange={(e)=>setWeight(e.target.value)} placeholder="Enter Weight(Kg)"/>
             
                </Col>
                 <Col>
                <label>Enter MUAC</label> 
                    <input type="text" className="form-control col-4" id="muac" value={muac} onChange={(e)=>setMuac(e.target.value)} placeholder="Enter Muac"/>
               
                </Col>
                 <Col>
                <label>Growth Status</label> 
                    <input type="text" className="form-control col-4" id="growthstatus" value={growthStatus} onChange={(e)=>setGrowthStatus(e.target.value)} placeholder="Enter Growth Status"/>
               
                </Col>
            </Row>

           <label>Other Symptoms (if any)</label> 
                    <input type="text" className="form-control col-4" id="othersymptoms" value={otherSymptoms} onChange={(e)=>setOtherSymptoms(e.target.value)} placeholder="Enter Other Symptoms"/>
             
                           
            
                    <Link to="/children">
                    <button className="btn btn-primary" onClick={(e) => saveChild(e)}>Save</button>
                    </Link>
                    {/*onclick -> anonymous function and savechild takes event e*/}
              

            </form>
            </Container>
           
            <Link to="/children">Back to list</Link>
        </div>
    );
}
 
export default AddChild;