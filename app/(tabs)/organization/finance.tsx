import DebtorsSummary from "@/features/organization/ui/finance/debtors-summary";
import { PaymentSheet } from "@/widgets/payment-sheet/ui/payment-sheet";

import { FinanceHeader } from "@/features/organization/ui/finance/finance-header";
import FinanceSummaryCard from "@/features/organization/ui/finance/finance-summary-card";
import { Colors } from "@/shared/constants/theme";
import { useThemeColors } from "@/shared/hooks/use-theme";
import DynamicChart from "@/shared/ui/dynamic-chart";
import { Ionicons } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useRef, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function FinanceScreen() {
  const theme = useThemeColors();
  const [unitType, setUnitType] = useState<"monthly" | "yearly">("monthly");
  const [date, setDate] = useState(new Date());
  const paymentSheetRef = useRef<BottomSheetModal>(null);

  // Mock Data Generators based on View Type
  const getMockData = (baseFactor: number) => {
    if (unitType === "monthly") {
      // Daily data for a month (mocking just few points for visual)
      return [
        { label: "1", value: baseFactor * 0.8 },
        { label: "5", value: baseFactor * 1.2 },
        { label: "10", value: baseFactor * 0.9 },
        { label: "15", value: baseFactor * 1.5 },
        { label: "20", value: baseFactor * 1.1 },
        { label: "25", value: baseFactor * 1.3 },
        { label: "30", value: baseFactor * 1.0 },
      ];
    } else {
      // Monthly data for a year
      return [
        { label: "Jan", value: baseFactor * 10 },
        { label: "Feb", value: baseFactor * 12 },
        { label: "Mar", value: baseFactor * 11 },
        { label: "Apr", value: baseFactor * 14 },
        { label: "May", value: baseFactor * 13 },
        { label: "Jun", value: baseFactor * 15 },
        { label: "Jul", value: baseFactor * 16 },
        { label: "Aug", value: baseFactor * 14 },
        { label: "Sep", value: baseFactor * 15 },
        { label: "Oct", value: baseFactor * 13 },
        { label: "Nov", value: baseFactor * 12 },
        { label: "Dec", value: baseFactor * 11 },
      ];
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={[styles.container, { backgroundColor: theme.background }]}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]} // Make header sticky
      >
        <View style={{ backgroundColor: theme.background, paddingBottom: 8 }}>
          <FinanceHeader
            unitType={unitType}
            setUnitType={setUnitType}
            date={date}
            setDate={setDate}
          />
        </View>

        {/* Summary Cards */}
        <View style={styles.section}>
          <FinanceSummaryCard
            type="electric"
            title="Elektr"
            balance="24 500 000 UZS"
            debt="- 1 200 000 UZS"
          />
          <FinanceSummaryCard
            type="gas"
            title="Gaz"
            balance="12 400 000 UZS"
            debt="- 0 UZS"
          />
          <FinanceSummaryCard
            type="water"
            title="Suv"
            balance="5 600 000 UZS"
            debt="- 450 000 UZS"
          />
        </View>

        {/* Debtors Summary */}
        <DebtorsSummary count={145} totalDebt="145 000 000 UZS" />

        {/* Charts */}
        <View style={styles.section}>
          <DynamicChart
            value="Elektr tushumi"
            data={getMockData(150000)}
            color="#f59e0b"
            icon="lightning-bolt"
            bgColor="#fffbeb"
          />
          <DynamicChart
            value="Gaz tushumi"
            data={getMockData(80000)}
            color="#f97316"
            icon="fire"
            bgColor="#fff7ed"
          />
          <DynamicChart
            value="Suv tushumi"
            data={getMockData(40000)}
            color="#3b82f6"
            icon="water-outline"
            bgColor="#eff6ff"
          />
        </View>

        <View style={{ height: 40 }} />
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

      <PaymentSheet ref={paymentSheetRef} isConsumer={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingTop: 60,
  },
  section: {
    marginBottom: 8,
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
