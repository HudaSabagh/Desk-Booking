import axios from "axios";
import { Config } from "../config";

class UserService {
  constructor() {
    this.endpoint = Config.endpoint;
  }

  getAllUsers() {
    return axios.get(`${this.endpoint}/user`).then((response) => response.data);
  }

  getUserById(userId) {
    return axios.get(`${this.endpoint}/user/${userId}`);
  }

  updateUserProfile(firstname, lastname, department, email) {
    return axios.post(`${this.endpoint}/user`, {
      firstname,
      lastname,
      department,
      email,
    });
  }

  updateUserPassword(password) {
    return axios.post(`${this.endpoint}/user`, {
      password,
    });
  }
}

export const userService = new UserService();
