import DynamicInput from "@/shared/ui/dynamic-input";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import * as z from "zod";

// ✅ Zod schema
const loginSchema = z.object({
  username: z.string().min(3, "username kamida 3 ta bulishi kerak "),
  password: z
    .string()
    .min(3, "Parol kamida 6 ta belgidan iborat bo‘lishi kerak"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

interface Props {
  submit: (data: LoginFormData) => void;
  loading: boolean;
}

export default function LoginForm({ submit, loading }: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: "", password: "" },
  });

  return (
    <>
      <View style={styles.form}>
        {/* Email Input */}
        <DynamicInput
          control={control}
          name="username"
          placeholder="Username"
        />

        <DynamicInput
          control={control}
          name="password"
          secureTextEntry
          placeholder="Parol"
        />

        <Button
          loading={loading}
          onPress={handleSubmit(submit)}
          mode="contained"
          style={{ borderRadius: 12 }}
        >
          Login
        </Button>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    // paddingHorizontal: 24,
    backgroundColor: "red",
  },
  form: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 5,
    gap: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 6,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    fontSize: 16,
    color: "#000",
  },
  inputError: {
    borderColor: "red",
  },
  error: {
    color: "red",
    marginBottom: 8,
    fontSize: 12,
  },
  button: {
    backgroundColor: "#007aff",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
