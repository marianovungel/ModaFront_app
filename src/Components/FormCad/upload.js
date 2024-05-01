import axios from 'axios'; 

const upload = axios.create({
    baseURL: 'http://localhost:8000/',
    // baseURL: 'https://uploadimgu.herokuapp.com/',
});


export default upload;