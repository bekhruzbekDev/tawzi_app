import { useThemeColors } from "@/shared/hooks/use-theme";
import { useStore } from "@/shared/store/store";
import DeleteModal from "@/shared/ui/delete-modal";
import { AntDesign, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Meter } from "../../model/meters/types";
import { CommandsList } from "./commands-list";

interface Props {
  meter: Meter | null;
}

export const MeterDetail = React.forwardRef<BottomSheetModal, Props>(
  ({ meter }, ref) => {
    const [deleteModalVisible, setDeleteModalVisible] = useState({
      open: false,
      path: "",
    });
    const snapPoints = useMemo(() => ["60%", "90%"], []);
    const theme = useThemeColors();
    const router = useRouter();
    const user = useStore((state) => state.user),
      isEdit =
        user?.role == "OrganizationAdmin"
          ? true
          : user?.permissions?.add_device_permission;
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
          <View style={styles.readingRow}>
            <View>
              <Text style={[styles.label, { color: theme.muted }]}>
                Joriy ko'rsatkich
              </Text>
              <Text style={[styles.value, { color: theme.text }]}>
                {meter?.current_reading} kVt
              </Text>
            </View>
            {isEdit && (
              <View style={styles.actions}>
                <TouchableOpacity
                  style={[
                    styles.actionBtn,
                    {
                      borderColor: theme.border,
                      backgroundColor: theme.surface,
                    },
                  ]}
                  onPress={() => {
                    closeSheet(),
                      router.push({
                        pathname: "/create-meter",
                        params: { id: meter?.id, device_type: meter?.type },
                      });
                  }}
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
                    {
                      borderColor: theme.border,
                      backgroundColor: theme.surface,
                    },
                  ]}
                  onPress={() => {
                    setDeleteModalVisible({
                      open: true,
                      path: `devices/${meter?.type}/${meter?.id}/delete/`,
                    }),
                      closeSheet();
                  }}
                >
                  <Feather name="trash-2" size={20} color="#ef4444" />
                </TouchableOpacity>
              </View>
            )}
          </View>

          <CommandsList
            meter={meter}
            theme={theme}
            closeSheet={closeSheet}
            router={router}
            setDeleteModalVisible={setDeleteModalVisible}
          />
        </BottomSheetModal>
        <DeleteModal
          visible={deleteModalVisible}
          onchange={setDeleteModalVisible}
          queryKey="get-meters"
        />
      </>
    );
  }
);
// EL-MN-2003
const styles = StyleSheet.create({
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

  readingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
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
});
