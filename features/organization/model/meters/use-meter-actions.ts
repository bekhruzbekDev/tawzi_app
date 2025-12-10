import { useStore } from "@/shared/store/store";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useEffect, useRef, useState } from "react";
import { Meter, MeterFilters } from "./types";

export const useMeterActions = () => {
  const commandSheetRef = useRef<BottomSheetModal | null>(null);
  const user = useStore((state) => state.user);
  const detailSheetRef = useRef<BottomSheetModal | null>(null);
  const filterSheetRef = useRef<BottomSheetModal | null>(null);
  const [selectedMeter, setSelectedMeter] = useState<Meter | null>(null);
  const [filters, setFilters] = useState<MeterFilters | undefined>(undefined);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    setFilters({ ...filters, search });
  }, [search]);

  const handleCommandPress = (meter: Meter) => {
    setSelectedMeter(meter);
    commandSheetRef.current?.present(2);
  };

  const handleDetailPress = (meter: Meter) => {
    setSelectedMeter(meter);
    detailSheetRef.current?.present();
  };

  const handleFilterPress = () => {
    filterSheetRef.current?.present();
  };

  const handleApplyFilters = (newFilters: MeterFilters) => {
    setFilters(newFilters);
  };

  const activeFilterCount = Object.values(filters || {}).filter(
    (val) =>
      val === "water" ||
      val === "electric" ||
      val === "gas" ||
      val === "incoming" ||
      val === "outgoing" ||
      val === "active" ||
      val === "inactive" ||
      val === "maintenance" ||
      val === "broken"
  ).length;

  return {
    commandSheetRef,
    detailSheetRef,
    filterSheetRef,
    selectedMeter,
    filters,
    handleCommandPress,
    handleDetailPress,
    handleFilterPress,
    handleApplyFilters,
    filterCount: activeFilterCount,
    searchValue: search,
    setSearchValue: setSearch,
    isMeterCrete:
      user?.role == "OrganizationAdmin"
        ? true
        : user?.permissions?.add_device_permission,
  };
};
