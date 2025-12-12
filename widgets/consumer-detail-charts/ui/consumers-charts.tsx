import DynamicChart from "@/shared/ui/dynamic-chart";
import { useChartsData } from "../model/use-charts-data";

interface Props {
  id: string;
  filter_type: "monthly" | "yearly";
  date: Date;
}

export default function ConsumersDetailCharts({ id, filter_type ,date}: Props) {
 
  const { electricData, gasData, waterData } = useChartsData(id, filter_type,date);
  return (
    <>
      {electricData && (
        <DynamicChart
          value={electricData.worked_summa}
          subValue={electricData.worked_consumption}
          icon="lightning-bolt"
          color="#f59e0b"
          bgColor="#fffbeb"
          data={electricData?.data}
        />
      )}
      {gasData && (
        <DynamicChart
          value={gasData.worked_summa}
          subValue={gasData.worked_consumption}
          icon="fire"
          color="#f97316"
          bgColor="#fff7ed"
          data={gasData.data}
        />
      )}
      {waterData && (
        <DynamicChart
          value={waterData.worked_summa}
          subValue={waterData.worked_consumption}
          icon="water-outline"
          color="#3b82f6"
          bgColor="#eff6ff"
          data={waterData.data}
        />
      )}
    </>
  );
}
