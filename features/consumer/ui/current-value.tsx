import { Colors } from "@/shared/constants/theme";
import { StyleSheet, Text, View } from "react-native";

export default function ConsumerCurrentValue() {
  return (
    <View style={style.container}>
      <View style={style.hideEl} />
      <View style={style.circle}>
        <Text style={style.label}>Oldindan to'lov</Text>
        <Text style={style.value}>200.000.00</Text>
        <Text style={style.currency}>So'm</Text>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    // borderWidth: 1,
    alignItems: "center",
    paddingTop: 30,
    position: "relative",
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
    backgroundColor: "#f1f1f1",
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
