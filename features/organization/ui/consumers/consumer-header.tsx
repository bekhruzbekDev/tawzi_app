import { Colors } from "@/shared/constants/theme";
import { useThemeColors } from "@/shared/hooks/use-theme";
import Feather from "@expo/vector-icons/Feather";
import { forwardRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Searchbar } from "react-native-paper";

interface Props {
  onFilterPress?: () => void;
  filterCount?: number;
  onChange?:(text:string)=>void
  value?:string
}

export const ConsumersHeader = forwardRef<View, Props>(({ onFilterPress, filterCount = 0,onChange,value }, ref) => {
  const theme = useThemeColors();
  

  
  return (
    <View style={[styles.header]} ref={ref}>
      <Searchbar
        value={value??""}
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
      <TouchableOpacity
        style={[styles.filterBtn, { backgroundColor: theme.card }]}
        onPress={onFilterPress}
      >
        <Feather name="filter" size={24} color={Colors.primary} />
        {filterCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{filterCount}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 20,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  filterBtn: {
    // width: 60,
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
});
