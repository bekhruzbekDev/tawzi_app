import { useThemeColors } from "@/shared/hooks/use-theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { AlertStatItem } from "../../model/dashboard/types";




interface Props {
  data:AlertStatItem[]
}
export default function AlertStats({data}:Props) {
  const theme = useThemeColors();

  return (
    <View style={[styles.container, { backgroundColor: theme.card, borderColor: theme.border }]}>
      {data.map((item, index) => (
        <View key={item.id}>
          <View style={styles.row}>
            <View style={styles.leftContent}>
              <View style={[styles.iconContainer, { backgroundColor: item.iconBgColor }]}>
                <Ionicons name={item.icon} size={20} color={item.iconColor} />
              </View>
              <Text style={[styles.label, { color: theme.text }]}>
                {item.label}
              </Text>
            </View>
            <Text style={[styles.value, { color: item.iconColor }]}>
              {item.value}ta
            </Text>
          </View>
          {index < data.length - 1 && (
            <View style={[styles.divider, { backgroundColor: theme.border }]} />
          )}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  leftContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  label: {
    fontSize: 15,
    fontWeight: "500",
    flex: 1,
  },
  value: {
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 8,
  },
  divider: {
    height: 1,
    marginVertical: 4,
  },
});
