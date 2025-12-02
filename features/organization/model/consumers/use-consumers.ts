// use-consumers.ts
import { useInfiniteQuery } from "@tanstack/react-query";
import { getConsumers } from "./quearies";
import { GetConsumersData, GetConsumersRes } from "./types"; // 

export const useConsumersData = () => {
  const {
    data,
    isLoading,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    error,
    refetch,
  } = useInfiniteQuery<GetConsumersRes>({
    queryKey: ["get-consumers"],
    queryFn: ({ pageParam = 1 }) => {
  
      return getConsumers(pageParam as number);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
     
      return nextPage <= lastPage.total_pages ? nextPage : undefined;
    },
  });

  
  const customData = data?.pages.flatMap((page) => { 
    return mapperData(page?.data ?? []);
  }) ?? [];

  return {
    customData,
    isLoading,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    error,
    refetch,
  };
};

const mapperData = (data: GetConsumersData[]) => {
  if (!Array.isArray(data)) {
    console.warn("mapperData received non-array:", data);
    return [];
  }
  
  return data.map((item) => {
    const id = String(item.id); 

    const calculateValue = (readings: { current_reading: string }[] | undefined) =>
      readings?.reduce(
        (acc, curr) => acc + (Number(curr.current_reading) || 0),
        0
      ) ?? 0;

    return {
      id: id,
      name: item.name,
      phone: item.phone_number,
      username: item.username??"",
      electricity: {
        count: item.electric?.length ?? 0,
        value: calculateValue(item.electric),
      },
      gas: {
        count: item.gas?.length ?? 0,
        value: calculateValue(item.gas),
      },
      water: {
        count: item.water?.length ?? 0,
        value: calculateValue(item.water),
      },
      createdAt: item.created_at,
    };
  });
};