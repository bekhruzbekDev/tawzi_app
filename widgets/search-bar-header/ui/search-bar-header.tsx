import { Colors } from "@/shared/constants/theme";
import { useThemeColors } from "@/shared/hooks/use-theme";
import Feather from "@expo/vector-icons/Feather";
import { forwardRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface Props {
  onFilterPress?: () => void;
  onFilterSelect?: (val: "is_notified" | "is_debtor") => void;
  activeFilter?: "is_notified" | "is_debtor" | null;
  filterCount?: number;
  onChange?: (text: string) => void;
  value?: string;
  filterOptions?: { label: string; value: string }[];
  isCreteBtn?: boolean;
}

export const SearchBarHeader = forwardRef<View, Props>(
  (
    {
      onFilterPress,
      filterCount = 0,
      onChange,
      value,
      onFilterSelect,
      activeFilter,
      filterOptions,
      isCreteBtn,
    },
    ref
  ) => {
    const theme = useThemeColors();
    const [showFilter, setShowFilter] = useState(false);

    const handlePress = () => {
      if (filterOptions && filterOptions.length > 0) {
        setShowFilter(!showFilter);
      } else {
        onFilterPress?.();
      }
    };

    return (
      <View style={[styles.header]} ref={ref}>
        <View style={[styles.searchContainer, { backgroundColor: theme.card }]}>
          <Feather name="search" size={20} color={theme.muted} />
          <TextInput
            placeholder="Qidirish..."
            placeholderTextColor={theme.muted}
            style={[styles.searchInput, { color: theme.text }]}
            value={value}
            onChangeText={onChange}
          />
        </View>
        <View style={{ position: "relative" }}>
          <TouchableOpacity
            style={[styles.filterBtn, { backgroundColor: theme.card }]}
            onPress={handlePress}
          >
            {isCreteBtn ? (
              <Feather name="plus" size={24} color={Colors.primary} />
            ) : (
              <Feather name="filter" size={24} color={Colors.primary} />
            )}
            {filterCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{filterCount}</Text>
              </View>
            )}
          </TouchableOpacity>
          {!isCreteBtn && showFilter && filterOptions && (
            <View
              style={[
                styles.popup,
                {
                  backgroundColor: theme.card,
                  shadowColor: theme.shadow,
                  borderColor: theme.border,
                  borderWidth: 1,
                },
              ]}
            >
              {filterOptions.map((option, index) => (
                <View key={option.value}>
                  <TouchableOpacity
                    style={styles.filterItem}
                    onPress={() => {
                      onFilterSelect?.(
                        option.value as "is_notified" | "is_debtor"
                      );
                      setShowFilter(false);
                    }}
                  >
                    <Text style={[styles.filterText, { color: theme.text }]}>
                      {option.label}
                    </Text>
                    {activeFilter === option.value && (
                      <Feather name="check" size={18} color={Colors.primary} />
                    )}
                  </TouchableOpacity>
                  {index < filterOptions.length - 1 && (
                    <View
                      style={[
                        styles.divider,
                        { backgroundColor: theme.border },
                      ]}
                    />
                  )}
                </View>
              ))}
            </View>
          )}
        </View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingTop: 12,
    // zIndex: 10,
  },
  filterBtn: {
    paddingHorizontal: 20,
    height: 48,
    borderRadius: 12,
    alignContent: "center",
    justifyContent: "center",
  },
  badge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#fff",
  },
  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
  popup: {
    position: "absolute",
    top: 55,
    right: 0,
    minWidth: 200,
    borderRadius: 12,
    padding: 8,
    shadowOffset: { height: 2, width: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 1000,
  },
  filterItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  filterText: {
    fontSize: 14,
    fontWeight: "500",
  },
  divider: {
    height: 1,
    width: "100%",
    opacity: 0.1,
  },
  searchContainer: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
});
