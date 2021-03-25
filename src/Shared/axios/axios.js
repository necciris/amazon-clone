import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5001/clone-app-e9da4/us-central1/api',
});

export default instance;
