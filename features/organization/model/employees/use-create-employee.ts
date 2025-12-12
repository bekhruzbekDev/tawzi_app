import { useMutation, useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { createEmployeeMutation, editEmployeeMutation } from "./mutation";
import { CreateEmployeeFormType } from "./types";

export const useCreateEmployee = (
  reset: (data: CreateEmployeeFormType) => void,
  id?: string | number
) => {
  const queryClient = useQueryClient();

  const successActions = (text?: string) => {
    Toast.show({
      type: "success",
      text1: text ?? "Muvaffaqiyatli qo'shildi",
    });
    queryClient.invalidateQueries({
      queryKey: ["get-employees"],
    });
    reset({
      first_name: "",
      phone_number: "",
      username: "",
      password: "",
      add_device_permission: false,
      add_consumer_permission: false,
      add_user_permission: false,
      valve_control_permission: false,
    });
  };

  //   create
  const { mutate: createMutation, isPending } = useMutation({
    mutationFn: (data: CreateEmployeeFormType) => createEmployeeMutation(data),
    onSuccess: (data) => {
      successActions(data.data);
    },
    onError: (error: any) => {
      Toast.show({
        type: "error",
        text1: error?.data?.message ?? "Xatolik",
      });
    },
  });

  //   edit

  const { mutate: editMutation, isPending: editPending } = useMutation({
    mutationFn: (data: CreateEmployeeFormType) =>
      editEmployeeMutation(id ?? null, data),
    onSuccess: (data) => {
      successActions(data.data);
    },
    onError: (error: any) => {
      Toast.show({
        type: "error",
        text1: error?.data?.message ?? "Xatolik",
      });
    },
  });

  return {
    createMutation,
    editMutation,
    isPending: isPending || editPending,
  };
};
