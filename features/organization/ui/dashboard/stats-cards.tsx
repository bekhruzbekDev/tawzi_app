import { useThemeColors } from "@/shared/hooks/use-theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

type StatCardItem = {
  id: string;
  title: string;
  value: number;
  icon: keyof typeof Ionicons.glyphMap;
};

const statsData: StatCardItem[] = [
  {
    id: "1",
    title: "Kruvchi Hisoblagichlar",
    value: 0,
    icon: "document-text",
  },
  {
    id: "2",
    title: "Jami iste'molchilar",
    value: 0,
    icon: "people",
  },
  {
    id: "3",
    title: "Chiquvchi hisoblagichlar",
    value: 0,
    icon: "speedometer",
  },
];

export default function StatsCards() {
  const theme = useThemeColors();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
      style={styles.container}
    >
      {statsData.map((item, index) => (
        <View
          key={item.id}
          style={[
            styles.card,
            {
              backgroundColor: theme.card,
              borderColor: theme.border,
              marginRight: index === statsData.length - 1 ? 16 : 12,
            },
          ]}
        >
          <View style={styles.cardContent}>
            <View style={styles.textContainer}>
              <Text style={[styles.title, { color: theme.muted }]}>
                {item.title}
              </Text>
              <View style={styles.valueContainer}>
                <Text style={[styles.value, { color: theme.text }]}>
                  {item.value}
                </Text>
                <Text style={[styles.unit, { color: theme.text }]}>ta</Text>
              </View>
            </View>
            <View style={styles.iconContainer}>
              <Ionicons name={item.icon} size={24} color="#4A90E2" />
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 12,
  },
  card: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    width: 280,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 12,
  },
  valueContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 4,
  },
  value: {
    fontSize: 32,
    fontWeight: "700",
  },
  unit: {
    fontSize: 16,
    fontWeight: "500",
  },
  iconContainer: {
    backgroundColor: "#E8F2FF",
    borderRadius: 50,
    width: 56,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
  },
});
