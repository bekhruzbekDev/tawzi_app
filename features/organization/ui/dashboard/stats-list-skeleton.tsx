import { useThemeColors } from "@/shared/hooks/use-theme";
import React, { useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming,
} from "react-native-reanimated";

export const StatsListSkeleton = () => {
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
    <View>
      {/* Horizontal Cards Skeleton */}
      <ScrollView
        style={styles.container}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {[1, 2, 3].map((i) => (
          <Animated.View
            key={i}
            style={[
              styles.card,
              { backgroundColor: theme.card, marginRight: 20 },
              animatedStyle,
            ]}
          >
            <Animated.View
              style={[
                styles.skeletonBlock,
                { width: 100, height: 14, backgroundColor: theme.border },
              ]}
            />
            <Animated.View
              style={[
                styles.skeletonBlock,
                { width: 80, height: 24, marginTop: 10, backgroundColor: theme.border },
              ]}
            />
            <Animated.View
              style={[
                styles.skeletonBlock,
                { width: 60, height: 12, marginTop: 6, backgroundColor: theme.border },
              ]}
            />
          </Animated.View>
        ))}
      </ScrollView>

      {/* Gradient Card Skeleton */}
      <View style={styles.resourceLossContainer}>
        <Animated.View
          style={[
            styles.gradientCard,
            { backgroundColor: theme.surface },
            animatedStyle,
          ]}
        >
          <View style={styles.cardContent}>
            <View style={styles.textContainer}>
              <Animated.View
                style={[
                  styles.skeletonBlock,
                  { width: 120, height: 12, backgroundColor: theme.border },
                ]}
              />
              <Animated.View
                style={[
                  styles.skeletonBlock,
                  { width: 60, height: 14, marginTop: 8, backgroundColor: theme.border },
                ]}
              />
              <Animated.View
                style={[
                  styles.skeletonBlock,
                  { width: 100, height: 32, marginTop: 8, backgroundColor: theme.border },
                ]}
              />
            </View>
            <Animated.View
              style={[
                styles.iconContainer,
                { backgroundColor: theme.border },
              ]}
            />
          </View>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    minHeight: 120,
  },
  resourceLossContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    marginBottom: 16,
  },
  gradientCard: {
    padding: 20,
    borderRadius: 16,
    height: 120,
    width: "100%",
    marginRight: 20,
  },
  cardContent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  textContainer: {
    flex: 1,
    justifyContent: "space-between",
    height: "100%",
  },
  iconContainer: {
    borderRadius: 50,
    width: 60,
    height: 60,
  },
  card: {
    padding: 16,
    borderRadius: 16,
    height: 100,
    width: 220,
  },
  skeletonBlock: {
    borderRadius: 4,
  },
});
