import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

export default function ConsumerMeterInfo() {
  return (
    <View style={styles.container}>
      {/* Meter Info Card */}
      <View style={styles.card}>
        <View style={styles.rowBetween}>
          <View>
            <Text style={styles.label}>Показание счетчика</Text>
            <Text style={styles.value}>7 819 кВтч</Text>
          </View>

          <View style={{ alignItems: "flex-end" }}>
            <Text style={styles.label}>Статус счетчика</Text>

            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>Активный</Text>
            </View>

            <Text style={styles.dateText}>13.06.2024</Text>
          </View>
        </View>
      </View>

      {/* Last Payment Card */}
      <View style={styles.card}>
        <View style={styles.rowBetween}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            <MaterialIcons name="receipt-long" size={20} color="#4A4A4A" />
            <View>
              <Text style={styles.label}>Последняя оплата</Text>
              <Text style={styles.value}>150 000 сум</Text>
            </View>
          </View>

          <View>
            <Text style={styles.label}>Дата оплаты</Text>
            <Text style={styles.value}>12.06.2024</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // padding: 16,
    gap: 12,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { height: 2, width: 0 },
    elevation: 3,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 13,
    color: "#7B7B7B",
  },
  value: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 4,
    color: "#000",
  },
  statusBadge: {
    backgroundColor: "#3BC4A1",
    paddingVertical: 4,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginTop: 4,
  },
  statusText: {
    color: "white",
    fontSize: 13,
    fontWeight: "600",
  },
  dateText: {
    marginTop: 4,
    color: "#7B7B7B",
    fontSize: 12,
  },
});
