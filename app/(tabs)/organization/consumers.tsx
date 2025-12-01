import BottomSheet from "@gorhom/bottom-sheet"; // Tipi uchun import qilamiz
import React, { useRef } from "react";

import { ConsumersHeader } from "@/features/organization/ui/consumers/consumer-header";
import { ConsumesList } from "@/features/organization/ui/consumers/consumers-list";
import { CreateUser } from "@/features/organization/ui/consumers/create-consumer";
import { Colors } from "@/shared/constants/theme";
import { useThemeColors } from "@/shared/hooks/use-theme";
import AntDesign from "@expo/vector-icons/AntDesign";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export default function ConsumersScreen() {
  const theme = useThemeColors();

  const sheetRef = useRef<BottomSheet | null>(null);

  return (
    <>
      <ConsumersHeader />
      <View style={{ flex: 1, paddingHorizontal: 16 }}>
        <ConsumesList />
      </View>

      <TouchableOpacity
        style={[
          styles.addBtn,
          { backgroundColor: theme.surface, shadowColor: theme.shadow },
        ]}
        onPress={() => sheetRef.current?.snapToIndex(1)}
      >
        <AntDesign name="plus" size={24} color={Colors.primary} />
      </TouchableOpacity>

      <CreateUser ref={sheetRef} />
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
