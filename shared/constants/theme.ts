/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from "react-native";

// const tintColorLight = "#0a7ea4";
// const tintColorDark = "#fff";

export const Colors = {
  primary: "#06b6d4",
  secondary: "white",
};

export const ThemePalette = {
  light: {
    background: "#f1f1f1",
    surface: "#ffffff",
    card: "#ffffff",
    text: "#0f172a",
    muted: "#6b7280",
    border: "#e5e7eb",
    badge: "#06b6d4",
    overlay: "rgba(15, 23, 42, 0.35)",
    sheetHandle: "#e5e7eb",
    shadow: "rgba(0,0,0,0.2)",
    statusBarStyle: "dark" as const,
  },
  dark: {
    background: "#0f172a",
    surface: "#1f2937",
    card: "#1e293b",
    text: "#f8fafc",
    muted: "#94a3b8",
    border: "rgba(148, 163, 184, 0.4)",
    badge: "#06b6d4",
    overlay: "rgba(15, 23, 42, 0.75)",
    sheetHandle: "#475569",
    shadow: "rgba(0,0,0,0.6)",
    statusBarStyle: "light" as const,
  },
};

export type ThemeMode = keyof typeof ThemePalette;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
