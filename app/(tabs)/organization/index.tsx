import { useDashboardData } from "@/features/organization/model/dashboard/use-dashboard-data";
import AlertStats from "@/features/organization/ui/dashboard/alert-stats";
import { AlertStatsSkeleton } from "@/features/organization/ui/dashboard/alert-stats-skeleton";
import { OrganizationCharts } from "@/features/organization/ui/dashboard/charts";
import { OrgDashboardHeader } from "@/features/organization/ui/dashboard/dashboard-header";
import { FinanceChart } from "@/features/organization/ui/dashboard/finance-chart";
import { FinanceChartSkeleton } from "@/features/organization/ui/dashboard/finance-chart-skeleton";
import OrganizationStatsList, { ResourceType } from "@/features/organization/ui/dashboard/stats-list";
import { StatsListSkeleton } from "@/features/organization/ui/dashboard/stats-list-skeleton";
import TopConsumers from "@/features/organization/ui/dashboard/top-consumers";
import { TopConsumersSkeleton } from "@/features/organization/ui/dashboard/top-consumers-skeleton";

import { ScrollView } from "react-native";

export default function OrganizationAdmin() {

const {unitType, setUnitType, deviceTypes,dashboardStats,alertStats,topConsumers,financeStats,isLoading,hasBilling} = useDashboardData();
  return (  
    <>
      <OrgDashboardHeader unitType={unitType} setUnitType={setUnitType} deviceTypes={deviceTypes} />

      <ScrollView>
        {isLoading ? (
          <StatsListSkeleton />
        ) : (
          <OrganizationStatsList resourceType={unitType as ResourceType} data={dashboardStats}/>
        )}
        
        <OrganizationCharts />
        
        {hasBilling && isLoading && (
          <FinanceChartSkeleton />
        )}
        
        {hasBilling && !isLoading && (
          <FinanceChart data={financeStats} />
        )}
        
        {isLoading ? (
          <AlertStatsSkeleton />
        ) : (
          <AlertStats data={alertStats} />
        )}
        
        {isLoading ? (
          <TopConsumersSkeleton />
        ) : (
          <TopConsumers data={topConsumers} resourceType={unitType as  ResourceType}/>
        )}
      </ScrollView>
    </>
  );
}
