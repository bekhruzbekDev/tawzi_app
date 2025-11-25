import { useLogin } from "@/features/login/model/use-login";
import LoginForm from "@/features/login/ui/auth-form";
import { StyleSheet, View } from "react-native";

export default function LoginScreen() {
  const { submitData, loading } = useLogin();
  return (
    <View style={styles.container}>
      <LoginForm submit={submitData} loading={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
});
