import { Colors } from "@/shared/constants/theme";
import { useThemeColors } from "@/shared/hooks/use-theme";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export const ConsumerDetailHeader = () => {
  const [unitType, setUnitType] = useState<string>("monthly");
  const filterData = [
    {
      label: "Oylik",
      value: "monthly",
    },
    {
      label: "Yillik",
      value: "yearly",
    },
  ];

  const router = useRouter();
  const theme = useThemeColors();
  return (
    <View style={styles.header}>
      <View style={[styles.flex, { marginBottom: 16 }]}>
        <Pressable
          onPress={() => router.back()}
          style={[styles.backBtn, { backgroundColor: theme.card }]}
        >
          <Feather name="chevron-left" size={24} color={theme.text} />
        </Pressable>
        <View style={styles.unitPills}>
          {filterData.map((data, i) => (
            <TouchableOpacity
              key={i}
              style={[
                styles.unitPill,
                unitType == data.value.toLowerCase()
                  ? { backgroundColor: Colors.primary }
                  : { backgroundColor: theme.card },
              ]}
              onPress={() => setUnitType(data.value.toLowerCase())}
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
      </View>

      <View style={styles.flex}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>
          1 - Tashkilot
        </Text>
        <View
          style={{
            alignItems: "center",
            gap: 8,
            flexDirection: "row",
            alignContent: "center",
          }}
        >
          <Text style={{ color: theme.muted }}>Dekabr - 2025</Text>
          <MaterialCommunityIcons
            name="calendar-month-outline"
            size={24}
            color={theme.muted}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  flex: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backBtn: {
    padding: 6,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  unitPills: { flexDirection: "row", alignItems: "center", gap: 8 },
  unitPill: {
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  unitText: { color: "#6B7280" },
});
