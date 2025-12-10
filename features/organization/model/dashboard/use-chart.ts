import { useQuery } from "@tanstack/react-query";
import { getOrganizationChartData } from "./queryes";
import { OrganizationChartDataRes, OrgChartData } from "./types";

export const useOrganizationChartData = () => {
  const { data, isLoading } = useQuery<OrganizationChartDataRes>({
    queryKey: ["organization-chart-data"],
    queryFn: () => getOrganizationChartData("electric", "monthly"),
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
  };
};
