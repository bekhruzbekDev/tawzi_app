import axios from "@/services/axios.config";
import { cleanParams } from "@/shared/utils/helper";

export const getAllEmployees = (
  page = 1,
  page_size = 10,
  searchQuery: string
) => {
  const params = cleanParams({
    page,
    page_size,
    search: searchQuery,
  });
  return axios
    .get("organization/employees/", { params })
    .then((res) => res.data);
};
