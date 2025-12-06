import { useThemeColors } from "@/shared/hooks/use-theme";
import CustomBarChart from "@/shared/ui/bar-chart";
import { StyleSheet, Text, View } from "react-native";
import { useOrganizationChartData } from "../../model/dashboard/use-chart";
import { OrganizationChartSkeleton } from "./charts-skeleton";


export const OrganizationCharts = () => {
  const theme = useThemeColors();
  const {chartData,isLoading} = useOrganizationChartData();

  if (isLoading) {
    return <OrganizationChartSkeleton />;
  }

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.barChart,
          { backgroundColor: theme.card, shadowColor: theme.shadow },
        ]}
      >
        <Text style={[styles.chartTitle, { color: theme.text }]}>
          Resurst iste'moli
        </Text>
        <CustomBarChart data={chartData} />
        <View style={[styles.infoLabel]}>
          <View style={styles.dot} />
          <Text style={[{ color: theme.text }]}>kiruvchi</Text>
          <View style={[styles.dot, { backgroundColor: "#61C7FF" }]} />
          <Text style={[{ color: theme.text }]}>Chiquvchi</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  barChart: {
    padding: 16,
    paddingTop: 24,
    borderRadius: 16,
    shadowOffset: { height: 0.1, width: 0 },
    marginBottom: 16,
  },
  dot: {
    width: 20,
    height: 20,
    borderRadius: 5,
    backgroundColor: "#2C80FF",
  },
  infoLabel: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  chartTitle: {
    marginBottom: 10,
    fontSize: 18,
    fontWeight: 500,
  },
});
