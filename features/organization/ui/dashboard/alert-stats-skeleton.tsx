import { useThemeColors } from "@/shared/hooks/use-theme";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming,
} from "react-native-reanimated";

export const AlertStatsSkeleton = () => {
  const theme = useThemeColors();
  const opacity = useSharedValue(0.5);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1000 }),
        withTiming(0.5, { duration: 1000 })
      ),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.card, borderColor: theme.border },
      ]}
    >
      {[1, 2, 3].map((i) => (
        <View key={i}>
          <View style={styles.row}>
            <View style={styles.leftContent}>
              <Animated.View
                style={[
                  styles.iconContainer,
                  { backgroundColor: theme.border },
                  animatedStyle,
                ]}
              />
              <Animated.View
                style={[
                  styles.skeletonBlock,
                  { width: 120, height: 16, backgroundColor: theme.border },
                  animatedStyle,
                ]}
              />
            </View>
            <Animated.View
              style={[
                styles.skeletonBlock,
                { width: 40, height: 16, backgroundColor: theme.border },
                animatedStyle,
              ]}
            />
          </View>
          {i < 3 && (
            <View
              style={[styles.divider, { backgroundColor: theme.border }]}
            />
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  leftContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    marginRight: 12,
  },
  divider: {
    height: 1,
    marginVertical: 4,
  },
  skeletonBlock: {
    borderRadius: 4,
  },
});
