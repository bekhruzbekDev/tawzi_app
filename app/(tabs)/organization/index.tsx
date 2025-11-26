import { OrganizationCharts } from "@/features/organization/ui/dashboard/charts";
import { OrgDashboardHeader } from "@/features/organization/ui/dashboard/dashboard-header";
import OrganizationStatsList from "@/features/organization/ui/dashboard/stats-list";

import { ScrollView } from "react-native";
const consumers = [
  {
    id: "c1",
    name: "4-fabrika",
    accounts: 1,
    gas: 0,
    water: 0,
    energy: 99.47,
  },
  {
    id: "c2",
    name: "9-fabrika",
    accounts: 1,
    gas: 0,
    water: 0,
    energy: 90.63,
  },
  {
    id: "c3",
    name: "7-fabrika",
    accounts: 1,
    gas: 0,
    water: 0,
    energy: 89.8,
  },
  {
    id: "c4",
    name: "Markaziy Ombor",
    accounts: 3,
    gas: 12.5,
    water: 8.2,
    energy: 210.34,
  },
];
export default function OrganizationAdmin() {
  return (
    <>
      <OrgDashboardHeader />

      <ScrollView>
        <OrganizationStatsList />
        <OrganizationCharts />
        {/* <TopConsumers data={consumers} /> */}
      </ScrollView>
    </>
  );
}
