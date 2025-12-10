import { useMeterActions } from "@/features/organization/model/meters/use-meter-actions";
import { MeterDetail } from "@/features/organization/ui/meters/meter-detail";
import { MeterFilterSheet } from "@/features/organization/ui/meters/meter-filter-sheet";
import MetersList from "@/features/organization/ui/meters/meters-list";
import { SendCommand } from "@/features/organization/ui/meters/sent-command";
import { Colors } from "@/shared/constants/theme";
import { useThemeColors } from "@/shared/hooks/use-theme";
import { SearchBarHeader } from "@/widgets/search-bar-header/ui/search-bar-header";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export default function Meters() {
  const theme = useThemeColors();
  const router = useRouter();

  const {
    commandSheetRef,
    detailSheetRef,
    filterSheetRef,
    selectedMeter,
    filters,
    filterCount,
    handleCommandPress,
    handleDetailPress,
    handleFilterPress,
    handleApplyFilters,
    setSearchValue,
    searchValue,
    isMeterCrete,
  } = useMeterActions();

  return (
    <>
      <SearchBarHeader
        onFilterPress={handleFilterPress}
        filterCount={filterCount}
        onChange={setSearchValue}
        value={searchValue}
      />
      <View style={{ flex: 1, paddingHorizontal: 16 }}>
        <MetersList
          onCommandPress={handleCommandPress}
          onDetailPress={handleDetailPress}
          filters={filters}
        />
      </View>
      {isMeterCrete && (
        <TouchableOpacity
          style={[
            styles.addBtn,
            { backgroundColor: theme.surface, shadowColor: theme.shadow },
          ]}
          onPress={() => router.push("/create-meter")}
        >
          <AntDesign name="plus" size={24} color={Colors.primary} />
        </TouchableOpacity>
      )}
      <SendCommand ref={commandSheetRef} meter={selectedMeter} />
      <MeterDetail ref={detailSheetRef} meter={selectedMeter} />
      <MeterFilterSheet
        ref={filterSheetRef}
        onApply={handleApplyFilters}
        initialFilters={filters}
      />
    </>
  );
}

const styles = StyleSheet.create({
  addBtn: {
    position: "absolute",
    bottom: 30,
    right: 30,
    padding: 20,
    borderRadius: 50,
    shadowOffset: { height: 1, width: 0 },
    shadowOpacity: 0.5,
    borderColor: Colors.primary,
    // elevation for android
    elevation: 5,
  },
});
