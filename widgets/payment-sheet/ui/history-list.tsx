import { useThemeColors } from "@/shared/hooks/use-theme";
import { StyleSheet, Text, View } from "react-native";
import { getMeterColor, translateType } from "../model/constants";

export const HistoryList = () => {
  const theme = useThemeColors();
  const history = [
    { id: 1, date: "2023-10-25 14:30", amount: 50000, type: "electric" },
    { id: 2, date: "2023-10-20 09:15", amount: 120000, type: "gas" },
    { id: 3, date: "2023-09-15 11:00", amount: 35000, type: "water" },
  ];
  return (
    <View style={{ gap: 12 }}>
      {history.map((item) => (
        <View
          key={item.id}
          style={[styles.historyItem, { borderColor: theme.border }]}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <View
              style={[
                styles.historyIcon,
                { backgroundColor: getMeterColor(item.type) + "20" },
              ]}
            >
              {getMeterIcon(item.type, 18)}
            </View>
            <View>
              <Text style={{ color: theme.text, fontWeight: "600" }}>
                {translateType(item.type)}
              </Text>
              <Text style={{ color: theme.muted, fontSize: 12 }}>
                {item.date}
              </Text>
            </View>
          </View>
          <Text style={{ color: "#2FBF68", fontWeight: "700" }}>
            +{item.amount.toLocaleString()} so'm
          </Text>
        </View>
      ))}
    </View>
  );
};

const getMeterIcon = (type: string, size = 16) => {
  switch (type) {
    case "electric":
      return <Text style={{ fontSize: size }}>⚡️</Text>;
    case "gas":
      return <Text style={{ fontSize: size }}>🔥</Text>;
    case "water":
      return <Text style={{ fontSize: size }}>💧</Text>;
    default:
      return null;
  }
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sheetTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
  },
  tabContainer: {
    flexDirection: "row",
    padding: 4,
    borderRadius: 12,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  tabText: {
    fontWeight: "600",
    fontSize: 14,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  payBtn: {
    height: 48,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  payBtnText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  historyItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  historyIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
});
