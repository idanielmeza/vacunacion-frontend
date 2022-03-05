import axios from 'axios';

export const clienteAxios = axios.create({
    // baseURL: process.env.REACT_APP_BACKEND_URL || window.location.href
    // baseURL: window.location.origin
    baseURL: 'http://localhost:4000/api/'
});
