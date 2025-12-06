import { Colors } from "@/shared/constants/theme";
import { useThemeColors } from "@/shared/hooks/use-theme";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {
  toggleDay: string;
  unitType: string;
  change: (key: "day" | "unit", data: string) => void;
}
export default function ConsumerStatsTopFilter({
  toggleDay,
  unitType,
  change,
}: Props) {
  const theme = useThemeColors();
  return (
    <>
      <View style={styles.toggleRow}>
        <View style={[styles.segment, { backgroundColor: theme.card }]}>
          <TouchableOpacity
            style={[
              styles.segmentBtn,
              toggleDay == "daily" && { backgroundColor: Colors.primary },
            ]}
            onPress={() => change("day", "daily")}
          >
            <Text
              style={[
                styles.segmentText,

                toggleDay == "daily"
                  ? { color: "#fff" }
                  : { color: theme.text },

                ,
              ]}
            >
              День
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.segmentBtn,
              toggleDay == "monthly" && { backgroundColor: Colors.primary },
            ]}
            onPress={() => change("day", "monthly")}
          >
            <Text
              style={[
                styles.segmentText,
                toggleDay == "monthly"
                  ? { color: "#fff" }
                  : { color: theme.text },
                ,
              ]}
            >
              Месяц
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.unitRow}>
        <View style={styles.unitPills}>
          <TouchableOpacity
            style={[
              styles.unitPill,
              unitType == "kv" && { backgroundColor: Colors.primary },
            ]}
            onPress={() => change("unit", "kv")}
          >
            <Text
              style={[styles.unitText, unitType == "kv" && { color: "#fff" }]}
            >
              kB
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.unitPill,
              unitType == "sum" && { backgroundColor: Colors.primary },
            ]}
            onPress={() => change("unit", "sum")}
          >
            <Text
              style={[styles.unitText, unitType == "sum" && { color: "#fff" }]}
            >
              Сум
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.yearText}>2025 г.</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F8FAFC" },
  container: { padding: 16, alignItems: "center" },
  toggleRow: {
    width: "100%",
    marginTop: 8,
    // alignItems: "center",
  },
  segment: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 4,
    width: "100%",
    elevation: 2,
    // shadowOpacity: 0.2,
    // shadowRadius: 6,
    // shadowOffset: { height: 3, width: 0 },
  },
  segmentBtn: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 12,
  },
  segmentActive: {
    backgroundColor: "#0ea5e9",
    shadowColor: "#0ea5e9",
  },
  segmentText: { fontSize: 14 },
  segmentActiveText: { color: "#fff", fontWeight: "600" },

  energyRow: {
    flexDirection: "row",
    width: "100%",
    marginTop: 16,
    justifyContent: "space-between",
  },
  pill: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 10,
    marginRight: 8,
    borderRadius: 20,
    alignItems: "center",
  },
  pillActive: {
    backgroundColor: "#0ea5e9",
  },
  pillText: { color: "#6B7280", fontSize: 14 },
  pillActiveText: { color: "#fff" },

  unitRow: {
    marginTop: 16,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  unitPills: { flexDirection: "row" },
  unitPill: {
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  unitActive: { backgroundColor: "#60A5FA" },
  unitText: { color: "#6B7280" },
  unitActiveText: { color: "#fff" },

  yearText: { color: "#9CA3AF", fontSize: 13 },
});
