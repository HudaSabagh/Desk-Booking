import axios from "axios";

import { Config } from "../config";

class BookingService {
  constructor() {
    this.endpoint = Config.endpoint;
  }

  getAllBookings() {
    return axios
      .get(`${this.endpoint}/booking`)
      .then((response) => response.data);
  }
  Booking(deskid, datestart, dateend) {
    return axios.post(`${this.endpoint}/booking`, {
      deskId: deskid,
      dateStart: datestart,
      dateEnd: dateend,
    });
  }
  getBookingById(id) {
    return axios
      .get(`${this.endpoint}/booking/${id}`)
      .then((response) => response.data);
  }
  deleteBooking(id) {
    return axios.delete(`${this.endpoint}/booking/${id}`, {
      id: id,
    });
  }
}

export const sharedBookService = new BookingService();
