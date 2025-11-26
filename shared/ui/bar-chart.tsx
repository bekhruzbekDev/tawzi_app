import { Dimensions, StyleSheet, Text } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { useThemeColors } from "../hooks/use-theme";

interface Props {
  data: any[];
}
export default function CustomBarChart(props: Props) {
  const theme = useThemeColors();
  const screenWidth = Dimensions.get("window").width;
  const screenPadding = 0;
  const cardPadding = 0;
  const yAxisLabelWidth = 90;
  const chartWidth =
    screenWidth - screenPadding - cardPadding - yAxisLabelWidth;
  const { data } = props;

  const barData = data.flatMap((item) => [
    {
      value: item.v1,
      label: "",
      frontColor: "#2C80FF",
      topLabelComponent: () => (
        <Text style={styles.barTopLabel}>{item.v1}</Text>
      ),
    },
    {
      value: item.v2,
      label: item.label,
      frontColor: "#61C7FF",
      topLabelComponent: () => (
        <Text style={[styles.barTopLabel]}>{item.v2}</Text>
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
      //   showVerticalLines

      spacing={22}
      isAnimated
      xAxisLabelTextStyle={{ color: "#6B7280", fontSize: 12 }}
      yAxisTextStyle={{
        color: "#6B7280",
        fontSize: 12,
      }}
    />
  );
}

const styles = StyleSheet.create({
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
