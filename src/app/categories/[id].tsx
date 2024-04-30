import GoBack from "@/components/common/GoBack";
import globalStyles from "@/styles/globalStyles";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView, Text } from "react-native";

function CategoryViewPage() {
  const { id } = useLocalSearchParams();
  console.log('id cat to query : ', id);
  return (
    <SafeAreaView style={globalStyles.container}>
      <GoBack title="id cat name" />
      <Text style={globalStyles.text}> je suis la page category : </Text>
    </SafeAreaView>
  )
}

export default CategoryViewPage;