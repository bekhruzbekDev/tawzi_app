import { Colors } from "@/shared/constants/theme";
import { useThemeColors } from "@/shared/hooks/use-theme";
import Feather from "@expo/vector-icons/Feather";
import { forwardRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Searchbar } from "react-native-paper";

interface Props {
  onFilterPress?: () => void;
  onFilterSelect?: (val: string) => void;
  activeFilter?: string | null;
  filterCount?: number;
  onChange?: (text: string) => void;
  value?: string;
  filterOptions?: { label: string; value: string }[];
}

export const ConsumersHeader = forwardRef<View, Props>(
  (
    {
      onFilterPress,
      filterCount = 0,
      onChange,
      value,
      onFilterSelect,
      activeFilter,
      filterOptions,
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
      <View style={[styles.header, { zIndex: 100 }]} ref={ref}>
        <Searchbar
          value={value ?? ""}
          onChangeText={onChange}
          style={{
            flex: 1,
            width: "auto",
            backgroundColor: theme.card,
            borderRadius: 16,
            color: "red",
            shadowOffset: { height: 0.1, width: 0 },
            shadowColor: theme.shadow,
          }}
          placeholderTextColor={theme.text}
          iconColor={theme.text}
          placeholder="Izlash"
        />
        <View style={{ position: "relative", zIndex: 100 }}>
          <TouchableOpacity
            style={[styles.filterBtn, { backgroundColor: theme.card }]}
            onPress={handlePress}
          >
            <Feather name="filter" size={24} color={Colors.primary} />
            {filterCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{filterCount}</Text>
              </View>
            )}
          </TouchableOpacity>
          {showFilter && filterOptions && (
            <View
              style={[
                styles.popup,
                { backgroundColor: theme.card, shadowColor: theme.shadow },
              ]}
            >
              {filterOptions.map((option, index) => (
                <View key={option.value}>
                  <TouchableOpacity
                    style={styles.filterItem}
                    onPress={() => {
                      onFilterSelect?.(option.value);
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
    marginBottom: 20,
    paddingHorizontal: 16,
    paddingTop: 16,
    zIndex: 10,
  },
  filterBtn: {
    paddingHorizontal: 20,
    height: 55,
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
    top: 65,
    right: 0,
    minWidth: 200,
    borderRadius: 12,
    padding: 8,
    shadowOffset: { height: 2, width: 0 },
    shadowOpacity: 0.1,
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
});
