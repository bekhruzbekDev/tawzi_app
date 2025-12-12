export interface getConsumerDevicesInfoRes {
  data: ConsumerDevicesInfo;
}

export interface ConsumerDevicesInfo {
  electric_info: DeviceInfo;
  water_info: DeviceInfo;
  gas_info: DeviceInfo;
}

export interface DeviceInfo {
  total_billed_amount: string;
  current_value: string;
  meters: Meter[];
}

export interface Meter {
  meter_number: string;
  billed_amount: string;
  value: string;
}
