import axios from "axios";

export default axios.create({
    // baseURL: 'http://localhost:8080/api/v1/child',
    baseURL: 'http://localhost:8080/api/v1/child',
    headers: {
        'Content-Type': 'applications/json',
        // 'Access-Control-Allow-Origin':'*'
    }
});
