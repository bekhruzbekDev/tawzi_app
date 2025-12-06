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

export const OrganizationChartSkeleton = () => {
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
    <View style={styles.container}>
      <View
        style={[
          styles.barChart,
          { backgroundColor: theme.card, shadowColor: theme.shadow },
        ]}
      >
        {/* Title */}
        <Animated.View
          style={[
            styles.skeletonBlock,
            { width: 140, height: 18, backgroundColor: theme.border, marginBottom: 10 },
            animatedStyle,
          ]}
        />

        {/* Bar Chart Area */}
        <View style={styles.chartArea}>
          {[1, 2, 3, 4].map((i) => (
            <View key={i} style={styles.barGroup}>
              <Animated.View
                style={[
                  styles.bar,
                  { height: 80 + Math.random() * 60, backgroundColor: theme.border },
                  animatedStyle,
                ]}
              />
              <Animated.View
                style={[
                  styles.bar,
                  { height: 70 + Math.random() * 70, backgroundColor: theme.border },
                  animatedStyle,
                ]}
              />
            </View>
          ))}
        </View>

        {/* Labels */}
        <View style={styles.infoLabel}>
          <Animated.View
            style={[
              styles.dot,
              { backgroundColor: theme.border },
              animatedStyle,
            ]}
          />
          <Animated.View
            style={[
              styles.skeletonBlock,
              { width: 60, height: 14, backgroundColor: theme.border },
              animatedStyle,
            ]}
          />
          <Animated.View
            style={[
              styles.dot,
              { backgroundColor: theme.border },
              animatedStyle,
            ]}
          />
          <Animated.View
            style={[
              styles.skeletonBlock,
              { width: 70, height: 14, backgroundColor: theme.border },
              animatedStyle,
            ]}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  barChart: {
    padding: 16,
    paddingTop: 24,
    borderRadius: 16,
    shadowOffset: { height: 0.1, width: 0 },
    marginBottom: 16,
  },
  chartArea: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    height: 180,
    marginBottom: 16,
  },
  barGroup: {
    flexDirection: "row",
    gap: 8,
    alignItems: "flex-end",
  },
  bar: {
    width: 20,
    borderRadius: 6,
  },
  dot: {
    width: 20,
    height: 20,
    borderRadius: 5,
  },
  infoLabel: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  skeletonBlock: {
    borderRadius: 4,
  },
});
