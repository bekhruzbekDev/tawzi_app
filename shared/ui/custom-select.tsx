import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useThemeColors } from "../hooks/use-theme";
interface Props {
  label?: string;
  items: { label: string; value: string }[];
  value: string | null;
  onChange: (val: any) => void;
  error?: string;
}

export default function CustomSelect({
  label,
  items,
  value,
  onChange,
  error,
}: Props) {
  const [open, setOpen] = useState(false);
  const [list, setList] = useState(items);
  const theme = useThemeColors();
  return (
    <View style={{ marginBottom: 20, zIndex: open ? 1000 : 1 }}>
      {label && (
        <Text style={[styles.label, { color: theme.muted }]}>{label}</Text>
      )}

      <DropDownPicker
        open={open}
        value={value}
        items={list}
        setOpen={setOpen}
        setValue={(callback) => onChange(callback(value))}
        setItems={setList}
        placeholder="Select option"
        style={[
          styles.dropdown,
          { borderColor: theme.border, backgroundColor: theme.surface },
        ]}
        textStyle={{ color: theme.text }}
        ArrowDownIconComponent={() => (
          <Ionicons name="chevron-down" size={20} color={theme.text} />
        )}
        TickIconComponent={() => (
          <Ionicons name="checkmark" size={20} color={theme.text} />
        )}
        dropDownContainerStyle={[
          styles.dropdownContainer,
          { backgroundColor: theme.surface, borderColor: theme.border },
        ]}
        listMode="SCROLLVIEW"
        maxHeight={300}
        zIndex={1000}
        zIndexInverse={3000}
      />

      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    marginBottom: 6,
    color: "#444",
    fontSize: 14,
    fontWeight: "500",
  },
  dropdown: {
    borderColor: "#DDD",
    borderRadius: 10,
    // height: 50,
    padding: 16,
  },
  dropdownContainer: {
    borderColor: "#DDD",
    borderRadius: 10,
  },
  error: {
    marginTop: 5,
    color: "#ef4444",
  },
});
