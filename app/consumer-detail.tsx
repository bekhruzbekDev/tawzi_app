import { ConsumerDetailHeader } from "@/features/organization/ui/consumers/detail-header";
import DetailMeterValues from "@/features/organization/ui/consumers/detail-meter-values";
import { Colors } from "@/shared/constants/theme";
import { useThemeColors } from "@/shared/hooks/use-theme";
import DynamicChart from "@/shared/ui/dynamic-chart";
import { PaymentSheet } from "@/widgets/payment-sheet/ui/payment-sheet";
import { Ionicons } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useRef } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function DetailScreen() {
  const theme = useThemeColors();
  const paymentSheetRef = useRef<BottomSheetModal>(null);

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
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <ScrollView
        style={[styles.container, { backgroundColor: theme.background }]}
        contentContainerStyle={{ paddingBottom: 100 }} // Extra padding for FAB
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}
      >
        <View style={[{ backgroundColor: theme.background }]}>
          <ConsumerDetailHeader />
        </View>

        <View style={{ paddingHorizontal: 16 }}>
          <DetailMeterValues />

          <View style={{ height: 24 }} />

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
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <Pressable
        style={({ pressed }) => [
          styles.fab,
          {
            backgroundColor: Colors.primary,
            opacity: pressed ? 0.8 : 1,
            shadowColor: theme.shadow,
          },
        ]}
        onPress={() => paymentSheetRef.current?.present()}
      >
        <Ionicons name="wallet-outline" size={24} color="white" />
        <Text style={styles.fabText}>To'lov</Text>
      </Pressable>

      <PaymentSheet ref={paymentSheetRef} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fab: {
    position: "absolute",
    bottom: 24,
    right: 24,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 30,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  fabText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
