import { Ionicons } from "@expo/vector-icons"

export interface DashboardDataResponse {
  data: DashboardData
}

export interface DashboardData {
  monthly_stats: MonthlyStats
  notified_consumers: number
  debtors: number
  uncontacted: number
  disconnected: number
  total_consumers: number
  total_incoming_meters: number
  total_outgoing_meters: number
  top_consumers: TopConsumer[]
  finance: Finance
}

export interface MonthlyStats {
  monthly_consumption: MonthlyConsumption
  weekendly_consumption: WeekendlyConsumption
  daily_consumption: WeekendlyConsumption
  losses: string
}

export interface MonthlyConsumption {
  current_total: number
  pre_total: number
}

export interface WeekendlyConsumption {
  current_total: number
  prev_total: number
}



export interface TopConsumer {
  name: string
  total_meters: number
  total_consumption: number
}

export interface Finance {

    totalConsumer:number,
    debt:{value:number,price:string,},
    paid: {value:number,price:string,},
    warned: {value:number,price:string,},
}


export interface DashboardStats {
  value: string,
    label: string,
    warning: string,
    isWarning: boolean,    
}

export type AlertStatItem = {
  id: string;
  label: string;
  value: number;
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  iconBgColor: string;
};


export interface FinanceChartData {
  value: number;
  color: string;
  text: string;
  price: string;
  label: string;
}





export interface OrganizationChartDataRes {
  data: OrganizationChartData[]
}

export interface OrganizationChartData {
  date: string
  incoming: number
  outgoing: number
}

export type OrgChartData = 
    { label: string, v1: number, v2: number }