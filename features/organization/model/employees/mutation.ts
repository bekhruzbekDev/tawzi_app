import axios from "@/services/axios.config";
import { CreateEmployeeFormType } from "./types";

export const createEmployeeMutation = (data: CreateEmployeeFormType) => {
  return axios
    .post("organization/create/employee/", data)
    .then((data) => data.data);
};

export const editEmployeeMutation = (
  id: number | string | null,
  data: CreateEmployeeFormType
) => {
  return axios
    .put(`organization/employee/${id}/edit/`, data)
    .then((data) => data.data);
};
