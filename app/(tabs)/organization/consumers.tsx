import { ConsumersHeader } from "@/features/organization/ui/consumers/consumer-header";
import { ConsumesList } from "@/features/organization/ui/consumers/consumers-list";
import { Colors } from "@/shared/constants/theme";
import { useThemeColors } from "@/shared/hooks/use-theme";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
export default function ConsumersScreen() {
  const router = useRouter();
  const theme = useThemeColors();
  return (
    <>
      <ConsumersHeader />
      <ScrollView style={{ paddingHorizontal: 16 }}>
        <ConsumesList />
      </ScrollView>
      <TouchableOpacity
        style={[
          styles.addBtn,
          { backgroundColor: theme.surface, shadowColor: theme.shadow },
        ]}
        onPress={() => router.push("/(tabs)/organization/create-consumer")}
      >
        <AntDesign name="plus" size={24} color={Colors.primary} />
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  addBtn: {
    position: "absolute",
    // padding: 16,
    bottom: 30,
    right: 30,
    padding: 20,
    borderRadius: 50,
    shadowOffset: { height: 1, width: 0 },
    shadowOpacity: 0.5,
    // borderWidth: 0.5,
    borderColor: Colors.primary,
  },
});
