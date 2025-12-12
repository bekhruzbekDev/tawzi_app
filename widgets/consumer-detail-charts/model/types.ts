export interface ConsumerDetailChartRes {
  data: ConsumerDetailChartData;
}

export interface ConsumerDetailChartData {
  electric?: DevicesData;
  water?: DevicesData;
  gas?: DevicesData;
}

export interface DevicesData {
  worked_summa: string;
  worked_consumption: string;
  data: ChartData[];
}

export interface ChartData {
  date: string;
  value: number;
}
