import { CreateConsumerForm } from "@/features/organization/ui/consumers/consumer-form";
import { useThemeColors } from "@/shared/hooks/use-theme";
import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";

export default function CreateConsumerScreen() {
  const theme = useThemeColors();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Text style={[styles.title, { color: theme.text }]}>
        Iste'molchi Qo'shish
      </Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <CreateConsumerForm />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 600,
    marginBottom: 20,
  },
  container: {
    flex: 1,
    padding: 16,
  },
});
