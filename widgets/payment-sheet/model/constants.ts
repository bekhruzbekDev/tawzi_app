import z from "zod";

export const paymentSchema = z.object({
  consumer_id: z.optional(z.string()),
  meter_number: z.string(),
  device_type: z.enum(["electric", "gas", "water"]),
  summa: z.number().min(1000, "eng kamida 1000 so'm bo'lishi shart"),
});

export const getMeterColor = (type: string) => {
  switch (type) {
    case "electric":
      return "#F6A623"; // Used orange/yellow in design often
    case "gas":
      return "#ef4444";
    case "water":
      return "#3b82f6";
    default:
      return "#999";
  }
};

export const translateType = (type: string) => {
  switch (type) {
    case "electric":
    case "gas":
      return "Gaz";
    case "water":
      return "Suv";
    default:
      return type;
  }
};
