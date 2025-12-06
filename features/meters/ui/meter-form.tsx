import { useConsumersData } from "@/features/organization/model/consumers/use-consumers";
import { useThemeColors } from "@/shared/hooks/use-theme";
import CustomSelect from "@/shared/ui/custom-select";
import DynamicInput from "@/shared/ui/dynamic-input";
import CustomSheetSelect from "@/shared/ui/sheet-select";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { forwardRef, useEffect, useImperativeHandle } from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button, RadioButton } from "react-native-paper";
import { z } from "zod";
import { CreateMeterValues, MeterDetail } from "../model/types";

const meterSchema = z.object({
  meter_number: z.string().min(3, "Kamida 3 ta belgi bo'lishi kerak"),
  device_type: z.enum(["electric", "gas", "water"]),
  direction: z.enum(["incoming", "outgoing"]),
  consumer: z.string(),
  parent: z.union([z.string(), z.null()]),
 is_generator: z.boolean(),
  is_solar_panel: z.boolean(),
  is_main: z.boolean(),
});

interface Props {
  loading: boolean;
  onSubmit: (data: CreateMeterValues) => void;
  meter:MeterDetail|null
}

export interface MeterFormRef {
  handleSubmit: () => void;
  reset: (data?: CreateMeterValues) => void;
  setValue: (name: keyof CreateMeterValues, value: any) => void;
  getValues: () => CreateMeterValues;
}

export const MeterForm = forwardRef<MeterFormRef, Props>(({ loading, onSubmit, meter }, ref) => {
  const theme = useThemeColors();

  const {
    selectData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useConsumersData();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    getValues,
    formState: { errors },
  } = useForm<CreateMeterValues>({
    resolver: zodResolver(meterSchema),
    defaultValues: {
      meter_number: "",
      device_type:"electric",
      direction: "outgoing",
      consumer: "",
      parent: null,
      is_generator: false,
      is_solar_panel: false,
      is_main: false,
    },
  });

  useImperativeHandle(ref, () => ({
    handleSubmit: () => handleSubmit(onSubmit)(),
    reset,
    setValue,
    getValues,
  }));

useEffect(() => {
    if (meter) {
      reset({
          meter_number: meter.serial_number??"",
      device_type:meter.type??"",
      direction: meter.device_meter_direction??"outgoing",
      consumer: meter.consumer??"",
      parent: meter?.parent ?meter.parent:null,
      is_generator: meter?.is_generator??false,
      is_solar_panel: meter?.is_solar_panel??false,
      is_main: meter?.is_main??false,
      });
    }
  }, [meter]);



  const direction = watch("direction");
  const isGenerator = watch("is_generator");
  const isSolarPanel = watch("is_solar_panel");
  const isMain = watch("is_main");

  // Determine which radio option is selected
  const getSelectedMeterType = () => {
    if (isGenerator) return "generator";
    if (isSolarPanel) return "solar";
    if (isMain) return "main";
    return "other";
  };

  const handleMeterTypeChange = (value: string) => {
    setValue("is_generator", value === "generator");
    setValue("is_solar_panel", value === "solar");
    setValue("is_main", value === "main");
  };

  const handleLoadMoreConsumers = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return (
    <>
      <DynamicInput
        control={control}
        name="meter_number"
        label="Hisoblagich raqami"
        placeholder=""
      />

      <Controller
        control={control}
        name="device_type"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <CustomSelect
            label="Hisoblagich turi"
            value={value}
            onChange={onChange}
            items={[
              { label: "Elektr", value: "electric" },
              { label: "Gaz", value: "gas" },
              { label: "Suv", value: "water" },
            ]}
            error={error?.message}
          />
        )}
      />

<CustomSheetSelect   name="direction"
  control={control}
  label="Kiruvchi / Chiquvchi"
  placeholder="Kategoriyani tanlang"
  items={[
    { label: "Kiruvchi", value: "incoming" },
    { label: "Chiquvchi", value: "outgoing" },
 
  ]}
  error={errors.direction?.message}/>

      <CustomSheetSelect
        name="consumer"
        control={control}
        label="Iste'molchi"
        placeholder="Iste'molchi tanlang"
        items={selectData}
        error={errors.consumer?.message}
        onLoadMore={handleLoadMoreConsumers}
        hasMore={hasNextPage}
        isLoading={isFetchingNextPage}
      />

      <DynamicInput
        control={control}
        name="parent"
        label="Ulangan hisoblagich"
        placeholder=""
      />

      {direction === "incoming" && (
        <View style={styles.radioContainer}>
          <Text style={[styles.radioLabel, { color: theme.text }]}>
            Hisoblagich manbai
          </Text>
          <RadioButton.Group
            onValueChange={handleMeterTypeChange}
            value={getSelectedMeterType()}
          >
            <View style={styles.radioRow}>
              <TouchableOpacity
                style={styles.radioItem}
                onPress={() => handleMeterTypeChange("other")}
              >
                <Text style={[styles.radioText, { color: theme.text }]}>
                  Boshqa
                </Text>
                <RadioButton value="other" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.radioItem}
                onPress={() => handleMeterTypeChange("main")}
              >
                <Text style={[styles.radioText, { color: theme.text }]}>
                  Asosiy
                </Text>
                <RadioButton value="main" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.radioItem}
                onPress={() => handleMeterTypeChange("generator")}
              >
                <Text style={[styles.radioText, { color: theme.text }]}>
                  Generator
                </Text>
                <RadioButton value="generator" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.radioItem}
                onPress={() => handleMeterTypeChange("solar")}
              >
                <Text style={[styles.radioText, { color: theme.text }]}>
                  Quyosh paneli
                </Text>
                <RadioButton value="solar" />
              </TouchableOpacity>
            </View>
          </RadioButton.Group>
        </View>
      )}

      <Button
        onPress={handleSubmit(onSubmit)}
        mode="contained"
        loading={loading}
        style={{
          borderRadius: 12,
          padding: 4,
          marginTop: 10,
          marginBottom: 20,
        }}
      >
        Qo'shish
      </Button>
    </>
  );
});

const styles = StyleSheet.create({
  radioContainer: {
    marginBottom: 16,
  },
  radioLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  radioRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  radioItem: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    minWidth: "45%",
  },
  radioText: {
    fontSize: 14,
    marginRight: 4,
  },
});
