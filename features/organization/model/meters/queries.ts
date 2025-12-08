import axios from "@/services/axios.config";
import { cleanParams } from "@/shared/utils/helper";
import { GetMetersRes } from "./types";

export const getMeters = async (
  page = 1,
  page_size = 10,
  filters?: {
    device_type?: string;
    device_meter_direction?: string;
    status?: string;
  }
): Promise<GetMetersRes> => {
  const cleanFilters = cleanParams(filters??{})
  console.log(cleanFilters,filters);
  
  const { data } = await axios.get<GetMetersRes>(`devices/`, {
    params: {
      page,
      page_size,
      ...cleanFilters,
    },
  });
  return data;
};


export const meterDetail =(id:string,device_type:string)=>{
 return axios.get(`devices/${id}/?device_type=${device_type}`).then(res=>res.data)
}

export const getCommands =(device_id:string|number,device_type:"electric" | "gas" | "water" , page:any, )=> {
  const page_size = 10;
 return   axios.get(`devices/device-command/${device_type}/${device_id}/history/`,{
    params:{
        page,
        page_size
    }
 }).then(res=>res.data) 
};
