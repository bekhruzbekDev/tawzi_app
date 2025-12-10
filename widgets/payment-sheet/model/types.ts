import z from "zod";
import { paymentSchema } from "./constants";

export type PaymentFormValues = z.infer<typeof paymentSchema>;
