import axios from "axios";
import { Config } from "../config";
class UserFavourites {
  constructor() {
    this.endpoint = Config.endpoint;
  }
  getUserFavourites() {
    return axios
      .get(`${this.endpoint}/favourite`)
      .then((response) => response.data);
  }
  addFavouriteDesk(deskId) {
    return axios.post(`${this.endpoint}/favourite`, {
      deskId: deskId,
    });
  }

  
  deleteFavourite(id) {
    return axios.delete(`${this.endpoint}/favourite`, { data: { deskId: id } });
  }
}
export const sharedUserFavourites = new UserFavourites();