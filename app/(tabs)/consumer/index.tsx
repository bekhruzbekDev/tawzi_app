import ConsumerHeader from "@/features/consumer/ui/header";
import DetailMeterValues from "@/features/organization/ui/consumers/detail-meter-values";
import { useThemeColors } from "@/shared/hooks/use-theme";
import DynamicChart from "@/shared/ui/dynamic-chart";
import { ScrollView, StyleSheet } from "react-native";

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

const data = [
  {
    id: 1,
    name: "Elektr",
    totalUnit: "450 000 UZS",
    icon: "lightning-bolt",
    color: "#f59e0b", // Amber/Orange
    bg: "#fffbeb",
    subMeters: [
      { id: 101, serial: "00123456", value: "200 000 UZS" },
      { id: 102, serial: "00123457", value: "250 000 UZS" },
    ],
  },
  {
    id: 2,
    name: "Gaz",
    totalUnit: "35 000 UZS",
    icon: "fire",
    color: "#f97316", // Orange
    bg: "#fff7ed",
    subMeters: [{ id: 201, serial: "GZ-998811", value: "35 000 UZS" }],
  },
  {
    id: 3,
    name: "Suv",
    totalUnit: "120 000 UZS",
    icon: "water-outline",
    color: "#3b82f6", // Blue
    bg: "#eff6ff",
    subMeters: [],
  },
];
export default function ConsumerDashboard() {
  const theme = useThemeColors();
  return (
    <ScrollView
      style={[styles.screen, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <ConsumerHeader />
      {/* <ConsumerCurrentValue /> */}
      <DetailMeterValues data={data} />
      {/* <ConsumerMeterInfo /> */}
      <DynamicChart
        value="450 000 UZS"
        subValue="2 450 kW"
        icon="lightning-bolt"
        color="#f59e0b"
        bgColor="#fffbeb"
        data={electricData}
      />

      <DynamicChart
        value="35 000 UZS"
        subValue="90 m³"
        icon="fire"
        color="#f97316"
        bgColor="#fff7ed"
        data={gasData}
      />

      <DynamicChart
        value="120 000 UZS"
        subValue="120 m³"
        icon="water-outline"
        color="#3b82f6"
        bgColor="#eff6ff"
        data={waterData}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 32,
    gap: 16,
  },
});
