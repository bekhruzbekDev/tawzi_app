import { useStats } from "@/features/consumer/model/stats/use-stats";
import ConsumptionChart from "@/features/organization/ui/consumers/consumption-chart";
import { ConsumerDetailHeader } from "@/features/organization/ui/consumers/detail-header";
import { useThemeColors } from "@/shared/hooks/use-theme";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
const electricData = [
  { value: 120, label: "1" },
  { value: 210, label: "2" },
  { value: 150, label: "3" },
  { value: 320, label: "4" },
  { value: 100, label: "5" },
  { value: 80, label: "6" },
  { value: 450, label: "7" },
  { value: 380, label: "8" },
  { value: 600, label: "9" },
  { value: 620, label: "10" },
  { value: 780, label: "11" },
  { value: 800, label: "12" },
];
const gasData = [
  { value: 40, label: "1" },
  { value: 80, label: "2" },
  { value: 30, label: "3" },
  { value: 90, label: "4" },
  { value: 20, label: "5" },
  { value: 10, label: "6" },
  { value: 95, label: "7" },
  { value: 85, label: "8" },
  { value: 25, label: "9" },
];
const waterData = [
  { value: 15, label: "1" },
  { value: 25, label: "2" },
  { value: 10, label: "3" },
  { value: 30, label: "4" },
  { value: 12, label: "5" },
  { value: 8, label: "6" },
  { value: 35, label: "7" },
  { value: 28, label: "8" },
  { value: 14, label: "9" },
];
export default function ConsumerStatisticsScreen() {
  const { filterDataChange, toggleDay, unitType, data } = useStats();
  const theme = useThemeColors();
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* <ConsumerStatsTopFilter
        toggleDay={toggleDay}
        unitType={unitType}
        change={filterDataChange}
      /> */}
      <ConsumerDetailHeader />

      <ConsumptionChart
        title="Elektr"
        value="200 KW"
        subValue="+ 10% ga oshgan"
        icon="lightning-bolt"
        color="#f59e0b"
        bgColor="#fffbeb"
        data={electricData}
      />

      <ConsumptionChart
        title="Gaz"
        value="35 m³"
        subValue="-5 % ga tushgan"
        icon="fire"
        color="#f97316"
        bgColor="#fff7ed"
        data={gasData}
      />

      <ConsumptionChart
        title="Suv"
        value="120 m³"
        subValue="+10% ga oshgan"
        icon="water-outline"
        color="#3b82f6"
        bgColor="#eff6ff"
        data={waterData}
      />

      {/* <Text style={[styles.title, { color: theme.text }]}>Statistika</Text> */}

      {/* <ConsumerDataChart data={data} /> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    // alignItems: "center",
  },

  title: {
    alignSelf: "flex-start",
    fontSize: 28,
    fontWeight: "700",
    marginTop: 12,
  },
});
