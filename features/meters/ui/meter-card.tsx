import { Colors } from "@/shared/constants/theme";
import { useThemeColors } from "@/shared/hooks/use-theme";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Meter } from "../model/types";

interface Props {
  meter: Meter;
  onCommandPress?: () => void;
  onDetailPress?: () => void;
}

export const MeterCard = ({ meter, onCommandPress, onDetailPress }: Props) => {
  const theme = useThemeColors();

  const getIcon = () => {
    switch (meter.type) {
      case "gas":
        return "fire";
      case "water":
        return "water";
      default:
        return "lightning-bolt";
    }
  };

  const getIconColor = () => {
    switch (meter.type) {
      case "gas":
        return "#F6A623";
      case "water":
        return "#2FBF68";
      default:
        return Colors.primary;
    }
  };

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.card,
          borderColor: theme.border,
          shadowColor: theme.shadow ?? "#000",
        },
      ]}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={[styles.iconBox, { backgroundColor: theme.surface }]}>
            <MaterialCommunityIcons
              name={getIcon()}
              size={24}
              color={getIconColor()}
            />
          </View>
          <View>
            <Text style={[styles.meterNumber, { color: theme.text }]}>
              {meter.serial_number}
            </Text>
            <Text style={[styles.subText, { color: theme.muted }]}>
              {meter.type === "electric"
                ? "Elektr"
                : meter.type === "gas"
                ? "Gaz"
                : "Suv"}{" "}
              • {meter.meter_direction === "incoming" ? "Kiruvchi" : "Chiquvchi"}
            </Text>
          </View>
        </View>
        <View style={[styles.badge, { borderColor: Colors.primary }]}>
          <Ionicons
            name="checkmark-circle-outline"
            size={16}
            color={Colors.primary}
          />
          <Text style={[styles.badgeText, { color: Colors.primary }]}>Faol</Text>
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.label, { color: theme.muted }]}>
            Joriy ko'rsatkich
          </Text>
          <Text style={[styles.value, { color: theme.text }]}>
            {meter.current_reading} kVt
          </Text>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.infoBtn, { borderColor: theme.border }]}
          onPress={onDetailPress}
        >
          <Text style={[styles.infoBtnText, { color: theme.text }]}>
            Ma'lumot
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.powerBtn, { borderColor: theme.border }]}
          onPress={onCommandPress}
        >
          <MaterialCommunityIcons
            name="power"
            size={20}
            color={"red"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: "row",
    gap: 12,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  meterNumber: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
  },
  subText: {
    fontSize: 13,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  label: {
    fontSize: 13,
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    fontWeight: "700",
  },
  footer: {
    flexDirection: "row",
    gap: 12,
  },
  infoBtn: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  infoBtnText: {
    fontSize: 14,
    fontWeight: "600",
  },
  powerBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    borderColor:"red"
  },
});
