export interface Meter {
  id: number;
  type: "electric" | "gas" | "water";
  serial_number: string;
  current_reading: string;
  status: string;
  meter_direction: string;
}

export interface Stats {
  total: number;
  active: number;
  inactive: number;
  maintenance: number;
  broken: number;
}

export interface GetMetersRes {
  data: Meter[];
  stats: Stats;
  total_pages: number;
}

export interface CreateMeterValues {
  meter_number: string;
  device_type: "electric" | "gas" | "water";
  direction: "incoming" | "outgoing";
  consumer: string;
  parent: string |null;
  is_generator: boolean;
  is_solar_panel: boolean;
  is_main: boolean;
}



export interface MeterDetailRes {
  data: MeterDetail
}

export interface MeterDetail {
  id: number
  type: "electric" | "gas" | "water";
  serial_number: string
  current_reading: string
  status: string
  consumer: any
  device_meter_direction: "incoming" | "outgoing";
  parent:string |null
  is_generator:boolean
  is_solar_panel:boolean
  is_main:boolean
}

export interface SendCommandValues {
 device_type: "electric" | "gas" | "water" |null,
    device_id: number,
    timeout_min: string,
    comment:string|null
}


export interface GetDeviceCommandsRes {
  data: GetDeviceCommand[]
  success: boolean,
  total_pages: number
}

export interface GetDeviceCommand {
  date: string
  changes: CommandData[]
}

export interface CommandData {
  id: number
  created_by_user: string
  device: string
  device_type: string
  command_str: string
  comment: string
  command_status: CommandStatus
  button_status: string
  created_at: string
}

export interface CommandStatus {
  status: string
  days: number
  hours: number
  minutes: number
}
