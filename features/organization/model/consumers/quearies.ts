import axios from "@/services/axios.config";

export const getConsumers = (page = 1, page_size = 5) => {
  return axios
    .get("organization/consumers/", {
      params: {
        page,
        page_size,
      },
    })
    .then((res) => res.data);
};
