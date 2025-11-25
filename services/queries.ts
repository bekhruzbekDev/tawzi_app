import axios from "@/services/axios.config";

export const getUser = async () => {
  const data = await axios.get("auth/user/");

  return data.data;
};
