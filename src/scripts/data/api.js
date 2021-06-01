import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://192.168.1.12:8080/api/v1/',
  // withCredentials: true,
});

export default apiClient;