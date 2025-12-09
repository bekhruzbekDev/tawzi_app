import { Colors } from "@/shared/constants/theme";
import { useThemeColors } from "@/shared/hooks/use-theme";
import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function ConsumerDetailPaymentTabs() {
  const router = useRouter();
  const theme = useThemeColors();
  // Static Mock Data
  const consumer = {
    name: "1-fabrika",
    phone: "+998 90 123 45 67",
  };

  const meters = [
    { serial_number: "EL-2023-001", type: "electric", value: 37000 },
    { serial_number: "GAZ-2023-099", type: "gas", value: 125000 },
    { serial_number: "SUV-2023-777", type: "water", value: -5000 },
    { serial_number: "EL-2023-002", type: "electric", value: 15000 },
  ];

  const [activeTab, setActiveTab] = useState<"pay" | "history">("pay");
  const has_billing = true; // DEMO: Change to false to hide payment section

  // Calculate total balance
  // Assuming 'value' is balance. Logic: Sum of all meter values.
  // If negative, it's debt.
  const totalBalance = meters.reduce(
    (acc, m) => acc + (Number(m.value) || 0),
    0
  );

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.card,
          shadowColor: theme.shadow,
          marginTop: 20,
          padding: 0,
          overflow: "hidden",
        },
      ]}
    >
      {/* Tabs */}
      <View style={[styles.tabContainer, { backgroundColor: theme.surface }]}>
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
              activeTab === "pay" ? { color: "white" } : { color: theme.muted },
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

      <View style={{ padding: 16 }}>
        {activeTab === "pay" ? (
          <PaymentForm theme={theme} />
        ) : (
          <HistoryList theme={theme} />
        )}
      </View>
    </View>
  );
}

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
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  backBtn: {
    padding: 8,
    marginLeft: -8,
  },
  scrollContent: {
    padding: 16,
    paddingTop: 0,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  userInfo: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  userName: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },
  userPhone: {
    fontSize: 14,
  },
  actionRow: {
    flexDirection: "row",
    gap: 8,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  balanceContainer: {
    marginTop: 20,
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    gap: 8,
  },
  balanceLabel: {
    fontSize: 14,
    fontWeight: "600",
  },
  balanceValueBig: {
    fontSize: 32,
    fontWeight: "800",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12,
  },
  meterCard: {
    width: 200,
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    marginRight: 12,
    justifyContent: "space-between",
    height: 100,
  },
  meterSerial: {
    fontWeight: "700",
    fontSize: 15,
    marginBottom: 4,
  },
  meterType: {
    fontSize: 13,
    fontWeight: "500",
  },
  meterLabel: {
    fontSize: 12,
    marginBottom: 2,
  },
  meterValue: {
    fontSize: 15,
    fontWeight: "700",
  },
  tabContainer: {
    flexDirection: "row",
    padding: 4,
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
