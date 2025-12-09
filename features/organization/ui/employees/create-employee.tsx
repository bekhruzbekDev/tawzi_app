import { Colors } from "@/shared/constants/theme";
import { useThemeColors } from "@/shared/hooks/use-theme";
import { Feather, Ionicons } from "@expo/vector-icons";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Employee } from "./employees-card";

interface Props {
  initialValues?: Employee | null;
  onSubmit: (data: any) => void;
}

export const CreateEmployeeSheet = forwardRef<BottomSheetModal, Props>(
  ({ initialValues, onSubmit }, ref) => {
    const theme = useThemeColors();
    const snapPoints = useMemo(() => ["85%"], []);
    const [showPassword, setShowPassword] = useState(false);

    const { control, handleSubmit, reset } = useForm({
      defaultValues: {
        name: "",
        phone: "+998",
        login: "",
        password: "",
        permissions: {
          can_send_command: false,
          can_add_employee: false,
          can_add_meter: false,
          can_add_consumer: false,
        },
      },
    });

    useEffect(() => {
      if (initialValues) {
        reset({
          name: initialValues.name,
          phone: initialValues.phone,
          login: initialValues.login,
          password: "", // Don't pre-fill password for security/design usually, or can fill dummy
          permissions: initialValues.permissions,
        });
      } else {
        reset({
          name: "",
          phone: "+998",
          login: "",
          password: "",
          permissions: {
            can_send_command: false,
            can_add_employee: false,
            can_add_meter: false,
            can_add_consumer: false,
          },
        });
      }
    }, [initialValues, reset]);

    const renderBackdrop = useCallback(
      (props: any) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          opacity={0.5}
          pressBehavior="close"
        />
      ),
      []
    );

    const onFormSubmit = (data: any) => {
      console.log("Form Data:", data);
      onSubmit(data);
    };

    return (
      <BottomSheetModal
        ref={ref}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        backgroundStyle={{ backgroundColor: theme.surface }}
        handleIndicatorStyle={{ backgroundColor: theme.muted }}
        enablePanDownToClose={true}
      >
        <BottomSheetView style={styles.contentContainer}>
          <View style={styles.header}>
            <Text style={[styles.sheetTitle, { color: theme.text }]}>
              {initialValues ? "Hodimni tahrirlash" : "Hodim qo'shish"}
            </Text>
            <Pressable onPress={() => (ref as any).current?.dismiss()}>
              <Ionicons name="close" size={24} color={theme.text} />
            </Pressable>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.form}>
              <View style={styles.field}>
                <Text style={[styles.label, { color: theme.muted }]}>
                  Ism familiya
                </Text>
                <Controller
                  control={control}
                  name="name"
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      style={[
                        styles.input,
                        { borderColor: theme.border, color: theme.text },
                      ]}
                      value={value}
                      onChangeText={onChange}
                    />
                  )}
                />
              </View>

              <View style={styles.field}>
                <Text style={[styles.label, { color: theme.muted }]}>
                  Telefon
                </Text>
                <Controller
                  control={control}
                  name="phone"
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      style={[
                        styles.input,
                        { borderColor: theme.border, color: theme.text },
                      ]}
                      value={value}
                      onChangeText={onChange}
                      keyboardType="phone-pad"
                    />
                  )}
                />
              </View>

              <View style={styles.field}>
                <Text style={[styles.label, { color: theme.muted }]}>
                  Login
                </Text>
                <Controller
                  control={control}
                  name="login"
                  render={({ field: { onChange, value } }) => (
                    <View
                      style={[
                        styles.inputContainer,
                        {
                          borderColor: theme.border,
                          backgroundColor: "#EBF1FA",
                        },
                      ]}
                    >
                      <TextInput
                        style={[
                          styles.inputNoBorder,
                          { color: theme.text, flex: 1 },
                        ]}
                        value={value || "admin"}
                        onChangeText={onChange}
                      />
                    </View>
                  )}
                />
              </View>

              <View style={styles.field}>
                <Text style={[styles.label, { color: theme.muted }]}>
                  Parol
                </Text>
                <Controller
                  control={control}
                  name="password"
                  render={({ field: { onChange, value } }) => (
                    <View
                      style={[
                        styles.inputContainer,
                        {
                          borderColor: theme.border,
                          backgroundColor: "#EBF1FA",
                        },
                      ]}
                    >
                      <TextInput
                        style={[
                          styles.inputNoBorder,
                          { color: theme.text, flex: 1 },
                        ]}
                        value={value}
                        onChangeText={onChange}
                        secureTextEntry={!showPassword}
                        placeholder="•••••"
                        placeholderTextColor={theme.muted}
                      />
                      <Pressable onPress={() => setShowPassword(!showPassword)}>
                        <Feather
                          name={showPassword ? "eye" : "eye-off"}
                          size={18}
                          color={theme.muted}
                        />
                      </Pressable>
                    </View>
                  )}
                />
              </View>

              <View style={styles.permissionsGrid}>
                <PermissionCheckbox
                  control={control}
                  name="permissions.can_send_command"
                  label="Commandda yuborish"
                  theme={theme}
                />
                <PermissionCheckbox
                  control={control}
                  name="permissions.can_add_employee"
                  label="Hodim qo'shish"
                  theme={theme}
                />
                <PermissionCheckbox
                  control={control}
                  name="permissions.can_add_meter"
                  label="Hisoblagich Qo'shish"
                  theme={theme}
                />
                <PermissionCheckbox
                  control={control}
                  name="permissions.can_add_consumer"
                  label="Istemolchi Qo'shish"
                  theme={theme}
                />
              </View>

              <Pressable
                style={[styles.submitBtn, { backgroundColor: Colors.primary }]}
                onPress={handleSubmit(onFormSubmit)}
              >
                <Text style={styles.submitText}>
                  {initialValues ? "Saqlash" : "Qo'shish"}
                </Text>
              </Pressable>
            </View>
          </ScrollView>
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

const PermissionCheckbox = ({ control, name, label, theme }: any) => (
  <Controller
    control={control}
    name={name}
    render={({ field: { onChange, value } }) => (
      <Pressable style={styles.checkboxRow} onPress={() => onChange(!value)}>
        <View
          style={[
            styles.checkbox,
            { borderColor: value ? Colors.primary : theme.border },
          ]}
        >
          {value && (
            <View
              style={[
                styles.checkboxInner,
                { backgroundColor: Colors.primary },
              ]}
            />
          )}
        </View>
        <Text style={[styles.checkboxLabel, { color: theme.text }]}>
          {label}
        </Text>
      </Pressable>
    )}
  />
);

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  sheetTitle: {
    fontSize: 22,
    fontWeight: "700",
  },
  form: {
    gap: 16,
  },
  row: {
    flexDirection: "row",
    gap: 16,
  },
  field: {
    gap: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
  },
  inputNoBorder: {
    height: 48,
    fontSize: 14,
  },
  permissionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    marginTop: 8,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    width: "45%", // Roughly 2 items per row
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 10, // Circle as per image design hint (or square) - sticking to circle "radio" style but acting as checkbox
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  checkboxLabel: {
    fontSize: 14,
    fontWeight: "500",
  },
  submitBtn: {
    height: 48,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  submitText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
