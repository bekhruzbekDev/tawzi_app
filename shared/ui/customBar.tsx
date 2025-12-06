import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useEffect } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { allRoutes } from "../constants/routes";
import { Colors } from "../constants/theme";
import { getIcon } from "../hooks/use-icon";
import { useThemeColors } from "../hooks/use-theme";
import { useStore } from "../store/store";

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const CustomNavBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const userData = useStore((state) => state.user);
  const setTabBarInset = useStore((state) => state.setTabBarInset);
  const { bottom: safeBottom } = useSafeAreaInsets();
  const theme = useThemeColors();
  const PRIMARY_COLOR = theme.surface;
  const SECONDARY_COLOR = Colors.primary;
  const userRole = userData
    ? userData?.role == "Consumer"
      ? "consumer"
      : userData?.role == "OrganizationAdmin"
      ? "organization"
      : userData?.role == "Employer"
      ? "organization"
      : "owner"
    : "";
  const routes = allRoutes.filter((item) => item.role.includes(userRole));

  // useEffect(() => {
  //   setTabBarInset(72 + safeBottom);
  // }, [safeBottom, setTabBarInset]);

  return (
    <View
      style={[
        styles.container,
        {
          bottom: 10,
          backgroundColor: PRIMARY_COLOR,
          shadowColor: theme.shadow,
          shadowOpacity: theme.isDarkMode ? 0.35 : 0.18,
          elevation: theme.isDarkMode ? 0 : 10,
        },
      ]}
    >
      {state.routes.map((route, index) => {
        if (!routes.map((item) => item.path).includes(route.name)) return null;

        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        return (
          <AnimatedTouchableOpacity
            layout={LinearTransition.springify().mass(0.5)}
            key={route.key}
            onPress={onPress}
            style={[
              styles.tabItem,
              { backgroundColor: isFocused ? SECONDARY_COLOR : "transparent" },
            ]}
          >
            {getIcon({
              iconSet:
                routes.find((item) => item.path == route.name)?.iconType ??
                "Feather",
              name:
                routes.find((item) => item.path == route.name)?.icon ?? "home",
              color: isFocused ? PRIMARY_COLOR : SECONDARY_COLOR,
            })}
            {isFocused && (
              <Animated.Text
                entering={FadeIn.duration(200)}
                exiting={FadeOut.duration(200)}
                style={[styles.text, { color: PRIMARY_COLOR }]}
              >
                {label as string}
              </Animated.Text>
            )}
          </AnimatedTouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "95%",
    alignSelf: "center",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 15,
    shadowOffset: { width: 0, height: 12 },
    shadowRadius: 16,
  },
  tabItem: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 36,
    paddingHorizontal: 13,
    borderRadius: 30,
  },
  text: {
    marginLeft: 8,
    fontWeight: "500",
  },
});

export default CustomNavBar;
