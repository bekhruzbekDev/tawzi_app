import { Colors } from "@/shared/constants/theme";
import { useThemeColors } from "@/shared/hooks/use-theme";
import { TabBtns } from "@/shared/ui/tab-btns";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  unitType: string;
  setUnitType: (unitType: string) => void;
  deviceTypes: string[];
}
export const OrgDashboardHeader = ({
  unitType,
  setUnitType,
  deviceTypes,
}: Props) => {
  const router = useRouter();
  const theme = useThemeColors();
  return (
    <View style={styles.container}>
      <View style={styles.unitRow}>
        {deviceTypes.length > 1 && (
          <TabBtns
            data={deviceTypes.map((item) => ({
              value: item.toLowerCase(),
              label: item,
            }))}
            defaultValue={unitType}
            onChange={(value) => setUnitType(value)}
          />
        )}

        <View style={{ position: "relative", flexDirection: "row", gap: 16 }}>
          <View
            style={[
              styles.notificationData,
              { backgroundColor: Colors.primary },
            ]}
          >
            <Text style={{ fontSize: 12, color: "white" }}>2</Text>
          </View>
          <FontAwesome
            name="user"
            size={30}
            color={Colors.primary}
            onPress={() => router.push("/(tabs)/public/profile")}
          />
          <Ionicons
            name="notifications"
            size={30}
            color={theme.text}
            onPress={() => router.push("/notification")}
          />
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
