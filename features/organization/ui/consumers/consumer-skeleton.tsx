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

export const ConsumerSkeleton = () => {
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
        <View>
          <Animated.View
            style={[
              styles.skeletonBlock,
              { width: 150, height: 24, backgroundColor: theme.border },
              animatedStyle,
            ]}
          />
          <Animated.View
            style={[
              styles.skeletonBlock,
              {
                width: 100,
                height: 16,
                marginTop: 8,
                backgroundColor: theme.border,
              },
              animatedStyle,
            ]}
          />
        </View>
        <View style={styles.actions}>
          <Animated.View
            style={[
              styles.iconBtn,
              { backgroundColor: theme.surface, borderColor: theme.border },
              animatedStyle,
            ]}
          />
          <Animated.View
            style={[
              styles.iconBtn,
              { backgroundColor: theme.surface, borderColor: theme.border },
              animatedStyle,
            ]}
          />
        </View>
      </View>

      <View style={[styles.sep, { borderTopColor: theme.border }]} />

      {/* Rows */}
      {[1, 2, 3].map((i) => (
        <View key={i}>
          <View style={styles.row}>
            <Animated.View
              style={[
                styles.skeletonBlock,
                { width: 80, height: 20, backgroundColor: theme.border },
                animatedStyle,
              ]}
            />
            <Animated.View
              style={[
                styles.skeletonBlock,
                { width: 60, height: 20, backgroundColor: theme.border },
                animatedStyle,
              ]}
            />
          </View>
          {i < 3 && (
            <View style={[styles.sep, { borderTopColor: theme.border }]} />
          )}
        </View>
      ))}

      <View style={[styles.sep, { borderTopColor: theme.border }]} />

      {/* Footer */}
      <View style={styles.footer}>
        <Animated.View
          style={[
            styles.skeletonBlock,
            { width: 120, height: 16, backgroundColor: theme.border },
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
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  actions: {
    flexDirection: "row",
    gap: 8,
  },
  iconBtn: {
    width: 42,
    height: 42,
    borderRadius: 10,
    borderWidth: 1,
  },
  sep: {
    borderTopWidth: 1,
    marginVertical: 12,
    opacity: 0.7,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footer: {
    marginTop: 6,
    alignItems: "flex-end",
  },
  skeletonBlock: {
    borderRadius: 4,
  },
});
