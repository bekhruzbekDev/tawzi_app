import { Colors } from "@/shared/constants/theme";
import { useThemeColors } from "@/shared/hooks/use-theme";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { NotificationFilter } from "../model/types";

interface Props {
  filter: NotificationFilter;
  setFilter: (data: NotificationFilter) => void;
}
export default function NotificationHead({ filter, setFilter }: Props) {
  const theme = useThemeColors();
  return (
    <View>
      <Text style={[styles.title, { color: theme.text }]}>
        Bildirishnomalar
      </Text>
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
    marginBottom: 16,
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
