import React from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { useMetersData } from "../../model/meters/use-meters";
import { MeterCard } from "./meter-card";
import { MeterSkeleton } from "./meter-skeleton";
import { Meter, MeterFilters } from "../../model/meters/types";

interface Props {
  onCommandPress?: (meter: Meter) => void;
  onDetailPress?: (meter: Meter) => void;
  filters?: MeterFilters;
}

export default function MetersList({
  onCommandPress,
  onDetailPress,
  filters,
}: Props) {
  const {
    customData,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useMetersData(filters);

  if (isLoading) {
    return (
      <View>
        <MeterSkeleton />
        <MeterSkeleton />
        <MeterSkeleton />
      </View>
    );
  }


  return (
    <FlatList
      data={customData}
      keyExtractor={(item,i) => String(i)}
      renderItem={({ item }) => (
        <MeterCard
          meter={item}
          onCommandPress={() => onCommandPress?.(item)}
          onDetailPress={() => onDetailPress?.(item)}
        />
      )}
      ListEmptyComponent={
        <View style={{ padding: 20, alignItems: "center" }}>
          <Text>Ma'lumot topilmadi</Text>
        </View>
      }
      onEndReached={() => {
        if (hasNextPage) {
          fetchNextPage();
        }
      }}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        isFetchingNextPage ? (
          <View style={{ padding: 10 }}>
            <ActivityIndicator size="small" />
          </View>
        ) : null
      }
      contentContainerStyle={{ paddingBottom: 100 }}
    />
  );
}