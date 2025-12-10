import CustomSelect from "@/shared/ui/custom-select";
import DynamicInput from "@/shared/ui/dynamic-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import { paymentSchema } from "../model/constants";
import { PaymentFormValues } from "../model/types";

interface Props {
  isConsumer?: boolean;
}
export const PaymentForm = ({ isConsumer }: Props) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      meter_number: "",
      device_type: "electric",
      summa: 0,
    },
  });

  const onsubmit = (data: PaymentFormValues) => {
    console.log(data);
  };

  
  return (
    <View>
      {isConsumer && (
        <Controller
          control={control}
          name="consumer_id"
          rules={{ required: "Required field" }}
          render={({
            field: { onChange, value = "electric" },
            fieldState: { error },
          }) => (
            <CustomSelect
              label="Iste'molchi"
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
      )}
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
      <Controller
        control={control}
        name="meter_number"
        rules={{ required: "Required field" }}
        render={({
          field: { onChange, value = "electric" },
          fieldState: { error },
        }) => (
          <CustomSelect
            label="Hisoblagich raqami"
            value={value}
            onChange={onChange}
            items={[]}
            error={error?.message}
          />
        )}
      />
      <DynamicInput
        control={control}
        name="summa"
        label="Summa"
        placeholder=""
      />
      <Button
        onPress={handleSubmit(onsubmit)}
        mode="contained"
        loading={false}
        style={{
          borderRadius: 12,
          padding: 4,
          marginTop: 10,
          marginBottom: 20,
        }}
      >
        Qo'shish
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sheetTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
  },
  tabContainer: {
    flexDirection: "row",
    padding: 4,
    borderRadius: 12,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  tabText: {
    fontWeight: "600",
    fontSize: 14,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  payBtn: {
    height: 48,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  payBtnText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  historyItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  historyIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
});
