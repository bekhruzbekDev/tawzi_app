import axios from "./axios.config"

export const deleteMutation=(path:string)=>{
    return axios.delete(path).then(res=>res.data)
}