import { useThemeColors } from "@/shared/hooks/use-theme";
import { DateSheetFilter } from "@/shared/ui/date-sheet-filter";
import { TabBtns } from "@/shared/ui/tab-btns";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export const ConsumerDetailHeader = () => {
  const [unitType, setUnitType] = useState<"monthly" | "yearly">("monthly");

  const [date, setDate] = useState(new Date());
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

  const handleDateChange = (newDate: Date) => {
    setDate(newDate);
  };

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

        <TabBtns
          data={filterData}
          defaultValue={unitType}
          onChange={(value) => setUnitType(value as "monthly" | "yearly")}
        />
      </View>

      <View style={styles.flex}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>
          1 - Tashkilot
        </Text>
        <DateSheetFilter
          unitType={unitType}
          handleDateChange={handleDateChange}
        />
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
});
