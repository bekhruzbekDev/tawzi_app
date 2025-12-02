import { deleteMutation } from "@/services/mutations";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

export const useDelete = (path:string,queryKey:string,onchange:(data:{open:boolean,path:string}) => void) => {

    const queryClient = useQueryClient();
const {mutate,isPending:isLoading} = useMutation({
    mutationFn:()=>deleteMutation(path),
    onSuccess:(data)=>{
    Toast.show({
        type:"success",
        position:"top",
        text1:"Muvaffaqiyatli o'chirildi"
    })
        
        queryClient.invalidateQueries({queryKey:[queryKey]})
        onchange({open:false,path:""})
    },
    onError:(error)=>{
        Toast.show({
            type:"error",
            position:"top",
            text1:"Xatolik yuz beri"
        })
        onchange({open:false,path:""})
    }

})

return {mutate, isLoading}
}