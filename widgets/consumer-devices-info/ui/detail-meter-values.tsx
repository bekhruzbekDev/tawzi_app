import { useThemeColors } from "@/shared/hooks/use-theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
  LayoutAnimation,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  UIManager,
  View,
} from "react-native";
import { useConsumerDevicesInfo } from "../model/use-device-info";

if (Platform.OS === "android") {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

interface MeterAccordionData {
  id: number;
  name: string;
  totalUnit: string;
  icon: string;
  color: string;
  bg: string;
  subMeters: {
    id: number;
    serial: string;
    value: string;
  }[];
}

interface DetailMeterValuesProps {
  data?: MeterAccordionData[];
  id?: string | number;
  filter_type: "monthly" | "yearly";
  date: Date;
}
export default function DetailMeterValues({
  id,
  filter_type,
  date,
}: DetailMeterValuesProps) {
  const theme = useThemeColors();

  const { data } = useConsumerDevicesInfo(id ? id : null, filter_type, date);

  const demo = [
    {
      id: 1,
      name: "Elektr",
      totalUnit: "2 450 kW",
      icon: "lightning-bolt",
      color: "#f59e0b", // Amber/Orange
      bg: "#fffbeb",
      subMeters: [
        { id: 101, serial: "00123456", value: "1 200 kW" },
        { id: 102, serial: "00123457", value: "1 250 kW" },
      ],
    },
    {
      id: 2,
      name: "Gaz",
      totalUnit: "90 m³",
      icon: "fire",
      color: "#f97316", // Orange
      bg: "#fff7ed",
      subMeters: [{ id: 201, serial: "GZ-998811", value: "90 m³" }],
    },
    {
      id: 3,
      name: "Suv",
      totalUnit: "120 m³",
      icon: "water-outline",
      color: "#3b82f6", // Blue
      bg: "#eff6ff",
      subMeters: [],
    },
  ];
  const customData: any[] = id ? data : demo;

  return (
    <View style={[styles.container, { backgroundColor: theme.card }]}>
      {customData?.map(
        (item, index) =>
          item && (
            <View key={index}>
              <MeterAccordion
                item={item}
                isLast={index === customData.length - 1}
              />
            </View>
          )
      )}
    </View>
  );
}

const MeterAccordion = ({ item, isLast }: { item: any; isLast: boolean }) => {
  const theme = useThemeColors();
  const [expanded, setExpanded] = useState(false);
  const hasSubMeters = item?.subMeters && item?.subMeters.length > 0;

  const toggle = () => {
    if (hasSubMeters) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setExpanded(!expanded);
    }
  };

  return (
    <View
      style={[
        styles.itemContainer,
        !isLast && { borderBottomWidth: 1, borderBottomColor: theme.border },
      ]}
    >
      <Pressable onPress={toggle} style={styles.meterCard}>
        <View style={styles.flex}>
          <View style={[styles.iconCard, { backgroundColor: item?.bg }]}>
            <MaterialCommunityIcons
              name={item?.icon}
              size={24}
              color={item?.color}
            />
          </View>

          <Text style={[styles.name, { color: theme.text }]}>{item?.name}</Text>
        </View>

        <View style={styles.rightSide}>
          <Text style={[styles.amount, { color: theme.text }]}>
            {item?.totalUnit}
          </Text>
          {hasSubMeters && (
            <View
              style={[
                styles.chevron,
                expanded && { transform: [{ rotate: "180deg" }] },
              ]}
            >
              <MaterialCommunityIcons
                name="chevron-down"
                size={20}
                color={theme.muted}
              />
            </View>
          )}
        </View>
      </Pressable>

      {expanded && hasSubMeters && (
        <View style={[styles.subList, { backgroundColor: theme.surface }]}>
          {item.subMeters.map((sub: any, idx: number) => (
            <View
              key={sub.id}
              style={[
                styles.subItem,
                idx !== item.subMeters.length - 1 && {
                  borderBottomWidth: 1,
                  borderBottomColor: theme.border,
                },
              ]}
            >
              {/* Only border between items, not last one */}
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
              >
                <MaterialCommunityIcons
                  name="speedometer"
                  size={16}
                  color={theme.muted}
                />
                <Text style={[styles.subSerial, { color: theme.text }]}>
                  {sub.serial}
                </Text>
              </View>
              <Text style={[styles.subValue, { color: theme.text }]}>
                {sub.value}
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderRadius: 20,
    marginTop: 16,
  },
  itemContainer: {
    marginBottom: 8,
    // borderBottomWidth: 1, // Moving to inline style
    // borderRadius: 16, // Removed borderRadius to make the bottom border visible/cleaner like a list item
    // overflow: 'hidden'
  },
  meterCard: {
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  flex: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconCard: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
  },
  rightSide: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  amount: {
    fontSize: 17,
    fontWeight: "700",
  },
  chevron: {
    // Wrapper for rotation if needed
  },
  subList: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 12,
    marginBottom: 12,
    borderRadius: 12,
    gap: 4,
  },
  subItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  subSerial: {
    fontSize: 14,
    fontWeight: "500",
  },
  subValue: {
    fontSize: 14,
    fontWeight: "700",
  },
});
