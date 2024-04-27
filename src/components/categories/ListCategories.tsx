import CategoriesService from "@/services/categories.services";
import globalStyles from "@/styles/globalStyles";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { ProgressChart } from "react-native-chart-kit";
import { AbstractChartConfig } from "react-native-chart-kit/dist/AbstractChart";
import { hexToRGB } from "@/lib/common";
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

function ListCategories() {
  const { isError, isLoading, data } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => await new CategoriesService().getCategories()
  });

  const chartConfig: AbstractChartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0,
    useShadowColorFromDataset: false
  }

  if (isLoading) {
    <View>
      <Text style={globalStyles.text}>Loading...</Text>
    </View>
  }
  if (isError) {
    router.push('/dashboard/');
  }
  // for debug
  // console.log(data);
  return (
    <View style={globalStyles.container}>
      <FlashList
        data={data}
        renderItem={({ item }) =>
          <View style={[style.containerCard,]} >
            <Pressable onPress={() => console.log(item.name)}>
              <View style={[style.containerName, { backgroundColor: hexToRGB(item.color, 0.2) }]}>
                <Text style={[globalStyles.text, style.textName]}>{item.name}</Text>
              </View>
              <View style={style.containerChart}>
                <View style={style.containerAllocated}>
                  <MaterialIcons name="account-balance" size={12} color="grey" />
                  <Text style={[globalStyles.text, style.textAllocated]}>{item.amountAllocated}</Text>
                </View>
                <ProgressChart
                  data={{
                    data: [(((item.amountAllocated - item.currentAmount) * 100) / item.amountAllocated) / 100]
                  }}
                  width={160}
                  height={160}
                  strokeWidth={20}
                  radius={50}
                  chartConfig={{ ...chartConfig, color: (opacity = 1) => hexToRGB(item.color, opacity) }}
                  hideLegend={true}
                />
              </View>
              <View style={style.containerCurrAmount}>
                <FontAwesome5 name="euro-sign" size={20} color="white" />
                <Text style={[globalStyles.text, style.textcurrAmount]}>{item.currentAmount}</Text>
              </View>
            </Pressable>
          </View>
        }
        estimatedItemSize={10}
        numColumns={2}
      />
    </View>
  )
}

const style = StyleSheet.create({
  containerCard: {
    backgroundColor: '#0d0d0d',
    flex: 1,
    borderRadius: 10,
    padding: 5,
    marginHorizontal: 5,
    marginBottom: 10
  },
  containerName: {
    borderRadius: 5,
    padding: 5
  },
  textName: {
    fontSize: 20,
  },
  containerChart: {
    alignItems: 'center'
  },
  containerCurrAmount: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center'
  },
  textcurrAmount: {
    fontSize: 22
  },
  containerAllocated: {
    position: 'absolute',
    top: '45%',
    flexDirection: 'row',
    gap: 5
  },
  textAllocated: {
    fontSize: 12,
    color: 'grey'
  },
});

export default ListCategories;