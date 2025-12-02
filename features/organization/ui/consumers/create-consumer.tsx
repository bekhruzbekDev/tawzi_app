import { AntDesign } from "@expo/vector-icons";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import React, { useCallback, useMemo, useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useThemeColors } from "../../../../shared/hooks/use-theme";
import { Consumer, ConsumerEditFormValues, ConsumerFormValues } from "../../model/consumers/types";
import { useCreateConsumer } from "../../model/consumers/use-create-consumer";
import { CreateConsumerForm } from "./consumer-form";



interface BottomSheetDataProps {
  consumer :Consumer |null
}

export const CreateConsumer = React.forwardRef<BottomSheet, BottomSheetDataProps>(
  (props, ref) => {
    const snapPoints = useMemo(() => ["70%", "100%"], []);
    const theme = useThemeColors();

    
const formRef = useRef<any>(null);
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
        ref.current?.close();
      }
    }, [ref]);

    const handleSheetChanges = useCallback((index: number) => {
        if (index === -1) {
            formRef.current?.resetForm(); 
        }
    }, []);

    const { CreateMutation, loading ,updateMutation} = useCreateConsumer(closeSheet);

    const onsubmit = (data: ConsumerFormValues | ConsumerEditFormValues) => {

      if(!props.consumer){
      CreateMutation({
        name: data.name,
        password: data?.password ??"",
        phone_number: data.phone_number,
        username: data.username,
      })
    }else{
      updateMutation({data: {
        name: data.name,
        password: data?.password ??"",
        phone_number: data.phone_number,
        username: data.username,
      },id:props.consumer?.id})
    }}


    return (
      <BottomSheet
        backgroundStyle={{
          backgroundColor: theme.background,
        }}
        ref={ref}
        index={-1}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        enablePanDownToClose={true}
        onChange={handleSheetChanges}
        keyboardBehavior="interactive"
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>
            Iste'molchi Qo'shish
          </Text>
          <TouchableOpacity onPress={closeSheet} style={styles.closeBtn}>
            <AntDesign name="close" size={24} color={theme.text} />
          </TouchableOpacity>
        </View>
        <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
          <CreateConsumerForm loading={loading} onSubmit={onsubmit} consumer={props.consumer??null} ref={formRef}/>
        </BottomSheetScrollView>
      </BottomSheet>
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
