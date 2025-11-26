import { useThemeColors } from "@/shared/hooks/use-theme";
import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

type ConsumerItem = {
  id: string;
  name: string;
  accounts?: number;
  gas?: number; // m3
  water?: number; // m3
  energy?: number; // kWh
};

type Props = {
  data: ConsumerItem[];
  onPress?: (item: ConsumerItem) => void;
};

export default function TopConsumers({ data, onPress }: Props) {
  const theme = useThemeColors();

  const renderItem = ({ item }: { item: ConsumerItem }) => (
    <Pressable
      onPress={() => onPress?.(item)}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: theme.card,
          borderColor: theme.border,
          opacity: pressed ? 0.96 : 1,
          shadowColor: theme.shadow ?? "#000",
        },
      ]}
    >
      {/* Left icon / avatar */}
      <View style={[styles.iconWrap, { backgroundColor: theme.surface }]}>
        <Text style={[styles.iconText, { color: theme.text }]}>🏢</Text>
      </View>

      {/* Middle title / subtitle */}
      <View style={styles.mid}>
        <Text
          style={[styles.title, { color: theme.text }]}
          numberOfLines={1}
        >
          {item.name}
        </Text>
        <Text style={[styles.subtitle, { color: theme.muted }]}>
          {item.accounts ?? 0} hisoblagich
        </Text>
      </View>

      {/* Right metrics */}
      <View style={styles.metrics}>
        <View style={styles.metricColumn}>
          <Text style={[styles.metricLabel, { color: theme.muted }]}>Gaz</Text>
          <Text style={[styles.metricValue, { color: theme.text }]}>
            {formatNumber(item.gas)} m³
          </Text>
        </View>

        <View style={[styles.metricColumn, styles.divider]}>
          <Text style={[styles.metricLabel, { color: theme.muted }]}>Suv</Text>
          <Text style={[styles.metricValue, { color: theme.text }]}>
            {formatNumber(item.water)} m³
          </Text>
        </View>

        <View style={styles.metricColumn}>
          <Text style={[styles.metricLabel, { color: theme.muted }]}>
            Elektr
          </Text>
          <Text style={[styles.metricValue, { color: theme.text }]}>
            {formatNumber(item.energy, 2)} kVt
          </Text>
        </View>
      </View>
    </Pressable>
  );

  return (
    <FlatList
      data={data}
      keyExtractor={(i) => i.id}
      renderItem={renderItem}
      ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      contentContainerStyle={{ paddingVertical: 8 }}
      showsVerticalScrollIndicator={false}
    />
  );
}

function formatNumber(value?: number, decimals = 0) {
  if (value == null) return "0";
  return Number(value).toFixed(decimals).replace(/\.0+$/, "");
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderRadius: 12,
    elevation: 2,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
  },
  iconWrap: {
    width: 52,
    height: 52,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  iconText: {
    fontSize: 22,
  },
  mid: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 13,
    marginTop: 6,
  },
  metrics: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  metricColumn: {
    alignItems: "flex-end",
    minWidth: 72,
  },
  metricLabel: {
    fontSize: 12,
  },
  metricValue: {
    fontSize: 15,
    fontWeight: "700",
    marginTop: 6,
  },
  divider: {
    borderLeftWidth: 1,
    paddingLeft: 12,
    marginHorizontal: 12,
  },
});
