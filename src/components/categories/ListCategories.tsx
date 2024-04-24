import CategoriesService from "@/services/categories.services";
import globalStyles from "@/styles/globalStyles";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { FlashList } from "@shopify/flash-list";

function ListCategories() {
  const { isError, isLoading, data } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => await new CategoriesService().getCategories()
  });


  if (isLoading) {
    <View>
      <Text style={globalStyles.text}>Loading...</Text>
    </View>
  }
  if (isError) {
    router.push('/dashboard/');
  }
  console.log(data);
  return (
    <View style={globalStyles.container}>
      <FlashList
        data={data}
        renderItem={({ item }) =>
          <View style={style.containerCard}>
            <Text style={globalStyles.text}>{item.name}</Text>
            <Text style={globalStyles.text}>{item.currentAmount}</Text>
            <Text style={globalStyles.text}>{item.amountAllocated}</Text>
          </View>
        }
        estimatedItemSize={10}
        numColumns={3}
      />
    </View>
  )
}

const style = StyleSheet.create({
  containerCard: {

  }
});

export default ListCategories;