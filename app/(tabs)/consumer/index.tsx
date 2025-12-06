import ConsumerCurrentValue from "@/features/consumer/ui/current-value";
import ConsumerHeader from "@/features/consumer/ui/header";
import ConsumerMeterInfo from "@/features/consumer/ui/meter-info";
import { useThemeColors } from "@/shared/hooks/use-theme";
import { ScrollView, StyleSheet } from "react-native";

export default function ConsumerDashboard() {
  const theme = useThemeColors();
  return (
    <ScrollView
      style={[styles.screen, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <ConsumerHeader />
      <ConsumerCurrentValue />
      <ConsumerMeterInfo />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 32,
    gap: 16,
  },
});
