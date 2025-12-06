import { useInfiniteQuery } from "@tanstack/react-query";
import { getCommands } from "./queries";
import { GetDeviceCommandsRes } from "./types";

export const useCommands = (device_id:string|number,device_type:"electric" | "gas" | "water" , ) => {
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
  } = useInfiniteQuery<GetDeviceCommandsRes>({
    queryKey: ["get-commands",device_id,device_type],
    queryFn: ({ pageParam = 1 }) => {
  
      return getCommands(device_id,device_type,pageParam);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
        lastPage.total_pages=1
      const nextPage = allPages.length + 1;
     
      return nextPage <= lastPage?.total_pages ? nextPage : undefined;
    },
  });

  const customData = data?.pages.flatMap((page) => { 
    return page.data
  }) ?? [];

  return {
    data:customData,
    isLoading,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    error,
    refetch,
  }
} 