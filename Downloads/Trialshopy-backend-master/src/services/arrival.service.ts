import { Model } from "mongoose";
import Arrival from "../models/arrival.model";

export class ArrivalService {
  async createArrival(data: any) {
    const arrival = new Arrival(data);
    return arrival.save();
  }

  async getArrival(arrivalId: string) {
    return await Arrival.findOne({ _id: arrivalId }).exec();
  }

  async getAllArrivals() {
    return await Arrival.find().exec();
  }

  async updateArrival(arrivalId: string, data: any) {
    return await Arrival.findByIdAndUpdate(arrivalId, data, {
      new: true
    }).exec();
  }

  async deleteArrival(arrivalId: string) {
    return await Arrival.findByIdAndDelete(arrivalId).exec();
  }
}
