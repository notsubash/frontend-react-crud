import axios from 'axios';

export default axios.create({
    baseURL: "http://localhost:8080/api",
    header: {
        "content-type": "application/json"
    }
});

