import { useThemeColors } from "@/shared/hooks/use-theme";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Card } from "react-native-paper";

const demo = [
  {
    value: "200kvt",
    label: "Kunlik iste'mol",
    warning: "+10 % otgan oyga nisbatan",
    isWarning: true,
  },
  {
    value: "1000kvt",
    label: "Haftalik iste'mol",
    warning: "-10 % otgan oyga nisbatan",
    isWarning: false,
  },
  {
    value: "3000kvt",
    label: "Oylik iste'mol",
    warning: "-10 % otgan oyga nisbatan",
    isWarning: false,
  },
];
function OrganizationStatsList() {
  const theme = useThemeColors();
  return (
    <>
      <ScrollView style={styles.container} horizontal>
        {demo.map((item, i) => {
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
      <View></View>
    </>
  );
}

export default OrganizationStatsList;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    minHeight: 140,
    // borderWidth: 1,
  },
  card: {
    padding: 16,
    borderRadius: 16,
    height: 100,
    width: 220,
    // borderWidth: 1,
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
  },
});
