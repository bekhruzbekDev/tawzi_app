import z from "zod";

export const consumerSchema = z.object({
  name: z.string().min(3, { message: "Ism kamida 3 ta harf bo'lishi kerak" }),
  phone_number: z
    .string(),
  username: z
    .string()
    .min(3, { message: "Username kamida 3 ta harf bo'lishi kerak" }),
  password: z
    .string().min(4, { message: "Parol kamida 3 ta harf bo'lishi kerak" }),
  device_type: z
    .string()
    .min(1, { message: "Hisoblagich turi kiritilishi shart" }),

  meter_number: z.string(),
  parent: z.string(),
});


export const consumerEditSchema = z.object({
  name: z.string().min(3, { message: "Ism kamida 3 ta harf bo'lishi kerak" }),
  phone_number: z
    .string(),
  username: z
    .string()
    .min(3, { message: "Username kamida 3 ta harf bo'lishi kerak" }),
  password: z
    .string(),
})