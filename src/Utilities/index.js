import axios from 'axios';

const baseUrl = "http://localhost:8000/";

export function  customPOST(url, requestBody) {
    return axios.post(baseUrl + url,requestBody);
}