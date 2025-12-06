import { useInfiniteQuery } from "@tanstack/react-query";
import { getMeters } from "./queries";
import { GetMetersRes } from "./types";

export const useMetersData = () => {
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
    queryKey: ["get-meters"],
    queryFn: ({ pageParam = 1 }) => {
      return getMeters(pageParam as number);
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
