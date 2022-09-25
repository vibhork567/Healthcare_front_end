import httpClient from '../http-common';
import axios from 'axios';


const getCookie =(cName)=>{
    const name = cName + "=";
    const cDecoded = decodeURIComponent(document.cookie); //to be careful
    const cArr = cDecoded .split('; ');
    let res;
    cArr.forEach(val => {
        if (val.indexOf(name) === 0) res = val.substring(name.length);
    })
    return res;
  }

const getAll = () => {
    const token=getCookie('patient_cookie');
    return httpClient.get('/children',{
              headers: {
            'Authorization':`Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    });
}


const getAllDischarged = () => {
    const token=getCookie('patient_cookie');
    return httpClient.get('/dischargedList',{
              headers: {
            'Authorization':`Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    });
}


const getAllFollowUps = () => {
    const token=getCookie('patient_cookie');
    return httpClient.get('/getallfollowups',{
              headers: {
            'Authorization':`Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    });
}

const create = (data) => {
    const token=getCookie('patient_cookie');
    console.log(token);
    return httpClient.post("/children", data, {
        headers: {
            'Authorization':`Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    });
}

const createfollowup = (data) => {
    const token=getCookie('patient_cookie');
    console.log(token);
    return httpClient.post("/createfollowup", data, {
        headers: {
            'Authorization':`Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    });
}

const get = samId => {
    const token=getCookie('patient_cookie');
    return httpClient.get(`children/${samId}`,{
              headers: {
            'Authorization':`Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    });

}

const update = (data) => {
    const token=getCookie('patient_cookie');
    return httpClient.put('children',data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${token}`,
        }
    });
}
const discharge = (data) => {
    const token=getCookie('patient_cookie');
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

    return httpClient.post("/discharge", data, {
        headers: {
            'Authorization':`Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    });
}

const sendsms = (data) => {
    const token=getCookie('patient_cookie');
    var data = JSON.stringify(
        {
        "app_id": "f2596674-be88-45f6-a7f3-e77f1b82ae13",
        "sms_from":"+19706766120",
        "name":data.name,
        "include_phone_numbers":["+918758423787"],
        "contents": {"en": "Your child " +data.name+ " has been admitted with SamId "+data.samId }
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

    return httpClient.post("/discharge", data, {
        headers: {
            'Authorization':`Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    });
}


const remove = samId => {
    const token=getCookie('patient_cookie');
    return httpClient.delete(`children/${samId}`, {
        headers: {
            'Authorization':`Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    });
}
//makes http call to rest api endpoint in springboot 

export default {getAll,getAllDischarged, create, get,update, remove, discharge, sendsms,createfollowup,getAllFollowUps};




