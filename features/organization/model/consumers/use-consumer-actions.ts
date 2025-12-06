import BottomSheet from "@gorhom/bottom-sheet";
import { useRef, useState } from "react";
import { Consumer } from "./types";

export const useConsumerActions = () => {

    const sheetRef = useRef<BottomSheet | null>(null);
    const [consumer,setConsumer]=useState<Consumer | null>(null)
    const [deleteModalVisible,setDeleteModalVisible]=useState<{open:boolean,path:string}>({open:false,path:""})
   const editChange =(data:Consumer |null)=>{
    setConsumer(data)
    sheetRef.current?.snapToIndex(1)
   } 

   const deleteChange =(data:Consumer |null)=>{
    setDeleteModalVisible({open:true,path:`organization/consumer/${data?.id}/delete/`})
   } 

return { consumer,sheetRef,editChange,deleteChange,deleteModalVisible,setDeleteModalVisible,setConsumer}
    
}