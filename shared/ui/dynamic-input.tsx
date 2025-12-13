import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useThemeColors } from "../hooks/use-theme";

interface Props<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  padding?: number;
  borderRadius?: number;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  isPhone?: boolean;
}

export default function DynamicInput<T extends FieldValues>(props: Props<T>) {
  const {
    control,
    name,
    label,
    placeholder,
    padding = 16,
    borderRadius = 12,
    secureTextEntry = false,
    keyboardType = "default",
    isPhone = false,
  } = props;

  const theme = useThemeColors();
  const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const onChangeFun = (text: string) => {
  console.log(text);
  
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <View style={styles.container}>
          {label && (
            <Text
              style={[
                styles.label,
                { color: theme.muted || "#a0a0a0" }, // Fallback if theme.muted is undefined
              ]}
            >
              {label}
            </Text>
          )}
          <View style={styles.inputWrapper}>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: theme.surface || "#1E1E1E",
                  color: theme.text || "white",
                  borderColor: error ? "red" : theme.border || "#333",
                  padding,
                  borderRadius,
                },
              ]}
              placeholderTextColor={theme.muted || "#a0a0a0"}
              placeholder={placeholder}
              onBlur={onBlur}
              onChangeText={(text) => {
                onChangeFun(text);
                onChange(text);
              }}
              value={value}
              secureTextEntry={secureTextEntry && !isPasswordVisible}
              keyboardType={isPhone ? "phone-pad" : keyboardType}
            />
            {secureTextEntry && (
              <TouchableOpacity
                style={styles.iconContainer}
                onPress={togglePasswordVisibility}
              >
                <Ionicons
                  name={isPasswordVisible ? "eye-off" : "eye"}
                  size={20}
                  color={theme.muted || "#a0a0a0"}
                />
              </TouchableOpacity>
            )}
          </View>
          {error && <Text style={styles.errorText}>{error.message}</Text>}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  label: {
    marginBottom: 6,
    fontSize: 14,
    marginLeft: 4,
  },
  inputWrapper: {
    position: "relative",
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    fontSize: 16,
  },
  iconContainer: {
    position: "absolute",
    right: 16,
    height: "100%",
    justifyContent: "center",
  },
  errorText: {
    color: "#ef4444",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
});
