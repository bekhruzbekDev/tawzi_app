import { useThemeColors } from "@/shared/hooks/use-theme";
import React, { useMemo } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";

interface Props {
  data: any[];
}
export default function ConsumerDataChart(props: Props) {
  const { data } = props;
  const theme = useThemeColors();
  const { maxValue, noOfSections, stepValue } = useMemo(() => {
    const maxVal = Math.max(...data.map((item) => item.value));
    const calculatedStep = Math.ceil(maxVal / 5 / 100) * 100;
    const stepValue = Math.max(calculatedStep, 100);
    const maxValue = Math.ceil((maxVal * 1.1) / stepValue) * stepValue;
    const noOfSections = maxValue / stepValue;
    return { maxValue, noOfSections, stepValue };
  }, [data]);

  const screenWidth = Dimensions.get("window").width;
  const screenPadding = 32;
  const cardPadding = 24;
  const yAxisLabelWidth = 40;
  const chartWidth =
    screenWidth - screenPadding - cardPadding - yAxisLabelWidth;

  const calculatedBarWidth = Math.max(
    18,
    Math.min(28, Math.floor(chartWidth / Math.max(data.length, 6)) - 8)
  );
  const chartSpacing = Math.min(
    14,
    Math.max(10, Math.floor(calculatedBarWidth / 2))
  );
  // --- Logika tugadi ---

  return (
    <View style={[styles.chartCard,{backgroundColor:theme.card,}]}>
      <Text style={styles.axisLabel}>кB</Text>

      <BarChart
        data={data}
        width={chartWidth}
        height={330}
        barWidth={calculatedBarWidth}
        spacing={chartSpacing}
        // Asosiy logikalar (o'zgarishsiz)
        maxValue={maxValue}
        noOfSections={noOfSections}
        yAxisTextStyle={{ color: "#6B7280", fontSize: 10 }}
        yAxisLabelWidth={yAxisLabelWidth}
        rulesType="dashed"
        rulesColor="#E5E7EB"
        // --- TUZATISH: Mana shu yerda prop nomlari o'zgartirildi ---
        barBorderTopLeftRadius={6} // 'topLeftCornerRadius' emas
        barBorderTopRightRadius={6} // 'topRightCornerRadius' emas
        showVerticalLines
        isAnimated
        xAxisLabelTextStyle={{ color: "#6B7280", fontSize: 12 }}
      />

      {/* Legend / Tariff boxes (o'zgarishsiz) */}
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
  chartCard: {
    width: "100%",
    
    borderRadius: 16,
    padding: 12,
    paddingBottom: 16,
    marginTop: 12,
    alignItems: "center",
    shadowRadius: 8,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { height: 2, width: 0 },
  },
  axisLabel: { alignSelf: "flex-start", color: "#6B7280", marginBottom: 4 },
  legendRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
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
