import {
  AlertStatItem,
  DashboardData,
  DashboardStats,
  Finance,
  FinanceChartData,
  MonthlyStats,
} from "./types";

export const mapDashboardDataToStats = (
  data: MonthlyStats | null
): DashboardStats[] => {
  return [
    {
      value: data?.monthly_consumption.current_total.toString() ?? "0",
      label: "Oylik iste'mol",
      warning: "-10 % otgan oyga nisbatan",
      isWarning: false,
    },
    {
      value: data?.weekendly_consumption.current_total.toString() ?? "0",
      label: "Haftalik iste'mol",
      warning: "-10 % otgan oyga nisbatan",
      isWarning: false,
    },
    {
      value: data?.daily_consumption.current_total.toString() ?? "0",
      label: "Kunlik iste'mol",
      warning: "-10 % otgan oyga nisbatan",
      isWarning: false,
    },
  ];
};

export const AlertStatsMapper = (
  data: DashboardData | null,
  hasBilling: boolean
): AlertStatItem[] => {
  const result: AlertStatItem[] = [
    {
      id: "1",
      label: "Ogohlantirilganlar:",
      value: data?.notified_consumers ?? 0,
      icon: "warning",
      iconColor: "#FF9500",
      iconBgColor: "#FFF3E0",
    },
    {
      id: "2",
      label: "Qarzdorlar:",
      value: data?.debtors ?? 0,
      icon: "card",
      iconColor: "#FF3B30",
      iconBgColor: "#FFEBEE",
    },
    {
      id: "3",
      label: "Aloqaga chiqmaganlar:",
      value: data?.uncontacted ?? 0,
      icon: "cellular",
      iconColor: "#8E8E93",
      iconBgColor: "#F5F5F5",
    },
    {
      id: "4",
      label: "Klapin Yopilganlar:",
      value: data?.disconnected ?? 0,
      icon: "power",
      iconColor: "#00C7BE",
      iconBgColor: "#E0F7F6",
    },
  ];
  return hasBilling ? result : result.slice(2);
};

export const FinanceMaps = (data: Finance | null): FinanceChartData[] => {
  return [
    {
      value: data?.debt?.value ?? 0,
      color: "#FF3B30", // Red
      text: `${data?.debt?.value ?? 0} ta`,
      price: data?.debt?.price ?? "",
      label: "Qarzdorlik :",
    },
    {
      value: data?.paid?.value ?? 0,
      color: "#34C759", // Green
      text: `${data?.paid?.value ?? 0} ta`,
      price: data?.paid?.price ?? "",
      label: "To'langan :",
    },
    {
      value: data?.warned?.value ?? 0,
      color: "#FF9500", // Orange
      text: `${data?.warned?.value ?? 0} ta`,
      price: data?.warned?.price ?? "",
      label: "Ogohlantirilgan :",
    },
  ];
};
