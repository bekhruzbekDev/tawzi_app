import { useThemeColors } from "@/shared/hooks/use-theme";
import { AntDesign } from "@expo/vector-icons";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import React, { useCallback, useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CreateMeterValues } from "../model/types";
import { useCreateMeter } from "../model/use-create-meter";
import { MeterForm } from "./meter-form";

interface BottomSheetDataProps {}

export default React.forwardRef<BottomSheetModal, BottomSheetDataProps>(
  (props, ref) => {
    const snapPoints = useMemo(() => ["60%", "100%"], []);
    const theme = useThemeColors();

    const handleSheetChanges = useCallback((index: number) => {
      console.log("handleSheetChanges", index);
    }, []);

    const renderBackdrop = useCallback(
      (props: any) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
        />
      ),
      []
    );

    const closeSheet = useCallback(() => {
      if (ref && typeof ref !== "function") {
        ref.current?.dismiss();
      }
    }, [ref]);

    const { mutate, isPending } = useCreateMeter();

    const onsubmit = (data: CreateMeterValues) => {
      mutate(data, {
        onSuccess: () => {
          closeSheet();
        },
      });
    };

    return (
      <BottomSheetModal
        backgroundStyle={{
          backgroundColor: theme.background,
        }}
        ref={ref}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backdropComponent={renderBackdrop}
        enablePanDownToClose={true}
        keyboardBehavior="interactive"
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>
            Hisoblagich Qo'shish
          </Text>
          <TouchableOpacity onPress={closeSheet} style={styles.closeBtn}>
            <AntDesign name="close" size={24} color={theme.text} />
          </TouchableOpacity>
        </View>
        <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
          <MeterForm loading={isPending} onSubmit={onsubmit} />
        </BottomSheetScrollView>
      </BottomSheetModal>
    );
  }
);

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  closeBtn: {
    padding: 4,
  },
});