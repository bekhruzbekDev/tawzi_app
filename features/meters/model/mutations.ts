import axios from "@/services/axios.config"
import { CreateMeterValues } from "./types"

export const creteMeterMutation = (data:CreateMeterValues) => {
   return  axios.post(`devices/assign/`,data).then(res=>res.data)
}

export const updateMeterMutation = (data:CreateMeterValues,id:string,device_type:string) => {
   return  axios.put (`devices/${device_type}/${id}/edit/`,data).then(res=>res.data)
}