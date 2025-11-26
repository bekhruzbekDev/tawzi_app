import { useStats } from "@/features/consumer/model/stats/use-stats";
import ConsumerDataChart from "@/features/consumer/ui/stats/chart-data";
import ConsumerStatsTopFilter from "@/features/consumer/ui/stats/top-filters";
import { useThemeColors } from "@/shared/hooks/use-theme";
import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";

export default function ConsumerStatisticsScreen() {
  const { filterDataChange, toggleDay, unitType, data } = useStats();
  const theme = useThemeColors();
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ConsumerStatsTopFilter
        toggleDay={toggleDay}
        unitType={unitType}
        change={filterDataChange}
      />

      <Text style={[styles.title, { color: theme.text }]}>Statistika</Text>

      <ConsumerDataChart data={data} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: "center",
  },

  title: {
    alignSelf: "flex-start",
    fontSize: 28,
    fontWeight: "700",
    marginTop: 12,
  },
});
