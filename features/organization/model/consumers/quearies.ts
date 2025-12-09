import axios from "@/services/axios.config";
import { cleanParams } from "@/shared/utils/helper";

export const getConsumers = (
  page = 1,
  page_size = 5,
  filter: "is_notified" | "is_debtor" | null,
  searchValue: string
) => {
  const params = cleanParams({
    page,
    page_size,
    is_notified: filter === "is_notified" ? true : undefined,
    is_debtor: filter === "is_debtor" ? true : undefined,
    search: searchValue,
  });
  return axios
    .get("organization/consumers/", {
      params,
    })
    .then((res) => res.data);
};
