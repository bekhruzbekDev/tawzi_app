import CustomSelect from "@/shared/ui/custom-select";
import DynamicInput from "@/shared/ui/dynamic-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "react-native-paper";
import { consumerSchema } from "../../model/consumers/constants";
import { ConsumerFormValues } from "../../model/consumers/types";

interface Props {
  loading: boolean;
  onSubmit: (data: ConsumerFormValues) => void;
}
export const CreateConsumerForm = ({ loading, onSubmit }: Props) => {
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

  return (
    <>
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
        name="parent"
        label="Ulangan hisoblagich"
        placeholder=""
      />

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
};
