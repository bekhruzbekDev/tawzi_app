import { Colors } from "@/shared/constants/theme";
import { useThemeColors } from "@/shared/hooks/use-theme";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

type Consumer = {
  id: string;
  name: string;
  phone?: string;
  electricity?: number;
  gas?: number;
  water?: number;
  createdAt?: string;
};

const demoConsumers: Consumer[] = [
  {
    id: "c1",
    name: "2-fabrika",
    phone: "+998901234567",
    electricity: 32.04,
    gas: undefined,
    water: undefined,
    createdAt: "2025-09-24",
  },
  {
    id: "c2",
    name: "Markaziy Ombor",
    phone: "+998901234568",
    electricity: 210.34,
    gas: 12.5,
    water: 8.2,
    createdAt: "2025-07-12",
  },
  {
    id: "c3",
    name: "Markaziy Ombor",
    phone: "+998901234568",
    electricity: 210.34,
    gas: 12.5,
    water: 8.2,
    createdAt: "2025-07-12",
  },
];

export const ConsumesList = () => {
  return (
    <>
      {demoConsumers.map((c) => (
        <Card key={c.id} consumer={c} />
      ))}
    </>
  );
};

type CardProps = {
  consumer: Consumer;
  onEdit?: (e: GestureResponderEvent) => void;
  onDelete?: (e: GestureResponderEvent) => void;
};

const Card = ({ consumer, onEdit, onDelete }: CardProps) => {
  const theme = useThemeColors();

  return (
    <Pressable
      style={[
        styles.card,
        {
          backgroundColor: theme.card,
          borderColor: theme.border,
          shadowColor: theme.shadow ?? "#000",
        },
      ]}
      android_ripple={{ color: theme.surface ?? "#eee" }}
    >
      {/* Header: title + actions */}
      <View style={styles.header}>
        <View>
          <Text style={[styles.title, { color: theme.text }]}>
            {consumer.name}
          </Text>
          {consumer.phone ? (
            <Text style={[styles.phone, { color: theme.muted }]}>
              📞 {consumer.phone}
            </Text>
          ) : null}
        </View>

        <View style={styles.actions}>
          <Pressable
            onPress={onEdit ?? (() => console.log("edit", consumer.id))}
            style={[
              styles.iconBtn,
              { backgroundColor: theme.surface, borderColor: theme.border },
            ]}
          >
            <MaterialCommunityIcons
              name="lead-pencil"
              size={24}
              color={Colors.primary}
            />
          </Pressable>

          <Pressable
            onPress={onDelete ?? (() => console.log("delete", consumer.id))}
            style={[
              styles.iconBtn,
              { backgroundColor: theme.surface, borderColor: theme.border },
            ]}
          >
            <Feather name="trash-2" size={24} color="#ef4444" />
          </Pressable>
        </View>
      </View>

      <View style={[styles.sep, { borderTopColor: theme.border }]} />

      {/* Electricity block */}
      <View style={styles.row}>
        <Text style={[styles.rowLabel, { color: Colors.primary }]}>
          ⚡️ Elektr
        </Text>
        <View style={styles.rowCenter}>
          <Text style={[styles.subTitle, { color: theme.muted }]}>
            {consumer.electricity != null ? "Joriy Kursatkich" : ""}
          </Text>
          <Text style={[styles.value, { color: theme.text }]}>
            {consumer.electricity != null
              ? `${formatNum(consumer.electricity)} kVt`
              : "—"}
          </Text>
        </View>
      </View>

      <View style={[styles.sep, { borderTopColor: theme.border }]} />

      {/* Gas block */}
      <View style={styles.row}>
        <Text style={[styles.rowLabel, { color: "#F6A623" }]}>🔥 Gaz</Text>
        <Text style={[styles.rowText, { color: theme.muted }]}>
          {consumer.gas != null
            ? `${formatNum(consumer.gas)} m³`
            : "Hisoblagich mavjud emas"}
        </Text>
      </View>

      <View style={[styles.sep, { borderTopColor: theme.border }]} />

      {/* Water block */}
      <View style={styles.row}>
        <Text style={[styles.rowLabel, { color: "#2FBF68" }]}>💧 Suv</Text>
        <Text style={[styles.rowText, { color: theme.muted }]}>
          {consumer.water != null
            ? `${formatNum(consumer.water)} m³`
            : "Hisoblagich mavjud emas"}
        </Text>
      </View>

      <View style={[styles.sep, { borderTopColor: theme.border }]} />

      {/* Footer: created date */}
      <View style={styles.footer}>
        <Text style={[styles.dateText, { color: theme.muted }]}>
          📅 Yaratilgan sana: {consumer.createdAt ?? "-"}
        </Text>
      </View>
    </Pressable>
  );
};

function formatNum(v?: number) {
  if (v == null) return "0";
  const s = Number(v)
    .toFixed(v % 1 ? 2 : 0)
    .replace(/\.0+$/, "");
  return s;
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    // shadow
    elevation: 3,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
  },
  phone: {
    marginTop: 8,
    fontSize: 14,
  },
  actions: {
    flexDirection: "row",
    gap: 8,
  },
  iconBtn: {
    width: 42,
    height: 42,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  sep: {
    borderTopWidth: 1,
    marginVertical: 12,
    opacity: 0.7,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rowLabel: {
    fontSize: 14,
    fontWeight: "700",
  },
  rowCenter: {
    alignItems: "flex-end",
  },
  subTitle: {
    fontSize: 13,
  },
  value: {
    fontSize: 20,
    fontWeight: "800",
    marginTop: 6,
  },
  rowText: {
    flex: 1,
    textAlign: "right",
    fontSize: 14,
  },
  footer: {
    marginTop: 6,
    alignItems: "flex-end",
  },
  dateText: {
    fontSize: 13,
  },
});
