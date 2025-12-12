import { Colors } from "@/shared/constants/theme";
import { useThemeColors } from "@/shared/hooks/use-theme";
import DynamicInput from "@/shared/ui/dynamic-input";
import { Ionicons } from "@expo/vector-icons";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { forwardRef, useCallback, useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import {
  createEmployeeForm,
  EditEmployeeForm,
} from "../../model/employees/constants";
import {
  CreateEmployeeFormType,
  EditEmployeeFormType,
  Employee,
} from "../../model/employees/types";
import { useCreateEmployee } from "../../model/employees/use-create-employee";

interface Props {
  initialValues?: Employee | null;
}

export const CreateEmployeeSheet = forwardRef<BottomSheetModal, Props>(
  ({ initialValues }, ref: any) => {
    const theme = useThemeColors();
    const snapPoints = useMemo(() => ["85%"], []);

    const {
      control,
      handleSubmit,
      reset,

      formState: { errors },
    } = useForm<CreateEmployeeFormType | EditEmployeeFormType>({
      resolver: zodResolver(
        initialValues ? EditEmployeeForm : createEmployeeForm
      ),
      defaultValues: {
        first_name: "",
        phone_number: "",
        username: "",
        password: "",
        add_consumer_permission: false,
        add_device_permission: false,
        add_user_permission: false,
        valve_control_permission: false,
      },
    });

    useEffect(() => {
      if (initialValues) {
        reset({
          first_name: initialValues.name,
          phone_number: initialValues.phone,
          username: initialValues.login,
          password: "",
          add_consumer_permission: initialValues.permissions?.can_add_consumer,
          add_device_permission: initialValues.permissions?.can_add_meter,
          add_user_permission: initialValues.permissions?.can_add_employee,
          valve_control_permission: initialValues.permissions?.can_send_command,
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

    const { createMutation, editMutation, isPending } = useCreateEmployee(
      reset,
      initialValues?.id
    );

    const onFormSubmit = (data: any) => {
      console.log(initialValues);

      if (initialValues) {
        editMutation(data, {
          onSuccess: () => {
            (ref as any).current?.dismiss();
          },
        });
      } else {
        createMutation(data, {
          onSuccess: () => {
            (ref as any).current?.dismiss();
          },
        });
      }
    };

    const closeSheet = useCallback(() => {
      if (ref && typeof ref !== "function") {
        ref.current?.close();

        reset({
          first_name: "",
          phone_number: "",
          username: "",
          password: "",
          add_consumer_permission: false,
          add_device_permission: false,
          add_user_permission: false,
          valve_control_permission: false,
        });
      }
    }, [ref]);

    const handleSheetChanges = useCallback((index: number) => {
      if (index === -1) {
        reset({
          first_name: "",
          phone_number: "",
          username: "",
          password: "",
          add_consumer_permission: false,
          add_device_permission: false,
          add_user_permission: false,
          valve_control_permission: false,
        });
      }
    }, []);

    return (
      <BottomSheetModal
        ref={ref}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        backgroundStyle={{ backgroundColor: theme.surface }}
        handleIndicatorStyle={{ backgroundColor: theme.muted }}
        enablePanDownToClose={true}
        onChange={handleSheetChanges}
      >
        <BottomSheetView style={styles.contentContainer}>
          <View style={styles.header}>
            <Text style={[styles.sheetTitle, { color: theme.text }]}>
              {initialValues ? "Hodimni tahrirlash" : "Hodim qo'shish"}
            </Text>
            <Pressable onPress={closeSheet}>
              <Ionicons name="close" size={24} color={theme.text} />
            </Pressable>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.form}>
              <DynamicInput
                control={control}
                name="first_name"
                label="Ism familiya"
              />
              <DynamicInput
                control={control}
                name="phone_number"
                label="Telefon"
              />
              <DynamicInput control={control} name="username" label="Login" />
              <DynamicInput
                control={control}
                name="password"
                label="Parol"
                secureTextEntry
              />

              <View style={styles.permissionsGrid}>
                <PermissionCheckbox
                  control={control}
                  name="valve_control_permission"
                  label="Commandda yuborish"
                  theme={theme}
                />
                <PermissionCheckbox
                  control={control}
                  name="add_user_permission"
                  label="Hodim qo'shish"
                  theme={theme}
                />
                <PermissionCheckbox
                  control={control}
                  name="add_device_permission"
                  label="Hisoblagich Qo'shish"
                  theme={theme}
                />
                <PermissionCheckbox
                  control={control}
                  name="add_consumer_permission"
                  label="Istemolchi Qo'shish"
                  theme={theme}
                />
              </View>

              <Button
                loading={isPending}
                onPress={handleSubmit(onFormSubmit)}
                mode="contained"
                style={{ borderRadius: 12 }}
              >
                {initialValues ? `Saqlash` : "Qo'shish"}
              </Button>
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
