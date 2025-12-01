import { ThemePalette } from "../constants/theme";
import { useStore } from "../store/store";

export const useThemeColors = () => {
  const isDarkMode = useStore((state) => state.isDarkMode);
  const palette = ThemePalette[isDarkMode ? "dark" : "light"];

  return {
    ...palette,
    isDarkMode,
  };
};



