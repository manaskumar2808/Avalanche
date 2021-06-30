import baseUrl from './constants/API';
import axios from 'axios';

const instance = axios.create({
    baseURL: baseUrl,
});

export default instance;