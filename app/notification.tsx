import { NotificationItem } from "@/features/notification/model/types";
import { useNotifications } from "@/features/notification/model/use-notification";
import NotificationHead from "@/features/notification/ui/notification-head";
import NotificationList from "@/features/notification/ui/notification-list";
import { useThemeColors } from "@/shared/hooks/use-theme";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { useMemo, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function NotificationScreen() {
  const { data, filter, setFilter } = useNotifications();
  const theme = useThemeColors();

  const [activeNotification, setActiveNotification] =
    useState<NotificationItem | null>(null);
  const sheetRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => ["50%"], []);

  const openDetails = (item: NotificationItem) => {
    setActiveNotification(item);
    sheetRef.current?.present();
  };

  const closeDetails = () => {
    sheetRef.current?.dismiss();
    setActiveNotification(null);
  };

  return (
    <View style={[styles.screen, { backgroundColor: theme.background }]}>
      <NotificationHead filter={filter} setFilter={setFilter} />

      <NotificationList data={data} openDetail={openDetails} />
      <BottomSheetModal
        ref={sheetRef}
        snapPoints={snapPoints}
        onDismiss={closeDetails}
        backgroundStyle={[
          styles.sheetBackground,
          { backgroundColor: theme.card },
        ]}
        handleIndicatorStyle={[
          styles.sheetHandle,
          { backgroundColor: theme.sheetHandle },
        ]}
      >
        <BottomSheetView style={styles.sheetContent}>
          <View style={styles.sheetHeader}>
            <Text style={[styles.sheetTitle, { color: theme.text }]}>
              {activeNotification?.title}
            </Text>
            <Text style={[styles.sheetDate, { color: theme.muted }]}>
              {activeNotification?.createdAt}
            </Text>
          </View>
          <Text style={[styles.sheetBody, { color: theme.text }]}>
            {activeNotification?.body}
          </Text>
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 32,
  },
  sheetBackground: {
    backgroundColor: "#fff",
    borderRadius: 24,
  },
  sheetHandle: {
    width: 40,
    backgroundColor: "#e5e7eb",
  },
  sheetContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  sheetHeader: {
    gap: 4,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  sheetDate: {
    fontSize: 12,
    color: "#9ca3af",
  },
  sheetBody: {
    fontSize: 16,
    lineHeight: 22,
    color: "#4b5563",
  },
});
