import { useInfiniteQuery } from "@tanstack/react-query";
import { getMeters } from "./queries";
import { GetMetersRes } from "./types";

import { MeterFilters } from "./types";

export const useMetersData = (filters?: MeterFilters) => {
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
  } = useInfiniteQuery<GetMetersRes>({
    queryKey: ["get-meters", filters], // Include filters in queryKey
    queryFn: ({ pageParam = 1 }) => {
      // Clean up filters to remove empty strings or undefined values if needed,
      // but usually axios handles undefined params by ignoring them.
      // However, if we want "Barchasi" to mean "all", we should pass undefined or empty string,
      // ensuring the backend handles it.
      // Here we assume "Barchasi" logic is handled in the UI (passing undefined for "Barchasi").
      return getMeters(pageParam as number, 10, filters);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      return nextPage <= lastPage.total_pages ? nextPage : undefined;
    },
  });

  const customData = data?.pages.flatMap((page) => page.data) ?? [];

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
