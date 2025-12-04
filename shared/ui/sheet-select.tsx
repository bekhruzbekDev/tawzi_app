import { Ionicons } from "@expo/vector-icons";
import { BottomSheetBackdrop, BottomSheetFlatList, BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import {
    ActivityIndicator,
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
  onLoadMore?: () => void;
  hasMore?: boolean;
  isLoading?: boolean;
}

export default function BottomSheetSelect<T extends FieldValues>({
  label,
  placeholder = "Tanlang",
  items,
  name,
  control,
  error,
  onLoadMore,
  hasMore = false,
  isLoading = false,
}: BottomSheetSelectProps<T>) {
  const theme = useThemeColors();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const flatListRef = useRef<any>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const ITEM_HEIGHT = 56;

  const snapPoints = useMemo(() => ["40%"], []);

  const handleOpenSheet = useCallback(() => {
    setIsSheetOpen(true);
    bottomSheetModalRef.current?.present();
  }, []);

  const scrollToSelectedItem = useCallback((selectedValue: string) => {
    const selectedIndex = items.findIndex((item) => item.value === selectedValue);
    if (selectedIndex !== -1 && flatListRef.current) {
      // Delay to ensure FlatList is rendered
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({
          index: selectedIndex,
          animated: true,
          viewPosition: 0.5, // Center the item
        });
      }, 300);
    }
  }, [items]);

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

  const handleEndReached = useCallback(() => {
    if (hasMore && !isLoading && onLoadMore) {
      onLoadMore();
    }
  }, [hasMore, isLoading, onLoadMore]);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => {
        const selectedItem = items.find((item) => item.value === value);

        useEffect(() => {
          if (isSheetOpen && value) {
            scrollToSelectedItem(value);
          }
        }, [isSheetOpen, value]);

        const renderItem = useCallback(
          ({ item }: { item: { label: string; value: string } }) => {
            const isSelected = item.value === value;
            
            return (
              <Pressable
                onPress={() => {
                  onChange(item.value);
                  handleCloseSheet();
                }}
                style={({ pressed }) => [
                  styles.item,
                  {
                    backgroundColor: isSelected
                      ? Platform.OS === "ios"
                        ? "rgba(0, 122, 255, 0.1)"
                        : "rgba(33, 150, 243, 0.1)"
                      : pressed
                      ? "rgba(0, 0, 0, 0.03)"
                      : "transparent",
                    borderRadius: 12,
                  },
                ]}
              >
                <View style={styles.itemContent}>
                  {isSelected && (
                    <Ionicons
                      name="checkmark-circle"
                      size={22}
                      color={Colors.primary}
                      style={styles.checkIcon}
                    />
                  )}
                  <Text
                    style={[
                      styles.itemText,
                      {
                        color: isSelected ? Colors.primary : theme.text,
                        fontWeight: isSelected ? "600" : "400",
                      },
                    ]}
                  >
                    {item.label}
                  </Text>
                </View>
              </Pressable>
            );
          },
          [value, onChange, handleCloseSheet, theme]
        );

        const renderFooter = useCallback(() => {
          if (!hasMore && !isLoading) return null;

          return (
            <View style={styles.footer}>
              {isLoading && (
                <ActivityIndicator
                  size="small"
                  color={Colors.primary}
                  style={styles.loader}
                />
              )}
            </View>
          );
        }, [hasMore, isLoading]);

        return (
          <View style={styles.container}>
            {label && (
              <Text style={[styles.label, { color: theme.muted }]}>{label}</Text>
            )}

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
              <View style={styles.sheetHeader}>
                <Pressable onPress={handleCloseSheet} style={styles.closeButton}>
                  <Ionicons name="close" size={24} color={theme.text} />
                </Pressable>
                <Text style={[styles.sheetTitle, { color: theme.text }]}>
                  {label || "Tanlang"}
                </Text>
                <View style={styles.closeButton} />
              </View>

              <BottomSheetFlatList
                ref={flatListRef}
                data={items}
                keyExtractor={(item: { label: string; value: string }) => item.value}
                renderItem={renderItem}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={true}
                indicatorStyle={Platform.OS === "ios" ? "default" : "black"}
                onEndReached={handleEndReached}
                onEndReachedThreshold={0.5}
                ListFooterComponent={renderFooter}
                ItemSeparatorComponent={() => (
                  <View style={styles.separator} />
                )}
                ListEmptyComponent={() => (
                  <View style={styles.emptyContainer}>
                    <Text style={[styles.emptyText, { color: theme.muted }]}>
                      Ma'lumot topilmadi
                    </Text>
                  </View>
                )}
                getItemLayout={(_data: any, index: number) => ({
                  length: ITEM_HEIGHT,
                  offset: ITEM_HEIGHT * index,
                  index,
                })}
                onScrollToIndexFailed={(info: { index: number; averageItemLength: number }) => {
                  const wait = new Promise((resolve) => setTimeout(resolve, 500));
                  wait.then(() => {
                    flatListRef.current?.scrollToIndex({
                      index: info.index,
                      animated: true,
                      viewPosition: 0.5,
                    });
                  });
                }}
              />
            </BottomSheetModal>
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
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
  sheetHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
  },
  sheetTitle: {
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
    textAlign: "center",
  },
  closeButton: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  listContent: {
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  item: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginVertical: 2,
    height: 56,
  },
  itemContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  itemText: {
    fontSize: 16,
    textAlign: "center",
  },
  checkIcon: {
    marginRight: 4,
  },
  separator: {
    height: 8,
  },
  footer: {
    paddingVertical: 20,
    alignItems: "center",
  },
  loader: {
    marginVertical: 8,
  },
  emptyContainer: {
    paddingVertical: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    fontSize: 15,
    textAlign: "center",
  },
});