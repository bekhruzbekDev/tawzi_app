import axios from "@/services/axios.config"


export const getDashboardData =(params: {device_type: string})=>{
    return  axios.get("dashboard/organization/", {params}).then(res=>res.data)
}


export const getOrganizationChartData =(device_type:string,filter:string)=>{
    return  axios.get(`dashboard/${device_type}/${filter}/data/`,).then(res=>res.data)
}