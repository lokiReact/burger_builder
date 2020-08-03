import axios from 'axios';

const instance  = axios.create({
    baseURL: 'https://loki-burger-project.firebaseio.com/'
})

export default instance;