import CustomSelect from "@/shared/ui/custom-select";
import DynamicInput from "@/shared/ui/dynamic-input";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useImperativeHandle } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "react-native-paper";
import { consumerEditSchema, consumerSchema } from "../../model/consumers/constants";
import { Consumer, ConsumerEditFormValues, ConsumerFormValues } from "../../model/consumers/types";

interface Props {
  loading: boolean;
  onSubmit: (data: ConsumerFormValues | ConsumerEditFormValues) => void;
  consumer:Consumer |null
}
export const CreateConsumerForm =React.forwardRef<any,Props>( ({ loading, onSubmit,consumer }: Props,ref) => {
  const {   
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ConsumerEditFormValues | ConsumerFormValues>({
    resolver: zodResolver(!consumer ? consumerSchema : consumerEditSchema),
    defaultValues: {
      name: consumer?.name??"",
      device_type: "electric",
      meter_number: "",
      parent:"",
      password:"",
      phone_number: consumer?.phone??"",
      username: consumer?.username??"",

    },
  });

  useImperativeHandle(ref, () => ({
      resetForm: () => {
        reset({
          name: "",
          device_type: "electric",
          meter_number: "",
          parent:"",
          password:"",
          phone_number: "",
          username: "",
        }); 
      },
    }));

  useEffect(() => {
    if (consumer) {
      reset({
        name: consumer.name,
        password:"",
        phone_number: consumer.phone,
        username: consumer.username,
      });
    }
  }, [consumer, reset]);
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
      {!consumer?.username && (
        <>

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
      </>
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
})


