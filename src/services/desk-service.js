import axios from "axios";
import { Config } from "../config";

class DeskService {
  constructor() {
    this.endpoint = Config.endpoint;
  }

  getAllDesks() {
    return axios.get(`${this.endpoint}/desk`).then((response) => response.data);
  }

  getDeskById(id) {
    return axios
      .get(`${this.endpoint}/desk/${id}`)
      .then((response) => response.data);
  }

  
  
  addFixbooking(id, comment) {
    return axios.post(`${this.endpoint}/desk/${id}/fix`, {
      //this name muss to be the same thing in api to can know
      
      comment: comment,
    });
  }
  addCommentFlex(id, comment) {
    return axios.post(`${this.endpoint}/desk/${id}/comment`, {
      comment: comment,
    });
  }
  getStatusFix(id) {
    return axios
      .get(`${this.endpoint}/desk/${id}/fix`)
      .then((response) => response.data);
  }
  getAllFlexComments(id) {
    return axios
      .get(`${this.endpoint}/desk/${id}/comment`)
      .then((response) => response.data);
  }
  getOneComment(id1, id2) {
    return axios
      .get(`${this.endpoint}/desk/${id1}/comment/${id2}`)
      .then((response) => response.data);
  }
  deletFlixDsek(id) {
    return axios.delete(`${this.endpoint}/desk/${id}/fix`, {
      id: id,

    });
  }


}

export const sharedDeskService = new DeskService();
