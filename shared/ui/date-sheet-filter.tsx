import { DateFilterSheet } from "@/features/organization/ui/consumers/date-filter-sheet";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useRef, useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { useThemeColors } from "../hooks/use-theme";

interface Props {
  unitType: "monthly" | "yearly";
  date?: Date;
  handleDateChange: (newDate: Date) => void;
  minDate?: Date;
  maxDate?: Date;
}
export const DateSheetFilter = ({
  unitType,
  date,
  handleDateChange,
  minDate,
  maxDate,
}: Props) => {
  const theme = useThemeColors();
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const [defaultDate, setDefaultDate] = useState(date ?? new Date());
  const formattedDate =
    unitType === "monthly"
      ? `${defaultDate.toLocaleDateString("uz-UZ", {
          month: "long",
        })} - ${defaultDate.getFullYear()}`
      : `${defaultDate.getFullYear()}`;

  const handleDate = (newDate: Date) => {
    setDefaultDate(newDate);
    handleDateChange(newDate);
  };
  return (
    <>
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
      <DateFilterSheet
        ref={bottomSheetRef}
        unitType={unitType}
        value={defaultDate}
        onChange={handleDate}
        minDate={minDate ?? new Date(2024, 8, 1)}
        maxDate={maxDate ?? new Date()}
      />
    </>
  );
};
