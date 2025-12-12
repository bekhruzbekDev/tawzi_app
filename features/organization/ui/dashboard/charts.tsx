import { useThemeColors } from "@/shared/hooks/use-theme";
import DynamicChart from "@/shared/ui/dynamic-chart";
import { StyleSheet, View } from "react-native";
import { useOrganizationChartData } from "../../model/dashboard/use-chart";
import { OrganizationChartSkeleton } from "./charts-skeleton";

interface Props {
  filter_type: "electric" | "gas" | "water";
}
export const OrganizationCharts = ({ filter_type }: Props) => {
  const theme = useThemeColors();
  const { chartData, isLoading, setDate, date } =
    useOrganizationChartData(filter_type);

  if (isLoading) {
    return <OrganizationChartSkeleton />;
  }

  return (
    <View style={styles.container}>
      <DynamicChart
        value="Resurs iste'moli"
        // subValue="2 450 kW"
        // icon="lightning-bolt"
        color="#f59e0b"
        bgColor="#fffbeb"
        // data={electricData}
        multiple
        multiData={chartData}
        infoLabel={true}
        dateFilter={true}
        onChangeDate={setDate}
        date={date}
      />
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
