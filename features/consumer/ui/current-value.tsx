import { Colors } from "@/shared/constants/theme";
import { useThemeColors } from "@/shared/hooks/use-theme";
import { StyleSheet, Text, View } from "react-native";

export default function ConsumerCurrentValue() {
  const theme = useThemeColors();
  return (
    <View style={style.container}>
      <View style={[style.hideEl, { backgroundColor: theme.background }]} />
      <View style={style.circle}>
        <Text style={[style.label, { color: theme.text }]}>
          Oldindan to'lov
        </Text>
        <Text style={[style.value, { color: theme.text }]}>200.000.00</Text>
        <Text style={[style.currency, { color: theme.text }]}>So'm</Text>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    // borderWidth: 1,
    alignItems: "center",
    paddingTop: 30,
    position: "fixed",
    top: 0,
    left: 0,
  },

  circle: {
    width: 350,
    height: 350,
    borderWidth: 3,
    borderRadius: "100%",
    borderColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  hideEl: {
    width: "100%",
    height: 60,
    // borderWidth: 1,
    position: "absolute",
    bottom: 0,
    zIndex: 1,
  },
  label: {
    fontSize: 18,
    marginBottom: 4,
  },
  value: {
    fontSize: 30,
    fontWeight: 500,
    marginBottom: 10,
  },
  currency: {
    fontSize: 22,
    fontWeight: 500,
  },
});
