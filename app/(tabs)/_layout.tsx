import { Tabs } from "expo-router";
import React from "react";

import { allRoutes } from "@/shared/constants/routes";
import { useThemeColors } from "@/shared/hooks/use-theme";
import { useStore } from "@/shared/store/store";
import CustomNavBar from "@/shared/ui/customBar";
export default function TabLayout() {
  const userData = useStore((state) => state.user);
  const tabBarInset = useStore((state) => state.tabBarInset);
  const themeColors = useThemeColors();
  const userRole = userData
    ? userData?.role === "Consumer"
      ? "consumer"
      : userData?.role === "OrganizationAdmin"
      ? "organization"
      : userData?.role === "Employer"
      ? "organization"
      : "owner"
    : "";
  const routes = allRoutes.filter((item) => item.role.includes(userRole));
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        sceneStyle: {
          paddingBottom: tabBarInset,
          backgroundColor: themeColors.background,
        },
      }}
      tabBar={(props) => <CustomNavBar {...props} />}
    >
      {routes.map((item, key) => (
        <Tabs.Screen
          key={key}
          name={item.path}
          options={{ title: item.title, headerShown: false }}
        />
      ))}
    </Tabs>
  );
}
