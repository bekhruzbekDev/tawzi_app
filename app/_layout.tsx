import { queryClient } from "@/services/query-client";
import { Colors } from "@/shared/constants/theme";
import { useThemeColors } from "@/shared/hooks/use-theme";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { DefaultTheme, PaperProvider } from "react-native-paper";
import "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  // const colorScheme = useColorScheme();
  const themeColors = useThemeColors();
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: Colors.primary,
      secondary: Colors.secondary,
      background: themeColors.background,
      surface: themeColors.surface,
    },
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: themeColors.background }}>
      <QueryClientProvider client={queryClient}>
        <PaperProvider theme={theme}>
          <GestureHandlerRootView
            style={{ flex: 1, backgroundColor: themeColors.background }}
          >
            <BottomSheetModalProvider>
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="create-meter" options={{ headerShown: false }} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen
                  name="login/login"
                  options={{ headerShown: false }}
                />
              </Stack>
            </BottomSheetModalProvider>
          </GestureHandlerRootView>
          <StatusBar
            style={themeColors.statusBarStyle}
            // backgroundColor={themeColors.background}
          />
          
          <Toast />
        </PaperProvider>
      </QueryClientProvider>
    </SafeAreaView>
  );
}
