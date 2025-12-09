import { HistoryItem } from "@/features/consumer/ui/history/history-item";
import { UtilityTabs } from "@/features/consumer/ui/history/utility-tabs";
import { useThemeColors } from "@/shared/hooks/use-theme";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

const MOCK_DATA = {
  electric: [
    { id: 1, date: "02.12.2025", amount: "200 000 so'm" },
    { id: 2, date: "29.11.2025", amount: "50 000 so'm" },
    { id: 3, date: "22.11.2025", amount: "110 000 so'm" },
    { id: 4, date: "14.11.2025", amount: "100 000 so'm" },
    { id: 5, date: "12.11.2025", amount: "100 000 so'm" },
  ],
  gas: [
    { id: 1, date: "01.12.2025", amount: "45 000 so'm" },
    { id: 2, date: "25.11.2025", amount: "30 000 so'm" },
    { id: 3, date: "15.11.2025", amount: "20 000 so'm" },
  ],
  water: [
    { id: 1, date: "03.12.2025", amount: "15 000 so'm" },
    { id: 2, date: "20.11.2025", amount: "12 000 so'm" },
    { id: 3, date: "10.11.2025", amount: "18 000 so'm" },
  ],
};

export default function ConsumerHistoryScreen() {
  const [selectedTab, setSelectedTab] = useState<string>("electric");
  const theme = useThemeColors();

  // @ts-ignore
  const data = MOCK_DATA[selectedTab] || [];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <UtilityTabs selectedTab={selectedTab} onSelect={setSelectedTab} />
      </View>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {data.map((item: any) => (
          <HistoryItem key={item.id} date={item.date} amount={item.amount} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
});
