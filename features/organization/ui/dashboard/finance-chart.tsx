import { Colors } from "@/shared/constants/theme";
import { useThemeColors } from "@/shared/hooks/use-theme";
import { StyleSheet, Text, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { FinanceChartData } from "../../model/dashboard/types";

interface Props {
  data: { chartData: FinanceChartData[]; totalConsumer: number };
}
export const FinanceChart = ({ data }: Props) => {
  const theme = useThemeColors();

  // Sort data to ensure consistent rendering, though not strictly necessary if order is fixed
  // Adding a focus effect could also be nice, but let's stick to the core request first.

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.card,
          { backgroundColor: theme.card, shadowColor: theme.shadow },
        ]}
      >
        <Text style={[styles.title, { color: theme.text }]}>Hisob kitob</Text>

        <View style={styles.chartContainer}>
          <PieChart
            data={data.chartData}
            donut
            showGradient
            sectionAutoFocus
            radius={85}
            innerRadius={45}
            innerCircleColor={theme.card}
            centerLabelComponent={() => (
              <View style={styles.centerLabel}>
                <Text style={[styles.centerValue, { color: theme.text }]}>
                  {data.totalConsumer}
                </Text>
                <Text style={[styles.centerText, { color: theme.muted }]}>
                  Jami
                </Text>
              </View>
            )}
          />
        </View>

        <View style={styles.legendContainer}>
          {data.chartData.map((item, index) => (
            <PieChartLabel
              key={index}
              dotColor={item.color}
              label={item.label}
              count={item.text}
              price={item.price}
              theme={theme}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

interface LabelProps {
  theme: any;
  label: string;
  count: string;
  price: string;
  dotColor: string;
}

const PieChartLabel = ({
  theme,
  dotColor,
  label,
  count,
  price,
}: LabelProps) => {
  return (
    <View style={styles.legendItem}>
      <View style={styles.legendLeft}>
        <View style={[styles.dot, { backgroundColor: dotColor }]} />
        <Text style={[styles.legendLabel, { color: theme.muted }]}>
          {label.replace(" :", "")}
        </Text>
      </View>
      <View style={styles.legendRight}>
        <Text style={[styles.legendCount, { color: theme.text }]}>{count}</Text>
        <Text style={[styles.legendPrice, { color: Colors.primary }]}>
          {price}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  card: {
    padding: 20,
    borderRadius: 24,
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 24,
  },
  chartContainer: {
    alignItems: "center",
    marginBottom: 32,
    height: 160,
    justifyContent: "center",
  },
  centerLabel: {
    justifyContent: "center",
    alignItems: "center",
  },
  centerValue: {
    fontSize: 22,
    fontWeight: "bold",
  },
  centerText: {
    fontSize: 12,
  },
  legendContainer: {
    gap: 16,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  legendLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendLabel: {
    fontSize: 14,
    fontWeight: "500",
  },
  legendRight: {
    alignItems: "flex-end",
  },
  legendCount: {
    fontSize: 14,
    fontWeight: "600",
  },
  legendPrice: {
    fontSize: 12,
    fontWeight: "500",
  },
});
