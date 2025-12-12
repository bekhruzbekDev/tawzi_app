import axios from "@/services/axios.config";

export const getConsumerDetailChart = (
  id: string | null,
  filter_type: "monthly" | "yearly",
  year: number,
  month?: number
) => {
  const params = {
    year,
    month,
  };
  return axios
    .get(
      `organization/mobile/consumer/${id}/${filter_type}/timely_consumption/`,
      { params }
    )
    .then((res) => res.data);
};
