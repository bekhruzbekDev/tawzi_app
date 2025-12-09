import { Colors } from "@/shared/constants/theme";
import { useThemeColors } from "@/shared/hooks/use-theme";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface UtilityTabsProps {
  selectedTab: string;
  onSelect: (tab: string) => void;
}

const TABS = [
  { id: "electric", label: "Elektr" },
  { id: "gas", label: "Gaz" },
  { id: "water", label: "Suv" },
];

export const UtilityTabs = ({ selectedTab, onSelect }: UtilityTabsProps) => {
  const theme = useThemeColors();

  return (
    <View style={[styles.container, { backgroundColor: theme.card }]}>
      {TABS.map((tab) => {
        const isActive = selectedTab === tab.id;
        return (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tab,
              isActive && { backgroundColor: Colors.primary },
            ]}
            onPress={() => onSelect(tab.id)}
          >
            <Text
              style={[styles.text, { color: isActive ? "#fff" : theme.text }]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 4,
    borderRadius: 12,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  text: {
    fontSize: 14,
    fontWeight: "600",
  },
});
