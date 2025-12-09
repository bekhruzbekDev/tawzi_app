import { useThemeColors } from "@/shared/hooks/use-theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  type: "electric" | "gas" | "water";
  title: string;
  balance: string;
  debt: string;
};

export default function FinanceSummaryCard({
  type,
  title,
  balance,
  debt,
}: Props) {
  const theme = useThemeColors();

  const getStyle = (type: string) => {
    switch (type) {
      case "electric":
        return {
          icon: "lightning-bolt" as const,
          color: "#f59e0b",
          bg: "#fffbeb",
        };
      case "gas":
        return {
          icon: "fire" as const,
          color: "#f97316",
          bg: "#fff7ed",
        };
      case "water":
        return {
          icon: "water-outline" as const,
          color: "#3b82f6",
          bg: "#eff6ff",
        };
      default:
        return {
          icon: "lightning-bolt" as const,
          color: "#f59e0b",
          bg: "#fffbeb",
        };
    }
  };

  const styleConfig = getStyle(type);

  return (
    <View style={[styles.card, { backgroundColor: theme.card }]}>
      <View style={styles.leftSide}>
        <View style={[styles.iconBox, { backgroundColor: styleConfig.bg }]}>
          <MaterialCommunityIcons
            name={styleConfig.icon}
            size={24}
            color={styleConfig.color}
          />
        </View>
        <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
      </View>

      <View style={styles.rightSide}>
        <Text style={[styles.balance, { color: theme.text }]}>{balance}</Text>
        <Text style={styles.debt}>{debt}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderRadius: 20,
    marginBottom: 12,
    // Shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  leftSide: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  rightSide: {
    alignItems: "flex-end",
  },
  balance: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },
  debt: {
    fontSize: 13,
    fontWeight: "500",
    color: "#ef4444", // Red for debt
  },
});
