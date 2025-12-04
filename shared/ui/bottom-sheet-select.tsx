import { Ionicons } from "@expo/vector-icons";
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { Picker } from "@react-native-picker/picker";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Colors } from "../constants/theme";
import { useThemeColors } from "../hooks/use-theme";

interface BottomSheetSelectProps<T extends FieldValues> {
  label?: string;
  placeholder?: string;
  items: { label: string; value: string }[];
  name: Path<T>;
  control: Control<T>;
  error?: string;
}

export default function BottomSheetSelect<T extends FieldValues>({
  label,
  placeholder = "Tanlang",
  items,
  name,
  control,
  error,
}: BottomSheetSelectProps<T>) {
  const theme = useThemeColors();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [tempValue, setTempValue] = useState<string>("");
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // Set snap points - smaller for Android list view
  const snapPoints = useMemo(() => 
    Platform.OS === "ios" ? ["30%"] : ["50%"], 
  []);

  const handleOpenSheet = useCallback(() => {
    setIsSheetOpen(true);
    bottomSheetModalRef.current?.present();
  }, []);

  const handleCloseSheet = useCallback(() => {
    setIsSheetOpen(false);
    bottomSheetModalRef.current?.dismiss();
  }, []);

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
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => {
        const selectedItem = items.find((item) => item.value === value);

        // Sync tempValue with current value when sheet opens
        useEffect(() => {
          if (isSheetOpen) {
            setTempValue(value || items[0]?.value || "");
          }
        }, [isSheetOpen, value, items]);

        return (
          <View style={{ marginBottom: 20 }}>
            {label && (
              <Text style={[styles.label, { color: theme.muted }]}>{label}</Text>
            )}

            {/* Trigger Button */}
            <Pressable
              onPress={handleOpenSheet}
              style={({ pressed }) => [
                styles.trigger,
                {
                  borderColor: error ? "#ef4444" : theme.border,
                  backgroundColor: theme.surface,
                  opacity: pressed ? 0.7 : 1,
                },
              ]}
            >
              <Text
                style={[
                  styles.triggerText,
                  {
                    color: selectedItem ? theme.text : theme.muted,
                  },
                ]}
              >
                {selectedItem ? selectedItem.label : placeholder}
              </Text>
              <Ionicons name="chevron-down" size={20} color={theme.text} />
            </Pressable>

            {error && <Text style={styles.error}>{error}</Text>}

            {/* Bottom Sheet Modal */}
            <BottomSheetModal
              ref={bottomSheetModalRef}
              snapPoints={snapPoints}
              enablePanDownToClose={true}
              enableDynamicSizing={false}
              backdropComponent={renderBackdrop}
              handleIndicatorStyle={{
                backgroundColor: theme.muted,
                width: 40,
                height: 4,
              }}
              backgroundStyle={{
                backgroundColor: theme.surface,
              }}
            >
              <BottomSheetView style={styles.contentContainer}>
                {Platform.OS === "android" ? (
                  // Android: List view
                  <>
            <Text>test</Text>
                  </>
                ) : (
                  // iOS: Native Picker
                  <>
                    <View style={styles.header}>
                      <Pressable 
                        onPress={handleCloseSheet} 
                        style={styles.cancelButton}
                      >
                        <Text style={[styles.cancelText, { color: Colors.primary }]}>
                          Bekor qilish
                        </Text>
                      </Pressable>
                      <Text style={[styles.headerTitle, { color: theme.text }]}>
                        {label || "Tanlang"}
                      </Text>
                      <Pressable 
                        onPress={() => {
                          if (tempValue) {
                            onChange(tempValue);
                          }
                          handleCloseSheet();
                        }} 
                        style={styles.doneButton}
                      >
                        <Text style={[styles.doneText, { color: Colors.primary }]}>
                          Tayyor
                        </Text>
                      </Pressable>
                    </View>

                    <View style={styles.pickerContainer}>
                      <Picker
                        selectedValue={tempValue}
                        onValueChange={(itemValue) => setTempValue(itemValue)}
                        style={[
                          styles.picker,
                          { height: 180 }
                        ]}
                        itemStyle={[
                          styles.pickerItem,
                          { color: theme.text }
                        ]}
                      >
                        {items.map((item) => (
                          <Picker.Item
                            key={item.value}
                            label={item.label}
                            value={item.value}
                            color={theme.text}
                          />
                        ))}
                      </Picker>
                    </View>
                  </>
                )}
              </BottomSheetView>
            </BottomSheetModal>
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  label: {
    marginBottom: 8,
    fontSize: 14,
    fontWeight: "500",
  },
  trigger: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    minHeight: 56,
  },
  triggerText: {
    fontSize: 16,
    flex: 1,
  },
  error: {
    marginTop: 6,
    color: "#ef4444",
    fontSize: 13,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
    paddingBottom: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    flex: 1,
    textAlign: "center",
  },
  closeButton: {
    padding: 4,
  },
  cancelButton: {
    padding: 4,
  },
  cancelText: {
    fontSize: 16,
    fontWeight: "400",
  },
  doneButton: {
    padding: 4,
  },
  doneText: {
    fontSize: 16,
    fontWeight: "600",
  },
  scrollView: {
    flex: 1,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 4,
  },
  optionText: {
    fontSize: 16,
    flex: 1,
  },
  pickerContainer: {
    flex: 1,
  },
  picker: {
    width: "100%",
  },
  pickerItem: {
    fontSize: 18,
    height: 180,
  },
});
