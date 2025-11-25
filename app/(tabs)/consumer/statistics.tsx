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
      topLabelComponent: () => <Text style={styles.topLabel}>547 кВ</Text>,
      frontColor: "#22C55E",
    },
    {
      value: 800,
      label: "Фев",
      topLabelComponent: () => <Text style={styles.topLabel}>2 010 кВ</Text>,
      frontColor: "#22C55E",
    },
    {
      value: 185,
      label: "Март",
      topLabelComponent: () => <Text style={styles.topLabel}>185 кВ</Text>,
      frontColor: "#22C55E",
    },
    {
      value: 350,
      label: "Апр",
      topLabelComponent: () => <Text style={styles.topLabel}>685 кВ</Text>,
      frontColor: "#22C55E",
    },
    {
      value: 2100,
      label: "Май",
      topLabelComponent: () => <Text style={styles.topLabel}>4 650 кВ</Text>,
      frontColor: "#22C55E",
    },
    {
      value: 1000,
      label: "Июнь",
      topLabelComponent: () => <Text style={styles.topLabel}>2 120 кВ</Text>,
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

  topLabel: {
    backgroundColor: "#fff",
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 8,
    color: "#111827",
    fontSize: 12,
    overflow: "hidden",
    elevation: 2,
  },
});
