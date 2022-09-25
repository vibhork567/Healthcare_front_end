import { useEffect, useState } from "react";
import childService from "../services/child.service";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import axios from 'axios';


const ViewFollowups = () => {

  const [followups, setFollowups] =  useState([]);

  useEffect(() =>{
    init();
   
  }, [])


  const init = () => {
    childService.getAllFollowUps()
    .then(response => {
      console.log('Printing children data',response.data);
      setFollowups(response.data);
    })
    .catch(error => {
      console.log('Something went wrong',error);
    })
  }

    const notify = (e) =>{
       e.preventDefault();
         
    var data = JSON.stringify(
        {
        "app_id": "f2596674-be88-45f6-a7f3-e77f1b82ae13",
        "include_external_user_ids":["user"],
        "android_accent_color":"FFFFFFFF",
        "large_icon":"https://upload.wikimedia.org/wikipedia/te/3/32/Anganwadi_logo.jpg",
        "headings": {"en": "New Followup  Name: Manan"},
        "contents": {"en": "New Follow Up"},
        "data":{"type":"new","name": "Amar", "gender": "M", "age": 3,"samId":"1","pr":"H"}
}
    );
    var config = {
    method: 'post',
    url: 'https://onesignal.com/api/v1/notifications',
    headers: { 
        'Content-Type': 'application/json', 
        'Authorization': 'Bearer NjBiNTI3M2QtMDFhMy00N2RiLTgzZWMtZGFlY2MzMGUxZGEy'
    },
    data : data
    };

    axios(config)
    .then(function (response) {
    console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
    console.log(error);
    });
       
    }


  return ( 
      <div>
        <h3>List of Follow Ups</h3>
        <hr/>
        <div>
          <table className="table table-bordered table-striped">
            <thead className="table-dark">
            <tr>
            <td>Follow Up ID</td>
            <td>Follow up date</td>
            <td>Status</td>
            

          </tr>
            </thead>
            <tbody>
          {
            followups.map(d => (
              <tr key={d.followUpId}>
                <td>{d.followUpId}</td>
                <td>{d.followupDate}</td>
                <td>{d.isAttempted}</td>
                 <td>
                  <Link className="btn btn-info" to={"/children/viewfollowups"}>Notify AWW</ Link>  
                </td>
                
              </tr>
            ))
          }
            </tbody> 
          </table>
        </div>
      </div>
   );
}
       
export default ViewFollowups;
