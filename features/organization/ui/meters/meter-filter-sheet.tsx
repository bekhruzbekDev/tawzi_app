import { Colors } from "@/shared/constants/theme";
import { useThemeColors } from "@/shared/hooks/use-theme";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button } from "react-native-paper";
import { MeterFilters } from "../../model/meters/types";

interface Props {
  initialFilters?: MeterFilters;
  onApply: (filters: MeterFilters) => void;
}

export const MeterFilterSheet = forwardRef<BottomSheetModal, Props>(
  ({ onApply, initialFilters }, ref) => {
    const theme = useThemeColors();
    const bottomSheetRef = useRef<BottomSheetModal>(null);

    const [filters, setFilters] = useState<MeterFilters>(
      initialFilters || {}
    );

    useImperativeHandle(ref, () => {
        return bottomSheetRef.current!;
    });

    const handleApply = () => {
      onApply(filters);
      bottomSheetRef.current?.dismiss();
    };

    const handleReset = () => {
      const resetFilters = {};
      setFilters(resetFilters);
      onApply(resetFilters);
      bottomSheetRef.current?.dismiss();
    };

    const FilterSection = ({
      title,
      options,
      currentValue,
      onSelect,
    }: {
      title: string;
      options: { label: string; value: string | undefined }[];
      currentValue: string | undefined;
      onSelect: (value: string | undefined) => void;
    }) => (
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          {title}
        </Text>
        <View style={styles.optionsContainer}>
          {options.map((option) => (
            <TouchableOpacity
              key={option.label}
              style={[
                styles.optionBtn,
                {
                  borderColor: theme.border,
                  backgroundColor:
                    currentValue === option.value
                      ? Colors.primary
                      : theme.card,
                },
              ]}
              onPress={() => onSelect(option.value)}
            >
              <Text
                style={[
                  styles.optionText,
                  {
                    color:
                      currentValue === option.value ? "#fff" : theme.text,
                  },
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );

    return (
      <BottomSheetModal
        ref={bottomSheetRef}
        snapPoints={["60%"]}
        index={0}
        backgroundStyle={{ backgroundColor: theme.card }}
        handleIndicatorStyle={{ backgroundColor: theme.text }}
      >
        <BottomSheetView style={styles.contentContainer}>
          <View style={styles.header}>
            <Text style={[styles.title, { color: theme.text }]}>
              Filterlash
            </Text>
            <TouchableOpacity onPress={handleReset}>
              <Text style={{ color: Colors.primary, fontWeight: "600" }}>
                Tozalash
              </Text>
            </TouchableOpacity>
          </View>

          <FilterSection
            title="Hisoblagich turi"
            currentValue={filters.device_type}
            options={[
              { label: "Barchasi", value: undefined },
              { label: "Elektr", value: "electric" },
              { label: "Gaz", value: "gas" },
              { label: "Suv", value: "water" },
            ]}
            onSelect={(val) => setFilters({ ...filters, device_type: val })}
          />

          <FilterSection
            title="Kiruvchi / Chiquvchi"
            currentValue={filters.device_meter_direction}
            options={[
              { label: "Barchasi", value: undefined },
              { label: "Kiruvchi", value: "incoming" },
              { label: "Chiquvchi", value: "outgoing" },
            ]}
            onSelect={(val) =>
              setFilters({ ...filters, device_meter_direction: val })
            }
          />

           <FilterSection
            title="Status"
            currentValue={filters.status}
            options={[
              { label: "Barchasi", value: undefined },
              { label: "Aktiv", value: "active" },
              { label: "Nofaol", value: "inactive" },
            ]}
            onSelect={(val) =>
              setFilters({ ...filters, status: val })
            }
          />

          <Button
            mode="contained"
            onPress={handleApply}
            style={styles.applyBtn}
          >
            Saqlash
          </Button>
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  optionBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  optionText: {
    fontSize: 14,
    fontWeight: "500",
  },
  applyBtn: {
    marginTop: "auto",
    borderRadius: 12,
    paddingVertical: 6,
  },
});
