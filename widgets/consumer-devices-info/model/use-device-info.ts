import { useQuery } from "@tanstack/react-query";
import { getConsumerDevicesInfo } from "./queries";
import { DeviceInfo, getConsumerDevicesInfoRes } from "./types";

export const useConsumerDevicesInfo = (
  id: string | number | null,
  filter_type: "monthly" | "yearly",
  date: Date
) => {
  const { data } = useQuery<getConsumerDevicesInfoRes>({
    queryKey: ["consumer-devices-info", id, filter_type, date],
    queryFn: () => getConsumerDevicesInfo(id, filter_type, date),
    enabled: !!id,
  });

  const electricInfo = mapperData("Elektr", data?.data.electric_info);
  const gasInfo = mapperData("Gaz", data?.data.gas_info);
  const waterInfo = mapperData("Suv", data?.data.water_info);

  return {
    data: [electricInfo, gasInfo, waterInfo],
  };
};

const mapperData = (title: string, data: DeviceInfo | undefined) => {
  if (!data) return null;

  return {
    id: data.total_billed_amount,
    name: title,
    totalUnit: data.current_value,
    icon: "lightning-bolt",
    color: "#f59e0b",
    bg: "#fffbeb",
    subMeters: data.meters.map((item) => ({
      id: item.meter_number,
      serial: item.meter_number,
      value: item.value,
    })),
  };
};
