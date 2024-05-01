import GoBack from "@/components/common/GoBack";
import { useAppSelector } from "@/hooks/redux.hooks";
import { hexToRGB } from "@/lib/common";
import AccountsService from "@/services/accounts.services";
import CategoriesService from "@/services/categories.services";
import globalStyles from "@/styles/globalStyles";
import { CategoryWithExpenses } from "@/types/categories";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { ProgressChart } from "react-native-chart-kit";
import { AbstractChartConfig } from "react-native-chart-kit/dist/AbstractChart";
import { FontAwesome5, AntDesign, FontAwesome6 } from '@expo/vector-icons';
import ListActivities from "@/components/dashboard/ListActivities";

function CategoryViewPage() {
  const { id } = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<CategoryWithExpenses | null>(null);
  const account = useAppSelector((state) => state.accounts[0]);
  const chartConfig: AbstractChartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0,
    useShadowColorFromDataset: false
  }

  useEffect(() => {
    const getCategory = async (id: number) => {
      try {
        const cat = await new CategoriesService().getCategory(id);
        const expenses = await new AccountsService().getExpensesByCatId(id);
        if (cat) {
          cat.expenses = expenses;
        }
        setData(cat);
      } catch (error) {
        router.push('/dashboard/');
      } finally {
        setIsLoading(false);
      }
    }

    if (id) {
      getCategory(+id);
    }

  }, [id]);

  if (isLoading || data === null) {
    return (
      <SafeAreaView style={globalStyles.container}>
        <GoBack title={'Category'} />
        <Text style={globalStyles.text}> Chargement...</Text>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={globalStyles.container}>
      <GoBack title={data.name} />
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
            <Text style={[globalStyles.text, { fontSize: 30 }]}>{data.currentAmount}</Text>
          </View>
        </View>
        <View style={{ width: '50%' }}>
          <ProgressChart
            style={{ alignSelf: 'center' }}
            data={{
              data: [0]
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

      <View style={[globalStyles.container, styles.containerExpenses]}>
        <Text style={[globalStyles.text, {fontSize: 28}]}>Dépenses du mois :</Text>
        <ScrollView>
          {data.expenses?.map((e) => {
            return (
              <Text style={globalStyles.text} key={e.id}>{e.description}</Text>
            )
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
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
  containerExpenses:{
    marginTop: 10
  }
});

export default CategoryViewPage;