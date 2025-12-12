import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getOrganizationChartData } from "./queryes";
import { OrganizationChartDataRes, OrgChartData } from "./types";

export const useOrganizationChartData = (
  filter_type: "electric" | "gas" | "water"
) => {
  const [date, setDate] = useState(new Date());
  const { data, isLoading } = useQuery<OrganizationChartDataRes>({
    queryKey: ["organization-chart-data", filter_type, date],
    queryFn: () => getOrganizationChartData(filter_type, "monthly", date),
  });
  const chartData: OrgChartData[] =
    data?.data?.map((item) => ({
      v1: item.incoming,
      v2: item.outgoing,
      label: item.date,
      v1Color: "#f59e0b",
      v2Color: "#f97316",
      v1Label: "Kiruvchi",
      v2Label: "Chiquvchi",
    })) ?? [];

  return {
    chartData,
    isLoading,
    setDate,
    date,
  };
};
