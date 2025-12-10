import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../constants/theme";
import { useThemeColors } from "../hooks/use-theme";

interface Props {
  data: { label: string; value: string }[];
  onChange?: (value: string) => void;
  defaultValue: string;
}
export const TabBtns = ({ data, onChange, defaultValue }: Props) => {
  const [unitType, setUnitType] = useState<string>(defaultValue);
  const theme = useThemeColors();
  return (
    <View style={styles.unitPills}>
      {data.map((data, i) => (
        <TouchableOpacity
          key={i}
          style={[
            styles.unitPill,
            unitType == data.value.toLowerCase()
              ? { backgroundColor: Colors.primary }
              : { backgroundColor: theme.card },
          ]}
          onPress={() => {
            setUnitType(data.value.toLowerCase());
            onChange?.(data.value.toLowerCase());
          }}
        >
          <Text
            style={[
              styles.unitText,
              unitType == data.value.toLowerCase() && { color: "#fff" },
            ]}
          >
            {data.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  unitPills: { flexDirection: "row", alignItems: "center", gap: 8 },
  unitPill: {
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  unitText: { color: "#6B7280" },
});
