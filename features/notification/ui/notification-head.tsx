import { Colors } from "@/shared/constants/theme";
import { useThemeColors } from "@/shared/hooks/use-theme";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { NotificationFilter } from "../model/types";

interface Props {
  filter: NotificationFilter;
  setFilter: (data: NotificationFilter) => void;
}
export default function NotificationHead({ filter, setFilter }: Props) {
  const theme = useThemeColors();
  const router = useRouter();
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 24,
          marginBottom: 20,
        }}
      >
        <Pressable onPress={() => router.back()}>
          <Feather name="chevron-left" size={24} color={theme.text} />
        </Pressable>
        <Text style={[styles.title, { color: theme.text }]}>
          Bildirishnomalar
        </Text>
      </View>
      <View style={styles.filterRow}>
        {(["all", "unread", "read"] as NotificationFilter[]).map((item) => {
          const isActive = filter === item;
          return (
            <Pressable
              key={item}
              onPress={() => setFilter(item)}
              style={[
                styles.filterChip,
                {
                  backgroundColor: theme.card,
                  borderColor: theme.border,
                },
                isActive && {
                  backgroundColor: Colors.primary,
                  borderColor: Colors.primary,
                },
              ]}
            >
              <Text
                style={[
                  styles.filterLabel,
                  { color: theme.muted },
                  isActive && styles.filterLabelActive,
                ]}
              >
                {item === "all"
                  ? "Barchasi"
                  : item === "unread"
                  ? "O'qilmagan"
                  : "O'qilgan"}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "600",
  },
  filterRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  filterChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  filterLabel: {
    fontSize: 14,
  },
  filterLabelActive: {
    color: "#fff",
    fontWeight: "600",
  },
});
