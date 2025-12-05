import { Colors } from "@/shared/constants/theme";
import { useThemeColors } from "@/shared/hooks/use-theme";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { BottomSheetSectionList } from "@gorhom/bottom-sheet";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button } from "react-native-paper";
import { Meter } from "../model/types";
import { useCommands } from "../model/use-commands";

interface CommandsListProps {
  meter: Meter | null;
  theme: any;
  getIcon: () => any;
  getIconColor: () => string;
  closeSheet: () => void;
  router: any;
  setDeleteModalVisible: (value: {open: boolean, path: string}) => void;
}

export const CommandsList = ({ meter, theme, getIcon, getIconColor, closeSheet, router, setDeleteModalVisible,}: CommandsListProps) => {


  const {data,isLoading} = useCommands(meter?.id??"",meter?.type??"electric")



  console.log(data);
  

    const formatDate = (dateString: string) => {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      
      const [day, month, year] = dateString.split('-').map(Number);
      const itemDate = new Date(year, month - 1, day);
      
      const isSameDay = (date1: Date, date2: Date) => {
        return date1.getDate() === date2.getDate() &&
               date1.getMonth() === date2.getMonth() &&
               date1.getFullYear() === date2.getFullYear();
      };
      
      if (isSameDay(itemDate, today)) {
        return "Bugun";
      } else if (isSameDay(itemDate, yesterday)) {
        return "Kecha";
      } else {
        return dateString;
      }
    };

    const commandsData = data;
    const sections = commandsData.map(sectionData => ({
      title: formatDate(sectionData.date),
      originalDate: sectionData.date,
      data: sectionData.changes
    }));

    if (isLoading) {
      return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingTop: 40 }}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={{ marginTop: 16, color: theme.text }}>Yuklanmoqda...</Text>
        </View>
      );
    }

    return <BottomSheetSectionList
          sections={sections}
          keyExtractor={(item: any, index: number) => item.id.toString() + index.toString()}
          renderItem={({ item }: any) => (
            <View style={{ paddingHorizontal: 16 }}>
              <Card item={item} /> 
            </View>
          )}
          renderSectionHeader={({ section }: any) => (
            <View style={[styles.stickyHeader, { backgroundColor: theme.background }]}>
              <Text style={[styles.dateHeader, { color: theme.text }]}>
                <Feather name="calendar" size={14} /> {section.title}
              </Text>
            </View>
          )}
          stickySectionHeadersEnabled={true}
          ListHeaderComponent={
            <View style={{ paddingHorizontal: 16 }}>
              <View style={styles.infoCard}>
                <View style={styles.infoHeader}>
                  <View
                    style={[styles.iconBox, { backgroundColor: theme.surface }]}
                  >
                    <MaterialCommunityIcons
                      name={getIcon()}
                      size={24}
                      color={getIconColor()}
                    />
                  </View>
                  <View style={{ flex: 1, marginLeft: 12 }}>
                    <Text style={[styles.meterNumber, { color: theme.text }]}>
                      {meter?.serial_number}
                    </Text>
                    <Text style={[styles.subText, { color: theme.muted }]}>
                      {meter?.type === "electric"
                        ? "Elektr"
                        : meter?.type === "gas"
                        ? "Gaz"
                        : "Suv"}{" "}
                      •{" "}
                      {meter?.meter_direction === "incoming" ? "Kiruvchi" : "Chiquvchi"}
                    </Text>
                  </View>
                  <View style={[styles.badge, { borderColor: theme.border }]}>
                    <Feather
                      name="check-circle"
                      size={14}
                      color={theme.text}
                    />
                    <Text style={[styles.badgeText, { color: theme.text }]}>
                      Faol
                    </Text>
                  </View>
                </View>

                <View style={styles.readingRow}>
                  <View>
                    <Text style={[styles.label, { color: theme.muted }]}>
                      Joriy ko'rsatkich
                    </Text>
                    <Text style={[styles.value, { color: theme.text }]}>
                      {meter?.current_reading} kVt
                    </Text>
                  </View>
                  <View style={styles.actions}>
                    <TouchableOpacity
                      style={[
                        styles.actionBtn,
                        { borderColor: theme.border, backgroundColor: theme.surface },
                      ]}
                      onPress={()=>{closeSheet(),router.push({pathname:"/create-meter",params:{id:meter?.id,device_type:meter?.type}})}}
                    >
                      <MaterialCommunityIcons
                        name="pencil"
                        size={20}
                        color={theme.text}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.actionBtn,
                        { borderColor: theme.border, backgroundColor: theme.surface },
                      ]}
                      onPress={()=>{setDeleteModalVisible({open:true,path:`devices/${meter?.type}/${meter?.id}/delete/`}),closeSheet()}}
                    >
                      <Feather name="trash-2" size={20} color="#ef4444" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              
              <Text style={[styles.sectionTitle, { color: theme.text, marginTop: 8 }]}>
                Yuborilgan Komandalar
              </Text>
            </View>
          }
          ListEmptyComponent={
            <View style={{ padding: 40, alignItems: "center" }}>
              <Feather name="inbox" size={48} color={theme.muted} />
              <Text style={{ marginTop: 16, color: theme.text, fontSize: 16, fontWeight: "600" }}>
                Ma'lumot topilmadi
              </Text>
              <Text style={{ marginTop: 8, color: theme.muted, fontSize: 14, textAlign: "center" }}>
                Hozircha hech qanday buyruq yuborilmagan
              </Text>
            </View>
          }
          onEndReached={() => {
            // if (hasNextPage) {
            //   fetchNextPage();
            // }
          }}
          onEndReachedThreshold={0.5}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
}






const Card = ({ item }: { item: any }) => {
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
}



const styles = StyleSheet.create({
  infoCard: {
    marginBottom: 24,
  },
  infoHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  meterNumber: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
  },
  subText: {
    fontSize: 13,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
  },
  readingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: 13,
    marginBottom: 4,
  },
  value: {
    fontSize: 20,
    fontWeight: "800",
  },
  actions: {
    flexDirection: "row",
    gap: 12,
  },
  actionBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  stickyHeader: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 16,
  },
  dateHeader: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 12,
  },
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