import axios from 'axios';

const MOCK_BASE_API_URL = process.env.REACT_APP_MOCK_BASE_URL;

const mockAxiosFetch = axios.create({
  baseURL: MOCK_BASE_API_URL,
});

mockAxiosFetch.interceptors.request.use(
  config => {
    const accessToken = sessionStorage.getItem('accessToken');

    config.headers['Content-Type'] = 'application/json';
    if (accessToken) config.headers['Authorization'] = `Bearer ${accessToken}`;

    return config;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  }
);

export default mockAxiosFetch;
