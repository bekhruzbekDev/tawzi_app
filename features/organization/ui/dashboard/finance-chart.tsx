import { useThemeColors } from "@/shared/hooks/use-theme";
import { StyleSheet, Text, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { FinanceChartData } from "../../model/dashboard/types";

interface Props {
    data: {chartData:FinanceChartData[],totalConsumer:number}
}
export const FinanceChart = ({data}:Props) => {
  const theme = useThemeColors();
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.barChart,
          { backgroundColor: theme.card, shadowColor: theme.shadow },
        ]}
      >
        <Text style={[styles.chartTitle, { color: theme.text }]}>
          Hisob kitob
        </Text>
        <View style={{ alignItems: "center", marginBottom: 16 }}>
          <PieChart
            data={data.chartData}
            showText
            textColor={theme.background}
            textSize={12}
            donut
            innerCircleColor={theme.card}
            centerLabelComponent={() => (
              <Text style={[styles.chartTitle, { color: theme.text ,textAlign:"center",fontSize:16}]}>
                {data.totalConsumer} 
              </Text>
            )}
          />
        </View>
        <View style={{ gap: 10 }}>
            {data.chartData.map((item,index)=>(
                <PieChartLabel
                key={index}
                dotColor={item.color}
                value={`${item.label} ${item.text} / ${item.price}`}
                theme={theme}
              />
            ))}
        </View>
      </View>
    </View>
  );
};

interface LabelProps {
  theme: any;
  value: string;
  dotColor: string;
}

const PieChartLabel = (props: LabelProps) => {
  const { theme, dotColor, value } = props;
  return (
    <View style={[styles.infoLabel]}>
      <View style={[styles.dot, { backgroundColor: dotColor }]} />
      <Text style={[{ color: theme.text }]}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  barChart: {
    padding: 16,
    borderRadius: 16,
    shadowOffset: { height: 0.1, width: 0 },
    overflow: "hidden",
    marginBottom: 16,
  },
  dot: {
    width: 20,
    height: 20,
    borderRadius: 5,
    backgroundColor: "#2C80FF",
  },
  infoLabel: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  chartTitle: {
    marginBottom: 10,
    fontSize: 18,
    fontWeight: 500,
  },
});
