import { Colors } from "@/shared/constants/theme";
import { useThemeColors } from "@/shared/hooks/use-theme";
import { Ionicons } from "@expo/vector-icons";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface DateFilterSheetProps {
  unitType: string;
  value: Date;
  onChange: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
}

const MONTHS = [
  "Yanvar",
  "Fevral",
  "Mart",
  "Aprel",
  "May",
  "Iyun",
  "Iyul",
  "Avgust",
  "Sentabr",
  "Oktabr",
  "Noyabr",
  "Dekabr",
];

export const DateFilterSheet = forwardRef<
  BottomSheetModal,
  DateFilterSheetProps
>(({ unitType, value, onChange, minDate, maxDate }, ref) => {
  const theme = useThemeColors();
  const snapPoints = useMemo(() => ["50%"], []);

  // Internal state to hold selection before confirming
  const [selectedDate, setSelectedDate] = useState(value);
  // For yearly view pagination (decade view)
  const [startYear, setStartYear] = useState(
    Math.floor(value.getFullYear() / 12) * 12
  );

  useEffect(() => {
    setSelectedDate(value);
    setStartYear(Math.floor(value.getFullYear() / 12) * 12);
  }, [value]);

  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) {
      // Reset check? or nothing
    }
  }, []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
        pressBehavior="close"
      />
    ),
    []
  );

  const handleYearPageChange = (direction: "prev" | "next") => {
    if (unitType === "yearly") {
      setStartYear((prev) => (direction === "next" ? prev + 12 : prev - 12));
    } else {
      // In monthly mode, change the selected year
      const newDate = new Date(selectedDate);
      newDate.setFullYear(
        selectedDate.getFullYear() + (direction === "next" ? 1 : -1)
      );
      setSelectedDate(newDate);
    }
  };

  const handleSelection = (itemValue: number) => {
    const newDate = new Date(selectedDate);
    if (unitType === "monthly") {
      newDate.setMonth(itemValue);
    } else {
      newDate.setFullYear(itemValue);
    }
    setSelectedDate(newDate);
  };

  const handleConfirm = () => {
    onChange(selectedDate);
    // @ts-ignore
    ref?.current?.dismiss();
  };

  const isPreviousDisabled = () => {
    if (!minDate) return false;
    const currentYear =
      unitType === "monthly" ? selectedDate.getFullYear() : startYear;
    return currentYear <= minDate.getFullYear();
  };

  const isNextDisabled = () => {
    if (!maxDate) return false;
    const currentYear =
      unitType === "monthly" ? selectedDate.getFullYear() : startYear + 11;
    return currentYear >= maxDate.getFullYear();
  };

  const isMonthDisabled = (monthIndex: number) => {
    const year = selectedDate.getFullYear();
    if (
      minDate &&
      year === minDate.getFullYear() &&
      monthIndex < minDate.getMonth()
    )
      return true;
    if (
      maxDate &&
      year === maxDate.getFullYear() &&
      monthIndex > maxDate.getMonth()
    )
      return true;
    return false;
  };

  const isYearDisabled = (year: number) => {
    if (minDate && year < minDate.getFullYear()) return true;
    if (maxDate && year > maxDate.getFullYear()) return true;
    return false;
  };

  const renderHeader = () => {
    let title = "";
    if (unitType === "monthly") {
      title = `${selectedDate.getFullYear()}`;
    } else {
      title = `${startYear} - ${startYear + 11}`;
    }

    const prevDisabled = isPreviousDisabled();
    const nextDisabled = isNextDisabled();

    return (
      <View style={styles.headerRow}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>{title}</Text>
        <View style={styles.arrows}>
          <TouchableOpacity
            style={[styles.arrowBtn, prevDisabled && { opacity: 0.3 }]}
            onPress={() => !prevDisabled && handleYearPageChange("prev")}
            disabled={prevDisabled}
          >
            <Ionicons name="chevron-back" size={24} color={theme.muted} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.arrowBtn, nextDisabled && { opacity: 0.3 }]}
            onPress={() => !nextDisabled && handleYearPageChange("next")}
            disabled={nextDisabled}
          >
            <Ionicons name="chevron-forward" size={24} color={theme.muted} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderContent = () => {
    if (unitType === "monthly") {
      return (
        <View style={styles.grid}>
          {MONTHS.map((month, index) => {
            const isSelected = selectedDate.getMonth() === index;
            const disabled = isMonthDisabled(index);

            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.gridItem,
                  isSelected && { backgroundColor: Colors.primary },
                  disabled && { opacity: 0.3 },
                ]}
                onPress={() => !disabled && handleSelection(index)}
                disabled={disabled}
              >
                <Text
                  style={[
                    styles.gridItemTextLarge,
                    { color: isSelected ? "#fff" : theme.text },
                  ]}
                >
                  {month}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      );
    } else {
      // Yearly view - show range of years
      const years = Array.from({ length: 12 }, (_, i) => startYear + i);
      return (
        <View style={styles.grid}>
          {years.map((year) => {
            const isSelected = selectedDate.getFullYear() === year;
            const disabled = isYearDisabled(year);
            return (
              <TouchableOpacity
                key={year}
                style={[
                  styles.gridItem,
                  isSelected && { backgroundColor: Colors.primary },
                  disabled && { opacity: 0.3 },
                ]}
                onPress={() => !disabled && handleSelection(year)}
                disabled={disabled}
              >
                <Text
                  style={[
                    styles.gridItemTextLarge,
                    { color: isSelected ? "#fff" : theme.text },
                  ]}
                >
                  {year}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      );
    }
  };

  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      backdropComponent={renderBackdrop}
      backgroundStyle={{ backgroundColor: theme.surface }}
      handleIndicatorStyle={{ backgroundColor: theme.muted }}
    >
      <BottomSheetView style={styles.contentContainer}>
        {renderHeader()}
        {renderContent()}

        <TouchableOpacity
          style={[styles.confirmBtn, { backgroundColor: Colors.primary }]}
          onPress={handleConfirm}
        >
          <Text style={styles.confirmBtnText}>Tanlash</Text>
        </TouchableOpacity>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  arrows: {
    flexDirection: "row",
    gap: 16,
  },
  arrowBtn: {
    padding: 4,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12, // vertical gap approximation
  },
  gridItem: {
    width: "30%", // 3 items per row approx
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  gridItemText: {
    fontSize: 14,
    fontWeight: "500",
  },
  gridItemTextLarge: {
    fontSize: 18,
    fontWeight: "500",
  },
  gridItemSubText: {
    fontSize: 12,
    marginTop: 4,
  },
  confirmBtn: {
    marginTop: "auto", // push to bottom
    borderRadius: 30, // fully rounded like in image
    paddingVertical: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.primary, // in case we want outline style, usage is fill though
  },
  confirmBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
