import React from "react";

import { useConsumerActions } from "@/features/organization/model/consumers/use-consumer-actions";
import { ConsumersHeader } from "@/features/organization/ui/consumers/consumer-header";
import { ConsumesList } from "@/features/organization/ui/consumers/consumers-list";
import { CreateConsumer } from "@/features/organization/ui/consumers/create-consumer";
import { Colors } from "@/shared/constants/theme";
import { useThemeColors } from "@/shared/hooks/use-theme";
import DeleteModal from "@/shared/ui/delete-modal";
import AntDesign from "@expo/vector-icons/AntDesign";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export default function ConsumersScreen() {
  const theme = useThemeColors();

  const {
    consumer,
    sheetRef,
    editChange,
    deleteChange,
    deleteModalVisible,
    setDeleteModalVisible,
    setConsumer,
    activeFilter,
    onFilterSelect,
    filterCount,
  } = useConsumerActions();

  return (
    <>
      <ConsumersHeader
        activeFilter={activeFilter}
        onFilterSelect={onFilterSelect}
        filterOptions={[
          { label: "Ogohlantirilganlar", value: "is_notified" },
          { label: "Qarzdorlar", value: "is_debtor" },
        ]}
        filterCount={filterCount}
      />
      <View style={{ flex: 1, paddingHorizontal: 16 }}>
        <ConsumesList editChange={editChange} deleteChange={deleteChange} />
      </View>

      <TouchableOpacity
        style={[
          styles.addBtn,
          { backgroundColor: theme.surface, shadowColor: theme.shadow },
        ]}
        onPress={() => {
          sheetRef.current?.snapToIndex(1);
          setConsumer(null);
        }}
      >
        <AntDesign name="plus" size={24} color={Colors.primary} />
      </TouchableOpacity>

      <CreateConsumer ref={sheetRef} consumer={consumer} />
      <DeleteModal
        visible={deleteModalVisible}
        onchange={setDeleteModalVisible}
        queryKey="get-consumers"
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
  },
});
