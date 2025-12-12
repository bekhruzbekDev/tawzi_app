import { ConsumerDetailHeader } from "@/features/organization/ui/consumers/detail-header";
import { Colors } from "@/shared/constants/theme";
import { useThemeColors } from "@/shared/hooks/use-theme";
import ConsumersDetailCharts from "@/widgets/consumer-detail-charts/ui/consumers-charts";
import DetailMeterValues from "@/widgets/consumer-devices-info/ui/detail-meter-values";
import { PaymentSheet } from "@/widgets/payment-sheet/ui/payment-sheet";
import { Ionicons } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useLocalSearchParams } from "expo-router";
import { useRef, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function DetailScreen() {
  const theme = useThemeColors();
  const [date, setDate] = useState(new Date());
  const paymentSheetRef = useRef<BottomSheetModal>(null);
  const params = useLocalSearchParams();
  const id: string | null = String(params.id);
  const [filter_type, setFilterType] = useState<"monthly" | "yearly">(
    "monthly"
  );

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <ScrollView
        style={[styles.container, { backgroundColor: theme.background }]}
        contentContainerStyle={{ paddingBottom: 100 }} // Extra padding for FAB
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}
      >
        <View style={[{ backgroundColor: theme.background }]}>
          <ConsumerDetailHeader
            onFilterChange={setFilterType}
            filter_type={filter_type}
            setDate={setDate}
          />
        </View>

        <View style={{ paddingHorizontal: 16, gap: 24 }}>
          <DetailMeterValues id={id} filter_type={filter_type} date={date} />

          <ConsumersDetailCharts
            id={id}
            filter_type={filter_type}
            date={date}
          />
        </View>
      </ScrollView>

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
