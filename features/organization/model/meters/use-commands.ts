import { useInfiniteQuery } from "@tanstack/react-query";
import { getCommands } from "./queries";
import { GetDeviceCommandsRes } from "./types";

export const useCommands = (
  device_id: string | number,
  device_type: "electric" | "gas" | "water"
) => {
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
    queryKey: ["get-commands", device_id, device_type],
    queryFn: ({ pageParam = 1 }) => {
      return getCommands(device_id, device_type, pageParam);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;

      return nextPage <= lastPage.total_pages ? nextPage : undefined;
    },
  });

  const customData =
    data?.pages.flatMap((page) => {
      return page.data;
    }) ?? [];

  const sections = customData.map((sectionData) => ({
    title: formatDate(sectionData.date),
    originalDate: sectionData.date,
    data: sectionData.changes,
  }));

  return {
    data: sections,
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

const formatDate = (dateString: string) => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const [day, month, year] = dateString.split("-").map(Number);
  const itemDate = new Date(year, month - 1, day);

  const isSameDay = (date1: Date, date2: Date) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  if (isSameDay(itemDate, today)) {
    return "Bugun";
  } else if (isSameDay(itemDate, yesterday)) {
    return "Kecha";
  } else {
    return dateString;
  }
};
