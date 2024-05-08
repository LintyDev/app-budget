import { hexToRGB } from "@/lib/common";
import globalStyles from "@/styles/globalStyles";
import { StyleSheet, Text, View } from "react-native";
import { ProgressChart } from "react-native-chart-kit";
import { FontAwesome5, AntDesign, FontAwesome6 } from '@expo/vector-icons';
import Category from "@/types/categories";
import { AbstractChartConfig } from "react-native-chart-kit/dist/AbstractChart";
import { useAppSelector } from "@/hooks/redux.hooks";


function CategoryCard({ data }: { data: Category }) {
  const account = useAppSelector((state) => state.accounts[0]);
  const chartConfig: AbstractChartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0,
    useShadowColorFromDataset: false
  }

  return (
    <View style={styles.containerRecap}>
      <View style={{ width: '50%', justifyContent: 'space-between' }}>
        <View>
          <View style={[styles.containerName, { backgroundColor: hexToRGB(data.color, 0.2) }]}>
            <Text style={[globalStyles.text, { fontSize: 20, alignSelf: 'center' }]}>{data.name}</Text>
          </View>
          <View style={[globalStyles.flexRow, { gap: 5, alignSelf: 'center', marginTop: 5 }]}>
            <AntDesign name="calendar" size={16} color="white" />
            <Text style={[globalStyles.text, { fontSize: 16 }]}>{account.currentMonthYear}</Text>
            <Text style={[globalStyles.text, { fontSize: 16 }]}> - </Text>
            <FontAwesome6 name="money-bill-transfer" size={16} color="white" />
            <Text style={[globalStyles.text, { fontSize: 16 }]}>{data.amountAllocated}</Text>
          </View>
        </View>
        <View style={[globalStyles.flexRow, { gap: 5, alignSelf: 'center' }]}>
          <FontAwesome5 name="euro-sign" size={28} color="white" />
          <Text style={[globalStyles.text, { fontSize: 30 }]}>{parseFloat(data.currentAmount.toFixed(2))}</Text>
        </View>
      </View>
      <View style={{ width: '50%' }}>
        <ProgressChart
          style={{ alignSelf: 'center' }}
          data={{
            data: [(((data.amountAllocated - data.currentAmount) * 100) / data.amountAllocated) / 100]
          }}
          width={150}
          height={130}
          strokeWidth={25}
          radius={52}
          chartConfig={{ ...chartConfig, color: (opacity = 1) => hexToRGB(data.color, opacity) }}
          hideLegend={true}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  containerRecap: {
    flexDirection: 'row',
    marginTop: 15,
    height: 130
  },
  containerName: {
    borderRadius: 5,
    paddingVertical: 5,
    justifyContent: 'center'
  },
});

export default CategoryCard;