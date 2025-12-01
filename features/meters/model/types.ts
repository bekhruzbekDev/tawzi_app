export interface Meter {
  id: string;
  meter_number: string;
  type: "electric" | "gas" | "water";
  status: "active" | "inactive";
  direction: "incoming" | "outgoing";
  consumer?: {
    id: string;
    name: string;
  };
  current_reading: number;
  connected_meter?: {
    id: string;
    meter_number: string;
  };
  created_at: string;
}

export interface GetMetersRes {
  count: number;
  next: string | null;
  previous: string | null;
  total_pages: number;
  data: Meter[];
}

export interface CreateMeterValues {
  meter_number: string;
  type: "electric" | "gas" | "water";
  direction: "incoming" | "outgoing";
  consumer_id?: string;
  connected_meter_id?: string;
}
