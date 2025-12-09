import { useThemeColors } from "@/shared/hooks/use-theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";

type Props = {
  title: string;
  data: { value: number; label: string }[];
  color: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  bgColor?: string;
};

export default function FinanceChart({
  title,
  data,
  color,
  icon,
  bgColor,
}: Props) {
  const theme = useThemeColors();
  const screenWidth = Dimensions.get("window").width;
  const chartWidth = screenWidth - 70;

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
        {(item.value / 1000).toFixed(0)}k
      </Text>
    ),
  }));

  const maxValue = Math.max(...data.map((d) => d.value)) * 1.2;

  return (
    <View style={[styles.card, { backgroundColor: theme.card }]}>
      <View style={styles.header}>
        <View
          style={[styles.iconBox, { backgroundColor: bgColor || color + "20" }]}
        >
          <MaterialCommunityIcons name={icon} size={24} color={color} />
        </View>
        <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
      </View>

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
          yAxisTextStyle={{ color: theme.muted, fontSize: 10 }}
          xAxisLabelTextStyle={{ color: theme.muted, fontSize: 10 }}
          height={180}
          width={chartWidth}
          initialSpacing={10}
          spacing={14}
          maxValue={maxValue}
          hideYAxisText={false}
          // @ts-ignore
          formatYLabel={(label) => `${parseInt(label) / 1000}k`}
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 20,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
  },
  chartContainer: {
    alignItems: "center",
    marginTop: 8,
  },
});
