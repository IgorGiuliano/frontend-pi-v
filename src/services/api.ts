import axios from 'axios';

const api = axios.create({
    //baseURL: 'http://localhost:5000'
    baseURL: 'https://apicacamba.herokuapp.com'
});

export default api;
