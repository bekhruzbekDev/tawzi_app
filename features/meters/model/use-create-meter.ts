import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import Toast from "react-native-toast-message";
import { creteMeterMutation, updateMeterMutation } from "./mutations";
import { meterDetail } from "./queries";
import { CreateMeterValues, MeterDetailRes } from "./types";
export const useCreateMeter = (id:string,device_type:string) => {
  const queryClient = useQueryClient();

const {data} = useQuery<MeterDetailRes>({
    queryKey: ["get-meter-detail"],
    queryFn: () => meterDetail(id,device_type),
    enabled: !!id,
  });

  
  




const {mutate:CreteMeterMutate,isPending  } = useMutation({
    mutationFn: (data:CreateMeterValues)=>creteMeterMutation(data),

    onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ["get-meters"],
    });
    Toast.show({
      type: "success",
      text1: "Hisoblagich qo'shildi",
    });
    router.back()
  },
  onError: (err:any) => {
    console.log({ err });
    Toast.show({
      type: "error",
      text1: err.data?.message,
    });
   
  },
});


const {mutate:updateMeterMutate,isPending:isPendingUpdateMeter } = useMutation({
    mutationFn: (data:CreateMeterValues)=>updateMeterMutation(data,id,device_type),

    onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ["get-meters"],
    });
    Toast.show({
      type: "success",
      text1: "Hisoblagich tahrirlandi",
    });
    router.back()
  },
  onError: (err:any) => {
    console.log({ err });
    Toast.show({
      type: "error",
      text1: err.data?.message,
    });
   
  },
});



return {CreteMeterMutate,isPending:isPending||isPendingUpdateMeter,meterDetail:data?.data,updateMeterMutate,}
};
