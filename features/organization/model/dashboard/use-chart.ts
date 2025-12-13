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
  /*
    Color Mapping:
    - Electric: Primary #F59E0B (Amber 500), Secondary #FBBF24 (Amber 400)
    - Gas: Primary #EF4444 (Red 500), Secondary #F87171 (Red 400)
    - Water: Primary #3B82F6 (Blue 500), Secondary #60A5FA (Blue 400)
  */
  const getColors = (type: "electric" | "gas" | "water") => {
    switch (type) {
      case "electric":
        return { v1: "#F59E0B", v2: "#FBBF24" };
      case "gas":
        return { v1: "#EF4444", v2: "#F87171" };
      case "water":
        return { v1: "#3B82F6", v2: "#60A5FA" };
      default:
        return { v1: "#F59E0B", v2: "#FBBF24" };
    }
  };

  const colors = getColors(filter_type);

  const chartData: OrgChartData[] =
    data?.data?.map((item) => ({
      v1: item.incoming,
      v2: item.outgoing,
      label: item.date,
      v1Color: colors.v1,
      v2Color: colors.v2,
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
