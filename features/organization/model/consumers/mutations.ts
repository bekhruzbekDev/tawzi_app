import axios from "@/services/axios.config";
import { CreateConsumerData } from "./types";

export const createConsumer = (data: CreateConsumerData) => {
  return axios
    .post("organization/create/consumer/", data)
    .then((res) => res.data);
};
