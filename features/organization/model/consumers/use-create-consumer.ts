import { useMutation } from "@tanstack/react-query";
import { createConsumer } from "./mutations";
import { CreateConsumerData } from "./types";

export const useCreateConsumer = () => {
  
    const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (data: CreateConsumerData) => createConsumer(data),
    onSuccess: (data) => {
      console.log({ success: data });
    },
    onError: (err) => {
      console.log({ err });
    },
  });
  

  return { mutate, isPending, isSuccess };
};
