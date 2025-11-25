import axios from "@/services/axios.config";
import { LoginFormData } from "../ui/auth-form";

export const loginMutation = (data: LoginFormData) => {
  return axios.post("auth/login/",data).then((res) => res.data);
};
