import { Colors } from "@/shared/constants/theme";
import { useThemeColors } from "@/shared/hooks/use-theme";
import Feather from "@expo/vector-icons/Feather";
import { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Searchbar } from "react-native-paper";
export const ConsumersHeader = () => {
  const theme = useThemeColors();
  const [changeText, setChangeText] = useState("");
  return (
    <View style={[styles.header]}>
      <Searchbar
        value={changeText}
        onChangeText={(text) => setChangeText(text)}
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
      >
        <Feather name="filter" size={24} color={Colors.primary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 20,
    paddingHorizontal: 16,
    paddingTop:16
  },
  filterBtn: {
    // width: 60,
    paddingHorizontal: 20,
    height: 55,
    borderRadius: 12,
    alignContent: "center",
    justifyContent: "center",
  },
});
