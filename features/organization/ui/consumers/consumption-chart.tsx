import { useThemeColors } from "@/shared/hooks/use-theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";

type Props = {
  title: string;
  value: string;
  subValue: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  color: string;
  bgColor: string;
  data: { value: number; label: string }[];
};

export default function ConsumptionChart({
  title,
  value,
  subValue,
  icon,
  color,
  bgColor,
  data,
}: Props) {
  const theme = useThemeColors();
  const screenWidth = Dimensions.get("window").width;
  // Padding: Screen(16*2) + Card(16*2) = 64
  // Extra small buffer to prevent cut-off: 70
  const chartWidth = screenWidth - 70;

  // Map data to match gifted-charts format
  const chartData = data.map((item) => ({
    value: item.value,
    label: item.label,
    frontColor: color,
    topLabelComponent: () => (
      <Text
        style={{
          fontSize: 10,
          color: theme.muted,
          marginBottom: 4,
          width: 30,
          textAlign: "center",
        }}
      >
        {item.value}
      </Text>
    ),
  }));

  // Max value for Y-axis scaling logic if needed, but library handles it
  const maxValue = Math.max(...data.map((d) => d.value)) * 1.2;

  return (
    <View style={[styles.card, { backgroundColor: theme.card }]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={[styles.iconBox, { backgroundColor: bgColor }]}>
            <MaterialCommunityIcons name={icon} size={24} color={color} />
          </View>
          <View>
            <Text style={[styles.value, { color: theme.text }]}>{value}</Text>
            <Text style={[styles.subValue, { color: color }]}>{subValue}</Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          {/* History removed as requested */}
        </View>
      </View>

      {/* Chart */}
      <View style={styles.chartContainer}>
        <BarChart
          data={chartData}
          barWidth={20}
          noOfSections={4}
          barBorderTopLeftRadius={6}
          barBorderTopRightRadius={6}
          frontColor={color}
          yAxisThickness={0}
          xAxisThickness={0}
          rulesColor={theme.border}
          rulesType="solid"
          hideRules={false}
          yAxisTextStyle={{ color: theme.muted, fontSize: 10 }}
          xAxisLabelTextStyle={{ color: theme.muted, fontSize: 10 }}
          height={180}
          width={chartWidth}
          initialSpacing={10}
          spacing={14}
          // Customizing Y-Axis to be on right side is tricky in some versions,
          // usually standard is left. Let's keep valid standard left for now or check docs.
          // Image shows Y-labels on RIGHT.
          // gifted-charts supports `yAxisLabelContainerStyle`.
          // For now standard left is safer for implementation speed.
          hideYAxisText={false}
          yAxisLabelSuffix={subValue.includes("m") ? "m³" : ""}
          maxValue={maxValue}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    // Shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  headerLeft: {
    flexDirection: "row",
    gap: 12,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  value: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 2,
  },
  subValue: {
    fontSize: 14,
    fontWeight: "600",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  historyText: {
    fontSize: 14,
    fontWeight: "500",
    marginRight: 2,
  },
  chartContainer: {
    alignItems: "center",
    marginTop: 8,
  },
});
