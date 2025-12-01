import { Colors } from "@/shared/constants/theme";
import { useThemeColors } from "@/shared/hooks/use-theme";
import CustomSelect from "@/shared/ui/custom-select";
import { AntDesign } from "@expo/vector-icons";
import {
    BottomSheetBackdrop,
    BottomSheetModal,
    BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import React, { useCallback, useMemo, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Button, SegmentedButtons } from "react-native-paper";
import { Meter } from "../model/types";

interface Props {
  meter: Meter | null;
}

export const SentCommand = React.forwardRef<BottomSheetModal, Props>(
  ({ meter }, ref) => {
    const snapPoints = useMemo(() => ["50%", "90%"], []);
    const theme = useThemeColors();
    const [command, setCommand] = useState("on");
    const [duration, setDuration] = useState("1");
    const [comment, setComment] = useState("");

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

    const handleSubmit = () => {
      console.log("Sending Command:", {
        meterId: meter?.id,
        command,
        duration,
        comment,
      });
      closeSheet();
    };

    return (
      <BottomSheetModal
        backgroundStyle={{
          backgroundColor: theme.background,
        }}
        ref={ref}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        enablePanDownToClose={true}
        keyboardBehavior="interactive"
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>
            {meter?.type === "electric"
              ? "Elektr"
              : meter?.type === "gas"
              ? "Gaz"
              : "Suv"}
            : {meter?.meter_number}
          </Text>
          <TouchableOpacity onPress={closeSheet} style={styles.closeBtn}>
            <AntDesign name="close" size={24} color={theme.text} />
          </TouchableOpacity>
        </View>

        <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
          <SegmentedButtons
            value={command}
            onValueChange={setCommand}
            buttons={[
              {
                value: "on",
                label: "Yoqish",
                style: {
                  backgroundColor:
                    command === "on" ? Colors.primary : "transparent",
                  borderColor: Colors.primary,
                },
                checkedColor: "white",
                uncheckedColor: theme.text,
              },
              {
                value: "off",
                label: "O'chirish",
                style: {
                  backgroundColor:
                    command === "off" ? theme.surface : "transparent",
                  borderColor: theme.border,
                },
                checkedColor: theme.text,
                uncheckedColor: theme.text,
              },
            ]}
            style={styles.segmentedBtn}
          />

          <CustomSelect
            label="Kun"
            value={duration}
            onChange={setDuration}
            items={[
              { label: "1 kun", value: "1" },
              { label: "3 kun", value: "3" },
              { label: "1 hafta", value: "7" },
            ]}
          />

          <View style={styles.inputContainer}>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: theme.surface,
                  color: theme.text,
                  borderColor: theme.border,
                },
              ]}
              placeholder="Izoh"
              placeholderTextColor={theme.muted}
              value={comment}
              onChangeText={setComment}
            />
          </View>

          <Button
            mode="contained"
            onPress={handleSubmit}
            style={styles.submitBtn}
            contentStyle={{ height: 48 }}
          >
            Jo'natish
          </Button>
        </BottomSheetScrollView>
      </BottomSheetModal>
    );
  }
);

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  closeBtn: {
    padding: 4,
  },
  segmentedBtn: {
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
  },
  submitBtn: {
    borderRadius: 12,
    backgroundColor: Colors.primary,
  },
});