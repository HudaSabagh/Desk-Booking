import axios from "axios";
import { Config } from "../config";

class AuthService {
    constructor() {
        this.endpoint = Config.endpoint;
    }

    isLoggedIn() {
        return localStorage.getItem('token', 'userId') != null;

    }

    getToken() {
        const token = localStorage.getItem('token');
        if (token != null) {
            return token;
        }
        return undefined;
    }

    getUserId() {
        const userId = localStorage.getItem('userId');
        if (userId != null) {
            return userId;
        }
        return undefined;
    }

    login(email, password) {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');

        return axios.post(`${this.endpoint}/login`, {
            email: email,
            password: password
        }).then(response => {
            if (response?.data?.token) {
                const token = response.data.token;
                console.log('token', token);
                localStorage.setItem('token', token);
                const userId = response.data.userId;
                localStorage.setItem('userId', userId)


            } else {
                throw new Error('Login successful but no access token received from server!');
            }
        });
    }

    signUp(firstName, lastName, email, department, password) {
        return axios.post(`${this.endpoint}/register`, {
            firstname: firstName,
            lastname: lastName,
            email: email,
            department: department,
            password: password
        });
    }
    logout() {
        return new Promise((resolve) => {
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            resolve();
        });
    }
    
    

/*     updateUserProfile(firstname, lastname, department, email){
        return axios.post(`${this.endpoint}/user`, {
            firstname, 
            lastname, 
            department, 
            email
        });
    } */

/*     updateUserPassword(password){
        return axios.post(`${this.endpoint}/user`, {
            password,
        })
    } */

}



export const sharedAuthService = new AuthService();