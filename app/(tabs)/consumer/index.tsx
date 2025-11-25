import ConsumerCurrentValue from "@/features/consumer/ui/current-value";
import ConsumerHeader from "@/features/consumer/ui/header";
import ConsumerMeterInfo from "@/features/consumer/ui/meter-info";
import { StyleSheet, View } from "react-native";

export default function ConsumerDashboard() {
  return (
    <View style={styles.container}>
      <ConsumerHeader />
      <ConsumerCurrentValue />
      <ConsumerMeterInfo />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});
