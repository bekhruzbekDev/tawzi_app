import axios from "@/services/axios.config";
import { CreateConsumerData } from "./types";

export const createConsumer = (data: CreateConsumerData) => {
  return axios
    .post("organization/create/consumer/", data)
    .then((res) => res.data);
};


export const updateConsumer = (data: CreateConsumerData,id:string) => {
  return axios
    .put(`organization/consumer/${id}/edit/`, data)
    .then((res) => res.data);
};