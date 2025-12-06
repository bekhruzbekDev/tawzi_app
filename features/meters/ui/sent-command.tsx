import { Colors } from "@/shared/constants/theme";
import { useThemeColors } from "@/shared/hooks/use-theme";
import CustomSelect from "@/shared/ui/custom-select";
import { AntDesign } from "@expo/vector-icons";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { useMutation } from "@tanstack/react-query";
import React, { useCallback, useMemo, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Button, SegmentedButtons } from "react-native-paper";
import Toast from "react-native-toast-message";
import { sendCommandMutation } from "../model/mutations";
import { Meter, SendCommandValues } from "../model/types";

interface Props {
  meter: Meter | null;
}

export const SendCommand = React.forwardRef<BottomSheetModal, Props>(
  ({ meter }, ref) => {
    const snapPoints = useMemo(() => ["60%", "90%"], []);
    const theme = useThemeColors();
    const [command, setCommand] = useState<"open" | "close">("open");
    const [duration, setDuration] = useState("1");
    const [comment, setComment] = useState("");


const {mutate,isPending} =useMutation({
  mutationFn:(data:SendCommandValues)=>sendCommandMutation(data,command),
  mutationKey:["send-command",],
  onSuccess:(data)=>{
  Toast.show({
    type: "success",
    text1: data?.data?.message,
  })
  closeSheet()
  },
  onError:(error:any)=>{
    Toast.show({
      type: "error",
      text1: error?.data?.message??"Xatolik yuz berdi",
    })
  }
})

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
      setCommand("open")
      setDuration("1")
      setComment("")
      if (ref && typeof ref !== "function") {
        ref.current?.dismiss();
      }
    }, [ref]);

    const handleSubmit = () => {
     mutate({
      device_id: Number(meter?.id),
      timeout_min:duration,
      comment:comment ??null,
      device_type:meter?.type??null,
     })
    
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
            : {meter?.serial_number}
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
                value: "open",
                label: "Ochish",
                style: {
                  backgroundColor:
                    command === "open" ? Colors.primary : "transparent",
                  borderColor: Colors.primary,
                },
                checkedColor: "white",
                uncheckedColor: theme.text,
              },
              {
                value: "close",
                label: "Yopish",
                style: {
                  backgroundColor:
                    command === "close" ? Colors.primary : "transparent",
                  borderColor: Colors.primary,
                },
                checkedColor: "white",
                uncheckedColor: Colors.primary,
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
              { label: "7 kun", value: "7" },
              { label: "30 kun", value: "30" },
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
            loading={isPending}
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