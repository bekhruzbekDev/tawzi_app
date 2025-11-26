import { useThemeColors } from "@/shared/hooks/use-theme";
import CustomBarChart from "@/shared/ui/bar-chart";
import { StyleSheet, Text, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";
const data = [
  { value: 15, color: "red", text: "50 ta" },
  { value: 80, color: "green", text: "80 ta" },
  { value: 10, color: "orange", text: "10" },
];

export const OrganizationCharts = () => {
  const theme = useThemeColors();
  const demo = [
    { label: "Jan", v1: 40, v2: 38 },
    { label: "Feb", v1: 60, v2: 58 },
    { label: "Mar", v1: 50, v2: 50 },
    {
      label: "Apr",
      v1: 48,
      v2: 58,
      topLabelComponent: () => <Text>{58}</Text>,
    },
  ];

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.barChart,
          { backgroundColor: theme.card, shadowColor: theme.shadow },
        ]}
      >
        <Text style={[styles.chartTitle, { color: theme.text }]}>
          Resurst iste'moli
        </Text>
        <CustomBarChart data={demo} />
        <View style={[styles.infoLabel]}>
          <View style={styles.dot} />
          <Text style={[{ color: theme.text }]}>kiruvchi</Text>
          <View style={[styles.dot, { backgroundColor: "#61C7FF" }]} />
          <Text style={[{ color: theme.text }]}>Chiquvchi</Text>
        </View>
      </View>

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
            data={data}
            textBackgroundColor="red"
            showText
            // slice ichida label ko‘rsatadi
            textColor="white"
            textSize={15}
          />
        </View>
        <View style={{ gap: 10 }}>
          <PieChartLabel
            dotColor="red"
            value="Qarzdorlar: 10ta / 500.000 so'm"
            theme={theme}
          />
          <PieChartLabel
            dotColor="green"
            value=" to'langan: 80ta / 15 000 000 so'm"
            theme={theme}
          />
          <PieChartLabel
            dotColor="orange"
            value="Ogohlantirlgan: 10ta"
            theme={theme}
          />
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
