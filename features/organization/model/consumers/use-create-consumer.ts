import { useMutation, useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { createConsumer, updateConsumer } from "./mutations";
import { CreateConsumerData } from "./types";

export const useCreateConsumer = (closeSheet:() => void) => {
  const queryClient = useQueryClient();
    const { mutate:CreateMutation, isPending, isSuccess } = useMutation({
    mutationFn: (data: CreateConsumerData) => createConsumer(data),
    onSuccess: (data) => {
         closeSheet()
      Toast.show({
        type: "success",
        text1: data.data,
      });
      queryClient.invalidateQueries({ queryKey: ["get-consumers"] });
    },
    onError: (err:any) => {
      console.log({ err });
      Toast.show({
        type: "error",
        text1: err.data?.message,
      });
      closeSheet()
    },
  });

  const { mutate: updateMutation, isPending: isUpdatePending, isSuccess: isUpdateSuccess } = useMutation({
    mutationFn: ({data,id}: {data: CreateConsumerData,id:string}) => updateConsumer(data,id),
    mutationKey: ["updateConsumer"],
    onSuccess: (data) => {
      closeSheet()
      Toast.show({
        type: "success",
        text1: data.data,
      });
      queryClient.invalidateQueries({ queryKey: ["get-consumers"] });
    },
    onError: (err:any) => {
      console.log({ err });
      Toast.show({
        type: "error",
        text1: err.data?.message,
      });
      closeSheet()
    },
  });
  

  return { CreateMutation, loading:isPending || isUpdatePending, isSuccess ,updateMutation};
};
