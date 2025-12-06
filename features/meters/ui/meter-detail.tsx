import { Colors } from "@/shared/constants/theme";
import { useThemeColors } from "@/shared/hooks/use-theme";
import DeleteModal from "@/shared/ui/delete-modal";
import { AntDesign } from "@expo/vector-icons";
import {
  BottomSheetBackdrop,
  BottomSheetModal
} from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Meter } from "../model/types";
import { CommandsList } from "./commands-list";

interface Props {
  meter: Meter | null;
}



export const MeterDetail = React.forwardRef<BottomSheetModal, Props>(
  ({ meter }, ref) => {
    const [deleteModalVisible,setDeleteModalVisible] = useState({open:false,path:""});
    const snapPoints = useMemo(() => ["60%", "90%"], []);
    const theme = useThemeColors();


    const router = useRouter()
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

    const getIcon = () => {
      switch (meter?.type) {
        case "gas":
          return "fire";
        case "water":
          return "water";
        default:
          return "lightning-bolt";
      }
    };

    const getIconColor = () => {
      switch (meter?.type) {
        case "gas":
          return "#F6A623";
        case "water":
          return "#2FBF68";
        default:
          return Colors.primary;
      }
    };

    return (
      <>
     
     
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
            Hisoblagich ma'lumoti
          </Text>
          <TouchableOpacity onPress={closeSheet} style={styles.closeBtn}>
            <AntDesign name="close" size={24} color={theme.text} />
          </TouchableOpacity>
        </View>

        <CommandsList 
          meter={meter}
          theme={theme}
          getIcon={getIcon}
          getIconColor={getIconColor}
          closeSheet={closeSheet}
          router={router}
          setDeleteModalVisible={setDeleteModalVisible}
        />
      </BottomSheetModal>
       <DeleteModal visible={deleteModalVisible} onchange={setDeleteModalVisible} queryKey="get-meters"/>
      </>
    );

  }
);

// EL-MN-2003

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
  infoCard: {
    marginBottom: 24,
  },
  infoHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  meterNumber: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
  },
  subText: {
    fontSize: 13,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
  },
  readingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: 13,
    marginBottom: 4,
  },
  value: {
    fontSize: 20,
    fontWeight: "800",
  },
  actions: {
    flexDirection: "row",
    gap: 12,
  },
  actionBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 16,
  },
  historyList: {},
  dateHeader: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 12,
  },
  historyItem: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  historyTitle: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 6,
  },
  historyTime: {
    fontSize: 13,
    marginBottom: 8,
  },
  historyDesc: {
    fontSize: 14,
    marginBottom: 8,
    lineHeight: 20,
  },
  historyComment: {
    fontSize: 13,
    fontStyle: "italic",
  },
});