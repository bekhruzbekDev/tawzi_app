import CustomSelect from "@/shared/ui/custom-select";
import DynamicInput from "@/shared/ui/dynamic-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "react-native-paper";
import { z } from "zod";
import { CreateMeterValues } from "../model/types";

const meterSchema = z.object({
  meter_number: z.string().min(8, "Kamida 8 ta belgi bo'lishi kerak"),
  type: z.enum(["electric", "gas", "water"]),
  direction: z.enum(["incoming", "outgoing"]),
  consumer_id: z.string().optional(),
  connected_meter_id: z.string().optional(),
});

interface Props {
  loading: boolean;
  onSubmit: (data: CreateMeterValues) => void;
}

export const MeterForm = ({ loading, onSubmit }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateMeterValues>({
    resolver: zodResolver(meterSchema),
    defaultValues: {
      meter_number: "",
      type: "electric",
      direction: "outgoing",
      consumer_id: "",
      connected_meter_id: "",
    },
  });

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
        name="type"
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

      <Controller
        control={control}
        name="direction"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <CustomSelect
            label="Kiruvchi / Chiquvchi"
            value={value}
            onChange={onChange}
            items={[
              { label: "Kiruvchi", value: "incoming" },
              { label: "Chiquvchi", value: "outgoing" },
            ]}
            error={error?.message}
          />
        )}
      />

      <DynamicInput
        control={control}
        name="consumer_id"
        label="Iste'molchi"
        placeholder=""
      />

      <DynamicInput
        control={control}
        name="connected_meter_id"
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
