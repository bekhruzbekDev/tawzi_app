import { useQuery } from "@tanstack/react-query";
import { getConsumerDetailChart } from "./queries";
import { ConsumerDetailChartRes, DevicesData } from "./types";

export const useChartsData = (
  id: string | null,
  filter_type: "monthly" | "yearly",
  date: Date
) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const { data } = useQuery<ConsumerDetailChartRes>({
    queryKey: ["consumer-charts-data", id, filter_type, date],
    queryFn: () => getConsumerDetailChart(id, filter_type, year, month),
  });

  const electricData = mapparsData(data?.data?.electric);

  const waterData = mapparsData(data?.data?.water);

  const gasData = mapparsData(data?.data?.gas);

  return {
    electricData,
    waterData,
    gasData,
  };
};

const mapparsData = (data: DevicesData | undefined) => {
  if (!data) return null;
  return {
    worked_summa: data?.worked_summa,
    worked_consumption: data?.worked_consumption,
    data: data?.data?.map((item) => ({
      value: item.value,
      label: item.date,
    })),
  };
};
