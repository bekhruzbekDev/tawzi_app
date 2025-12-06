import { Colors } from "@/shared/constants/theme";
import { useThemeColors } from "@/shared/hooks/use-theme";
import { useStore } from "@/shared/store/store";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useMemo, useRef, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const languages: Array<{ label: string; value: "uz" | "ru" | "kr" }> = [
  { label: "O'zbekcha", value: "uz" },
  { label: "Русский", value: "ru" },
  { label: "Ўзбекча (крил)", value: "kr" },
];

const PROFILE_LOGO = require("../../../assets/images/logo.png");

export default function ProfileScreen() {
  const router = useRouter();
  const user = useStore((state) => state.user);
  const isDarkMode = useStore((state) => state.isDarkMode);
  const setDarkMode = useStore((state) => state.setDarkMode);
  const theme = useThemeColors();
  const { top: safeTop, bottom: safeBottom } = useSafeAreaInsets();
  const [language, setLanguage] = useState<"uz" | "ru" | "kr">("uz");
  const languageSheetRef = useRef<BottomSheetModal>(null);
  const languageSnapPoints = useMemo(() => ["42%"], []);

  const initials = useMemo(() => {
    const first = user?.first_name?.[0] ?? "";
    const last = user?.last_name?.[0] ?? "";
    return `${first}${last}`.toUpperCase();
  }, [user?.first_name, user?.last_name]);

  const fullName = useMemo(() => {
    const first = user?.first_name ?? "";
    const last = user?.last_name ?? "";
    return [first, last].filter(Boolean).join(" ");
  }, [user?.first_name, user?.last_name]);

  const logout = async () => {
    await AsyncStorage.removeItem("access_token");
    await AsyncStorage.removeItem("refresh_token");
    router.push("/login/login");
  };

  const openLanguagePicker = () => {
    languageSheetRef.current?.present();
  };

  const closeLanguagePicker = () => {
    languageSheetRef.current?.dismiss();
  };

  const handleSelectLanguage = (value: "uz" | "ru" | "kr") => {
    setLanguage(value);
    closeLanguagePicker();
  };

  return (
    <ScrollView
      style={[styles.screen, { backgroundColor: theme.background }]}
      contentContainerStyle={[
        styles.content,
        {
          paddingTop: safeTop + 32,
          paddingBottom: safeBottom + 32,
        },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <View
        style={[
          styles.avatar,
          { backgroundColor: theme.card, borderColor: Colors.primary },
        ]}
      >
        <Image
          source={PROFILE_LOGO}
          style={styles.avatarImage}
          contentFit="cover"
        />
      </View>
      <View style={styles.infoBlock}>
        <Text style={[styles.name, { color: theme.text }]}>
          {fullName || "Foydalanuvchi"}
        </Text>
        <Text style={[styles.username, { color: theme.muted }]}>
          @{user?.username ?? "username"}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          Sozlamalar
        </Text>

        <Pressable
          style={[
            styles.settingCard,
            { backgroundColor: theme.card, borderColor: theme.border },
          ]}
          onPress={openLanguagePicker}
        >
          <View>
            <Text style={[styles.settingLabel, { color: theme.text }]}>
              Til
            </Text>
            <Text style={[styles.settingHint, { color: theme.muted }]}>
              Interfeys tilini tanlang
            </Text>
          </View>
          <Text style={styles.settingValue}>
            {languages.find((item) => item.value === language)?.label}
          </Text>
        </Pressable>

        <View
          style={[
            styles.settingCard,
            { backgroundColor: theme.card, borderColor: theme.border },
          ]}
        >
          <View>
            <Text style={[styles.settingLabel, { color: theme.text }]}>
              Dark mode
            </Text>
            <Text style={[styles.settingHint, { color: theme.muted }]}>
              Kechasi ko‘zlaringizni asrash uchun
            </Text>
          </View>
          <Switch
            value={isDarkMode}
            onValueChange={setDarkMode}
            trackColor={{ false: theme.border, true: Colors.primary }}
            thumbColor={isDarkMode ? "#0f172a" : "#fff"}
          />
        </View>
      </View>

      <TouchableOpacity
        style={[
          styles.logoutButton,
          {
            backgroundColor: isDarkMode ? "rgba(239, 68, 68, 0.15)" : "#fee2e2",
          },
        ]}
        onPress={logout}
      >
        <Text style={styles.logoutLabel}>Chiqish</Text>
      </TouchableOpacity>

      <BottomSheetModal
        ref={languageSheetRef}
        snapPoints={languageSnapPoints}
        backgroundStyle={[
          styles.sheetBackground,
          { backgroundColor: theme.card },
        ]}
        handleIndicatorStyle={[
          styles.sheetHandle,
          { backgroundColor: theme.sheetHandle },
        ]}
      >
        <BottomSheetView style={styles.sheetContent}>
          <Text style={[styles.sheetTitle, { color: theme.text }]}>
            Tilni tanlang
          </Text>
          {languages.map((item) => {
            const isActive = language === item.value;
            return (
              <Pressable
                key={item.value}
                style={styles.radioRow}
                onPress={() => handleSelectLanguage(item.value)}
              >
                <View
                  style={[styles.radioOuter, { borderColor: Colors.primary }]}
                >
                  {isActive && (
                    <View
                      style={[
                        styles.radioInner,
                        { backgroundColor: Colors.primary },
                      ]}
                    />
                  )}
                </View>
                <Text style={[styles.radioLabel, { color: theme.text }]}>
                  {item.label}
                </Text>
              </Pressable>
            );
          })}
        </BottomSheetView>
      </BottomSheetModal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    alignItems: "center",
    gap: 24,
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
  },
  avatarImage: {
    width: 130,
    height: 130,
    borderRadius: 60,
  },
  infoBlock: {
    alignItems: "center",
  },
  name: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 4,
  },
  username: {
    fontSize: 16,
    color: "#6b7280",
  },
  section: {
    width: "100%",
    gap: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  settingCard: {
    borderRadius: 20,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: "600",
  },
  settingHint: {
    marginTop: 4,
    fontSize: 13,
  },
  settingValue: {
    fontWeight: "600",
    color: Colors.primary,
  },
  logoutButton: {
    marginTop: 16,
    alignSelf: "stretch",
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
  },
  logoutLabel: {
    color: "#b91c1c",
    fontWeight: "600",
  },
  sheetBackground: {
    backgroundColor: "#fff",
    borderRadius: 24,
  },
  sheetHandle: {
    width: 40,
    backgroundColor: "#e5e7eb",
  },
  sheetContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 24,
    gap: 16,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  radioRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  radioLabel: {
    fontSize: 16,
  },
});
