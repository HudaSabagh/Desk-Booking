import axios from "axios";
import { Config } from "../config";

class OfficesService {
  constructor() {
    this.endpoint = Config.endpoint;
  }

  getAllOffices() {
    return axios
      .get(`${this.endpoint}/office`)
      .then((response) => response.data);
  }
  getOfficeById(id) {
    return axios
      .get(`${this.endpoint}/office/${id}`)
      .then((response) => response.data);
  }
}

export const sharedOfficeService = new OfficesService();
