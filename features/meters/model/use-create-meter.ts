import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateMeterValues } from "./types";

export const useCreateMeter = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateMeterValues) => {
      console.log("Submitting Meter Data:", data);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-meters"] });
    },
  });
};
