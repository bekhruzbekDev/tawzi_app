import z from "zod";
import { consumerSchema } from "./constants";

export type ConsumerFormValues = z.infer<typeof consumerSchema>;
