import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";

interface Props {
  data: any[];
}
export default function ConsumerDataChart(props: Props) {
  const { data } = props;
  return (
    <View style={styles.chartCard}>
      <Text style={styles.axisLabel}>кB</Text>
      <View style={{ backgroundColor: "#fff", padding: 1, borderRadius: 10 }}>
        <BarChart
          data={data}
          width={330}
          height={300}
          barWidth={28}
          spacing={18}
          roundedTop
          showVerticalLines
          isAnimated
          xAxisLabelTextStyle={{ color: "#6B7280", fontSize: 12 }}
        />
      </View>

      {/* Legend / Tariff boxes */}
      <View style={styles.legendRow}>
        <View style={styles.legendItem}>
          <View style={styles.legendHeader}>
            <View style={[styles.dot, { backgroundColor: "#22C55E" }]} />
            <Text style={styles.legendTitle}>Тариф до</Text>
          </View>
          <Text style={styles.legendValue}>200 кВ</Text>
          <Text style={styles.legendPrice}>250 сум</Text>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F8FAFC" },
  container: { padding: 16, alignItems: "center" },
  toggleRow: { width: "100%", marginTop: 8, alignItems: "center" },

  title: {
    alignSelf: "flex-start",
    fontSize: 28,
    fontWeight: "700",
    marginTop: 12,
  },

  chartCard: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 12,
    marginTop: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 8,
  },

  axisLabel: { alignSelf: "flex-start", color: "#6B7280", marginBottom: 4 },

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

  legendRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  legendItem: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    padding: 10,
    borderRadius: 12,
    marginHorizontal: 4,
    alignItems: "flex-start",
  },
  legendHeader: { flexDirection: "row", alignItems: "center", marginBottom: 6 },
  dot: { width: 12, height: 12, borderRadius: 6, marginRight: 8 },
  legendTitle: { fontSize: 12, color: "#6B7280" },
  legendValue: { fontSize: 14, fontWeight: "700", marginTop: 4 },
  legendPrice: { fontSize: 12, color: "#6B7280" },
});
