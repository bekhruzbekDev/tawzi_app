import { Colors } from "@/shared/constants/theme";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Text, View } from "react-native";
export default function ConsumerHeader() {
  return (
    <View style={styles.header}>
      <View style={styles.info_container}>
        <FontAwesome name="user-o" size={24} color="black" />
        <View>
          <Text style={styles.info_label}>Seria numer</Text>
          <Text style={styles.serial_number}>11223344567</Text>
        </View>
      </View>
      <Ionicons name="notifications" size={24} color={Colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  info_container: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  info_label: {
    fontSize: 14,
    color: "#64748b",
    marginBottom: 2,
  },

  serial_number: {
    fontSize: 18,
  },
});
