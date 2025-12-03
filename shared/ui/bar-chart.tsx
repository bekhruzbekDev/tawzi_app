import { Dimensions, StyleSheet, Text } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { useThemeColors } from "../hooks/use-theme";

interface Props {
  data: any[];
}

// Utility function to format large numbers
const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return num.toString();
};

export default function CustomBarChart(props: Props) {
  const theme = useThemeColors();
  const screenWidth = Dimensions.get("window").width;
  const screenPadding = 0;
  const cardPadding = 0;
  const yAxisLabelWidth = 90;
  const chartWidth =
    screenWidth - screenPadding - cardPadding - yAxisLabelWidth;
  const { data } = props;

  // Find max value to determine appropriate spacing and scaling
  const maxValue = Math.max(
    ...data.flatMap((item) => [item.v1, item.v2])
  );

  const barData = data.flatMap((item) => [
    {
      value: item.v1,
      label: "",
      frontColor: "#2C80FF",
      topLabelComponent: () => (
        <Text style={styles.barTopLabel}>{formatNumber(item.v1)}</Text>
      ),
    },
    {
      value: item.v2,
      label: item.label,
      frontColor: "#61C7FF",
      topLabelComponent: () => (
        <Text style={[styles.barTopLabel]}>{formatNumber(item.v2)}</Text>
      ),
    },
  ]);

  return (
    <BarChart
      data={barData}
      width={chartWidth}
      barWidth={20}
      barBorderTopLeftRadius={6}
      barBorderTopRightRadius={6}
      spacing={22}
      isAnimated
      xAxisLabelTextStyle={{ color: "#6B7280", fontSize: 12 }}
      yAxisTextStyle={{
        color: "#6B7280",
        fontSize: 12,
      }}
      noOfSections={5}
      maxValue={maxValue}
      formatYLabel={(value) => formatNumber(Number(value))}
      yAxisOffset={0}
      dashWidth={0}
      showYAxisIndices={false}
    />
  );
}

const styles = StyleSheet.create({
  barTopLabel: {
    minWidth: 40,
    left: -10,
    top: -18,
    textAlign: "center",
    backgroundColor: "#d0d2d7bd",
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 4,
    color: "#111827",
    fontSize: 8.5,
    fontWeight: "600",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 1.5,
    elevation: 1,
  },
});
