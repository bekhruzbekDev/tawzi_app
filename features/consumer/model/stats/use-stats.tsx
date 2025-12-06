import { useState } from "react";
import { StyleSheet, Text } from "react-native";

export const useStats = () => {
  const [toggleDay, setToggleDay] = useState<"monthly" | "daily">("daily");
  const [unitType, setUnitType] = useState<"kv" | "sum">("kv");

  const filterDataChange = (key: "day" | "unit", data: any) => {
    if (key == "unit") return setUnitType(data);
    setToggleDay(data);
  };

  const data: any[] = [
    {
      value: 120,
      label: "Yan",
      topLabelComponent: () => <Text style={styles.barTopLabel}>120</Text>,
      frontColor: "#22C55E",
    },
    {
      value: 800,
      label: "Fev",
      topLabelComponent: () => <Text style={styles.barTopLabel}>800</Text>,
      frontColor: "#22C55E",
    },
    {
      value: 185,
      label: "Mart",
      topLabelComponent: () => <Text style={styles.barTopLabel}>185</Text>,
      frontColor: "#22C55E",
    },
    {
      value: 350,
      label: "Apr",
      topLabelComponent: () => <Text style={styles.barTopLabel}>350</Text>,
      frontColor: "#22C55E",
    },
    {
      value: 2100,
      label: "May",
      topLabelComponent: () => <Text style={styles.barTopLabel}>2100</Text>,
      frontColor: "#22C55E",
    },
    {
      value: 1000,
      label: "Iyn",
      topLabelComponent: () => <Text style={styles.barTopLabel}>1000</Text>,
      frontColor: "#22C55E",
    },
    {
      value: 1500,
      label: "Iyl",
      topLabelComponent: () => <Text style={styles.barTopLabel}>1500</Text>,
      frontColor: "#22C55E",
    },
    {
      value: 1020,
      label: "Avg",
      topLabelComponent: () => <Text style={styles.barTopLabel}>1020</Text>,
      frontColor: "#22C55E",
    },
    {
      value: 1000,
      label: "Sen",
      topLabelComponent: () => <Text style={styles.barTopLabel}>1020</Text>,
      frontColor: "#22C55E",
    },
  ];
  return { toggleDay, unitType, filterDataChange, data };
};

const styles = StyleSheet.create({
  barTopLabel: {
    width: 38,
    left: -6,
    top: -1,

    display: "flex",

    textAlign: "center",
    backgroundColor: "#d0d2d7bd",
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
    color: "#111827",
    fontSize: 10,
    fontWeight: "500",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    position: "absolute",
  },
});
