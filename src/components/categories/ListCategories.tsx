import CategoriesService from "@/services/categories.services";
import globalStyles from "@/styles/globalStyles";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { Text, View } from "react-native";

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
    <View>
        <Text style={globalStyles.text}>Je suis le composant ListCategories</Text>
    </View>
  )
}

export default ListCategories;