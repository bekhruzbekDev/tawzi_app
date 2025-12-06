import { useState } from "react";

export const useStats = () => {
  const [toggleDay, setToggleDay] = useState<"monthly" | "daily">("daily");
  const [unitType, setUnitType] = useState<"kv" | "sum">("kv");

  const filterDataChange = (key: "day" | "unit", data: any) => {
    if (key == "unit") return setUnitType(data);
    setToggleDay(data);
  };

  return { toggleDay, unitType, filterDataChange };
};
