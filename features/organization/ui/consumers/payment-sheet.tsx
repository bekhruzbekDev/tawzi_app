import { Colors } from "@/shared/constants/theme";
import { useThemeColors } from "@/shared/hooks/use-theme";
import Feather from "@expo/vector-icons/Feather";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { forwardRef, useCallback, useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export const PaymentSheet = forwardRef<BottomSheetModal>((props, ref) => {
  const theme = useThemeColors();
  const snapPoints = useMemo(() => ["60%", "90%"], []);
  const [activeTab, setActiveTab] = useState<"pay" | "history">("pay");

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
        pressBehavior="close"
      />
    ),
    []
  );

  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      backgroundStyle={{ backgroundColor: theme.surface }}
      handleIndicatorStyle={{ backgroundColor: theme.muted }}
    >
      <BottomSheetView style={styles.contentContainer}>
        {/* Header Title */}
        <Text style={[styles.sheetTitle, { color: theme.text }]}>
          To'lovlar
        </Text>

        {/* Tabs */}
        <View style={[styles.tabContainer, { backgroundColor: theme.card }]}>
          <Pressable
            style={[
              styles.tab,
              activeTab === "pay" && { backgroundColor: Colors.primary },
            ]}
            onPress={() => setActiveTab("pay")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "pay"
                  ? { color: "white" }
                  : { color: theme.muted },
              ]}
            >
              To'lov qilish
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.tab,
              activeTab === "history" && {
                backgroundColor: Colors.primary,
              },
            ]}
            onPress={() => setActiveTab("history")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "history"
                  ? { color: "white" }
                  : { color: theme.muted },
              ]}
            >
              To'lovlar tarixi
            </Text>
          </Pressable>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          <View style={{ marginTop: 20 }}>
            {activeTab === "pay" ? (
              <PaymentForm theme={theme} />
            ) : (
              <HistoryList theme={theme} />
            )}
          </View>
        </ScrollView>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

// Sub-components

const PaymentForm = ({ theme }: { theme: any }) => {
  return (
    <View style={{ gap: 16 }}>
      <View>
        <Text style={[styles.label, { color: theme.muted }]}>
          Hisoblagich turi
        </Text>
        {/* Mock Dropdown for Types */}
        <View style={[styles.input, { borderColor: theme.border }]}>
          <Text style={{ color: theme.text }}>Elektr / Gaz / Suv</Text>
          <Feather name="chevron-down" size={20} color={theme.muted} />
        </View>
      </View>
      <View>
        <Text style={[styles.label, { color: theme.muted }]}>
          Hisoblagich raqami
        </Text>
        <View style={[styles.input, { borderColor: theme.border }]}>
          <Text style={{ color: theme.text }}>Tanlang</Text>
          <Feather name="chevron-down" size={20} color={theme.muted} />
        </View>
      </View>
      <View>
        <Text style={[styles.label, { color: theme.muted }]}>Summa</Text>
        <View style={[styles.input, { borderColor: theme.border }]}>
          <TextInput
            placeholder="0"
            placeholderTextColor={theme.muted}
            style={{ flex: 1, color: theme.text, fontSize: 16 }}
            keyboardType="numeric"
          />
        </View>
      </View>

      <Pressable style={[styles.payBtn, { backgroundColor: Colors.primary }]}>
        <Text style={styles.payBtnText}>Qo'shish</Text>
      </Pressable>
    </View>
  );
};

const HistoryList = ({ theme }: { theme: any }) => {
  const history = [
    { id: 1, date: "2023-10-25 14:30", amount: 50000, type: "electric" },
    { id: 2, date: "2023-10-20 09:15", amount: 120000, type: "gas" },
    { id: 3, date: "2023-09-15 11:00", amount: 35000, type: "water" },
  ];
  return (
    <View style={{ gap: 12 }}>
      {history.map((item) => (
        <View
          key={item.id}
          style={[styles.historyItem, { borderColor: theme.border }]}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <View
              style={[
                styles.historyIcon,
                { backgroundColor: getMeterColor(item.type) + "20" },
              ]}
            >
              {getMeterIcon(item.type, 18)}
            </View>
            <View>
              <Text style={{ color: theme.text, fontWeight: "600" }}>
                {translateType(item.type)}
              </Text>
              <Text style={{ color: theme.muted, fontSize: 12 }}>
                {item.date}
              </Text>
            </View>
          </View>
          <Text style={{ color: "#2FBF68", fontWeight: "700" }}>
            +{item.amount.toLocaleString()} so'm
          </Text>
        </View>
      ))}
    </View>
  );
};

// Helpers
const getMeterColor = (type: string) => {
  switch (type) {
    case "electric":
      return "#F6A623"; // Used orange/yellow in design often
    case "gas":
      return "#ef4444";
    case "water":
      return "#3b82f6";
    default:
      return "#999";
  }
};

const getMeterIcon = (type: string, size = 16) => {
  switch (type) {
    case "electric":
      return <Text style={{ fontSize: size }}>⚡️</Text>;
    case "gas":
      return <Text style={{ fontSize: size }}>🔥</Text>;
    case "water":
      return <Text style={{ fontSize: size }}>💧</Text>;
    default:
      return null;
  }
};
const translateType = (type: string) => {
  switch (type) {
    case "electric":
      return "Elektr";
    case "gas":
      return "Gaz";
    case "water":
      return "Suv";
    default:
      return type;
  }
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sheetTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
  },
  tabContainer: {
    flexDirection: "row",
    padding: 4,
    borderRadius: 12,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  tabText: {
    fontWeight: "600",
    fontSize: 14,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  payBtn: {
    height: 48,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  payBtnText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  historyItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  historyIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
});
