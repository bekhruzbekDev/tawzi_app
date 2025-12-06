import { useQuery } from "@tanstack/react-query"
import { getOrganizationChartData } from "./queryes"
import { OrganizationChartDataRes, OrgChartData } from "./types"


export const useOrganizationChartData = () => {

const {data,isLoading} = useQuery<OrganizationChartDataRes>({
    queryKey: ["organization-chart-data"],
    queryFn: () => getOrganizationChartData("electric","monthly"),
})
const chartData:OrgChartData[] = data?.data?.map(item=>({
    label:item.date,
    v1:item.incoming,
    v2:item.outgoing
}))??[]

return {
    chartData,
    isLoading
}

}