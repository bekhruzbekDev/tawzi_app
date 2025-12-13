import { useStore } from "@/shared/store/store";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  AlertStatsMapper,
  FinanceMaps,
  mapDashboardDataToStats,
} from "./mapper";
import { getDashboardData } from "./queryes";
import {
  AlertStatItem,
  DashboardDataResponse,
  DashboardStats,
  FinanceChartData,
} from "./types";

const deviceType = {
  electric: "Elektr",
  gas: "Gaz",
  water: "Suv",
};

export const useDashboardData = () => {
  const userData = useStore((state) => state.user);

  const [unitType, setUnitType] = useState(
    userData?.organization?.device_types?.[0] ?? "electric"
  );

  const deviceTypes = userData?.organization?.device_types ?? [];

  const { data, isLoading, refetch } = useQuery<DashboardDataResponse>({
    queryKey: ["dashboard-data", unitType],
    queryFn: () => getDashboardData({ device_type: unitType }),
  });

  const dashboardStats: { losses: string; stats: DashboardStats[] } = {
    losses: data?.data.monthly_stats.losses ?? "",
    stats: mapDashboardDataToStats(data?.data?.monthly_stats ?? null),
  };

  const alertStats: AlertStatItem[] = AlertStatsMapper(
    data?.data ?? null,
    userData?.organization?.has_billing ?? false
  );

  const financeStats: { chartData: FinanceChartData[]; totalConsumer: number } =
    {
      chartData: FinanceMaps(data?.data?.finance ?? null),
      totalConsumer: data?.data?.finance?.totalConsumer ?? 0,
    };

  return {
    unitType,
    setUnitType,
    deviceTypes,
    userData,
    dashboardStats,
    isLoading,
    alertStats,
    financeStats,
    topConsumers: data?.data?.top_consumers ?? [],
    hasBilling: userData?.organization?.has_billing ?? false,
    refetch,
  };
};
