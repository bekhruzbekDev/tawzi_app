import { useLogin } from "@/features/login/model/use-login";
import LoginForm from "@/features/login/ui/auth-form";
import { useThemeColors } from "@/shared/hooks/use-theme";
import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";

export default function LoginScreen() {
  const { submitData, loading } = useLogin();
  const theme = useThemeColors();
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <LoginForm submit={submitData} loading={loading} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 34,
    fontWeight: "500",
    marginBottom: 16,
  },
});
