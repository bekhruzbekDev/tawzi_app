import { Colors } from "@/shared/constants/theme";
import { useThemeColors } from "@/shared/hooks/use-theme";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface HistoryItemProps {
  date: string;
  amount: string;
}

export const HistoryItem = ({ date, amount }: HistoryItemProps) => {
  const theme = useThemeColors();

  return (
    <View style={[styles.container, { backgroundColor: theme.card }]}>
      <View style={styles.row}>
        <Text style={[styles.label, { color: theme.text, opacity: 0.6 }]}>
          To'lov sanasi
        </Text>
        <Text style={[styles.value, { color: theme.text }]}>{date}</Text>
      </View>
      <View style={[styles.row, { marginTop: 12 }]}>
        <Text style={[styles.label, { color: theme.text, opacity: 0.6 }]}>
          To'lov summasi
        </Text>
        <View style={styles.amountBadge}>
          <Text style={styles.amountText}>{amount}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
  },
  value: {
    fontSize: 14,
    fontWeight: "600",
  },
  amountBadge: {
    backgroundColor: Colors.primary + "20", // 20 hex for low opacity
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  amountText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: "700",
  },
});
