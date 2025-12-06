import BottomSheetSelect from "@/shared/ui/bottom-sheet-select";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { z } from "zod";

// Define your form schema
const formSchema = z.object({
  category: z.string().min(1, "Kategoriyani tanlang"),
  type: z.string().min(1, "Turini tanlang"),
});

type FormValues = z.infer<typeof formSchema>;

export default function ExampleUsage() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
      type: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form data:", data);
  };

  const categoryItems = [
    { label: "Kiruvchi", value: "incoming" },
    { label: "Chiquvchi", value: "outgoing" },
  ];

  const typeItems = [
    { label: "Asosiy", value: "main" },
    { label: "Generator", value: "generator" },
    { label: "Quyosh panel", value: "solar" },
    { label: "Boshqa", value: "other" },
  ];

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <BottomSheetSelect
          name="category"
          control={control}
          label="Kategoriya"
          placeholder="Kategoriyani tanlang"
          items={categoryItems}
          error={errors.category?.message}
        />

        <BottomSheetSelect
          name="type"
          control={control}
          label="Turi"
          placeholder="Turini tanlang"
          items={typeItems}
          error={errors.type?.message}
        />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
