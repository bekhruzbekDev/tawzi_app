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

  const formatPhoneNumber = (value: string) => {
    if (!value) return "+998 (";

    // Remove all non-digit characters
    const digits = value.replace(/\D/g, "");

    // Ensure it starts with 998
    let processedDigits = digits;
    if (!processedDigits.startsWith("998")) {
      processedDigits = "998" + processedDigits;
    }

    // Trim to max length (998 + 9 digits = 12 digits)
    if (processedDigits.length > 12) {
      processedDigits = processedDigits.slice(0, 12);
    }

    // Check if we only have prefix or less (shouldn't happen due to logic above ensuring 998, but safe guard)
    if (processedDigits.length <= 3) return "+998 (";

    let formatted = "+998 (";

    // Add operator code
    if (processedDigits.length > 3) {
      formatted += processedDigits.slice(3, 5);
    }

    if (processedDigits.length >= 5) {
      formatted += ") ";
    }

    // Add first part of number
    if (processedDigits.length > 5) {
      formatted += processedDigits.slice(5, 8);
    }

    if (processedDigits.length >= 8) {
      formatted += " ";
    }

    // Add second part
    if (processedDigits.length > 8) {
      formatted += processedDigits.slice(8, 10);
    }

    if (processedDigits.length >= 10) {
      formatted += " ";
    }

    // Add last part
    if (processedDigits.length > 10) {
      formatted += processedDigits.slice(10, 12);
    }

    return formatted;
  };

  const unformatPhoneNumber = (formattedText: string) => {
    // Remove all non-digit characters
    const digits = formattedText.replace(/\D/g, "");

    // Ensure it starts with 998, if user accidentally deleted it?
    // Actually typically we want to just return '+' + digits
    // But user requirement says value should be +998998889999

    return "+" + digits;
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => {
        // Handle value for input display
        let displayValue = value;
        if (isPhone) {
          // If value is empty or not provided, default to formatted prefix
          // But we need to use the value from hook form if present
          if (!value) {
            displayValue = "+998 (";
          } else {
            displayValue = formatPhoneNumber(value);
          }
        }

        return (
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
                  if (isPhone) {
                    // Start logic to keep prefix
                    // If user tries to delete "+998 (", reset or block?
                    // Better to re-format whatever they typed

                    // Actually, if we just strip everything and rebuild, it might be safer
                    const rawDigits = text.replace(/\D/g, "");
                    // If they deleted everything, rawDigits might be empty or "99"

                    // If they backspaced into the prefix, we should enforce prefix

                    // Let's rely on formatPhoneNumber logic which enforces 998 start

                    // But we need to save the RAW value to form
                    // raw val: +998xxxxxxxxx

                    // If rawDigits starts with 998, great. If not, if they deleted 8, it might be 99...
                    // Let's just force 998 prefix in unformat/format logic

                    let digits = rawDigits;
                    if (!digits.startsWith("998")) {
                      // Did they delete the '+'?
                      // If they typed a char, it's appended.
                      // If text is "+998 (9" -> digits "9989"
                      // If they backspace: "+998 (" -> "+998" -> digits "998"
                    }

                    // Special case: if text length < previous text length (deletion)
                    // and cursor position... React Native TextInput handling is tricky for strict masking without cursor jumps.
                    // But for this simple requirement:

                    // Let's create the raw value to store
                    // Remove all non digits
                    let clean = text.replace(/\D/g, "");
                    if (!clean.startsWith("998")) {
                      clean = "998" + clean;
                    }
                    if (clean.length > 12) clean = clean.slice(0, 12);

                    const rawValue = "+" + clean;
                    onChange(rawValue as any);
                  } else {
                    onChange(text as any);
                  }
                }}
                value={displayValue}
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
        );
      }}
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
