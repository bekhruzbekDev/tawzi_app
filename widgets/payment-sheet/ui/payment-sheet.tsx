import { Colors } from "@/shared/constants/theme";
import { useThemeColors } from "@/shared/hooks/use-theme";
import { PaymentForm } from "@/widgets/payment-sheet/ui/payment-form";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { forwardRef, useCallback, useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { HistoryList } from "./history-list";

interface Props {
  isConsumer?: boolean;
}
export const PaymentSheet = forwardRef<BottomSheetModal, Props>(
  (props, ref) => {
    const theme = useThemeColors();
    const snapPoints = useMemo(() => ["60%", "90%"], []);
    const [activeTab, setActiveTab] = useState<"pay" | "history">("pay");

    const renderBackdrop = useCallback(
      (props: any) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          opacity={0.5}
          pressBehavior="close"
        />
      ),
      []
    );

    return (
      <BottomSheetModal
        ref={ref}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        backgroundStyle={{ backgroundColor: theme.surface }}
        handleIndicatorStyle={{ backgroundColor: theme.muted }}
      >
        <BottomSheetView style={styles.contentContainer}>
          {/* Header Title */}
          <Text style={[styles.sheetTitle, { color: theme.text }]}>
            To'lovlar
          </Text>

          {/* Tabs */}
          {!props.isConsumer && (
            <View
              style={[styles.tabContainer, { backgroundColor: theme.card }]}
            >
              <Pressable
                style={[
                  styles.tab,
                  activeTab === "pay" && { backgroundColor: Colors.primary },
                ]}
                onPress={() => setActiveTab("pay")}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === "pay"
                      ? { color: "white" }
                      : { color: theme.muted },
                  ]}
                >
                  To'lov qilish
                </Text>
              </Pressable>
              <Pressable
                style={[
                  styles.tab,
                  activeTab === "history" && {
                    backgroundColor: Colors.primary,
                  },
                ]}
                onPress={() => setActiveTab("history")}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === "history"
                      ? { color: "white" }
                      : { color: theme.muted },
                  ]}
                >
                  To'lovlar tarixi
                </Text>
              </Pressable>
            </View>
          )}
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          >
            <View style={{ marginTop: 20 }}>
              {activeTab === "pay" ? (
                <PaymentForm isConsumer={props.isConsumer} />
              ) : (
                <HistoryList />
              )}
            </View>
          </ScrollView>
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sheetTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
  },
  tabContainer: {
    flexDirection: "row",
    padding: 4,
    borderRadius: 12,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  tabText: {
    fontWeight: "600",
    fontSize: 14,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  payBtn: {
    height: 48,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  payBtnText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  historyItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  historyIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
});
