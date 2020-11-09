import axios from 'axios';

export const Api = axios.create({
  baseURL: 'http://192.168.100.88:3000',
});
