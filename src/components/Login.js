import React,{Component} from 'react';
import { useNavigate,useParams } from "react-router";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';
//import { Redirect } from 'react-router';
import '../login.css';
import Dashboard from "./Dashboard";



class Login extends Component {


  constructor(props){
    super(props);
    this.state = {
        username : '',
        password : '',
        isLoggedIn: false
    }
    this.submitPatientLogin = this.submitPatientLogin.bind(this);
    this.detailsChange = this.detailsChange.bind(this);
  }



  refreshPage = () => {
    this.setState(
      {isLoggedIn: true}
     // () => this.setState({isLoggedIn: false})
    )
  }
  
  submitPatientLogin(event){
      console.log(this.state);
      event.preventDefault();
      const headers = { 
          "Content-Type": "application/json" ,
          "Access-Control-Allow-Origin": "*"
      };


      axios.post('http://localhost:8080/api/v1/authenticate', this.state, { headers })
      // axios.post('http://cb83-119-161-98-68.ngrok.io/api/v1/authenticate', this.state, { headers })
      .then(response => 
        {
            
            //this.setState({isLoggedIn : true});
            //setting the cookie here
            console.log(response.data);
            document.cookie = "patient_cookie=" + response.data['jwt'];
            console.log("Cookie set");
            this.refreshPage()
            this.setState({isLoggedIn: true})

        })
        .catch(error => {
          if(error.response.status==401){
            alert("Wrong credentials! Enter the valid credentials");
          }
          else{
            alert(error.response.status);
          }
        });
  }

  detailsChange(event){
      this.setState({
          [event.target.name]:event.target.value
      });
  }


  render(){

    if(!this.state.isLoggedIn){
      return (
        <div className="LoginPage">
          <h1>LOGIN PAGE</h1>
          <Form onSubmit={this.submitPatientLogin}>
            <Form.Group size="lg" className="form" controlId="formBasicPatientUsername">
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                autoFocus
                type="text"
                value={this.state.username}
                name = "username"
                onChange={this.detailsChange}
                placeholder = "Email"
              />
            </Form.Group>
            <Form.Group size="lg" className="form" controlId="formBasicPatientPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                value={this.state.password}
                onChange={this.detailsChange}
                placeholder="Password"
                name="password"
              />
            </Form.Group>
            <Button size="lg" type="submit">
              Login
            </Button>
          </Form>
  
        </div>
       
      );
    }
    else{
      return <Dashboard/>;
    }

  }

}

export default Login;