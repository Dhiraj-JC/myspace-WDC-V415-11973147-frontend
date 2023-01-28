import axios from 'axios';

const baseUrl = 'http://localhost:8000/';

export function customPOST(url, requestBody) {
  const config = getTokenConfig();
  return axios.post(baseUrl + url, requestBody, config);
}

export function customGET(url) {
  const config = getTokenConfig();
  return axios.get(baseUrl + url, config);
}

export function customPUT(url, requestBody) {
  const config = getTokenConfig();
  return axios.put(baseUrl + url, requestBody, config);
}

export function customDELETE(url) {
  const config = getTokenConfig();
  return axios.delete(baseUrl + url, config);
}

function getTokenConfig() {
  const token = localStorage.getItem('token');

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return config;
}

export function getConvertStringNumberToNumber(stringNumber) {
  const convertedValue = +stringNumber;
  return convertedValue;
}
