import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { getAllEmployees } from "./queries";
import { Employee, EmployeesRes } from "./types";

export const useEmployeeActions = () => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState({
    open: false,
    path: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );

  const handleCreate = () => {
    setSelectedEmployee(null);
    bottomSheetRef.current?.present();
  };

  const handleEdit = (employee: Employee) => {
    setSelectedEmployee(employee);
    bottomSheetRef.current?.present();
  };

  const handleDelete = (id: string | number) => {
    setDeleteModalVisible({
      open: true,
      path: `organization/employee/${id}/delete/`,
    });
  };

  // consumur list fetching
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<EmployeesRes>({
      queryKey: ["get-employees", searchQuery],
      queryFn: ({ pageParam = 1 }) => {
        return getAllEmployees(pageParam as number, 5, searchQuery);
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1;

        return nextPage <= (lastPage?.total_pages ?? 1) ? nextPage : undefined;
      },
    });

  const customData: Employee[] =
    data?.pages
      ?.map((page) => page.data)
      .flat()
      .map((item) => ({
        id: item.id,
        name: item.first_name,
        login: item.username,
        phone: item.phone_number,
        permissions: {
          can_send_command: item.add_device_permission,
          can_add_employee: item.add_user_permission,
          can_add_meter: item.add_consumer_permission,
          can_add_consumer: item.valve_control_permission,
        },
      })) ?? [];

  return {
    data: customData,
    loading: isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    bottomSheetRef,
    selectedEmployee,
    setSearchQuery,
    searchQuery,
    handleCreate,
    handleEdit,
    deleteModalVisible,
    setDeleteModalVisible,
    handleDelete,
  };
};
