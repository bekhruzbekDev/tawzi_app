import { DateFilterSheet } from "@/features/organization/ui/consumers/date-filter-sheet";
import { Colors } from "@/shared/constants/theme";
import { useThemeColors } from "@/shared/hooks/use-theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface FinanceHeaderProps {
  unitType: "monthly" | "yearly";
  setUnitType: (type: "monthly" | "yearly") => void;
  date: Date;
  setDate: (date: Date) => void;
}

export const FinanceHeader = ({
  unitType,
  setUnitType,
  date,
  setDate,
}: FinanceHeaderProps) => {
  const theme = useThemeColors();
  const bottomSheetRef = useRef<BottomSheetModal>(null);

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

  const formattedDate =
    unitType === "monthly"
      ? `${date.toLocaleDateString("uz-UZ", {
          month: "long",
        })} - ${date.getFullYear()}`
      : `${date.getFullYear()}`;

  return (
    <View style={styles.header}>
      <View style={[styles.flex, { marginBottom: 16 }]}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>
          Hisob-kitob
        </Text>
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
              onPress={() => setUnitType(data.value as "monthly" | "yearly")}
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
        <View />
        {/* Spacer or left content if needed, keeping date on right/center logic or layout */}

        <TouchableOpacity
          onPress={() => bottomSheetRef.current?.present()}
          style={{
            alignItems: "center",
            gap: 8,
            flexDirection: "row",
            alignContent: "center",
          }}
        >
          <Text style={{ color: theme.muted, textTransform: "capitalize" }}>
            {formattedDate}
          </Text>
          <MaterialCommunityIcons
            name="calendar-month-outline"
            size={24}
            color={theme.muted}
          />
        </TouchableOpacity>
      </View>

      <DateFilterSheet
        ref={bottomSheetRef}
        unitType={unitType}
        value={date}
        onChange={setDate}
        // Mock constraints
        minDate={new Date(2024, 0, 1)}
        maxDate={new Date()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingBottom: 16,
  },
  flex: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
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
