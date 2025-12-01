import z from "zod";
import { consumerSchema } from "./constants";

export type ConsumerFormValues = z.infer<typeof consumerSchema>;

export type CreateConsumerData = {
  name: string;
  username: string;
  password: string;
  phone_number: string;
};

export interface GetConsumersRes {
  data: GetConsumersData[];
  stats: any;
  total_pages: number;
}

export interface GetConsumersData {
  id: number;
  name: string;
  phone_number: string;
  organization: string;
  electric: ConsumerMeterData[];
  water: ConsumerMeterData[];
  gas: ConsumerMeterData[];
  created_at: string;
}

export interface ConsumerMeterData {
  serial_number: string;
  current_reading: string;
  initial_reading: string;
}
