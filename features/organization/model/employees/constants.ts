import z from "zod";

export const createEmployeeForm = z.object({
  first_name: z
    .string()
    .min(2, "Ism kamida 2 ta belgidan iborat bo'lishi shart"),
  phone_number: z
    .string()
    .min(9, "Telefon raqam kamida 9 ta belgidan iborat bo'lishi shart"),
  username: z
    .string()
    .min(3, "Login kamida 3 ta belgidan iborat bo'lishi shart"),
  password: z
    .string()
    .min(4, "Parol kamida 4 ta belgidan iborat bo'lishi shart"),

  add_device_permission: z.boolean(),
  add_consumer_permission: z.boolean(),
  add_user_permission: z.boolean(),
  valve_control_permission: z.boolean(),
});

export const EditEmployeeForm = createEmployeeForm.extend({
  password: z.string().optional(),
});
