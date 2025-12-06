import z from "zod";
import { consumerEditSchema, consumerSchema } from "./constants";

export type ConsumerFormValues = z.infer<typeof consumerSchema>;
export type ConsumerEditFormValues = z.infer<typeof consumerEditSchema>;

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
  username: string;
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


export type MeterType = {
  count: number;
  value: number;
};
export type Consumer = {
  id: string;
  name: string;
  phone?: string;
  electricity?: MeterType | null;
  gas?: MeterType | null;
  water?: MeterType | null;
  createdAt?: string;
  username: string;
};


export type ConsumerFormData = {
    name: string;
    phone_number: string;
    username: string;
    password: string;
};