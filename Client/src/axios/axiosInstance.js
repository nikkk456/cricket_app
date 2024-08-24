import axios from 'axios'
const axiosinstance = axios.create({
    baseURL:"http://localhost:8080/api"
});

export default axiosinstance;