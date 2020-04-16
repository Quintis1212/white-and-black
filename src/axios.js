import axios from 'axios';

const instance = axios.create({
    baseURL:'https://white-and-black-349d9.firebaseio.com/'
})

export default instance;