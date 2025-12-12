import { useThemeColors } from "@/shared/hooks/use-theme";
import { DateSheetFilter } from "@/shared/ui/date-sheet-filter";
import { TabBtns } from "@/shared/ui/tab-btns";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
  filter_type: "monthly" | "yearly";
  onFilterChange: (value: "monthly" | "yearly") => void;
  setDate: (date: Date) => void;
}
export const ConsumerDetailHeader = ({
  filter_type,
  onFilterChange,
  setDate,
}: Props) => {
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

  const handleFilterChange = (value: "monthly" | "yearly") => {
    onFilterChange(value);
  };

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
          defaultValue={filter_type}
          onChange={(value) =>
            handleFilterChange(value as "monthly" | "yearly")
          }
        />
      </View>

      <View style={styles.flex}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>
          1 - Tashkilot
        </Text>
        <DateSheetFilter
          unitType={filter_type}
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
