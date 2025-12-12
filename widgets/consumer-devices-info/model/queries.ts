import axios from "@/services/axios.config";

export const getConsumerDevicesInfo = (
  id: string | number | null,
  filter_type: "monthly" | "yearly",
  date: Date
) => {
  const params = {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
  };
  return axios
    .get(`organization/mobile/consumer/${id}/${filter_type}/`, {
      params,
    })
    .then((res) => res.data);
};
