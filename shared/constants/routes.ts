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
    id: "3",
    title: "Bosh sahifa",
    icon: "dashboard",
    path: "consumer/index",
    iconType: "MaterialIcons",
    role: ["consumer"],
  },
  {
    id: "4",
    title: "Statistika",
    icon: "pie-chart",
    path: "consumer/statistics",
    iconType: "SimpleLineIcons",
    role: ["consumer"],
  },
  // org
  {
    id: "5",
    title: "Bosh sahifa",
    icon: "space-dashboard",
    path: "organization/index",
    iconType: "MaterialIcons",
    role: ["organization",],
  },
  {
    id: "6",
    title: "Istemolchilar",
    icon: "users",
    path: "organization/consumers",
    iconType: "FontAwesome",
    role: ["organization",],
  },
   {
    id: "9",
    title: "Hisoblagichlar",
    icon: "gas-meter",
    path: "organization/meters",
    iconType: "MaterialIcons",
    role: ["organization", ],
  },
  // public
  {
    id: "8",
    title: "Bildirishnomalar",
    icon: "notifications-sharp",
    path: "public/notification",
    iconType: "Ionicons",
    role: ["owner", "consumer", "organization"],
  },
  {
    id: "7",
    title: "profile",
    icon: "user",
    path: "public/profile",
    iconType: "FontAwesome",
    role: ["owner", "consumer", "organization"],
  },
];
