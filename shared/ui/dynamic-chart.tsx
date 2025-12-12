import { useThemeColors } from "@/shared/hooks/use-theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { DateSheetFilter } from "./date-sheet-filter";

type Props = {
  value: string;
  subValue?: string;
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
  color: string;
  bgColor: string;
  data?: { value: number; label: string }[];
  yAxisLabelSuffix?: string;
  multiple?: boolean;
  multiData?: {
    v1: number;
    v2: number;
    label: string;
    v1Color: string;
    v2Color: string;
    v2Label?: string;
    v1Label?: string;
  }[];
  infoLabel?: boolean;
  dateFilter?: boolean;
  onChangeDate?: (date: Date) => void;
  date?: Date;
};

export default function DynamicChart(props: Props) {
  const {
    bgColor,
    data,
    icon,
    color,
    subValue,

    value,
    yAxisLabelSuffix,
    multiple,
    multiData,
    infoLabel,
    dateFilter,
    onChangeDate,
    date,
  } = props;
  const theme = useThemeColors();
  const screenWidth = Dimensions.get("window").width;
  // Padding: Screen(16*2) + Card(16*2) = 64
  // Extra small buffer to prevent cut-off: 70
  const chartWidth = screenWidth - 70;

  // Map data to match gifted-charts format
  const chartData = data?.map((item) => ({
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

  const multiChartData = multiData?.flatMap((item) => [
    {
      value: item.v1,
      label: "",
      frontColor: item.v1Color,
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
          {item.v1}
        </Text>
      ),
    },
    {
      value: item.v2,
      label: item.label,
      frontColor: item.v2Color,
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
          {item.v2}
        </Text>
      ),
    },
  ]);

  // Max value for Y-axis scaling logic if needed, but library handles it
  const maxValue = multiData
    ? Math.max(...multiData?.map((d) => (d?.v1 > d?.v2 ? d?.v1 : d?.v2))) * 1.2
    : data
    ? Math.max(...data?.map((d) => d?.value)) * 1.2
    : 0;

  const handleDateChange = (newDate: Date) => {
    onChangeDate?.(newDate);
  };

  return (
    <View style={[styles.card, { backgroundColor: theme.card }]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          {icon && (
            <View style={[styles.iconBox, { backgroundColor: bgColor }]}>
              <MaterialCommunityIcons name={icon} size={24} color={color} />
            </View>
          )}
          <View>
            <Text style={[styles.value, { color: theme.text }]}>{value}</Text>
            {subValue && (
              <Text style={[styles.subValue, { color: color }]}>
                {subValue}
              </Text>
            )}
          </View>
        </View>
        <View style={styles.headerRight}>
          {dateFilter && (
            <DateSheetFilter
              handleDateChange={handleDateChange}
              date={date}
              unitType={"monthly"}
            />
          )}
        </View>
      </View>

      {/* Chart */}
      <View style={styles.chartContainer}>
        <BarChart
          data={multiple ? multiChartData : chartData}
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
          xAxisLabelTextStyle={[
            { color: theme.muted, fontSize: 10 },
            multiple ? styles.xAxisLabel : {},
          ]}
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
          yAxisLabelSuffix={yAxisLabelSuffix}
          maxValue={maxValue}
        />
      </View>
      {infoLabel && (
        <View style={[styles.infoLabel]}>
          <View
            style={[styles.dot, { backgroundColor: multiData?.[0]?.v1Color }]}
          />
          <Text style={[{ color: theme.text }]}>{multiData?.[0]?.v1Label}</Text>
          <View
            style={[styles.dot, { backgroundColor: multiData?.[0]?.v2Color }]}
          />
          <Text style={[{ color: theme.text }]}>{multiData?.[0]?.v2Label}</Text>
        </View>
      )}
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
    alignItems: "center",
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  value: {
    fontSize: 18,
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
  xAxisLabel: {
    position: "absolute",
    left: -4,
  },
  dot: {
    width: 20,
    height: 20,
    borderRadius: 5,
    // backgroundColor: "#2C80FF",
  },
  infoLabel: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginTop: 10,
  },
});
