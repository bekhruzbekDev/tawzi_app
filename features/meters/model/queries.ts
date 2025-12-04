import axios from "@/services/axios.config";
import { GetMetersRes } from "./types";

export const getMeters = async (page = 1, page_size = 10): Promise<GetMetersRes> => {
  const { data } = await axios.get<GetMetersRes>(`devices/`, {
    params: {
      page,
      page_size,
    },
  });
  return data;
};


export const meterDetail =(id:string,device_type:string)=>{
 return axios.get(`devices/${id}/?device_type=${device_type}`).then(res=>res.data)
}