import ConsumptionChart from "@/features/organization/ui/consumers/consumption-chart";
import { ConsumerDetailHeader } from "@/features/organization/ui/consumers/detail-header";
import DetailMeterValues from "@/features/organization/ui/consumers/detail-meter-values";
import { useThemeColors } from "@/shared/hooks/use-theme";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";

export default function DetailScreen() {
  const router = useRouter();
  const theme = useThemeColors();

  // Mock Data for Charts
  const electricData = [
    { value: 120, label: "1" },
    { value: 210, label: "2" },
    { value: 150, label: "3" },
    { value: 320, label: "4" },
    { value: 100, label: "5" },
    { value: 80, label: "6" },
    { value: 450, label: "7" },
    { value: 380, label: "8" },
    { value: 600, label: "9" },
    { value: 620, label: "10" },
    { value: 780, label: "11" },
    { value: 800, label: "12" },
  ];
  const gasData = [
    { value: 40, label: "1" },
    { value: 80, label: "2" },
    { value: 30, label: "3" },
    { value: 90, label: "4" },
    { value: 20, label: "5" },
    { value: 10, label: "6" },
    { value: 95, label: "7" },
    { value: 85, label: "8" },
    { value: 25, label: "9" },
  ];
  const waterData = [
    { value: 15, label: "1" },
    { value: 25, label: "2" },
    { value: 10, label: "3" },
    { value: 30, label: "4" },
    { value: 12, label: "5" },
    { value: 8, label: "6" },
    { value: 35, label: "7" },
    { value: 28, label: "8" },
    { value: 14, label: "9" },
  ];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
      stickyHeaderIndices={[0]}
    >
      <View style={[{ backgroundColor: theme.background }]}>
        <ConsumerDetailHeader />
      </View>

      <View style={{ paddingHorizontal: 16 }}>
        <DetailMeterValues />

        <View style={{ height: 24 }} />

        <ConsumptionChart
          title="Elektr"
          value="450 000 UZS"
          subValue="2 450 kW"
          icon="lightning-bolt"
          color="#f59e0b"
          bgColor="#fffbeb"
          data={electricData}
        />

        <ConsumptionChart
          title="Gaz"
          value="35 000 UZS"
          subValue="90 m³"
          icon="fire"
          color="#f97316"
          bgColor="#fff7ed"
          data={gasData}
        />

        <ConsumptionChart
          title="Suv"
          value="120 000 UZS"
          subValue="120 m³"
          icon="water-outline"
          color="#3b82f6"
          bgColor="#eff6ff"
          data={waterData}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
