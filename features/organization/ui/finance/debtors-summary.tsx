import { useThemeColors } from "@/shared/hooks/use-theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  count: number;
  totalDebt: string;
};

export default function DebtorsSummary({ count, totalDebt }: Props) {
  const theme = useThemeColors();

  return (
    <View style={[styles.card, { backgroundColor: theme.card }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>Qarzdorlar</Text>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name="alert-circle-outline"
            size={20}
            color="#ef4444"
          />
        </View>
      </View>

      <View style={styles.content}>
        <View>
          <Text style={[styles.label, { color: theme.muted }]}>Soni</Text>
          <Text style={[styles.value, { color: theme.text }]}>{count} ta</Text>
        </View>
        <View style={styles.separator} />
        <View>
          <Text style={[styles.label, { color: theme.muted }]}>
            Jami qarzdorlik
          </Text>
          <Text style={styles.debtValue}>{totalDebt}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: "#fee2e2",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  label: {
    fontSize: 12,
    marginBottom: 4,
    fontWeight: "500",
  },
  value: {
    fontSize: 20,
    fontWeight: "700",
  },
  debtValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "#ef4444",
  },
  separator: {
    width: 1,
    height: 40,
    backgroundColor: "#E5E7EB",
  },
});
