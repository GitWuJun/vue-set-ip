import axios from 'axios';

const service = axios.create({
    baseURL: '/api',
    withCredentials: false
});

export default service;