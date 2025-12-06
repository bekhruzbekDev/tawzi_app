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

export const FinanceChartSkeleton = () => {
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
            { width: 120, height: 18, backgroundColor: theme.border, marginBottom: 10 },
            animatedStyle,
          ]}
        />

        {/* Pie Chart Circle */}
        <View style={{ alignItems: "center", marginBottom: 16 }}>
          <Animated.View
            style={[
              styles.pieCircle,
              { backgroundColor: theme.border },
              animatedStyle,
            ]}
          />
        </View>

        {/* Labels */}
        <View style={{ gap: 10 }}>
          {[1, 2, 3].map((i) => (
            <View key={i} style={styles.infoLabel}>
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
                  { width: 200, height: 16, backgroundColor: theme.border },
                  animatedStyle,
                ]}
              />
            </View>
          ))}
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
    borderRadius: 16,
    shadowOffset: { height: 0.1, width: 0 },
    overflow: "hidden",
    marginBottom: 16,
  },
  pieCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
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
