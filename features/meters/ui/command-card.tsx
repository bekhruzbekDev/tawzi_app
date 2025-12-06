import { Colors } from "@/shared/constants/theme";
import { useThemeColors } from "@/shared/hooks/use-theme";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { CommandData } from "../model/types";

export const CommandCard = React.memo(({ item }: { item: CommandData }) => {
    const theme = useThemeColors();
    
    const getCommandText = (commandStr: string) => {
      switch(commandStr) {
        case "remote_valve_open":
          return "Masofadan turib klapanni ochish";
        case "remote_valve_close":
          return "Masofadan turib klapanni yopish";
        default:
          return commandStr;
      }
    };
    
    const getStatusText = (status: any) => {
      if (!status) return "";
      const { days, hours, minutes } = status;
      return `Amal qilish muddati ${days} Kun, ${hours} soat, ${minutes} daqiqa qoldi`;
    };
    
    return <View
              style={[
                styles.historyItem,
                { backgroundColor: theme.surface, borderColor: theme.border },
              ]}
            >
              <Text style={[styles.historyTitle, { color: theme.text }]}>
                {item.created_by_user} tomonidan buyruq yuborildi
              </Text>
              <Text style={[styles.historyTime, { color: theme.muted }]}>
                Yuborilgan vaqt {item.created_at}
              </Text>
              <Text style={[styles.historyDesc, { color: theme.text }]}>
                {getCommandText(item.command_str)}, {getStatusText(item.command_status)}
              </Text>
              {item.comment && (
                <Text style={[styles.historyComment, { color: theme.muted }]}>
                  Izoh: {item.comment}
                </Text>
              )}
              {(item.button_status === "cancel" || item.button_status === "retry") && (
                <View style={{ alignItems: "flex-end", marginTop: 10 }}>
                  <Button
                    mode="contained"
                    onPress={() => {}}
                    style={{ borderRadius: 8, backgroundColor: Colors.primary }}
                    labelStyle={{ fontSize: 12 }}
                  >
                    {item.button_status === "cancel" ? "Bekor qilish" : "Qayta yuborish"}
                  </Button>
                </View>
              )}
            </View>
})


const styles = StyleSheet.create({
  historyItem: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  historyTitle: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 6,
  },
  historyTime: {
    fontSize: 13,
    marginBottom: 8,
  },
  historyDesc: {
    fontSize: 14,
    marginBottom: 8,
    lineHeight: 20,
  },
  historyComment: {
    fontSize: 13,
    fontStyle: "italic",
  },
});