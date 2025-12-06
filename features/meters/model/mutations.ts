import axios from "@/services/axios.config"
import { CreateMeterValues, SendCommandValues } from "./types"

export const creteMeterMutation = (data:CreateMeterValues) => {
   return  axios.post(`devices/assign/`,data).then(res=>res.data)
}

export const updateMeterMutation = (data:CreateMeterValues,id:string,device_type:string) => {
   return  axios.put (`devices/${device_type}/${id}/edit/`,data).then(res=>res.data)
}


export const sendCommandMutation =(data:SendCommandValues,commadType:"open"|"close")=>{
   return axios.post(`devices/valve/${commadType}/`,data).then(res=>res.data)
}