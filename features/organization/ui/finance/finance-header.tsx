import { useThemeColors } from "@/shared/hooks/use-theme";
import { DateSheetFilter } from "@/shared/ui/date-sheet-filter";
import { TabBtns } from "@/shared/ui/tab-btns";
import { StyleSheet, Text, View } from "react-native";

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

  return (
    <View style={styles.header}>
      <View style={[styles.flex, { marginBottom: 16 }]}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>
          Hisob-kitob
        </Text>
        <TabBtns
          data={filterData}
          onChange={(val) => setUnitType(val as "monthly" | "yearly")}
          defaultValue={unitType}
        />
      </View>

      <View style={styles.flex}>
        <View />
        {/* Spacer or left content if needed, keeping date on right/center logic or layout */}

        <DateSheetFilter
          unitType={unitType as "monthly" | "yearly"}
          handleDateChange={setDate}
        />
      </View>
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
});
