import { Colors } from "@/shared/constants/theme";
import { useThemeColors } from "@/shared/hooks/use-theme";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
type NotificationItem = {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  isRead: boolean;
};

interface Props {
  data: NotificationItem[];
  openDetail: (data: NotificationItem) => void;
}
export default function NotificationList({ data, openDetail }: Props) {
  const theme = useThemeColors();
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Pressable
          style={[
            styles.card,
            {
              backgroundColor: theme.card,
              borderColor: theme.border,
            },
            !item.isRead && { borderColor: Colors.primary },
          ]}
          onPress={() => openDetail(item)}
        >
          <View style={styles.cardHeader}>
            <Text style={[styles.cardTitle, { color: theme.text }]}>
              {item.title}
            </Text>
            {!item.isRead && (
              <View
                style={[styles.badge, { backgroundColor: Colors.primary }]}
              />
            )}
          </View>
          <Text
            style={[styles.cardBody, { color: theme.muted }]}
            numberOfLines={2}
          >
            {item.body}
          </Text>
          <Text style={[styles.cardDate, { color: theme.muted }]}>
            {item.createdAt}
          </Text>
        </Pressable>
      )}
      ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={
        <View style={styles.emptyState}>
          <Text style={[styles.emptyTitle, { color: theme.text }]}>
            Ma'lumot yo'q
          </Text>
          <Text style={[styles.emptySubtitle, { color: theme.muted }]}>
            Tanlangan filtr bo'yicha bildirishnoma topilmadi.
          </Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  badge: {
    width: 8,
    height: 8,
    borderRadius: 8,
    backgroundColor: Colors.primary,
    marginLeft: 8,
  },
  cardTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
  },
  cardBody: {
    marginTop: 6,
  },
  cardDate: {
    marginTop: 10,
    fontSize: 12,
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 14,
    textAlign: "center",
  },
});
