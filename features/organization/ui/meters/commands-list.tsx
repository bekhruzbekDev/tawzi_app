import { Colors } from "@/shared/constants/theme";
import { Feather } from "@expo/vector-icons";
import { BottomSheetSectionList } from "@gorhom/bottom-sheet";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { Meter } from "../../model/meters/types";
import { useCommands } from "../../model/meters/use-commands";
import { CommandCard } from "./command-card";

interface CommandsListProps {
  meter: Meter | null;
  theme: any;
  
  closeSheet: () => void;
  router: any;
  setDeleteModalVisible: (value: {open: boolean, path: string}) => void;
}

export const CommandsList = ({ meter, theme,}: CommandsListProps) => {


  const {data,isLoading,fetchNextPage,hasNextPage} = useCommands(meter?.id??"",meter?.type??"electric")

    if (isLoading) {
      return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingTop: 40 }}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={{ marginTop: 16, color: theme.text }}>Yuklanmoqda...</Text>
        </View>
      );
    }

    return <BottomSheetSectionList
          sections={data}
          keyExtractor={(item: any, index: number) => item.id.toString() + index.toString()}
          renderItem={({ item }: any) => (
            <View style={{ paddingHorizontal: 16 }}>
              <CommandCard item={item} /> 
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
            if (hasNextPage) {
              fetchNextPage();
            }
          }}
          onEndReachedThreshold={0.5}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
}


const styles = StyleSheet.create({
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

});