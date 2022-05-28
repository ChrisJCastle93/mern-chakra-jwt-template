
import axios from 'axios';

class ApiService {
    constructor() {
        this.baseUrl = process.env.REACT_APP_API_URL
    }

    signup = (username, email, password) => {
        return axios
            .post(`${this.baseUrl}/api/auth/signup`, { username, email, password }, {
                withCredentials: true
            })
            .then(response => {
                return response.data;
            })
            .catch(error => {
                return error.response.data
            });
    }

    update = (username, password ,id) => {
        return axios
        .post(`${this.baseUrl}/api/auth/profile/edit`, { username, password, id }, {
            withCredentials: true
        })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            return error.response.data
        })
    }
    
    login = (username, password) => {
        return axios
            .post(`${this.baseUrl}/api/auth/login`, { username, password }, {
                withCredentials: true
            })
            .then(response => {
                return response.data;
            })
            .catch(error => {
                return error.response.data
            });
    }
    
    logout = () => {
        return axios
            .delete(`${this.baseUrl}/api/auth/logout`, { withCredentials: true })
            .then(response => {
                return response.data;
            })
            .catch(error => {
                return error.response.data
            });
    }
    
    isLoggedIn = () => {
        return axios.get(`${this.baseUrl}/api/auth/loggedin`, {
            withCredentials: true
        })
    }
}

const apiService = new ApiService()

export default apiService;