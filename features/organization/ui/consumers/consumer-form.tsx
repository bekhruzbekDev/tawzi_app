import { useThemeColors } from "@/shared/hooks/use-theme";
import CustomSelect from "@/shared/ui/custom-select";
import DynamicInput from "@/shared/ui/dynamic-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { DropdownData } from "expo-select-dropdown";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";
import { Button } from "react-native-paper";
import { consumerSchema } from "../../model/consumers/constants";
import { ConsumerFormValues } from "../../model/consumers/types";
export const CreateConsumerForm = () => {
  const theme = useThemeColors();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<ConsumerFormValues>({
    resolver: zodResolver(consumerSchema),
    defaultValues: {
      name: "",
      device_type: "electric",
      meter_number: "",
      parent: "",
      password: "",
      phone_number: "",
      username: "",
    },
  });
  const onSubmit = (data: ConsumerFormValues) => {
    console.log({ data });
  };

  const [selected, setSelected] = useState<DropdownData<string, string> | null>(
    null
  );
  const [data] = useState<DropdownData<string, string>[]>([
    { key: "1", value: "Option 1" },
    { key: "2", value: "Option 2" },
    { key: "3", value: "Option 3" },
  ]);
  return (
    <View
      style={{
        padding: 16,
        backgroundColor: theme.surface,
        shadowColor: theme.shadow,
        borderRadius: 12,
        borderColor: theme.border,
      }}
    >
      <DynamicInput
        control={control}
        name="name"
        label="Ism familiya *"
        placeholder=""
      />
      <DynamicInput
        control={control}
        name="phone_number"
        label="Telefon raqam"
        isPhone
        placeholder=""
      />

      <DynamicInput
        control={control}
        name="username"
        label="Username *"
        placeholder=""
      />
      <DynamicInput
        control={control}
        name="password"
        label="Parol *"
        secureTextEntry
        placeholder=""
      />
      <Controller
        control={control}
        name="device_type"
        rules={{ required: "Required field" }}
        render={({
          field: { onChange, value = "electric" },
          fieldState: { error },
        }) => (
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
      <DynamicInput
        control={control}
        name="meter_number"
        label="Hisoblagich raqami"
        placeholder=""
      />
      <DynamicInput
        control={control}
        name="meter_number"
        label="Ulangan hisoblagich"
        placeholder=""
      />

      <Button
        onPress={handleSubmit(onSubmit)}
        mode="contained"
        style={{ borderRadius: 12, padding: 4, marginTop: 10 }}
      >
        Qo'shish
      </Button>
    </View>
  );
};
