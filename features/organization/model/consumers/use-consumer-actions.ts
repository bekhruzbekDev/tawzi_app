import BottomSheet from "@gorhom/bottom-sheet";
import { useRef, useState } from "react";
import { Consumer } from "./types";

export const useConsumerActions = () => {
  const sheetRef = useRef<BottomSheet | null>(null);
  const [consumer, setConsumer] = useState<Consumer | null>(null);
  const [searchValue, setSearchValue] = useState<string>("");
  const [deleteModalVisible, setDeleteModalVisible] = useState<{
    open: boolean;
    path: string;
  }>({ open: false, path: "" });
  const editChange = (data: Consumer | null) => {
    setConsumer(data);
    sheetRef.current?.snapToIndex(1);
  };

  const deleteChange = (data: Consumer | null) => {
    setDeleteModalVisible({
      open: true,
      path: `organization/consumer/${data?.id}/delete/`,
    });
  };

  const [activeFilter, setActiveFilter] = useState<
    "is_notified" | "is_debtor" | null
  >(null);

  const onFilterSelect = (val: "is_notified" | "is_debtor") => {
    if (activeFilter === val) {
      setActiveFilter(null);
      console.log(null);
    } else {
      setActiveFilter(val);
      console.log(val);
    }
  };

  return {
    consumer,
    sheetRef,
    editChange,
    deleteChange,
    deleteModalVisible,
    setDeleteModalVisible,
    setConsumer,
    activeFilter,
    onFilterSelect,
    filterCount: activeFilter ? 1 : 0,
    searchValue,
    setSearchValue,
  };
};
