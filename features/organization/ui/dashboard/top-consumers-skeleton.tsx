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

export const TopConsumersSkeleton = () => {
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
      <View style={styles.header}>
        <Animated.View
          style={[
            styles.skeletonBlock,
            { width: 150, height: 20, backgroundColor: theme.border, marginBottom: 4 },
            animatedStyle,
          ]}
        />
        <Animated.View
          style={[
            styles.skeletonBlock,
            { width: 200, height: 14, backgroundColor: theme.border },
            animatedStyle,
          ]}
        />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {[1, 2, 3].map((i) => (
          <Animated.View
            key={i}
            style={[
              styles.card,
              {
                backgroundColor: theme.card,
                borderColor: theme.border,
                marginRight: i === 3 ? 16 : 12,
              },
              animatedStyle,
            ]}
          >
            {/* Icon */}
            <Animated.View
              style={[
                styles.iconContainer,
                { backgroundColor: theme.border },
              ]}
            />

            {/* Content */}
            <View style={styles.cardContent}>
              <Animated.View
                style={[
                  styles.skeletonBlock,
                  { width: 140, height: 16, backgroundColor: theme.border, marginBottom: 4 },
                ]}
              />
              <Animated.View
                style={[
                  styles.skeletonBlock,
                  { width: 80, height: 13, backgroundColor: theme.border, marginBottom: 12 },
                ]}
              />

              {/* Resource info */}
              <View style={styles.resourceInfo}>
                <Animated.View
                  style={[
                    styles.skeletonBlock,
                    { width: 50, height: 13, backgroundColor: theme.border },
                  ]}
                />
                <Animated.View
                  style={[
                    styles.skeletonBlock,
                    { width: 60, height: 15, backgroundColor: theme.border },
                  ]}
                />
              </View>
            </View>
          </Animated.View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    marginBottom: 20,
  },
  header: {
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 12,
  },
  card: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    width: 280,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    marginRight: 12,
  },
  cardContent: {
    flex: 1,
  },
  resourceInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  skeletonBlock: {
    borderRadius: 4,
  },
});
