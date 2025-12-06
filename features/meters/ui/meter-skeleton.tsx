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

export const MeterSkeleton = () => {
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
        styles.card,
        {
          backgroundColor: theme.card,
          borderColor: theme.border,
        },
      ]}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Animated.View
            style={[
              styles.skeletonBlock,
              { width: 48, height: 48, backgroundColor: theme.border },
              animatedStyle,
            ]}
          />
          <View style={{ marginLeft: 12 }}>
            <Animated.View
              style={[
                styles.skeletonBlock,
                { width: 120, height: 20, backgroundColor: theme.border },
                animatedStyle,
              ]}
            />
            <Animated.View
              style={[
                styles.skeletonBlock,
                {
                  width: 80,
                  height: 14,
                  marginTop: 6,
                  backgroundColor: theme.border,
                },
                animatedStyle,
              ]}
            />
          </View>
        </View>
        <Animated.View
          style={[
            styles.skeletonBlock,
            { width: 60, height: 24, backgroundColor: theme.border },
            animatedStyle,
          ]}
        />
      </View>

      {/* Content */}
      <View style={styles.content}>
        <View>
          <Animated.View
            style={[
              styles.skeletonBlock,
              { width: 80, height: 14, backgroundColor: theme.border },
              animatedStyle,
            ]}
          />
          <Animated.View
            style={[
              styles.skeletonBlock,
              {
                width: 100,
                height: 20,
                marginTop: 6,
                backgroundColor: theme.border,
              },
              animatedStyle,
            ]}
          />
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <Animated.View
            style={[
              styles.skeletonBlock,
              { width: 80, height: 14, backgroundColor: theme.border },
              animatedStyle,
            ]}
          />
          <Animated.View
            style={[
              styles.skeletonBlock,
              {
                width: 80,
                height: 20,
                marginTop: 6,
                backgroundColor: theme.border,
              },
              animatedStyle,
            ]}
          />
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Animated.View
          style={[
            styles.skeletonBlock,
            { flex: 1, height: 44, backgroundColor: theme.border },
            animatedStyle,
          ]}
        />
        <Animated.View
          style={[
            styles.skeletonBlock,
            { width: 44, height: 44, backgroundColor: theme.border },
            animatedStyle,
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: "row",
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  footer: {
    flexDirection: "row",
    gap: 12,
  },
  skeletonBlock: {
    borderRadius: 8,
  },
});
