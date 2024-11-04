import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
  timeout: 10000,
});

export default api;
