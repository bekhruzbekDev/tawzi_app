import { Colors } from "@/shared/constants/theme";
import { useThemeColors } from "@/shared/hooks/use-theme";
import { Ionicons } from "@expo/vector-icons";

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {
    unitType: string;
    setUnitType: (unitType: string) => void;
    deviceTypes: string[];
}
export const OrgDashboardHeader = ({unitType, setUnitType, deviceTypes}: Props) => {
  const theme = useThemeColors();
  return (
    <View style={styles.container}>
      <View style={styles.unitRow}>

        <View style={styles.unitPills}>
          {deviceTypes.length >1&&  deviceTypes.map((data) => (
            <TouchableOpacity
              key={data}
              style={[
                styles.unitPill,
                unitType == data.toLowerCase()
                  ? { backgroundColor: Colors.primary }
                  : { backgroundColor: theme.card },
              ]}
              onPress={() => setUnitType(data.toLocaleLowerCase())}
            >
              <Text
                style={[
                  styles.unitText,
                  unitType == data.toLowerCase() && { color: "#fff" },
                ]}
              >
                {data}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ position: "relative" }}>
          <View
            style={[
              styles.notificationData,
              { backgroundColor: Colors.primary },
            ]}
          >
            <Text style={{ fontSize: 12, color: "white" }}>2</Text>
          </View>
          <Ionicons name="notifications" size={30} color={theme.text} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    backdropFilter: "1",
  },
  unitRow: {
    marginTop: 16,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  unitPills: { flexDirection: "row" },
  unitPill: {
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  unitText: { color: "#6B7280" },
  notificationData: {
    paddingHorizontal: 7,
    paddingVertical: 4,
    zIndex: 1,
    borderRadius: "50%",
    position: "absolute",
    right: -3,
    top: -8,
  },
});
