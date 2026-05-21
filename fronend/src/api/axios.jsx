import axios from 'axios';
import React from 'react'

const BASE_URL ='http://localhost:8080';
export default axios.create({
    baseURL: BASE_URL
});
export const axiosPrivate =axios.create({
    baseURL: BASE_URL,
 
          withCredentials: true

    
});