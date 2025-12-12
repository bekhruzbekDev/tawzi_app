import z from "zod";
import { createEmployeeForm, EditEmployeeForm } from "./constants";

export interface EmployeesRes {
  data: EmployeesData[];
  total_pages: number;
}

export interface EmployeesData {
  id: number;
  first_name: string;
  username: string;
  phone_number: string;

  add_device_permission: boolean;
  add_consumer_permission: boolean;
  add_user_permission: boolean;
  valve_control_permission: boolean;
}

export interface Employee {
  id: string | number;
  name: string;
  login: string;
  phone: string;
  permissions: {
    can_send_command: boolean;
    can_add_employee: boolean;
    can_add_meter: boolean;
    can_add_consumer: boolean;
  };
}

export type CreateEmployeeFormType = z.infer<typeof createEmployeeForm>;
export type EditEmployeeFormType = z.infer<typeof EditEmployeeForm>;
