import { RoutesData } from "../types/helper.types";

export const allRoutes: RoutesData[] = [
  {
    id: "1",
    title: "Dashboard",
    icon: "home",
    path: "owner/index",
    iconType: "Feather",
    role: ["owner"],
  },
  {
    id: "2",
    title: "Tashkilotlar",
    icon: "organization",
    path: "owner/organizations",
    iconType: "Octicons",
    role: ["owner"],
  },

  // consumers
  {
    id: "4",
    title: "Bosh sahifa",
    icon: "dashboard",
    path: "consumer/index",
    iconType: "MaterialIcons",
    role: ["consumer"],
  },
  {
    id: "5",
    title: "Statistika",
    icon: "pie-chart",
    path: "consumer/statistics",
    iconType: "SimpleLineIcons",
    role: ["consumer"],
  },
  // org
  {
    id: "1",
    title: "Organization",
    icon: "",
    path: "organization/index",
    iconType: "Feather",
    role: ["organization", "owner"],
  },
  // public
  {
    id: "3",
    title: "profile",
    icon: "user",
    path: "public/profile",
    iconType: "FontAwesome",
    role: ["owner", "consumer", "organization"],
  },
  {
    id: "6",
    title: "Bildirishnomalar",
    icon: "notifications-sharp",
    path: "public/notification",
    iconType: "Ionicons",
    role: ["owner", "consumer", "organization"],
  },
];
