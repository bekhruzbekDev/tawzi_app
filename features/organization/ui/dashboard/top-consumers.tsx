import { useThemeColors } from "@/shared/hooks/use-theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { ResourceType } from "./stats-list";



type ConsumerItem = {
  name: string
  total_meters: number
  total_consumption: number
};


type Props = {
  data: ConsumerItem[];
  resourceType?: ResourceType;
  onPress?: (item: ConsumerItem) => void;
};


const getResourceUnit = (type: ResourceType) => {
  switch (type) {
    case "electric":
      return "kVt";
    case "gas":
      return "m³";
    case "water":
      return "m³";
    default:
      return "";
  }
};

const getResourceLabel = (type: ResourceType) => {
  switch (type) {
    case "electric":
      return "Elektr";
    case "gas":
      return "Gaz";
    case "water":
      return "Suv";
    default:
      return "Elektr";
  }
};

export default function TopConsumers({ data, resourceType = "electric", onPress }: Props) {
  const theme = useThemeColors();
  
  // Limit to top 3 consumers
  const topThree = data.slice(0, 3);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>
          Iste'molchilar
        </Text>
        <Text style={[styles.headerSubtitle, { color: theme.muted }]}>
          Faol iste'molchilar va ularning holati
        </Text>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {topThree.map((item, index) => {
          const value = item.total_consumption
          const unit = getResourceUnit(resourceType);
          const label = getResourceLabel(resourceType);
          return (
            <View
              key={index}
              style={[
                styles.card,
                {
                  backgroundColor: theme.card,
                  borderColor: theme.border,
                  marginRight: index === topThree.length - 1 ? 16 : 12,
                },
              ]}
            >
              {/* Icon */}
              <View style={[styles.iconContainer, { backgroundColor: theme.surface }]}>
                <Ionicons name="business" size={24} color="#4A90E2" />
              </View>

              {/* Content */}
              <View style={styles.cardContent}>
                <Text style={[styles.consumerName, { color: theme.text }]} numberOfLines={1}>
                  {item.name}
                </Text>
                <Text style={[styles.accountCount, { color: theme.muted }]}>
                  {item.total_meters ?? 0} hisoblagich
                </Text>

                {/* Resource info */}
                <View style={styles.resourceInfo}>
                  <Text style={[styles.resourceLabel, { color: theme.muted }]}>
                    {label}
                  </Text>
                  <Text style={[styles.resourceValue, { color: theme.text }]}>
                    {formatNumber(value, resourceType === "electric" ? 0 : 0)} {unit}
                  </Text>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

function formatNumber(value: number, decimals = 0) {
  if (value == null) return "0";
  return Number(value).toFixed(decimals).replace(/\.0+$/, "");
}

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom:20
  },
  header: {
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    fontWeight: "400",
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 12,
  },
  card: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    width: 280,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  cardContent: {
    flex: 1,
  },
  consumerName: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
  },
  accountCount: {
    fontSize: 13,
    fontWeight: "400",
    marginBottom: 12,
  },
  resourceInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  resourceLabel: {
    fontSize: 13,
    fontWeight: "500",
  },
  resourceValue: {
    fontSize: 15,
    fontWeight: "700",
  },
});
