import { Colors } from "@/shared/constants/theme";
import { useThemeColors } from "@/shared/hooks/use-theme";
import DeleteModal from "@/shared/ui/delete-modal";
import { AntDesign, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button } from "react-native-paper";
import { Meter } from "../model/types";

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

        <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
          {/* Meter Info Card */}
          <View style={styles.infoCard}>
            <View style={styles.infoHeader}>
              <View
                style={[styles.iconBox, { backgroundColor: theme.surface }]}
              >
                <MaterialCommunityIcons
                  name={getIcon()}
                  size={24}
                  color={getIconColor()}
                />
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={[styles.meterNumber, { color: theme.text }]}>
                  {meter?.serial_number}
                </Text>
                <Text style={[styles.subText, { color: theme.muted }]}>
                  {meter?.type === "electric"
                    ? "Elektr"
                    : meter?.type === "gas"
                    ? "Gaz"
                    : "Suv"}{" "}
                  •{" "}
                  {meter?.meter_direction === "incoming" ? "Kiruvchi" : "Chiquvchi"}
                </Text>
              </View>
              <View style={[styles.badge, { borderColor: theme.border }]}>
                <Feather
                  name="check-circle"
                  size={14}
                  color={theme.text}
                />
                <Text style={[styles.badgeText, { color: theme.text }]}>
                  Faol
                </Text>
              </View>
            </View>

            <View style={styles.readingRow}>
              <View>
                <Text style={[styles.label, { color: theme.muted }]}>
                  Joriy ko'rsatkich
                </Text>
                <Text style={[styles.value, { color: theme.text }]}>
                  {meter?.current_reading} kVt
                </Text>
              </View>
              <View style={styles.actions}>
                <TouchableOpacity
                  style={[
                    styles.actionBtn,
                    { borderColor: theme.border, backgroundColor: theme.surface },
                  ]}
                    onPress={()=>{closeSheet(),router.push({pathname:"/create-meter",params:{id:meter?.id,device_type:meter?.type}})}}
                >
                  <MaterialCommunityIcons
                    name="pencil"
                    size={20}
                    color={theme.text}

                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.actionBtn,
                    { borderColor: theme.border, backgroundColor: theme.surface },
                  ]}
                  onPress={()=>{setDeleteModalVisible({open:true,path:`devices/${meter?.type}/${meter?.id}/delete/`}),closeSheet()}}
                >
                  <Feather name="trash-2" size={20} color="#ef4444" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Yuborilgan Komandalar
          </Text>

          <View style={styles.historyList}>
            <Text style={[styles.dateHeader, { color: theme.text }]}>
              <Feather name="calendar" size={14} /> Bugun
            </Text>

            {/* Mock History Item 1 */}
            <View
              style={[
                styles.historyItem,
                { backgroundColor: theme.surface, borderColor: theme.border },
              ]}
            >
              <Text style={[styles.historyTitle, { color: theme.text }]}>
                test tomonidan buyruq yuborildi
              </Text>
              <Text style={[styles.historyTime, { color: theme.muted }]}>
                Yuborilgan vaqt 10:32
              </Text>
              <Text style={[styles.historyDesc, { color: theme.text }]}>
                Masofadan turib klapanni ochish, Amal qilish muddati 0 Kun, 23
                soat, 58 daqiqa qoldi
              </Text>
              <Text style={[styles.historyComment, { color: theme.muted }]}>
                Izoh tets
              </Text>
              <View style={{ alignItems: "flex-end", marginTop: 10 }}>
                <Button
                  mode="contained"
                  onPress={() => {}}
                  style={{ borderRadius: 8, backgroundColor: Colors.primary }}
                  labelStyle={{ fontSize: 12 }}
                >
                  Bekor qilish
                </Button>
              </View>
            </View>

            {/* Mock History Item 2 */}
            <View
              style={[
                styles.historyItem,
                { backgroundColor: theme.surface, borderColor: theme.border },
              ]}
            >
              <Text style={[styles.historyTitle, { color: theme.text }]}>
                test tomonidan buyruq yuborildi
              </Text>
              <Text style={[styles.historyTime, { color: theme.muted }]}>
                Yuborilgan vaqt 10:32
              </Text>
            </View>
          </View>
        </BottomSheetScrollView>
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