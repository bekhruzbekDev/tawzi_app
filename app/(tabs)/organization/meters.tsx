import { Meter } from "@/features/meters/model/types";
import CreateMeter from "@/features/meters/ui/create-meter";
import { MeterDetail } from "@/features/meters/ui/meter-detail";
import MetersList from "@/features/meters/ui/meters-list";
import { SentCommand } from "@/features/meters/ui/sent-command";
import { Colors } from "@/shared/constants/theme";
import { useThemeColors } from "@/shared/hooks/use-theme";
import { AntDesign } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { useRef, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export default function Meters() {
  const theme = useThemeColors();
  const createSheetRef = useRef<BottomSheetModal | null>(null);
  const commandSheetRef = useRef<BottomSheetModal | null>(null);
  const detailSheetRef = useRef<BottomSheetModal | null>(null);

  const [selectedMeter, setSelectedMeter] = useState<Meter | null>(null);

  const handleCommandPress = (meter: Meter) => {
    setSelectedMeter(meter);
    commandSheetRef.current?.present();
  };

  const handleDetailPress = (meter: Meter) => {
    setSelectedMeter(meter);
    detailSheetRef.current?.present();
  };

  return (
    <>
      <View style={{ flex: 1, paddingHorizontal: 16 }}>
        <MetersList
          onCommandPress={handleCommandPress}
          onDetailPress={handleDetailPress}
        />
      </View>

      <TouchableOpacity
        style={[
          styles.addBtn,
          { backgroundColor: theme.surface, shadowColor: theme.shadow },
        ]}
        onPress={() => createSheetRef.current?.present()}
      >
        <AntDesign name="plus" size={24} color={Colors.primary} />
      </TouchableOpacity>

      <CreateMeter ref={createSheetRef} />
      <SentCommand ref={commandSheetRef} meter={selectedMeter} />
      <MeterDetail ref={detailSheetRef} meter={selectedMeter} />
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
