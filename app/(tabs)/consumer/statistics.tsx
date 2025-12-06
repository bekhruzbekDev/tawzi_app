import { useStats } from "@/features/consumer/model/stats/use-stats";
import ConsumerDataChart from "@/features/consumer/ui/stats/chart-data";
import ConsumerStatsTopFilter from "@/features/consumer/ui/stats/top-filters";
import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";

export default function ConsumerStatisticsScreen() {
  const { filterDataChange, toggleDay, unitType } = useStats();

  const data: any[] = [
    {
      value: 120,
      label: "Янв",
      topLabelComponent: () => <Text style={styles.barTopLabel}>120</Text>,
      frontColor: "#22C55E",
    },
    {
      value: 800,
      label: "Фев",
      topLabelComponent: () => <Text style={styles.barTopLabel}>800</Text>,
      frontColor: "#22C55E",
    },
    {
      value: 185,
      label: "Март",
      topLabelComponent: () => <Text style={styles.barTopLabel}>185</Text>,
      frontColor: "#22C55E",
    },
    {
      value: 350,
      label: "Апр",
      topLabelComponent: () => <Text style={styles.barTopLabel}>350</Text>,
      frontColor: "#22C55E",
    },
    {
      value: 2100,
      label: "Май",
      topLabelComponent: () => <Text style={styles.barTopLabel}>2100</Text>,
      frontColor: "#22C55E",
    },
    {
      value: 1000,
      label: "Июнь",
      topLabelComponent: () => <Text style={styles.barTopLabel}>1000</Text>,
      frontColor: "#22C55E",
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ConsumerStatsTopFilter
        toggleDay={toggleDay}
        unitType={unitType}
        change={filterDataChange}
      />

      <Text style={styles.title}>Statistika</Text>

      <ConsumerDataChart data={data} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, alignItems: "center" },

  title: {
    alignSelf: "flex-start",
    fontSize: 28,
    fontWeight: "700",
    marginTop: 12,
  },

  barTopLabel: {
    width: 38,
    left: -6,
    top: -1,

    display: "flex",

    textAlign: "center",
    backgroundColor: "#d0d2d7bd",
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
    color: "#111827",
    fontSize: 10,
    fontWeight: "500",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    position: "absolute",
  },
});
