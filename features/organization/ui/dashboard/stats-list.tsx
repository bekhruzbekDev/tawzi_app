import { useThemeColors } from "@/shared/hooks/use-theme";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Card } from "react-native-paper";
import { DashboardStats } from "../../model/dashboard/types";

export type ResourceType = "electric" | "gas" | "water";

interface OrganizationStatsListProps {
  resourceType?: ResourceType;
  data:{
    losses:string,
   stats: DashboardStats[]}
}


const getIconForType = (type: ResourceType) => {
  switch (type) {
    case "electric":
      return "flash";
    case "gas":
      return "flame";
    case "water":
      return "water";
    default:
      return "flash";
  }
};

const getGradientColors = (type: ResourceType): [string, string] => {
  switch (type) {
    case "electric":
      return ["#4A90E2", "#5BA3F5"];
    case "gas":
      return ["#FF6B6B", "#FF8E8E"];
    case "water":
      return ["#4ECDC4", "#6FE0D8"];
    default:
      return ["#4A90E2", "#5BA3F5"];
  }
};

const getResourceLabel = (type: ResourceType) => {
  switch (type) {
    case "electric":
      return "Elektr";
    case "gas":
      return "Gas";
    case "water":
      return "Suv";
    default:
      return "Elektr";
  }
};

function OrganizationStatsList({ resourceType = "electric",data }: OrganizationStatsListProps) {
  const theme = useThemeColors();
  const gradientColors = getGradientColors(resourceType);
  const iconName = getIconForType(resourceType);
  const resourceLabel = getResourceLabel(resourceType);


  const resourceLossValue = "0"; 

  return (
    <View>
      {/* Regular Cards ScrollView */}
      <ScrollView 
        style={styles.container} 
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {data.stats.map((item, i) => {
          return (
            <Card
              style={[
                styles.card,
                { backgroundColor: theme.card, marginRight: 20 },
              ]}
              key={item.label}
            >
              <Text style={[styles.cardLabel, { color: theme.muted }]}>
                {item.label}
              </Text>
              <Text style={[styles.cardValue, { color: theme.text }]}>
                {item.value}
              </Text>
              <Text
                style={[
                  styles.cardWarning,
                  { color: item.isWarning ? "red" : "green" },
                ]}
              >
                {item.warning}
              </Text>
            </Card>
          );
        })}
      </ScrollView>


      <View style={styles.resourceLossContainer}>
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientCard}
        >
          <View style={styles.cardContent}>
            <View style={styles.textContainer}>
              <Text style={styles.gradientCardTitle}>Resurs yo'qotishlari</Text>
              <Text style={styles.gradientCardLabel}>{resourceLabel}</Text>
              <Text style={styles.gradientCardValue}>{data.losses.slice(0,5)+" slice "}</Text>
            </View>
            <View style={styles.iconContainer}>
              <Ionicons name={iconName as any} size={32} color="rgba(255, 255, 255, 0.9)" />
            </View>
          </View>
        </LinearGradient>
      </View>
    </View>
  );
}

export default OrganizationStatsList;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    minHeight: 120,
  },
  resourceLossContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    marginBottom: 16,
  },
  gradientCard: {
    padding: 20,
    borderRadius: 16,
    height: 120,
    width: "100%",
    marginRight: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  cardContent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  textContainer: {
    flex: 1,
    justifyContent: "space-between",
    height: "100%",
  },
  iconContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  gradientCardTitle: {
    fontSize: 12,
    fontWeight: "500",
    color: "rgba(255, 255, 255, 0.7)",
    marginBottom: 4,
  },
  gradientCardLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "rgba(255, 255, 255, 0.9)",
    marginBottom: 8,
  },
  gradientCardValue: {
    fontSize: 32,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  card: {
    padding: 16,
    borderRadius: 16,
    height: 100,
    width: 220,
  },
  cardLabel: {
    fontSize: 12,
    fontWeight: 500,
    marginBottom: 10,
  },
  cardValue: {
    fontSize: 20,
    fontWeight: 600,
    marginBottom: 6,
  },
  cardWarning: {
    fontSize: 12,
    fontWeight: 500,
  }
});
